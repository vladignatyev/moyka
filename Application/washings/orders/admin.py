#coding:utf-8
from django.contrib import admin
from orders.models import Washing, Order, UserProfile, SiteSettings, City

admin.site.register(City)

class WashingAdmin(admin.ModelAdmin):
    list_max_show_all = 100
    list_per_page = 40
    list_filter = ['is_enabled', 'city__name']
    search_fields = ['title']

admin.site.register(Washing, WashingAdmin)
# admin.site.register(Order)
admin.site.register(UserProfile)
admin.site.register(SiteSettings)


from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from django.contrib.auth.models import Group

# admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.unregister(Site)