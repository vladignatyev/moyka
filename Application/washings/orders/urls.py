from django.conf.urls import patterns, url, include

urlpatterns = patterns('', 
	url(r'^bytoday/(?P<today_or_tommorow>\d{1})/andhours/(?P<hours>\d{2})/minutes/(?P<minutes>\d{2})', 
		'orders.views.get_washings_by_availability'),
    url(r'^timegrid/(?P<washing_id>\d+)/bytoday/(?P<today_or_tommorow>\d{1})', 
        'orders.views.get_available_times_for_washing'),
	url(r'^orders/add/', 'orders.views.add_order'),
	url(r'^jsonp/all/', 'orders.views.get_all_washings_jsonp'),
    url(r'^orders/report/forwashing/(?P<washing_id>\d+)/byyear/(?P<year1>\d+)/month/(?P<month1>\d+)/day/(?P<day1>\d+)/year2/(?P<year2>\d+)/month2/(?P<month2>\d+)/day2/(?P<day2>\d+)/', 'orders.views.operator_report'),
)