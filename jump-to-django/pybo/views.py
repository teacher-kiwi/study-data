from django.http import HttpRequest
from django.shortcuts import render, get_object_or_404, redirect

from .models import Question, Answer


def index(request):
    question_list = Question.objects.order_by("-id")
    context = {"question_list": question_list}
    return render(request, "pybo/question_list.html", context)


def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    context = {"question": question}
    return render(request, "pybo/question_detail.html", context)


def answer_create(request: HttpRequest, question_id):
    question = get_object_or_404(Question, pk=question_id)
    answer = Answer(question=question, content=request.POST.get("content"))
    answer.save()
    return redirect("pybo:detail", question_id=question_id)
