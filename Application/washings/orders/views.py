from django.shortcuts import render_to_response, redirect
from django.contrib.auth import views as auth_views
from django.template import RequestContext
from django.http import Http404

from django.contrib.auth.decorators import login_required

import orders
from orders.models import Washing, Order


from datetime import date, datetime, time, timedelta

def index(request):
	return render_to_response('index.html', {"MAP_CENTER_LAT": 53.511311, "MAP_CENTER_LON": 49.418084})

def get_all_washings_jsonp(request, jsonp_variable='washings_data'):
	return orders.JSONPResponse(Washing.get_all_washings(), jsonp_variable)

def get_available_times_for_washing(request, washing_id, today_or_tommorow):
	washing = Washing.objects.get(pk=washing_id)
	query = """
	SELECT *
	FROM
		`orders_order` as o
	WHERE
		o.washing_id = {washing_id}
		AND 
			o.washing_post_number = {washing_posts_count}
		AND 
			o.date_time >= DATE_ADD(CURRENT_DATE(), INTERVAL {tomorrow} DAY)
		AND
			o.date_time < DATE_ADD(DATE_ADD(CURRENT_DATE(), INTERVAL {tomorrow} DAY), INTERVAL 1 DAY);
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
		and
			TIME('{hours}:{minutes}:00') >= w1.start_work_day 
		and 
			TIME('{hours}:{minutes}:00') < w1.end_work_day
	;	
	""".format(hours=hours, minutes=minutes, tommorow=today_or_tommorow)
	return orders.JSONModelResponse(Washing.objects.raw(query))

def add_order(request):
	if request.method == 'POST':
		pass
	else:
		raise Http404

def get_user_order_data(request):
	pass

def timeframes_by_washing(request):
	pass