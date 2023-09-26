from django.http import HttpRequest, HttpResponseNotAllowed
from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from django.contrib import messages

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


@login_required(login_url="common:login")
def answer_create(request: HttpRequest, question_id):
    question = get_object_or_404(Question, pk=question_id)
    if request.method == "POST":
        form = AnswerForm(request.POST)
        if form.is_valid():
            answer: Answer = form.save(commit=False)
            answer.question = question
            answer.author = request.user
            answer.save()
            return redirect("pybo:detail", question_id=question.id)
    else:
        form = AnswerForm()
    context = {"question": question, "form": form}
    return render(request, "pybo/question_detail.html", context)


@login_required(login_url="common:login")
def question_create(request: HttpRequest):
    if request.method == "POST":
        form = QuestionForm(request.POST)
        if form.is_valid():
            question: Question = form.save(commit=False)
            question.author = request.user
            question.save()
            return redirect("pybo:index")
    else:
        form = QuestionForm()
    return render(request, "pybo/question_form.html", {"form": form})


@login_required(login_url="common:login")
def question_modify(request: HttpRequest, question_id):
    question = get_object_or_404(Question, pk=question_id)
    if request.user != question.author:
        messages.error(request, "수정 권한이 없습니다.")
        return redirect("pybo:detail", question_id=question.id)
    if request.method == "POST":
        form = QuestionForm(request.POST, instance=question)
        if form.is_valid():
            form.save()
            return redirect("pybo:detail", question_id=question.id)
    else:
        form = QuestionForm(instance=question)
    context = {"form": form}
    return render(request, "pybo/question_form.html", context)


@login_required(login_url="common:login")
def question_delete(request: HttpRequest, question_id):
    question = get_object_or_404(Question, pk=question_id)
    if request.user != question.author:
        messages.error(request, "삭제 권한이 없습니다.")
        return redirect("pybo:detail", question_id=question.id)
    question.delete()
    return redirect("index")


@login_required(login_url="common:login")
def answer_modify(request: HttpRequest, answer_id):
    answer = get_object_or_404(Answer, pk=answer_id)
    if request.user != answer.author:
        messages.error(request, "수정 권한이 없습니다.")
        return redirect("pybo:detail", question_id=answer.question.id)
    if request.method == "POST":
        form = AnswerForm(request.POST, instance=answer)
        if form.is_valid():
            form.save()
            return redirect("pybo:detail", question_id=answer.question.id)
    else:
        form = AnswerForm(instance=answer)
    context = {"answer": answer, "form": form}
    return render(request, "pybo/answer_form.html", context)


@login_required(login_url="common:login")
def answer_delete(request: HttpRequest, answer_id):
    answer = get_object_or_404(Answer, pk=answer_id)
    if request.user != answer.author:
        messages.error(request, "삭제 권한이 없습니다.")
    else:
        answer.delete()
    return redirect("pybo:detail", question_id=answer.question.id)
