from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),

    url(r'^operator/(?P<washing_id>\d+)/$', 'orders.views.operator'),
    url(r'^operator/data/byday/(?P<day>\d+)/month/(?P<month>\d+)/year/(?P<year>\d+)/washing/(?P<washing_id>\d+)', 'orders.views.operator_viewmodel'),
    url(r'^partners/', 'django.contrib.auth.views.login', name='login'),

    url(r'^washings/', include('orders.urls')),
    url(r'^$', 'orders.views.index'),
)
