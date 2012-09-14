#coding:utf-8
from django.contrib import admin
from orders.models import Washing, Order, UserProfile

admin.site.register(Washing)
admin.site.register(Order)
admin.site.register(UserProfile)
