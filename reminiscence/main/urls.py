from django.conf.urls import patterns, include, url

from reminiscence.main import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^pagina2/', views.pagina2, name='pagina2'),
    url(r'^luoghi/', views.luoghi, name='luoghi'),
    url(r'^login/', views.login, name='login'),
    url(r'^verifica/', views.verifica, name='verifica'),
    url(r'^add/', views.add, name='add'),
    url(r'^add2/', views.verificaAdd, name='add2'),
    
)
