from django.db import models
import os


def get_image_path(instance, filename):
    return os.path.join('images', str(instance.id), filename)


class Question(models.Model):
    question_text = models.CharField(max_length=555)
    question_image_url = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question, related_name='choice')
    choice_text = models.CharField(max_length=200)
    next_question = models.ForeignKey(Question, related_name='next_question')
    choice_image_url = models.ImageField(upload_to=get_image_path, blank=True, null=True)

    def __str__(self):
        return self.choice_text


class Character(models.Model):
    name = models.CharField(max_length=36)
    color_url = models.CharField(max_length=100)
