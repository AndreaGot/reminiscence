# Create your views here.
from django.http import HttpResponse
from django.template import Context, loader
from django.shortcuts import render
from reminiscence.main.models import Comune, Provincia, Regione, Anziano

# metodo di chiamata non efficiente qui sotto

def index(request):
	template = loader.get_template('main/index.html')
	context = Context({})
	return HttpResponse(template.render(context))
	
def pagina2(request):
	template = loader.get_template('main/pagina2.html')
	context = Context({})
	return HttpResponse(template.render(context))

def luoghi(request):
	comune = 1
	regione = 2
	comprov = 3
	context = {'comune':comune,'reg':regione, 'comprov':comprov}
	return render(request, 'main/luoghi.html', context)

# metodo di chiamata piu efficiente (request sempre necessario)
	
	
#pagina di login	
def login(request):
	return render(request, 'main/login/login.html')

	
	
#aggiunta ricordo, pagina 1...	
def add(request):
	return render(request, 'main/aggiungiRicordo.html')

#verifica i dati aggiunti in aggiungiRicordo
def verificaAdd(request):
	dove = request.POST.get('luogo')
	quando_decade = request.POST.get('quando-decade')
	quando_mese = request.POST.get('quando-mese')
	anno = request.POST.get('anno')
	conchi = request.POST.get('conchi')
	esiste_citta= get_or_none(Comune,comune=dove)

	

	if esiste_citta is None:
		context = {'dove':dove}
		return render(request,'main/datierrati.html', context)
	elif esiste_citta is not None and anno != "" and  conchi != "":  
		return render(request, 'main/aggiungiRicordo2.html')
	else:
		return render(request, 'main/aggiungiRicordoErr.html')


#verifica i dati aggiunti nella schermata di login ed effettua, se corretti, il login stesso
def verifica(request):
	name = request.POST.get('firstname')
	passw = request.POST.get('password')
	
	b = get_or_none(Anziano,nome=name)
	
	if b is None:
		return render(request, 'main/login/login.html')
	
	if passw == b.password:
		risp = 'SI'
	else:
		return render(request, 'main/login/login.html')
	    
	context = {'name':name, 'pass': str(b.password), 'risp':risp}
	return render(request, 'main/login/verifica.html', context)




def verificaAdd2(request):
	return render(request,'main/confermaInsert.html')


#funzione che controlla se un record esiste. CONSIGLIO DI USARLA OGNI VOLTA CHE SERVE PRELEVARE UN RECORD
def get_or_none(model, **kwargs):
	try:
		return model.objects.get(**kwargs)
	except model.DoesNotExist:
		return None
        
#se serve prelevare piu di un record, usare model.objects.filter(cond)

