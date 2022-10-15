from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Profile
from posts.models import Post

class ProfileInline(admin.StackedInline):
  model = Profile
  can_delete = False
  verbose_name_plural = "profile"

class PostInline(admin.StackedInline):
  model = Post
  verbose_name_plural = "글"

class UserAdmin(BaseUserAdmin):
  inlines = (ProfileInline, PostInline)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)