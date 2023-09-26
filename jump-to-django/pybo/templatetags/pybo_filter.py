from datetime import datetime

from django import template

register = template.Library()


@register.filter
def sub(value, arg):
    return value - arg


@register.filter
def timestamp(time: datetime):
    try:
        return int(time.timestamp())
    except:
        return None
