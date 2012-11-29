# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'City'
        db.create_table('orders_city', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=64)),
            ('geo_lon', self.gf('django.db.models.fields.FloatField')()),
            ('geo_lat', self.gf('django.db.models.fields.FloatField')()),
        ))
        db.send_create_signal('orders', ['City'])

        # Adding field 'Washing.city'
        db.add_column('orders_washing', 'city',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, related_name='+', to=orm['orders.City']),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting model 'City'
        db.delete_table('orders_city')

        # Deleting field 'Washing.city'
        db.delete_column('orders_washing', 'city_id')


    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'orders.city': {
            'Meta': {'object_name': 'City'},
            'geo_lat': ('django.db.models.fields.FloatField', [], {}),
            'geo_lon': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '64'})
        },
        'orders.order': {
            'Meta': {'object_name': 'Order'},
            'added_date': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'autobrand': ('django.db.models.fields.CharField', [], {'max_length': '64', 'blank': 'True'}),
            'autono': ('django.db.models.fields.CharField', [], {'max_length': '16'}),
            'cancelled': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'csrfmiddlewaretoken': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'date_time': ('django.db.models.fields.DateTimeField', [], {'blank': 'True'}),
            'details': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_created_by_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_done': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '64'}),
            'note': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'phone': ('django.db.models.fields.BigIntegerField', [], {}),
            'washing': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'+'", 'to': "orm['orders.Washing']"}),
            'washing_post_number': ('django.db.models.fields.IntegerField', [], {'blank': 'True'})
        },
        'orders.sitesettings': {
            'Meta': {'object_name': 'SiteSettings'},
            'contact_email': ('django.db.models.fields.EmailField', [], {'default': "'moykainfo@gmail.com'", 'max_length': '75'}),
            'facebook': ('django.db.models.fields.CharField', [], {'default': "'http://www.facebook.com/groups/110673112422240/'", 'max_length': '255'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'show_email': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'show_facebook': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'show_twitter': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'show_vkontakte': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'twitter': ('django.db.models.fields.CharField', [], {'default': "'https://twitter.com/krasnovma83'", 'max_length': '255'}),
            'update_date': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'vkontakte': ('django.db.models.fields.CharField', [], {'default': "'http://vk.com/club43277490'", 'max_length': '255'})
        },
        'orders.userprofile': {
            'Meta': {'object_name': 'UserProfile'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'role': ('django.db.models.fields.CharField', [], {'default': "'W'", 'max_length': '1'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['auth.User']", 'unique': 'True', 'null': 'True'}),
            'washing': ('django.db.models.fields.related.ForeignKey', [], {'default': '1', 'related_name': "'+'", 'blank': 'True', 'to': "orm['orders.Washing']"})
        },
        'orders.washing': {
            'Meta': {'object_name': 'Washing'},
            'address': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'city': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'+'", 'to': "orm['orders.City']"}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'end_work_day': ('django.db.models.fields.TimeField', [], {}),
            'geo_lat': ('django.db.models.fields.FloatField', [], {}),
            'geo_lon': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_enabled': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_hidden': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_round_the_clock': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'start_work_day': ('django.db.models.fields.TimeField', [], {}),
            'timeframe_minutes': ('django.db.models.fields.IntegerField', [], {}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '64'}),
            'washing_posts_count': ('django.db.models.fields.IntegerField', [], {})
        }
    }

    complete_apps = ['orders']