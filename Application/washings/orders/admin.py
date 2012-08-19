#coding:utf-8
from django.contrib import admin
from orders.models import Washing, Order

class WashingAdmin(admin.ModelAdmin):
	# exclude = ('current_free_washing_post',)
    pass

admin.site.register(Washing, WashingAdmin)
admin.site.register(Order)
