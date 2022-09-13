from django.urls import path
from . import views

urlpatterns = [
    path('', views.text_list, name="text_list"),
    path("new/", views.text_post, name="text_post"),
    path("<int:id>/", views.text_edit, name="text_edit"),
    path("del/<int:id>/", views.text_delete, name="text_delete"),
]
