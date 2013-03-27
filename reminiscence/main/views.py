# Create your views here.
from django.http import HttpResponse
from django.template import Context, loader
from django.shortcuts import render
from reminiscence.main.models import Comune, Provincia, Regione, Anziano,Memoria,si_svolge_memoria,Decade

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
	


#
# PAGINA DI LOGIN
#

#Visualizza la pagina di login
	
def login(request):
	return render(request, 'main/login/login.html')

#Verifica i dati inseriti nella pagina di login

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

#
# PAGINA DI ISCRIZIONE
#

def iscrizione(request):
	return render(request, 'main/iscrizione.html')
	
#
# HOMEPAGE (PAGINA VISUALIZZAZIONE MEMORIA)
#	

def visualizzaRicordi(request):
	return render(request, 'main/home.html')
	
#
# INSERIMENTO RICORDO 
#	
	
#aggiunta ricordo, pagina 1...	
def add(request):
	return render(request, 'main/aggiungi/aggiungiRicordo.html')

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
		return render(request,'main/aggiungi/datierrati.html', context)
	elif esiste_citta is not None and anno != "":
		a=Anziano.objects.get(nome='Andrea')
		
		m=Memoria(IDAnziano=a)
		m.save()

		d=Decade.objects.get(decade=quando_decade)
		
		s=si_svolge_memoria(IDDecade=d,IDMemoria=m,luogo=dove,anno=anno,mese=quando_mese)
#Bisogna inserire il conchi nella funzione qua sopra!
		s.save()
  
		context={'memoria':m}
		return render(request, 'main/aggiungi/aggiungiRicordo2.html')
	else:
		return render(request, 'main/aggiungi/aggiungiRicordoErr.html')



# Se la seconda parte e corretta, chiama una pagina di confer1111ma

def verificaAdd2(request):

	#SE I DATI NON SONO CORRETTI CHIAMA IL TEMPLATE aggiungiRicordo2Err (gia creato in main/aggiungi/aggiungiRicordo2Err)

	titolo= request.POST.get('titolo')
	descrizione = request.POST.get('descrizione')

	if titolo == "" or descrizione == "":
		return render(request, 'main/aggiungi/aggiungiRicordo2Err.html')
	return render(request,'main/aggiungi/confermaInsert.html')




#
#QUI SOTTO INSERIRE SOLO LE FUNZIONI GENERICHE
#




#funzione che controlla se un record esiste. CONSIGLIO DI USARLA OGNI VOLTA CHE SERVE PRELEVARE UN RECORD
def get_or_none(model, **kwargs):
	try:
		return model.objects.get(**kwargs)
	except model.DoesNotExist:
		return None
        
#se serve prelevare piu di un record, usare model.objects.filter(cond)

