from socket import fromshare
from django import forms
from .models import Text

class TextForm(forms.ModelForm):
  class Meta:
    model = Text
    fields = ("title", "author", "text")