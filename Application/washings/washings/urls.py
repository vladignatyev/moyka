from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),

    url(r'^operator/(?P<washing_id>\d+)/$', 'orders.views.operator'),
    url(r'^operator/data/byday/(?P<day>\d+)/month/(?P<month>\d+)/year/(?P<year>\d+)/washing/(?P<washing_id>\d+)', 'orders.views.operator_viewmodel'),

    url(r'^operator/data/delete/(?P<order_id>\d+)$', 'orders.views.operator_deleteorder'),
    url(r'^operator/data/update/(?P<order_id>\d+)$', 'orders.views.operator_updateorder'),
    url(r'^operator/data/create/washing/(?P<washing_id>\d+)$', 'orders.views.operator_createorder'),

    url(r'^partners/', 'django.contrib.auth.views.login', name='login'),

    url(r'^washings/', include('orders.urls')),
    url(r'^$', 'orders.views.index'),
)
