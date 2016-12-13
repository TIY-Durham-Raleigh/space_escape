from django.conf.urls import url, include
from django.contrib import admin
from space_escape_app import views
from rest_framework import routers
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.register(r'question', views.QuestionViewSet)
router.register(r'choice', views.ChoiceViewSet)


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^$', TemplateView.as_view(template_name='main.html'), name='main'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
