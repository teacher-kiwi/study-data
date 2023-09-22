from django.http import HttpRequest, HttpResponseNotAllowed
from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator

from .models import Question, Answer
from .forms import QuestionForm, AnswerForm


def index(request: HttpRequest):
    page = request.GET.get("page", 1)
    question_list = Question.objects.order_by("-id")
    paginator = Paginator(question_list, 10)
    page_obj = paginator.get_page(page)
    context = {"question_list": page_obj}
    return render(request, "pybo/question_list.html", context)


def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    context = {"question": question}
    return render(request, "pybo/question_detail.html", context)


def answer_create(request: HttpRequest, question_id):
    if request.method != "POST":
        return HttpResponseNotAllowed("Only POST is possible.")
    question = get_object_or_404(Question, pk=question_id)
    form = AnswerForm(request.POST)
    if form.is_valid():
        answer: Answer = form.save(commit=False)
        answer.question = question
        answer.save()
        return redirect("pybo:detail", question_id=question.id)
    context = {"question": question, "form": form}
    return render(request, "pybo/question_detail.html", context)


def question_create(request: HttpRequest):
    if request.method == "POST":
        form = QuestionForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("pybo:index")
    else:
        form = QuestionForm()
    return render(request, "pybo/question_form.html", {"form": form})
