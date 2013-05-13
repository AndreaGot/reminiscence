//DECLARING COLOR FOR TIMELINE
//THIS 2 ARE USELESS FOR NOW
var BGCOLOR1="#3B3B3B";
var BGCOLOR2=" #00070A";
//SCALE OF BLUE WOULD BE NICE
var COLORS=["aqua", "blue", "fuchsia", "green", "lime", "yellow", "maroon","navy", "olive", "orange", "purple", "red", "silver", "teal", "white", "gray"];

var YEARSIGNSTEXTSHADOW="0 1px 0 #000";
var YEARSIGNSBGCOLOR="#333";
var PERSONALMEMORYRECORD="#FF6666";


var getGradientColor=function(a,b){
return{
"background-image": "-ms-linear-gradient(top, "+a+" 0%, "+b+" 100%)",
"background-image": "-moz-linea-r-gradient(top, "+a+" 0%, "+b+" 100%)",
"background-image": "-o-linear-gradient(top, "+a+" 0%, "+b+" 100%)",
"background-image": "-webkit-gradient(linear, left top, left bottom, color-stop(0, "+a+"), color-stop(1, "+b+"))",
"background-image": "-webkit-linear-gradient(top, "+a+" 0%, "+b+" 100%)",
"background-image":"linear-gradient(to bottom, "+a+" 0%, "+b+" 100%)"
}}

var getColor=function(a,b){
return{
"border-color":a,
"color": a,
"background-color":b
}}
