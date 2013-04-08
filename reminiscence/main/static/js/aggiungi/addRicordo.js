$(document).ready(function(){
    var availablePlace = [
      "Trento",
      "Rovereto",
      "Trentino",
      "Bolzano",
      "Milano",
      "Sicilia",
      "Germania",
      "Arco",
      "Riva del gARDA",
      "Parigi",
      "Verona",
      "Roma",
      "Firenze",
      "Pisa",
      "Trieste",
      "Genova",
      "Valle d'Aosta",
      "Palermo",
      "Valle dei Laghi",
      "Terlago",
      "Mattarello",
      "Lavis"
    ];
    $( "#tags" ).autocomplete({
      source: availablePlace
    });
	
	var availableWith=[
	  "Giuseppe Leve",
      "Alberto Perdo",
      "Filippo Ferrari",
      "Gianluca Torre",
      "Berto Bampi",
      "Leonardo Dove",
      "Maria Leve",
      "Line leve"
	  ];
	  $( "#tagwith" ).autocomplete({
      source: availableWith
	   });
	   
});
	
