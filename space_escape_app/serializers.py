from rest_framework import serializers
from .models import Question, Choice, Character



class ChoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Choice
        fields = ('url', 'choice_text', 'id', 'question', 'next_question')


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(read_only=True, many=True)

    class Meta:
        model = Question
        fields = ('url', 'question_text', 'id', 'choices')


class CharacterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Character
        fields = ('url', 'name', 'picture', 'id')
