#!coding:utf-8
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import login, logout

from django.shortcuts import render_to_response, redirect
from django.contrib.auth import views as auth_views
from django.template import RequestContext, loader, Context
from django.http import Http404, HttpResponse
from django.contrib.auth.decorators import login_required
from django.db import transaction

import re
import orders
from orders.models import Washing, Order, OrderForm, UserProfile, SiteSettings
from datetime import date, datetime, time, timedelta

from utils import TimeGrid, format_dt
from django.contrib.auth import authenticate


_TIME_TO_RUN_TO_WASHING_MINUTES = 10


def _timeobj_from_request_string(string):
	hours, minutes = string.split(':')
	return time(hour=int(hours), minute=int(minutes))

@csrf_protect
def index(request):
	profile = None
	if request.user.is_authenticated():
		profile = request.user.get_profile()

	site_settings = None
	try:
		site_settings = SiteSettings.objects.order_by('-update_date')[0]
	except IndexError:
		site_settings = SiteSettings()
		site_settings.save()

	return render_to_response('index.html', 
		{'profile': profile, 'site_settings': site_settings, 'now': datetime.now(), 
		'time_to_run_delta': _TIME_TO_RUN_TO_WASHING_MINUTES,
		"MAP_CENTER_LAT": 53.511311, "MAP_CENTER_LON": 49.418084}, 
		context_instance=RequestContext(request))

def operator(request, washing_id):
	try:
		profile = request.user.get_profile()
		if profile.role == UserProfile.WASHING_ADMIN_ROLE:
			if profile.washing.id != int(washing_id):
				raise Http404
		washing = Washing.objects.get(pk=washing_id)
		return render_to_response('admin.html', {'profile':profile, 'washing':washing}, context_instance=RequestContext(request))
	except Washing.DoesNotExist:
		raise Http404
	except AttributeError:
		raise Http404

@csrf_protect
def login_view(request):
	if request.method == 'POST':
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(username=username, password=password)
		if user is not None:
		    if user.is_active:
		        print "You provided a correct username and password!"
		        login(request, user)
		        profile = user.get_profile()
		        if profile.role == UserProfile.SUPER_ADMIN_ROLE:
		        	return redirect('/')
		        elif profile.role == UserProfile.WASHING_ADMIN_ROLE:
		        	return redirect('/operator/%i' % profile.washing.id)
		    else:
		    	print "User is not active"
	return render_to_response('login.html', context_instance=RequestContext(request))

def logout_view(request):
	logout(request)
	return redirect('/')

def get_all_washings_jsonp(request, jsonp_variable='washings_data'):
	washings = Washing.objects.all().filter(is_hidden__exact=False)
	return orders.JSONPResponse(washings, jsonp_variable)

def get_available_times_for_washing(request, washing_id, today_or_tommorow):
	washing = Washing.objects.get(pk=washing_id)
	timegrid = TimeGrid(washing.start_work_day, washing.end_work_day,\
	 washing.timeframe_minutes, today_or_tommorow == '1')

	dt_start = str(timegrid.grid[0])
	dt_end = str(timegrid.grid[len(timegrid.grid)-1])

	from django.db import connection, transaction
	cursor = connection.cursor()
	cursor.execute("""SELECT o.date_time, COUNT(*) >= w.`washing_posts_count` 
    	FROM orders_order as o, orders_washing as w 
    	WHERE o.cancelled = 0 AND o.washing_id=w.id AND w.id=%s AND w.`is_hidden`=0 
    	AND o.date_time >= %s AND o.date_time <= %s
    	GROUP BY o.date_time""", 
    	[washing_id, dt_start, dt_end])
    
	occupied_times = cursor.fetchall()
	available_times = []

	now = datetime.now()

	time_to_run_delta = timedelta(minutes=_TIME_TO_RUN_TO_WASHING_MINUTES)

	# nearest_tick, delta_time = timegrid.grid[0], (now + time_to_run_delta - timegrid.grid[0]).seconds

	for tick in timegrid.grid:
		is_occupied = False
		for (occupied_time, occupied) in occupied_times:
			if occupied_time == tick and occupied == 1:
				is_occupied = True

		is_timed_out = tick < now + time_to_run_delta

		available_times.append({'time': format_dt(tick), 'timedout':is_timed_out,  'available': int(not is_occupied)})

	return orders.JSONResponse(available_times)

# todo подкорректировать алгоритм определения занятости мойки
def get_washings_by_availability(request, today_or_tommorow, hours, minutes):
	now = datetime.now()
	if today_or_tommorow == '1':
		now = now + timedelta(days=1)
	order_time = time(hour=int(hours), minute=int(minutes))
	order_dt = datetime.combine(now, order_time)

	query = """
    	SELECT * FROM orders_washing AS w1
 WHERE w1.is_hidden = 0 AND (
    	     (w1.end_work_day < w1.start_work_day AND (w1.end_work_day >= %s OR w1.start_work_day <= %s))
    	     OR (w1.start_work_day <= %s AND w1.end_work_day >= %s));
    	"""

	return orders.JSONModelResponse(Washing.objects.raw(query, [order_time, order_time, order_time, order_time]))

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
				transaction.rollback()
				return orders.JSONResponse({'error': 'alreadycreated', 'details':unique_order_test[0].id}) # occupied :(
		except Order.DoesNotExist:
			pass
		except:
			print u"Already created!"
			transaction.rollback()
			raise Http404	


		if not re.match(r'^\d\d:\d\d$', request.REQUEST['date_time']):
			print "malware time"
			transaction.rollback()
			raise Http404

		today = date.today() 

		today_or_tommorow = request.REQUEST.get('tomorrow', None)
		if today_or_tommorow is None:
			print "today_or_tommorow is None"
			transaction.rollback()
			raise Http404

		print today_or_tommorow

		t_obj = _timeobj_from_request_string(request.REQUEST['date_time'])


		delta_time = timedelta()
		# если мойка ночная и время ночное, то надо добавить еще 1 день к дате.
		if washing.end_work_day < washing.start_work_day and t_obj < washing.start_work_day:
			print "here1"
			delta_time = timedelta(days=1)

		# а если записано на завтра то и еще один, то есть в следующую ночь а не в текущую => в сумме +2 дня
		if today_or_tommorow == '1':
			print "here2"
			delta_time += timedelta(days=1)

		today = (datetime.now() + delta_time).date()

		date_time_str = u"%s %s:00" % (str(today), request.REQUEST['date_time'])


		timegrid = TimeGrid(washing.start_work_day, washing.end_work_day, washing.timeframe_minutes)
	
		

		order_time = datetime.combine(today, t_obj)
		print order_time
		if order_time < datetime.now():
			print "time has expired"
			transaction.rollback()
			raise Http404

		if not timegrid.match(t_obj):
			print "time doesn't match timegrid"
			transaction.rollback()
			raise Http404

		# todo выбираем просто заказы и подсчитываем колиество заказов на данное время, если равно washing_post_number — время занято
		# test if time has already occupied
		query = """
		SELECT o.*
		FROM
			`orders_order` as o,
			`orders_washing` as w
		WHERE
			o.washing_id = %s
			AND 
				w.id = o.washing_id
			AND o.cancelled = 0
			AND w.is_hidden <> 1
			AND o.date_time = %s
		"""

		occupied_orders = Order.objects.raw(query, [washing.id, date_time_str])
		if len(list(occupied_orders)) == washing.washing_posts_count:
			print "OCUPIED HERE"
			transaction.rollback()
			return orders.JSONResponse({'error': 'tryanothertime'}) # occupied :(

		print date_time_str

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
			o.washing_id = %s
			AND o.cancelled = 0
			AND 
				w.id = o.washing_id
			AND w.is_hidden <> 1
			AND 
			o.date_time = %s
		"""
		orders_by_time = Order.objects.raw(post_number_query, [washing.id, date_time_str])

		if not len(list(orders_by_time)):
			new_order.washing_post_number = 1
		else:

			print orders_by_time

			occupied_posts = [False for x in range(1, washing.washing_posts_count + 1)]
			
			for order_by_time in orders_by_time: 
				occupied_posts[order_by_time.washing_post_number - 1] = True

			print occupied_posts

			washing_post_number_for_order = None
			
			for i in range(0, len(occupied_posts)):
				if not occupied_posts[i]:
					washing_post_number_for_order = i + 1
					break

			if not washing_post_number_for_order:
				transaction.rollback()
				return orders.JSONResponse({'error': 'tryanothertime'}) # occupied :(

			new_order.washing_post_number = washing_post_number_for_order
				
		new_order.save()
		transaction.commit()
		return orders.JSONResponse({'new_order': new_order.id})
	else:
		transaction.rollback()
		raise Http404

# todo: add csrf_protect (see admin.html)
@login_required
@transaction.commit_manually
def operator_changeorderpost(request, order_id, new_post_number):
	if request.method != "POST":
		transaction.rollback()
		raise Http404

	try:
		profile = request.user.get_profile()
		order = Order.objects.get(pk=order_id)
		if profile.role == UserProfile.WASHING_ADMIN_ROLE:
			if profile.washing.id != order.washing.id:
				transaction.rollback()
				raise Http404
		if order.washing_post_number == new_post_number:
			transaction.rollback()
			return orders.JSONResponse({'result':'ok'})

	except Order.DoesNotExist:
		transaction.rollback()
		raise Http404

	if int(new_post_number) > order.washing.washing_posts_count or int(new_post_number) < 1:
		transaction.rollback()
		raise Http404

	orders_by_time = Order.objects.filter(date_time=order.date_time).filter(washing=order.washing).filter(cancelled=0)

	occupied = None
	for o in orders_by_time:
		print o.washing_post_number
		if o.washing_post_number == int(new_post_number):
			occupied = o
			break

	if occupied: # do swap
		occupied.washing_post_number = order.washing_post_number 
		occupied.save()

	order.washing_post_number = new_post_number
	order.save()
	transaction.commit()
	return orders.JSONResponse({'result':'ok'})


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
		order.phone = request.POST['phone'] 
		order.details = request.POST['details']
		order.name = request.POST['name']
		order.note = request.POST['note']
		# order.is_created_by_staff = True # don't make blue 
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
			if profile.washing.id != int(washing_id):
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
def operator_report(request, day1, month1, year1, day2, month2, year2, washing_id):
	profile = request.user.get_profile()
	if profile.role == UserProfile.WASHING_ADMIN_ROLE:
		if profile.washing.id != int(washing_id):
			raise Http404

	dt_start = datetime(year=int(year1), month=int(month1), day=int(day1))
	dt_end = datetime(year=int(year2), month=int(month2), day=int(day2))

	washing = Washing.objects.get(pk=washing_id)
	orders = Order.objects.filter(washing=washing, added_date__gte=dt_start).exclude(added_date__gt=dt_end).order_by('id')

	return render_to_response('report.html', {'washing':washing, 'orders':orders, 
		'date_start':dt_start, 'date_end':dt_end}, 
		context_instance=RequestContext(request))

import unicodecsv
from cStringIO import StringIO
from django.core.servers.basehttp import FileWrapper
@login_required
def operator_report_csv(request, day1, month1, year1, day2, month2, year2, washing_id):
	profile = request.user.get_profile()
	if profile.role == UserProfile.WASHING_ADMIN_ROLE:
		if profile.washing.id != int(washing_id):
			raise Http404

	dt_start = datetime(year=int(year1), month=int(month1), day=int(day1))
	dt_end = datetime(year=int(year2), month=int(month2), day=int(day2))

	washing = Washing.objects.get(pk=washing_id)
	orders = Order.objects.filter(washing=washing, added_date__gte=dt_start).exclude(added_date__gt=dt_end).order_by('id')

	f = StringIO()
	w = unicodecsv.writer(f, encoding='utf-8', delimiter=";")
	f.write('\xEF\xBB\xBF\x61')
	
	w.writerow((u'№№ п/п', u'Назначенное время', u'Дата создания заказа', \
    	u'Имя клиента', u'Телефон клиента', u'E-mail клиента', \
    	u'Номер автомобиля', u'Моечный пост',u'Заказ создан через сайт?', u'Заказ удален?'))

	i = 1
	for order in orders:
		yesno = u'нет'
		if order.is_created_by_staff:
			yesno = u'да'

		deleted = u'нет'
		if order.cancelled:
			deleted = u'да'

		w.writerow((i, order.date_time, order.added_date, order.name, order.phone, order.email, order.autono, order.washing_post_number, yesno, deleted))
		i+=1

	f.seek(0)

	t = loader.get_template('report_csv.txt')
	c = Context({'content': f.read()})
	response = HttpResponse(t.render(c), mimetype='text/csv')
	response['Content-Disposition'] = 'attachment; filename=report.csv'
	return response


@login_required
def operator_viewmodel(request, day, month, year, washing_id):
	profile = request.user.get_profile()
	if profile.role == UserProfile.WASHING_ADMIN_ROLE:
		if profile.washing.id != int(washing_id):
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
				w.id = %s
			AND
			(
				(w.is_round_the_clock <> 1
				AND o.date_time >= CONCAT(%s, ' ', w.`start_work_day`)
				AND o.date_time <= CONCAT(%s, ' ', w.`end_work_day`))
				OR (
				w.is_round_the_clock = 1
				AND o.date_time >= CONCAT(%s, ' ', '00:00:00')
				AND o.date_time <= CONCAT(%s, ' ', '23:59:59'))
			)
			AND 
				o.cancelled = 0
		ORDER BY o.washing_post_number DESC;
		"""

	ymd = '%s-%s-%s' % (year, month, day)
	orders_items = Order.objects.raw(post_number_query, [washing_id, ymd, ymd, ymd, ymd])
	
	washing = Washing.objects.get(pk=washing_id)
	timegrid = TimeGrid(washing.start_work_day, washing.end_work_day, washing.timeframe_minutes)

	result_orders = []
	for order in orders_items:
		result_orders.append({
			'id':order.id,
			'autono':order.autono, 'postnumber':order.washing_post_number, 
			'datetime':order.date_time.strftime('%H:%M'), 'name':order.name, 'note':order.note, 
			'details':order.details, 'is_created_by_staff':order.is_created_by_staff, 'autobrand':order.autobrand,
			'phone':order.phone})

	return orders.JSONResponse({'timeframes_stamp':timegrid.stringified(), 
		'timeframes':result_orders}) 
