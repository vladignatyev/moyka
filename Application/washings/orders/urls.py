from django.conf.urls import patterns, url, include

urlpatterns = patterns('', 
	url(r'^bytoday/(?P<today_or_tommorow>\d{1})/andhours/(?P<hours>\d{2})/minutes/(?P<minutes>\d{2})', 
		'orders.views.get_washings_by_availability'),

    url(r'^timegrid/(?P<washing_id>\d+)/bytoday/(?P<today_or_tommorow>\d{1})', 
        'orders.views.get_available_times_for_washing'),

	url(r'^orders/add/', 'orders.views.add_order'),
	url(r'^orders/foruser/', 'orders.views.get_user_order_data'),

	url(r'^jsonp/all/', 'orders.views.get_all_washings_jsonp')

	# url(r'^/$', 'orders.views.index', name="index"),
)