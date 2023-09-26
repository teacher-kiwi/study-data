# Generated by Django 4.2.5 on 2023-09-26 05:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pybo', '0003_answer_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='modify_date',
            field=models.DateTimeField(auto_now=True, help_text='답변을 수정한 일시'),
        ),
        migrations.AddField(
            model_name='question',
            name='modify_date',
            field=models.DateTimeField(auto_now=True, help_text='질문을 수정한 일시'),
        ),
    ]
