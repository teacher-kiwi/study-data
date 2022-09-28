from email.policy import default
from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.
class Todo(models.Model):
  title = models.CharField(max_length = 100, blank=True)
  description = models.TextField(blank = True)
  created = models.DateTimeField(auto_now_add = True)
  complete = models.BooleanField(default = False)
  important = models.BooleanField(default = False)

  def __str__(self):
    return self.title