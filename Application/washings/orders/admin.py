#coding:utf-8
from django.contrib import admin
from orders.models import Washing, Order, UserProfile, SiteSettings

admin.site.register(Washing)
admin.site.register(Order)
admin.site.register(UserProfile)
admin.site.register(SiteSettings)

from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from django.contrib.auth.models import Group

admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.unregister(Site)