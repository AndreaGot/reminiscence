# Create your views here.
from django.http import HttpResponse
from django.template import Context, loader
from django.shortcuts import render
from reminiscence.main.models import Comune, Provincia, Regione, Anziano

def index(request):
	template = loader.get_template('main/index.html')
	context = Context({})
	return HttpResponse(template.render(context))
	
def pagina2(request):
	template = loader.get_template('main/pagina2.html')
	context = Context({})
	return HttpResponse(template.render(context))

def luoghi(request):
	comune = Comune.objects.all()
	provincia = Provincia.objects.get(pk=1)
	regione = Regione.objects.get(pk=21)
	comprov = Regione.objects.all()
	context = {'comune':comune, 'prov':provincia, 'reg':regione, 'comprov':comprov}
	return render(request, 'main/luoghi.html', context)
	
def login(request):
	#anziano = Anziano.objects.create
	#context = {'anziano', anziano}
	return render(request, 'main/login.html')

def verifica(request):
	nome = request.POST.get('firstname')
	password = request.POST.get('password')
	context = {'name':nome, 'pass':password}
	return render(request, 'main/verifica.html', context)
	
	