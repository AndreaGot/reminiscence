# Create your views here.
from django.http import HttpResponse
from django.template import Context, loader
from django.shortcuts import render
from reminiscence.main.models import Comune, Provincia, Regione

def index(request):
	template = loader.get_template('main/index.html')
	context = Context({})
	return HttpResponse(template.render(context))
	
def pagina2(request):
	template = loader.get_template('main/pagina2.html')
	context = Context({})
	return HttpResponse(template.render(context))

def luoghi(request):
	comune = Comune.objects.get(pk=1001)
	provincia = Provincia.objects.get(pk=1)
	regione = Regione.objects.get(pk=21)
	context = {'comune':comune, 'provincia':provincia, 'regione':regione}
	return render(request, 'main/luoghi.html', context)
	
	