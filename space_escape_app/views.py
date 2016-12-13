from django.http import HttpResponse
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework import viewsets
from .models import Question, Choice, Character
from .serializers import QuestionSerializer, ChoiceSerializer, CharacterSerializer

#
# def main(request):
#     return render("Hello, world. You're at the polls index.")


class QuestionViewSet(viewsets.ModelViewSet):

    queryset = Question.objects.all().order_by('id')
    serializer_class = QuestionSerializer


class ChoiceViewSet(viewsets.ModelViewSet):
    serializer_class = ChoiceSerializer
    queryset = Choice.objects.all()

    def get_queryset(self):
        queryset = Choice.objects.all()
        question = self.request.query_params.get('question', None)
        if question is not None:
            queryset = queryset.filter(question=question)
        return queryset

    queryset = Choice.objects.all().order_by('id')
    serializer_class = ChoiceSerializer
