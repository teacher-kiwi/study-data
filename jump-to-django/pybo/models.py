from django.db import models
from django.contrib.auth.models import User


class Question(models.Model):
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    subject = models.CharField(help_text="질문의 제목", max_length=200)
    content = models.TextField(help_text="질문의 내용")
    create_date = models.DateTimeField(help_text="질문을 작성한 일시", auto_now_add=True)

    class Meta:
        db_table = "question"

    def __str__(self):
        return self.subject


class Answer(models.Model):
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    question = models.ForeignKey(
        help_text="질문", to="Question", on_delete=models.CASCADE
    )
    content = models.TextField(help_text="답변의 내용")
    create_date = models.DateTimeField(help_text="답변을 작성한 일시", auto_now_add=True)

    class Meta:
        db_table = "answer"
