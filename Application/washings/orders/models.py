#!coding:utf-8

from django.db import models

from django.contrib.auth.models import User
from django.db.models.signals import post_save


class Washing(models.Model):
	title = models.CharField(max_length=64, blank=False, verbose_name=u'Название')
	geo_lon = models.FloatField(blank=False, verbose_name=u'Восточная долгота')
	geo_lat = models.FloatField(blank=False, verbose_name=u'Северная широта')
	
	description = models.TextField(blank=True, verbose_name=u'Описание')
	address = models.TextField(blank=True, verbose_name=u'Адрес')
	start_work_day = models.TimeField()
	end_work_day = models.TimeField()
	is_round_the_clock = models.BooleanField(blank=False, verbose_name=u'Мойка работает круглосуточно?')
	timeframe_minutes = models.IntegerField(verbose_name=u'Интервал сетки расписания, мин.')
	washing_posts_count = models.IntegerField(verbose_name=u'Количество моечных постов')
	is_hidden = models.BooleanField(default=True)

	def __unicode__(self):
		return u"%s — %s" % (self.title, self.address)
	class Meta:
		verbose_name = u"мойку"
		verbose_name_plural = u"мойки"


class Order(models.Model):
	washing = models.ForeignKey(Washing, editable=True, verbose_name=u'Мойка', related_name='+')
	washing_post_number = models.IntegerField(blank=True)
	date_time = models.DateTimeField(blank=True, editable=True, verbose_name=u'Дата')
	name = models.CharField(blank=False, max_length=64, verbose_name=u'ФИО клиента')
	phone = models.BigIntegerField(blank=False, verbose_name=u'Телефон')
	autono = models.CharField(blank=False, max_length=16, verbose_name=u'Номер автомобиля')
	autobrand = models.CharField(blank=True, max_length=64, verbose_name=u'Марка авто')	
	email = models.EmailField(blank=True, verbose_name=u'Электронная почта клиента')
	cancelled = models.BooleanField(default=False, verbose_name=u'Заказ отменен?')
	is_done = models.BooleanField(default=False, verbose_name=u'Заказ исполнен?')
	added_date = models.DateTimeField(verbose_name=u'Точная дата и время создания заказа', editable=False, auto_now=True)
	csrfmiddlewaretoken = models.CharField(max_length=255, editable=False)

	is_created_by_staff = models.BooleanField(default=False, blank=True)
	details = models.CharField(max_length=255, editable=True, blank=True)	
	note = models.TextField(editable=True, verbose_name=u'Примечание оператора', blank=True)

	class Meta:
		verbose_name = u"заказ"
		verbose_name_plural = u"заказы"


from django.forms import ModelForm
class OrderForm(ModelForm):
	class Meta:
		model = Order

class UserProfile(models.Model):
	WASHING_ADMIN_ROLE = 'W'
	SUPER_ADMIN_ROLE = 'S'
	ROLES_CHOICES = ((WASHING_ADMIN_ROLE, u'Администратор мойки'), 
		(SUPER_ADMIN_ROLE, u'Суперадминистратор'))
	user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
	role = models.CharField(max_length=1, choices=ROLES_CHOICES, editable=True, default=WASHING_ADMIN_ROLE)
	washing = models.ForeignKey(Washing, default=1, blank=True, editable=True, verbose_name=u'Мойка, закрепленная за пользователем', related_name='+')

	def __unicode__(self):
		try:
			if self.role == UserProfile.SUPER_ADMIN_ROLE:
				return u"- [%s] Суперадминистратор" % self.user.username
			elif self.role == UserProfile.WASHING_ADMIN_ROLE:
				return u"-- [%s] Администратор мойки: %s" % (self.user.username, self.washing.title)
			else:
				return u"---- Неизвестный администратор [%s]" % self.user.username
		except:
			return u"---- Неизвестный администратор (!) "
	class Meta:
		verbose_name = u"профиль пользователя"
		verbose_name_plural = u"профили пользователей"

class SiteSettings(models.Model):
	update_date = models.DateTimeField(verbose_name=u'Дата создания группы параметров', auto_now=True, editable=False)

	contact_email = models.EmailField(verbose_name=u'Контактный email внизу страницы', editable=True, default='moykainfo@gmail.com')
	twitter = models.CharField(verbose_name=u'Ссылка на Твиттер', editable=True, max_length=255, default='https://twitter.com/krasnovma83')
	vkontakte = models.CharField(verbose_name=u'Ссылка Вконтакте', editable=True, max_length=255, default='http://vk.com/club43277490')
	facebook = models.CharField(verbose_name=u'Ссылка на Фэйсбук', editable=True, max_length=255, default='http://www.facebook.com/groups/110673112422240/')

	show_twitter = models.BooleanField(verbose_name=u'Показывать Твиттер?', default=True)
	show_vkontakte = models.BooleanField(verbose_name=u'Показывать Вконтакте?', default=True)
	show_facebook = models.BooleanField(verbose_name=u'Показывать Фэйсбук?', default=True)
	show_email = models.BooleanField(verbose_name=u'Показывать контактный email?', default=True)

	def __unicode__(self):
		return u"Параметры от %s" % self.update_date

	class Meta:
		verbose_name = u"параметры сайта"
		verbose_name_plural = u"параметры сайта"
