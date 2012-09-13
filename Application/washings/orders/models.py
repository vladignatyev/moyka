#!coding:utf-8

from django.db import models

class Washing(models.Model):
	title = models.CharField(max_length=64, blank=False, verbose_name=u'Название')
	geo_lon = models.FloatField(blank=False, verbose_name=u'Восточная долгота')
	geo_lat = models.FloatField(blank=False, verbose_name=u'Северная широта')
	
	description = models.TextField(blank=True, verbose_name=u'Описание')
	address = models.TextField(blank=True, verbose_name=u'Адрес')
	start_work_day = models.TimeField()
	end_work_day = models.TimeField()
	is_round_the_clock = models.BooleanField(blank=False, verbose_name=u'Мойка работает круглосуточно?')
	timeframe_minutes = models.IntegerField()
	washing_posts_count = models.IntegerField()

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


