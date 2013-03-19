from django.conf.urls import patterns, include, url

from reminiscence.main import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^pagina2/', views.pagina2, name='pagina2'),
)