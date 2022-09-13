from django.shortcuts import render, get_object_or_404, redirect
from .models import Text
from .forms import TextForm

# Create your views here.
def text_list(request):
  texts = Text.objects.all()
  return render(request, "text/text_list.html", {"texts": texts})

def text_post(request):
  if request.method == "POST":
    form = TextForm(request.POST)
    if form.is_valid():
      text = form.save(commit=False)
      text.save()
      return redirect("text_list")
  else:
    form = TextForm()
  return render(request, "text/text_detail.html", {'form': form, "buttonName": "글쓰기"})

def text_edit(request, id):
  text = get_object_or_404(Text, id=id)
  if request.method == "POST":
    form = TextForm(request.POST, instance=text)
    if form.is_valid():
      text = form.save(commit=False)
      text.save()
      return redirect("text_list")
  else:
    form = TextForm(instance=text)
  return render(request, "text/text_detail.html", {"form": form, "buttonName": "수정하기"})

def text_delete(request, id):
  text = get_object_or_404(Text, id=id)
  if request.method == "POST":
    text.delete()
  return redirect("text_list")