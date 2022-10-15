from django.contrib import admin

from .models import Post, Comment

class CommentInline(admin.StackedInline):
  model = Comment
  verbose_name_plural = "댓글"

class PostAdmin(admin.ModelAdmin):
  inlines = [CommentInline]

admin.site.register(Post, PostAdmin)