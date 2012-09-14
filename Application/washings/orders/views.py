#!coding:utf-8
from django.views.decorators.csrf import csrf_protect

from django.shortcuts import render_to_response, redirect
from django.contrib.auth import views as auth_views
from django.template import RequestContext
from django.http import Http404
from django.contrib.auth.decorators import login_required
from django.db import transaction

import re
import orders
from orders.models import Washing, Order, OrderForm, UserProfile
from datetime import date, datetime, time, timedelta

def index(request):
	return render_to_response('index.html', {"MAP_CENTER_LAT": 53.511311, "MAP_CENTER_LON": 49.418084}, 
		context_instance=RequestContext(request))

def operator(request, washing_id):
	try:
		profile = request.user.get_profile()
		if profile.role == UserProfile.WASHING_ADMIN_ROLE:
			if profile.washing.id != washing_id:
				raise Http404
		washing = Washing.objects.get(pk=washing_id)
		print washing
		return render_to_response('admin.html', {'washing':washing}, context_instance=RequestContext(request))
	except Washing.DoesNotExist:
		raise Http404
	except AttributeError:
		raise Http404

def get_all_washings_jsonp(request, jsonp_variable='washings_data'):
	return orders.JSONPResponse(Washing.objects.all(), jsonp_variable)

def get_available_times_for_washing(request, washing_id, today_or_tommorow):
	washing = Washing.objects.get(pk=washing_id)
	query = """
	SELECT o.*
	FROM
		`orders_order` as o,
		`orders_washing` as w
	WHERE
		o.washing_id = {washing_id}
		AND w.id = o.washing_id
		AND w.is_hidden <> 1
		AND 
			o.washing_post_number = {washing_posts_count}
		AND 
			o.date_time >= DATE_ADD(CONCAT(CURRENT_DATE, ' ', w.`start_work_day`), INTERVAL {tomorrow} DAY)
		AND
			o.date_time < DATE_ADD(DATE_ADD(CONCAT(CURRENT_DATE, ' ', w.`start_work_day`), INTERVAL {tomorrow} DAY), INTERVAL 1 DAY);
	""".format(washing_id=washing_id, tomorrow=today_or_tommorow, washing_posts_count=washing.washing_posts_count)

	available_times = []

	time = time_start = washing.start_work_day
	time_delta = timedelta(minutes=washing.timeframe_minutes)
	while time <= washing.end_work_day:
		free = 1
		for order in Order.objects.raw(query):
			if datetime.combine(order.date_time, time) <= order.date_time < datetime.combine(order.date_time, time) + time_delta:
				free = 0

		available_times.append({'time': str(time), 'available': free})
		time = (datetime.combine(datetime.today(), time) + time_delta).time()

	return orders.JSONResponse(available_times)

def get_washings_by_availability(request, today_or_tommorow, hours, minutes):
	query = """
	select *	
	from 
		`orders_washing` as w1
	where 
		w1.id not in (
		select w.id as `id`
		from 
			`orders_order` as o, `orders_washing` as w
		where 
			o.date_time >= CONCAT(DATE_ADD(CURRENT_DATE(), INTERVAL {tommorow} DAY),' ', 
				ADDTIME(w.start_work_day, 
					SEC_TO_TIME(
						ROUND(
							TIME_TO_SEC(
								TIMEDIFF('{hours}:{minutes}:00', w.start_work_day)
								) / 60 / w.`timeframe_minutes`) * 60 * w.`timeframe_minutes`)))

			and o.date_time >= CURRENT_DATE()
			and o.date_time < DATE_ADD(CONCAT(DATE_ADD(CURRENT_DATE(), INTERVAL {tommorow} DAY),' ', 
				ADDTIME(w.start_work_day, 
					SEC_TO_TIME(
						ROUND(
							TIME_TO_SEC(
								TIMEDIFF('{hours}:{minutes}:00', w.start_work_day)
								) / 60 / w.`timeframe_minutes`) * 60 * w.`timeframe_minutes`))), 
				INTERVAL w.timeframe_minutes MINUTE)

			and not o.cancelled
			and o.washing_id = w.id
			and o.washing_post_number = w.`washing_posts_count`)
			AND w.is_hidden <> 1
		and
			TIME('{hours}:{minutes}:00') >= w1.start_work_day 
		and 
			TIME('{hours}:{minutes}:00') < w1.end_work_day
	;	
	""".format(hours=hours, minutes=minutes, tommorow=today_or_tommorow)
	return orders.JSONModelResponse(Washing.objects.raw(query))


import copy
@csrf_protect
@transaction.commit_manually
def add_order(request, default_method='POST'):
	if request.method == default_method:
		washing = None
		try:
			washing_id = request.REQUEST['washing_id']
			washing = Washing.objects.get(pk=washing_id)
		except ValueError:
			print u"unable to find such washing: %s" % pk
			transaction.rollback()
			raise Http404

		try:
			unique_order_test = Order.objects.filter(csrfmiddlewaretoken=request.REQUEST['csrfmiddlewaretoken'])
			if len(list(unique_order_test)):
				print u"Already created!"
				return orders.JSONResponse({'error': 'alreadycreated', 'details':unique_order_test[0].id}) # occupied :(
		except Order.DoesNotExist:
			pass
		except:
			print u"Already created!"
			raise Http404	


		if not re.match(r'^\d\d:\d\d$', request.REQUEST['date_time']):
			print "malware time"
			raise Http404

		today = date.today() 

		today_or_tommorow = request.REQUEST.get('tomorrow', None)
		if today_or_tommorow is None:
			print "today_or_tommorow is None"
			raise Http404

		if today_or_tommorow == 1:
			one_day_delta = timedelta(days=1)
			today = (datetime.now() + dt).date()

		date_time_str = u"%s %s:00" % (str(today), request.REQUEST['date_time'])

		# test if time matches timegrid of washing
		timegrid_matches = False
		time = time_start = washing.start_work_day
		time_delta = timedelta(minutes=washing.timeframe_minutes)
		while time <= washing.end_work_day:
			if str(time) == request.REQUEST['date_time'] + ':00':
				timegrid_matches = True
				break
			time = (datetime.combine(datetime.today(), time) + time_delta).time()

		if not timegrid_matches:
			print "time doesn't match timegrid"
			transaction.rollback()
			raise Http404

		# test if time has already occupied
		query = """
		SELECT o.*
		FROM
			`orders_order` as o,
			`orders_washing` as w
		WHERE
			o.washing_id = {washing_id}
			AND 
				w.id = o.washing_id
			AND w.is_hidden <> 1
			AND 
				o.washing_post_number = w.`washing_posts_count`
			AND 
			CONCAT(DATE(o.date_time), ' ', 
				ADDTIME(w.start_work_day, 
					SEC_TO_TIME(ROUND(TIME_TO_SEC(
						TIMEDIFF(TIME(o.date_time), w.start_work_day)) / 60 / w.timeframe_minutes) * 60 * w.timeframe_minutes))) = 
			CONCAT(DATE(o.date_time), ' ', 
				ADDTIME(w.start_work_day, 
					SEC_TO_TIME(ROUND(TIME_TO_SEC(
						TIMEDIFF(TIME('{date_time_str}'), w.start_work_day)) / 60 / w.timeframe_minutes) * 60 * w.timeframe_minutes)))
		""".format(washing_id=washing.id,
			date_time_str=date_time_str)

		occupied_orders = Order.objects.raw(query)
		if len(list(occupied_orders)) > 0:
			transaction.rollback()
			return orders.JSONResponse({'error': 'tryanothertime'}) # occupied :(

		request_data = {
			'washing_id': request.REQUEST['washing_id'],
			'washing': request.REQUEST['washing_id'],
			'date_time': date_time_str,
			'name': request.REQUEST['name'],
			'phone': request.REQUEST['phone'],
			'autono': request.REQUEST['autono'],
			'email': request.REQUEST['email'],
			'csrfmiddlewaretoken':request.REQUEST['csrfmiddlewaretoken'],
		}
		
		f = OrderForm(request_data)
		if not f.is_valid():
			print "provided form fields wasn't valid"
			print f.errors
			transaction.rollback()
			raise Http404
		new_order = f.save(commit=False)

		post_number_query = """
		SELECT o.*
		FROM
			`orders_order` as o,
			`orders_washing` as w
		WHERE
			o.washing_id = {washing_id}
			AND 
				w.id = o.washing_id
			AND w.is_hidden <> 1
			AND 
			CONCAT(DATE(o.date_time), ' ', 
				ADDTIME(w.start_work_day, 
					SEC_TO_TIME(ROUND(TIME_TO_SEC(
						TIMEDIFF(TIME(o.date_time), w.start_work_day)) / 60 / w.timeframe_minutes) * 60 * w.timeframe_minutes))) = 
			CONCAT(DATE(o.date_time), ' ', 
				ADDTIME(w.start_work_day, 
					SEC_TO_TIME(ROUND(TIME_TO_SEC(
						TIMEDIFF(TIME('{date_time_str}'), w.start_work_day)) / 60 / w.timeframe_minutes) * 60 * w.timeframe_minutes)))
		ORDER BY o.washing_post_number DESC;
		""".format(washing_id=washing.id,
			date_time_str=date_time_str)
		orders_by_time = Order.objects.raw(post_number_query)
		if not len(list(orders_by_time)):
			new_order.washing_post_number = 1
		else:
			for order_by_time in orders_by_time:
				if order_by_time.washing_post_number + 1 <= washing.washing_posts_count:
					new_order.washing_post_number = order_by_time.washing_post_number + 1
					break
				else:
					transaction.rollback()
					return orders.JSONResponse({'error': 'tryanothertime'}) # occupied :(
				
		new_order.save()
		transaction.commit()
		return orders.JSONResponse({'new_order': new_order.id})
	else:
		transaction.rollback()
		raise Http404

@login_required
def operator_deleteorder(request, order_id):
	try:
		profile = request.user.get_profile()
		order = Order.objects.get(pk=order_id)
		if profile.role == UserProfile.WASHING_ADMIN_ROLE:
			if profile.washing.id != order.washing.id:
				raise Http404
		order.cancelled = True
		order.save()
		return orders.JSONResponse({'result':'ok'})
	except Order.DoesNotExist:
		raise Http404

@login_required
def operator_updateorder(request, order_id):
	if request.method != "POST":
		raise Http404
	try:
		profile = request.user.get_profile()
		order = Order.objects.get(pk=order_id)
		if profile.role == UserProfile.WASHING_ADMIN_ROLE:
			if profile.washing.id != order.washing.id:
				raise Http404
		
		order.autono = request.POST['autono']
		order.details = request.POST['details']
		order.name = request.POST['name']
		order.note = request.POST['note']

		order.is_created_by_staff = True

		order.save()
		return orders.JSONResponse({'result':'ok'})
	except Order.DoesNotExist:
		raise Http404

@login_required
def operator_createorder(request, washing_id):
	if request.method != "POST":
		raise Http404
	try:
		profile = request.user.get_profile()
		if profile.role == UserProfile.WASHING_ADMIN_ROLE:
			if profile.washing.id != washing_id:
				raise Http404
		washing = Washing.objects.get(pk=washing_id)
		order = Order()
		order.washing = washing
		order.phone = 000
		order.washing_post_number = request.POST['washing_post_number']
		order.date_time = request.POST['date_time']
		order.autono = request.POST['autono']
		order.details = request.POST['details']
		order.name = request.POST['name']
		order.note = request.POST['note']
		order.is_created_by_staff = True

		order.save()
		return orders.JSONResponse({'result':'ok'})
	except Washing.DoesNotExist:
		raise Http404

@login_required
def operator_viewmodel(request, day, month, year, washing_id):
	profile = request.user.get_profile()
	if profile.role == UserProfile.WASHING_ADMIN_ROLE:
		if profile.washing.id != washing_id:
			raise Http404

	post_number_query = """
		SELECT o.*
		FROM
			`orders_order` as o,
			`orders_washing` as w
		WHERE
			o.washing_id = w.id
			AND w.is_hidden <> 1
			AND
				w.id = {washing_id}
			AND 
				o.date_time >= CONCAT('{year}-{month}-{day}', ' ', w.`start_work_day`)
			AND 
				o.date_time <= CONCAT('{year}-{month}-{day}', ' ', w.`end_work_day`)
			AND 
				o.cancelled = 0
		ORDER BY o.washing_post_number DESC;
		""".format(washing_id=washing_id, year=year, month=month, day=day)
	orders_items = Order.objects.raw(post_number_query)
	
	washing = Washing.objects.get(pk=washing_id)

	timeframes = []
	time = time_start = washing.start_work_day
	time_delta = timedelta(minutes=washing.timeframe_minutes)
	while time <= washing.end_work_day:
		timeframes.append(time.strftime('%H:%M'))
		time = (datetime.combine(datetime.today(), time) + time_delta).time()

	result_orders = []
	for order in orders_items:
		result_orders.append({
			'id':order.id,
			'autono':order.autono, 'postnumber':order.washing_post_number, 
			'datetime':order.date_time.strftime('%H:%M'), 'name':order.name, 'note':order.note, 
			'details':order.details, 'is_created_by_staff':order.is_created_by_staff, 'autobrand':order.autobrand,
			'phone':order.phone})

	return orders.JSONResponse({'timeframes_stamp':timeframes, 'timeframes':result_orders}) 
