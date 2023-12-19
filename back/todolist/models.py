from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User

class Todolist(models.Model):
  todo = models.TextField()
  date = models.DateField(default=now)
  isFinished = models.BooleanField(default=False)
  owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
