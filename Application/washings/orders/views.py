from django.shortcuts import render_to_response, redirect
from django.contrib.auth import views as auth_views
from django.template import RequestContext
from django.http import Http404

from django.contrib.auth.decorators import login_required



import orders
from orders.models import Washing

def index(request):
	return render_to_response('index.html', {"MAP_CENTER_LAT": 53.511311, "MAP_CENTER_LON": 49.418084})

def get_all_washings(request):
	return orders.JSONResponse(Washing.get_all_washings())

def get_all_washings_jsonp(request, jsonp_variable='washings_data'):
	return orders.JSONPResponse(Washing.get_all_washings(), jsonp_variable)

def get_washings_by_availability(request, today_or_tommorow, hours, minutes):
	pass

def add_order(request):
	if request.method == 'POST':
		pass
	else:
		raise Http404

def get_user_order_data(request):
	pass

def timeframes_by_washing(request):
	pass