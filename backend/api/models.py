from django.db import models
from django.contrib.auth.models import User

class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    body = models.CharField(max_length=50)

    def __str__(self):
        return self.body

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    bio = models.CharField(max_length=50)

    def __str__(self):
        return self.name





 