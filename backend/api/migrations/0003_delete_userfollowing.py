# Generated by Django 4.1.1 on 2022-09-15 21:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_userfollowing'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UserFollowing',
        ),
    ]
