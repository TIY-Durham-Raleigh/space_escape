from rest_framework import serializers
from .models import Question, Choice, Character



class ChoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Choice
        fields = ('__all__')


class QuestionSerializer(serializers.ModelSerializer):
    choice = ChoiceSerializer(read_only=True, many=True)

    class Meta:
        model = Question
        fields = ('url', 'question_text', 'id', 'choice')


class CharacterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Character
        fields = ('url', 'name', 'picture', 'id')
