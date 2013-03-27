from django.conf.urls import patterns, include, url

from reminiscence.main import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^pagina2/', views.pagina2, name='pagina2'),
    url(r'^luoghi/', views.luoghi, name='luoghi'),
#
# URL LOGIN
#
    url(r'^login/', views.login, name='login'),
    url(r'^verifica/', views.verifica, name='verifica'),
    
#
# URL DI INSERIMENTO RICORDO
#
    url(r'^add/', views.add, name='add'),
    url(r'^add2/', views.verificaAdd, name='add2'),
    url(r'^add3/', views.verificaAdd2, name='add3'),
    
#
# URL DI ISCRIZIONE AL SERVIZIO
#
    url(r'^iscrizione/', views.iscrizione, name='iscrizione'),
    
#
# URL DI VISUALIZZAZIONE RICORDO
#
    url(r'^home/', views.visualizzaRicordi, name='homepage'),
    
)
