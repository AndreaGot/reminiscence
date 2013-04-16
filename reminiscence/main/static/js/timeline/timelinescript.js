/*-------------------------- funzione che gestisce la memorizzazione di tutto --------------- */

function record(src,title,text,year,private,place)
				{
				this.src=src;
				this.title=title;
				this.text=text;
				this.year=year;
				this.private=private;
				this.place=place;
				}

function changePage(e) {
	if(currentData!=null){
		var tg=$("#goToModify");
		//alert(currentData.private);
		if(currentData.private){
			tg.show();
			tg.attr("style","width:45%;margin-left:50%;top:35%;");
			}else{
			tg.hide(); 
			}
		}
       			 $.mobile.changePage("#ShowRecord");
				 
	}

$(document).ready(function(e) {
	/* ------------ questa parte si occupa di posizionare i div in maniera corretta -------------*/
	 var x = $(window).height();

     var suffix = "px";
     $("div[data-role='page']").css("height", x + suffix);
     $("div[data-role='header']").css("height",(x * 0.2) + suffix);
     $("div[data-role='content']").css("height", (x * 0.53) + suffix);
     $("div[data-role='footer']").css("height", (x * 0.2) + suffix);
	    

	


	/*-------------------- questa parte gestisce lo slider della timeline ----------------------- ---*/

	Array.prototype.sortYears=function(){
		this.sort(function sortfunction(a, b){
			return a.year-b.year;
			});
					
	}
					
					
	Array.prototype.insertAndOrder=function(a){
		this.push(a);
		this.sortYears();
	}

	Array.prototype.findNearest=function(year){ //TROVA L'IMMAGINE PIU' VICINA!! COLLEGARE
		for(var i=1; i<this.length;i++){
						//alert(this[i].title);
			if(this[i].year>=year){
				var pos=Math.abs(this[i].year-year);
				var neg=Math.abs(year-this[i-1].year);
				return (neg<pos?this[i-1]:this[i]);
				}
		}
		return this[this.length-1];
	}
		/* ------------------------------ questa parte gestisce i filtri ---------------- */
	function filterArray(array,private){
		var retPriv=[];
		var retPub=[];
		for(var i=0; i<array.length;i++){
			if(array[i].private){
			retPriv.push(array[i]);
			} else{
				retPub.push(array[i]);
			}
		}
		//alert(retPriv.length+" "+retPub.length);
		
		if(private){
			return retPriv;
		}else{
			return retPub;
		}	
	}


						
/*function isPrivate(element) {
	alert(element.text +" "+(element.private? "privato":"pubblico"));
  return element.private;
}	*/		

			
	Array.prototype.findNearestFiltred=function(year,personal,public){ //TROVA L'IMMAGINE PIU' VICINA!! COLLEGARE

		//alert("personali: "+personal+" "+"pubblici: "+public+" "+!public);

		if(!personal&&!public){
			return null;
			//alert("none");
		}
		
		var newArray = this.slice();
	
	
		if(!personal){
			//alert("publics");
			newArray=filterArray(newArray,false);
			
			//alert("Lol3 "+newArray.length);
			//alert("suggerimenti "+newArray.length);
			return newArray.findNearest(year);
		}
		if(!public){
			//alert("son qui");
			//alert("private");
			//alert(newArray.length);
			newArray=filterArray(newArray,true);
			//newArray=newArray.filter(!isPrivate());
			//alert(newArray.length+" aaaaaa");
			//alert("Lol3 "+newArray.length);
			//alert("son qui");
			//alert("privati "+newArray.length);
			return newArray.findNearest(year);
		}	

		//alert("all");
		return this.findNearest(year);
				
	}
						


						
	var generalRecords=[];
		$(document).ready(function (e) {
		$('#checkbox-1').prop('checked', true);
		$('#checkbox-2').prop('checked', true);
		for(var i=0;i<urls.length;i++){
			records.push(new record(preHalf+urls[i],titles[i],"",dates[i],false,""));
			}
			records.sortYears();
	
		  });
		
		 
	var preHalf="samplesImage/";
	 
	  
	var urls=[
		"1920 umberto nobile.jpg",
		"1930 fiat 508.jpg", 
		"1940  degasperi.jpg", 
		"1950 Sputnik.jpg", 
		"1960 armstrong .jpg" ,
		"1970 rai a colori.jpg" ,
		"1980 muro berlino.jpg" ,
		"1990 bandiera europa.jpg", 
		"1990 Borsellino.jpg", 
		"1990 Falcone.jpg", 
		"1990 mandela.jpg" 
	];

	var titles=[
		"Impresa Umberto Nobile",
		"Fiat 508 Balilla", 
		"Degasperti Presidente", 
		"Sputnik", 
		"Armstrong, primo uomo sulla luna" ,
		"La rai è a colori" ,
		"Crolla il muro di Berlino" ,
		"Nasce l'europa", 
		"Strage di Via d'Amelio", 
		"Strage di Capaci", 
		"Fine dell'Apartheid" 
	];

	var dates=[
		1925, 1935, 1945, 1955,1965, 1975, 1989, 1992,1991,1990,1994
	];

	var span,distance,len,div; 
	var currentData;

	

});


var years = [];
var records=[];

		

	/*------------------------------ questa gestisce ............ ---------------------*/

$(document).ready(function (e) {
		var container = $("#timelineContainer");
		var width = container.width();
		width = $(document).width();
				
		span = 50;
		width *= 0.9;
				 
		var initialYear = 1910;
		var finalYear = new Date().getFullYear();
		$("#slider").attr("value",finalYear).attr("min",initialYear).attr("max",finalYear);
		var s;
						
		var labelsNum = Math.round((width - 100) / 60) - 1;
		var gap = finalYear - initialYear;
			
		var gap2 = gap / labelsNum;
				 
		years.push(initialYear);
				  
		for (var i = 0; i < labelsNum; i++) {
			var roundedYear = 10 * Math.round((initialYear + gap2 * i) / 10);
					  //alert(roundedYear);
			if (years.indexOf(roundedYear) < 0 && roundedYear > initialYear) {
				years.push(roundedYear);
			}
		}
				  
		years.push(finalYear);
		len = years.length;
		gap /= len;
		distance = (width) / len;
				  
		for (var i = 0; i < len; i++) {
			s = $('<p>' + years[i] + '<p>').css("position", "absolute").css("margin-left", span + (i) * distance);
			container.append(s);
		}
		changeListener();
});


	/*------------------------- ssss ---------------------------- */

function changeListener() {
	var val = $("#slider").val();
	var index;
	for (var j = 0; j < years.length; j++) {
		if (val <= years[j]) {
			index = j - 1;
			j += years.length;
			}
		}
				
	var values = {
		"width": distance,
		"height": 60 + "px",
		"position": "absolute",
		"margin-left": (span + index * distance + 30) + "px",
		"background-color": "#ff0000"
		};
				
	$("#back").css(values);		
				
		var v = $("#checkbox-1").prop("checked");
		var v1 = $("#checkbox-2").prop("checked");
					
				//alert("quiiiiiiiiiiiiiiiiii1"+" "+ $("#checkbox-2").prop("checked"));
				//alert("llllllllllllllaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		var a1 = records.findNearestFiltred(val, v, v1);
				//alert("quiiiiiiiiiiiiiiiiii2"+" "+ $("#checkbox-2").prop("checked"));
		if(a1!=null){
			currentData=a1;
			document.getElementById("recordTitle").innerHTML = a1.title;
			var color;
			if (a1.private) {
					color = "Cyan";
					} else 
					{
						color = "DarkGray ";
					}

			$("#bgIndex").css("background-color", color);
			$("#imageTitle").attr("src", a1.src);
				
			$("#targetTitle1").text(a1.title);
			$("#articlePic").attr("src", a1.src);
			$("#imageTitle").css("height", "80%");
			
			}

	//alert("quiiiiiiiiiiiiiiiiii3"+" "+ $("#checkbox-2").prop("checked"));
}


$(document).ready(function () {
	$("#titleSource").change(
		function(){
			var tt=$("#targetTitle");
			var t=$("#secondTarget");
			tt.text($(this).val());
			t.text($(this).val());
			}				
	);
				
}); 

var date;
$(document).ready(function(e) {
	$("#goon").click(function(e) {
		var selected = $("#select-choice-year1").val()			
        date=selected;
				   
	});
});



$(document).ready(function () {
	$("#regioniDiv").hide(); $("#photo").hide();
	$("#phototoggle").click(function(){
		$("#photo").toggle();
	});
			
	$("#stati").change(function() {
		var selected = $("#stati").val()
		if(selected=="it"){
			$("#regioniDiv").show();
		}else{
			$("#regioniDiv").hide();
		}
	});
});  

var newRecord;

$(document).ready(function(e) {
	$("#goon2").click(function(e) {
		var text = $("#targetTitle").text();	
		newRecord=new record("example.jpg",text,"",date,true,"");
		records.insertAndOrder(newRecord);
		
		$("#secondTarget").val(text);
		changeListener();
				 
		var txt="";
		for(var i=0;i<records.length;i++){
			txt+=records[i].year;
		}
						//alert(txt);		
	});
});

$(document).ready(function(e) {
	var w=$(document).width();
	var s=Math.floor(w/200);
		// alert( $(document).width() +" "+s);
		//alert(retVal((s>4)?4:s)[0]);
		  
	var s=(s>4)?4:s;
	$('#articlePic').css("width",w/s+"px");
    $('#article').css(retVal(s));

});
     
function retVal(n){   
	return {
  		"-moz-column-count":""+ n,
  		"-webkit-column-count":""+ n,
  		"column-count":""+ n,
	};
}


function changePic(){
	$("#changing").attr("src", "example2.jpg");
		newRecord.src="example2.jpg";
}
				
function setProperties(){
	var txt=$("#secondTarget").val();
	if(txt!=""){
		newRecord.title=txt;}
	changeListener();
}

$(document).ready(function(e) {        
	var friendToBe=[];
	var people=[];
	
	for(var i=0;i<15;i++){
		var s1,s2;
		s1=random(15-i);
		s2=random(15-i);
		var name=z1.splice(s1,1)+" "+z.splice(s2,1);
		
		people.push(name);
		if(random(3)==1){
			friendToBe.push(name);
			}
		}
		createList(friendToBe);
		
            var s= "<li><a href='#popupBasic' ";
			var dest="";
			var s1=">";
			var s2="</a></li>";
			for(var i=0;i<people.length;i++){
			$("#friends").append(s+dest+s1+people[i]+s2);
			}
        });
	
	var z=[	
		"Andrea",
		"Luca",
		"Marco",
		"Francesco",
		"Matteo",
		"Alessandro",
		"Davide",
		"Simone",
		"Federico",
		"Lorenzo",
		"Mattia",
		"Stefano",
		"Giuseppe",
		"Riccardo",
		"Daniele"]

	var z1=[	
		"Rossi",
		"Russo",
		"Ferrari",
		"Eposito",
		"Bianchi",
		"Romano",
		"Colombo",
		"Ricci",
		"Marino",
		"Greco",
		"Gallo",
		"Conti",
		"De Luca",
		"Mancini",
		"Bruno"]

	function random(n){return Math.floor(Math.random()*n);
}

function createList(e) {
	// alert("creating list " +e[0]);
	var s= "<li><a href=?'";
	var dest="";
	var s1=">";
	var s2="</a></li>";
	for(var i=0;i<e.length;i++){
		$("#flist").append(s+dest+s1+e[i]+s2);
	}
}
