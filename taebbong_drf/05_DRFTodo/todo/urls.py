from django.urls import path

from .views import TodosAPIView, TodoAPIView, DoneTodosAPIView, DoneTodoAPIView

urlpatterns = [
  path("todo/", TodosAPIView.as_view()),
  path("todo/<int:pk>/", TodoAPIView.as_view()),
  path("todo/done/", DoneTodosAPIView.as_view()),
  path("todo/done/<int:pk>/", DoneTodoAPIView.as_view()),
]