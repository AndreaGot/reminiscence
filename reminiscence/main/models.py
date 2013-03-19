from django.db import models

# Create your models here.
class Luogo(models.Model):
    localita= models.CharField(max_length=80)
    comune= models.CharField(max_length=80)
    provincia= models.CharField(max_length=80)
    stato= models.CharField(max_length=80)

class Anziano(models.Model):
    nome= models.CharField(max_length=50)
    cognome= models.CharField(max_length=50 )
    anno_nascita= models.DateTimeField('anno')
    mese_nascita= models.DateTimeField('mese')
    giorno_nascita= models.DateTimeField('giorno')
    luogo_nascita= models.ForeignKey(Luogo)
    email=models.CharField(max_length=200)
    password= models.CharField(max_length=50)
    def __unicode__(self):
		return self.nome, self.cognome
	
	
class Memoria(models.Model):
    IDAnziano=models.ForeignKey(Anziano)
    titolo= models.CharField(max_length=200)
    descrizione= models.CharField(max_length=1000)
    foto=models.ImageField(upload_to="Immagine.jpg")
    link= models.CharField(max_length=200)
    def __unicode__(self):
		return self.titolo

class Decade(models.Model):
    decade= models.CharField(max_length=10)
    def __unicode__(self):
		return self.decade
		
class Suggerimento(models.Model):
    titolo= models.CharField(max_length=200)
    descrizione= models.CharField(max_length=1000)
    tipoContenuto= models.CharField(max_length=200)
    contenuto = models.CharField(max_length=300)
    def __unicode__(self):
		return self.titolo
		
class si_svolge_memoria(models.Model):
    IDDecade= models.ForeignKey(Decade)
    IDluogo= models.ForeignKey(Luogo)
    IDMemoria=models.ForeignKey(Memoria)
    anno= models.DateTimeField('anno')
    mese= models.DateTimeField('mese')
    giorno= models.DateTimeField('giorno')
    


class si_svolge_Suggerimento (models.Model):
    IDDecade= models.ForeignKey(Decade)
    IDluogo= models.ForeignKey(Luogo)
    IDSuggerimento=models.ForeignKey(Suggerimento)
    anno= models.DateTimeField('anno')
    mese= models.DateTimeField('mese')
    giorno= models.DateTimeField('giorno')
