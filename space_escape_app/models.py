from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=555)
    question_image_url = models.CharField(max_length=200)

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question, related_name='choices')
    choice_text = models.CharField(max_length=200)
    next_question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return self.choice_text


class Character(models.Model):
    name = models.CharField(max_length=36)
    color_url = models.CharField(max_length=100)
