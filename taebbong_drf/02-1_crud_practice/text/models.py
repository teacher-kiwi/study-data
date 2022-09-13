from django.db import models

# Create your models here.

class Text(models.Model):
  title = models.CharField(max_length=30)
  author = models.CharField(max_length=10)
  password = models.CharField(max_length=20)
  text = models.TextField()