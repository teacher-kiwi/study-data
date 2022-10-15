from django.urls import path
from .views import RegisterView, LoginView, ProfileView, check_user

urlpatterns = [
  path("register/", RegisterView.as_view()),
  path("login/", LoginView.as_view()),
  path("profile/<int:pk>/", ProfileView.as_view()),
  path("check/", check_user, name="check"),
]