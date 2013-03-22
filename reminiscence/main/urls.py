from django.conf.urls import patterns, include, url

from reminiscence.main import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^pagina2/', views.pagina2, name='pagina2'),
    url(r'^luoghi/', views.luoghi, name='luoghi'),
    url(r'^login/', views.login, name='login'),
    url(r'^login/', views.nuovologin, name='login'),

    url(r'^verifica/', views.verifica, name='verifica')
)