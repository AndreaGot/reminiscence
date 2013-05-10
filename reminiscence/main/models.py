from django.db import models
from django.forms import ModelForm

# Create your models here.

		
class Regione(models.Model):
	regione = models.CharField(max_length=80)
	def __unicode__(self):
		return str(self.regione)

class Provincia(models.Model):
	provincia = models.CharField(max_length=80)
	regione = models.ForeignKey(Regione)
	def __unicode__(self):
		return str(self.provincia)

class Comune(models.Model):
	provincia = models.ForeignKey(Provincia)
	comune = models.CharField(max_length=80)
	def __unicode__(self):
		return str(self.comune)
		

class Anziano(models.Model):
    nome= models.CharField(max_length=50)
    cognome= models.CharField(max_length=50 )
    anno_nascita= models.CharField(max_length = 4)
    mese_nascita= models.CharField(max_length = 2)
    giorno_nascita= models.CharField(max_length = 2)
    luogo_nascita= models.ForeignKey(Comune)
    email=models.CharField(max_length=200)
    password= models.CharField(max_length=50)
    def __unicode__(self):
		return str(self.cognome)
	
	
class Memoria(models.Model):
    IDAnziano=models.ForeignKey(Anziano)
    titolo= models.CharField(max_length=200)
    descrizione= models.CharField(max_length=1000)
    def __unicode__(self):
		return str(self.titolo)

class Decade(models.Model):
    decade= models.CharField(max_length=10)
    def __unicode__(self):
		return str(self.decade)
		
class Suggerimento(models.Model):
    titolo= models.CharField(max_length=200)
    descrizione= models.CharField(max_length=1000)
    tipoContenuto= models.CharField(max_length=200)
    contenuto = models.CharField(max_length=300)
    def __unicode__(self):
		return str(self.titolo)
		
class si_svolge_memoria(models.Model):
    IDDecade= models.ForeignKey(Decade)
    IDMemoria=models.ForeignKey(Memoria)
    conchi = models.CharField(max_length=200)
    luogo = models.CharField(max_length=50)
    indice = models.FloatField(max_length=20)
    anno= models.CharField(max_length = 4)
    mese= models.CharField(max_length = 2)
    giorno= models.CharField(max_length = 2)
    
class si_svolge_Suggerimento (models.Model):
    IDDecade= models.ForeignKey(Decade)
    IDSuggerimento=models.ForeignKey(Suggerimento)
    luogo = models.CharField(max_length=50)
    anno= models.CharField(max_length = 4)
    mese= models.CharField(max_length = 2)
    giorno= models.CharField(max_length = 2)
    
class Media (models.Model):
	IDMemoria = models.ForeignKey(Memoria)
	titolo = models.CharField(max_length=203)
	descrizione = models.CharField(max_length=300)
	link = models.CharField(max_length=200)
	

class Hint (models.Model):
	titolo = models.CharField(max_length=260)
	descrizione = models.CharField(max_length=300)
	link = models.CharField(max_length=200)
	IDDecade= models.ForeignKey(Decade)
	anno= models.CharField(max_length = 4)
	tipo = models.CharField(max_length = 15)
	indice = models.FloatField(max_length = 25)
	def __unicode__(self):
		return str(self.titolo)



	
