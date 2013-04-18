# Create your views here.
from django.http import HttpResponse
from django.template import Context, loader
from django.shortcuts import render
from reminiscence.main.models import Comune, Provincia, Regione, Anziano,Memoria,si_svolge_memoria,Decade

# metodo di chiamata non efficiente qui sotto

def index(request):
	return render(request, 'main/index.html')
	
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
#
#Visualizza la pagina di login
#	


def login(request):
	return render(request, 'main/login/login.html')


#
#Verifica i dati inseriti nella pagina di login
#


def verifica(request):
	name = request.POST.get('firstname')
	passw = request.POST.get('password')
	tasto_premuto = request.POST.get('submit')
	
	if tasto_premuto == 'Crea Account':
		return account(request)
	
	
	b = get_or_none(Anziano,nome=name)
	
	if b is None:
		
		return render(request, 'main/login/login.html')
	
	if passw == b.password:
		risp = 'SI'
	else:
		return render(request, 'main/login/login.html')
	    
	context = {'name':name, 'pass': str(b.password), 'risp':risp}
	return render(request, 'main/timeline/timeline.html', context)

#
# PAGINA DI ISCRIZIONE
#

def account(request):
	return render(request, 'main/account/creazioneAccount.html')



#
# Conferma e verifica dati
#

def conferma(request):

	user = request.POST.get('username')
	# com = request.POST.get(('Comlist').val)
	giorno = request.POST.get('select_choice_day')
	mese = request.POST.get('select_choice_month')
	anno = request.POST.get('select_choice_year')
	pass1 = request.POST.get('password')
	pass2 = request.POST.get('password2')
	email = request.POST.get('email')
	
	c = get_or_none(Comune,comune='Trento')

	a = Anziano()
	a.nome = user
	a.anno_nascita = anno
	a.mese_nascita = mese
	a.giorno_nascita = giorno
	a.luogo_nascita = c
	a.email = email
	a.password = pass1
	a.save()
	print "salvato"*123
	return render(request, 'main/account/confermaAccount.html')
	
	
	







	
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


#
#verifica i dati aggiunti in aggiungiRicordo
#

def verificaAdd(request):
	dove = request.POST.get('luogo')
	quando_decade = request.POST.get('quando-decade')
	quando_mese = request.POST.get('quando-mese')
	quando_giorno = request.POST.get('quando-giorno')
	anno = request.POST.get('anno')
	dove = request.POST.get('luogo')
	con = request.POST.get('conchi')
	titolo= request.POST.get('titolo')
	descrizione = request.POST.get('descrizione')
	
	print dove, quando_decade, quando_mese, quando_giorno, anno, dove, titolo, descrizione
		
		#preleva ID Anziano (da modificare, deve prendere l'id dell'anziano loggato)	
	a=Anziano.objects.get(nome='Andrea')
		
		#crea un nuovo record in Memoria inizializzandolo solo con IDAnziano, il resto verra aggiunto dopo (necessario per creare si_svolge_memoria)
	m=Memoria(IDAnziano=a)
	m.titolo = titolo
	m.descrizione = descrizione
	m.save()
		
		#associa a d il record Decade corrispondente al valore della form select
	d=Decade.objects.get(decade=quando_decade)
		
		#crea si_svolge_memoria con tutti i campi inseriti
	s=si_svolge_memoria(IDDecade=d,IDMemoria=m,luogo=dove,anno=anno,mese=quando_mese, giorno = quando_giorno)
	s.save()
	
	return render(request,'main/aggiungi/confermaInsert.html')

#
# GESTIONE TIMELINE
#
 
def timeline (request):
	return render (request, 'main/timeline/timeline.html')


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

