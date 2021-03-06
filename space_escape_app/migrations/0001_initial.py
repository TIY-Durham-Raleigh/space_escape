# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-14 03:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=36)),
                ('color_url', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice_text', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_text', models.CharField(max_length=555)),
                ('question_image_url', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='choice',
            name='next_question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='next_question', to='space_escape_app.Question'),
        ),
        migrations.AddField(
            model_name='choice',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choice', to='space_escape_app.Question'),
        ),
    ]
