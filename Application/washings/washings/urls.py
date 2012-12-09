from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^vpusti/', include(admin.site.urls)),

    url(r'^operator/(?P<washing_id>\d+)/$', 'orders.views.operator'),
    url(r'^operator/data/byday/(?P<day>\d+)/month/(?P<month>\d+)/year/(?P<year>\d+)/washing/(?P<washing_id>\d+)', 'orders.views.operator_viewmodel'),

    url(r'^operator/data/delete/(?P<order_id>\d+)$', 'orders.views.operator_deleteorder'),
    url(r'^operator/data/update/(?P<order_id>\d+)$', 'orders.views.operator_updateorder'),
    url(r'^operator/data/create/washing/(?P<washing_id>\d+)$', 'orders.views.operator_createorder'),
    url(r'^operator/data/changepostnumber/order/(?P<order_id>\d+)/newpostnumber/(?P<new_post_number>\d+)$', 'orders.views.operator_changeorderpost'),

    url(r'^partners/', 'orders.views.login_view', name='login'),
    url(r'^logout/', 'orders.views.logout_view'),
    url(r'^washings/', include('orders.urls')),

    url(r'^nomobile/', 'orders.views.nomobile'),
    url(r'^mobile/', 'orders.views.mobile'),
    url(r'^$', 'orders.views.index'),
)
