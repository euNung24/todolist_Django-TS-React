from django.db import models
from django.utils.timezone import now

class Todolist(models.Model):
  todo = models.TextField()
  date = models.DateField(default=now)
  isFinished = models.BooleanField(default=False)