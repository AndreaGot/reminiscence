var s1 = '<div class="icon"><span >';
var s2 = '</span></div>';
var globalScaleLimit = 88000;

var imgArray = ["Blue",
        "Brown",
        "Red",
        "Green",
        "Orange"
];

var url = "Example Images/";
var extension = ".jpg";
var size;
var sizedef;
var sizedefHalf;
var toptop;
var topdown;
var startingPoint;
var remaining = [];
var rightLimit;
var globalScale;
var target;
var pos2 = [];
var middleLine;
var windowWidth = $(window).width();

var Timeline = function (startingYear) {
    this.startingYear = startingYear;
    this.endYear = new Date().getFullYear();
    this.yearArray = [];
    this.roundedFirstYear = Math.floor((startingYear / 10)) * 10;
    var s = 0;
    for (var i = this.roundedFirstYear; i < this.endYear + 10; i += 10) {
        this.yearArray.push(i);
        s++;
    }
    this.distance = this.yearArray[this.yearArray.length - 1] - this.yearArray[0];
    this.endYear = this.yearArray[this.yearArray.length - 1];
}

 var timeline;
 var a;
$(document).ready(function (e) {
    $("#timeLine").css(getGradientColor(BGCOLOR1, BGCOLOR2)); //Color timeline
    $('body').css(getGradientColor(BGCOLOR1, BGCOLOR2)); //Color body
	timeline=document.getElementById("timeLine");
	a = new Timeline(1899);
    a.generateYearSigns();
	timeline.style.left = 0;
});
var pinchStarted=false;
var distance,pinchCenter;
var left2,right2;
var firstTouch=true;
var prevPos;

document.ontouchend=function(event){
if(pinchStarted){
pinchHandler();
pinchStarted=false;
}
		firstTouch=true;
}

function pinchHandler(){
	var external=false;
	var internal=false;
	left2=Math.abs(left2-pinchCenter);
	right2=Math.abs(right2-pinchCenter);
var avarage=(left2+right2)/2;
if(avarage>distance){external=true;
}else{internal=true;
}
	if(external){
		zoomOut();
		
		external=false;
		}else if(internal){
		
	zoomIn();
	
	internal=false;
		}

		}
		
	document.addEventListener("gestureend",function(e){alert("lol");});
	
document.ontouchmove=function(event){
if(event.touches.length==2){
if(!pinchStarted){
var a=event.touches[0].pageX;
var b=event.touches[1].pageX;
distance=Math.abs(a-b)/2;
pinchCenter=(a<b?a:b)+distance;
pinchStarted=true;}
left2=event.touches[0].pageX;
right2=event.touches[1].pageX;
console.log(event.scale);
}else if(event.touches.length==1){
if(pinchStarted){
pinchHandler();
pinchStarted=false;
}else{
if(firstTouch){
prevPos=event.touches[0].pageX;
firstTouch=false;}
shiftAm(event.touches[0].pageX-prevPos)
prevPos=event.touches[0].pageX;}
}}
function zoomIn(){zoom(0.9,true);};
function zoomOut(){zoom(1.1,true);};

Timeline.prototype.generateYearSigns = function () {
		var spanDistance = ((document.body.clientWidth * 5 * 0.95) - ((this.yearArray.length) * 60)) / (this.yearArray.length - 1);
		timeline.style.height = (document.body.clientHeight * 1) + "px";
		document.getElementById("footer").style.top = (document.body.clientHeight * 1 + 40) + "px";
		middleLine = (("" + timeline.style.height).replace("px", "") / 2 - 5) + "px";
		var line= document.getElementById("myLine");
		line.style.top = middleLine;
		line.style.left = ((("" + (document.getElementById("timeLine").style.width).replace("%", "")) / 100) * document.body.clientWidth * 0.025) + "px";
		this.divArray = [];
    for (var y in this.yearArray) {
        this.divArray[y] = createYearSign(this.yearArray[y], spanDistance + "px");
        timeline.appendChild(this.divArray[y]);
    }

    var positions = createYearSequence(this.yearArray[0], this.yearArray[this.yearArray.length - 1], 40, this.yearArray);

    for (y in positions) {
        var s = createMemoSign(positions[y], a.getYearPos(positions[y]));
        timeline.appendChild(s);
        pos2[positions[y]] = s;
    }
    var counter = 0;
    for (var y in this.yearArray) {
        $(this.divArray[y]).css(getColor(COLORS[counter], YEARSIGNSBGCOLOR)).css("z-index", 5);
        counter++;

    }
    createMemories(pos2);
}


function zoomToDecade() {
    if (this.year != a.endYear) {
        var pleft = a.getYearPos(this.year);
        var pright = a.getYearPos(this.year + 10);
        var pageWidth = windowWidth;
        var scaleAmount = Math.round(pageWidth / (Math.abs(pleft - pright) * 1.1));
        zoom(scaleAmount, false);
      
        var s = dePixel(timeline.style.left) * 1;
        var targetPos = a.getYearPos(this.year);
        shiftAm(-s - targetPos + 0.1 * pageWidth);
    }
}

function createMemoSign(year, pos) {
    var newdiv = document.createElement('div');
    document.getElementById("compiler").innerHTML += (" " + year);
    newdiv.style.top = middleLine;
    return newdiv;
}


function createYearSign(year, distance) {
    var newdiv = document.createElement('div');
    var newspan = document.createElement('span');
    newdiv.className += " icon decadeSign";
    newdiv.year = year;
    newdiv.onclick = zoomToDecade;
    newspan.innerHTML = year;
    newdiv.appendChild(newspan);

    newdiv.style.left = (a.getYearPos(year) - 10) + "px"; // distance ;
    newdiv.style.top = (("" + timeline.style.height).replace("px", "") / 2 - 24) + "px";
    return newdiv;
}

function shiftAm(shamt) {

var s = dePixel(timeline.style.left) * 1 + shamt;
if (!((dePixel(timeline.style.left) * 1 + timeline.clientWidth) < windowWidth && shamt < 0) && !(dePixel(timeline.style.left) * 1 > 0 && shamt > 0)) {
        timeline.style.left = (dePixel(timeline.style.left) * 1 + shamt) + "px";
    }
}



function zoom(shamt, register) {

    if ((globalScale * shamt >= 1) && (globalScale * shamt < globalScaleLimit)) {
        globalScale *= shamt;
        var u1 = dePixel($("#myLine").css("width"));
        var diff = u1 - u1 * shamt;


        var u2 = dePixel($("#myLine").css("left"));

        var u;
        u1 = $("#timeLine").css("width");
        u = $(".decadeSign");

        for (var s in u) {

            if (u[s].style != null && u[s].style.left != null) {
                u[s].style.left = dePixel(u[s].style.left) * shamt + "px";
            }
        }

        for (var i in associativeArray) {
            associativeArray[i].update(shamt);
        }

        checkSpaces(shamt, register);
        $("#timeLine").css("width", (dePixel(u1) * shamt) + "px");
        u3 = $("#timeLine").css("width");
        var tmpS = dePixel(u3) - dePixel(u1);
        var tmpSumAbs = Math.abs(tmpS);
        var tmpSum = -(tmpS) / tmpSumAbs;
        tmpSum = (tmpSumAbs * tmpSum) / 2;
        if (shamt < 0) {
            tmpSum = -tmpSum;
        };
        shiftAm(tmpSum);
    }
    var left = (dePixel(a.divArray[0].style.left) * 1 + 24);
    var right = (dePixel(a.divArray[a.divArray.length -1].style.left)*1 + 24);
	
    $("#myLine").css("left", left + "px");
    $("#myLine").css("width", (right-left) + "px");
	
}

function dePixel(str) {
    return str.replace("px", "");
}

function pixel(str) {
    return str + "px";
}

var memory = function (nominalYear, actualYear, src, actualPos, placeHolder, title, text, type, index, personal, photoNumber) {
    this.src = src;
    this.nominalYear = nominalYear;
    this.actualYear = actualYear;
    this.priority = 0;
    this.title = title;
    this.text = text;
    this.type = type;
    this.personal = personal;
    this.photoCount = photoNumber;
	this.actualPhoto = 0;
    this.index = index;
    var newdiv = document.createElement('div');
    this.divdiv = document.createElement('div');
    this.divdiv.className += "photo";
    this.divdiv.id = nominalYear;
    this.divdiv.style.backgroundImage = "url('" + src[0] + "')";
    newdiv.appendChild(this.divdiv);
    var newspan = document.createElement('span');
    newspan.innerHTML = title;
    newdiv.className += " polaroid";
    if (personal) {
        newdiv.style.background = PERSONALMEMORYRECORD;
    }
    if (type == "music") {
        this.divdiv.style.backgroundImage = "url('music.png')";
        newdiv.onclick = function () {
            popUpVideo(src[0]);}
			}         else if(photoNumber==0){
			this.divdiv.style.backgroundImage = "url('no image.png')";
			}

    

    this.pivot = actualPos - 12;
    this.span = newspan;
    this.div = newdiv;
    this.divdiv;
    this.upper = true;
    this.drawed = false;
    this.scale = globalScaleLimit;
    this.placeHolder = placeHolder; //Small squared div
    this.placeHolderSpan = document.createElement('span');
    this.placeHolderSpan.innerHTML = nominalYear;
    placeHolder.appendChild(this.placeHolderSpan);
    this.placeHolderSpan.style.visibility = "hidden";

}

    function rotateCSS() {
        var n = randomNumber(12);
        n *= (randomNumber(2) == 0 ? -1 : 1);
        var s = 'rotate(' + n + "deg)";

        return {
            "transform": s,
            "-ms-transform": s,
            "-webkit-transform": s,
            '-moz-transform': s,
            '-o-transform': s
        }
    }

memory.prototype.getRandomPhoto = function () {

    var int = this.actualPhoto;
    if (this.photoCount == 1) {
        return this.src[0];
    }

    while (int == this.actualPhoto || int >= this.photoCount) {
        int = Math.round(Math.random() * this.photoCount);

    }
    this.actualPhoto = int;
    return this.src[int];
}

memory.prototype.generateContent = function () {
    if (this.upper) {
        this.div.appendChild(this.span);
        this.div.appendChild(this.divdiv);

    } else {
        this.div.appendChild(this.divdiv);
        this.div.appendChild(this.span);

    }
    $(this.div).css(rotateCSS());
}


memory.prototype.posx1 = function () {
    return this.pivot - sizedefHalf
}
memory.prototype.posx2 = function () {
    return this.pivot + sizedefHalf
}
memory.prototype.update = function (shamt) {
    this.pivot *= shamt;
    this.placeHolder.style.left = (this.pivot - 24) + "px";
    this.div.style.left = this.posx1() + "px";
}


memory.prototype.checkLeft = function (index, upper) {
    for (var s = index - 1; s >= 0; s--) {
        if (associativeArray[s].drawed && associativeArray[s].upper == upper) {
            if (associativeArray[s].posx2() > (this.posx1() - 10)) {
                return false;
            } else {

                return true;
            }
        }
    }
    return this.posx1() > 0;
}

memory.prototype.checkRight = function (index, upper) {

    for (var s = index * 1 + 1; s < associativeArrayLength(associativeArray); s++) {
        if (associativeArray[s].drawed && associativeArray[s].upper == upper) {

            if (associativeArray[s].posx1() < (this.posx2() + 10)) {
                return false;
            } else {
                return true;
            }
        }
    }
    return true;
}


memory.prototype.isDrawable = function (index) {
    if (this.drawed) {
        if ((this.upper && !(this.checkLeft(index, true) && this.checkRight(index, true))) || (!this.upper && !(this.checkLeft(index, false) && this.checkRight(index, false)))) {
            this.setVisible(false);

            this.drawed = false;
            return false;
        } else {
            return true;
        }
    } else {
        if (this.checkLeft(index, true) && this.checkRight(index, true)) {
            this.setVisible(true);
            this.drawed = true;
            this.upper = true;
            this.div.style.top = toptop + "px";
            return true;
        } else if (this.checkLeft(index, false) && this.checkRight(index, false)) {
            this.drawed = true;
            this.upper = false;
            this.setVisible(true)
            this.div.style.top = topdown + "px";
            return true;
        }
    }
    return false;
}

memory.prototype.append = function (target) {
    target.appendChild(this.div);
    this.div.style.position = "absolute";
    this.div.style.width = size + "px";
    this.div.style.height = (size + 20) + "px";
    this.div.style.left = this.posx1() + 10 + "px";
    var children = this.div.getElementsByTagName('img');
    this.setVisible(false);
}

function createYearSequence(yearA, yearB, n, array) {
    var results = [];
    var rand = yearB - yearA;
    do {
        s = yearA + randomNumber(rand);
        if ((results.indexOf(s) < 0) && (array.indexOf(s) < 0)) {
            results.push(s);
        }
    } while (results.length < n);
    results.sort();
    return results;
}

function randomNumber(n) {
    return Math.floor(Math.random() * n);
}

function changePic() {
    document.getElementById("lol2").src = url + imgArray[randomNumber(4)] + extension;

}


var associativeArray;

function createMemories(array) {
size = timeline.clientHeight * 0.33;
    sizedef = size + 20;
    sizedefHalf = sizedef / 2;
    startingPoint = a.getYearPos(a.roundedFirstYear);
    var offset = findPos("timeLine");
    toptop = offset + 15;
    topdown = offset + (timeline.clientHeight * 0.5) + 25;
    rightLimit = timeline.clientWidth - 10;
	//DA QUI VENGONO GENERATE RICORDI RANDOM
    associativeArray = new Array();
    var index = 0;
    globalScale = 1;
    for (var i in imgArray) {
        imgArray[i] = url + imgArray[i] + extension;
    }

    for (var s in array) {
        var personalRand = (randomNumber(4) == 2 ? true : false);
        var typeRandom = "a"
        var srcMusic = imgArray;
        var imgCount = 4;
        if (randomNumber(6) == 2) {
            typeRandom = "music";
            imgCount = 1;
            srcMusic = [];
            srcMusic.push("http://www.youtube.com/watch?v=c1il3TxDllA");
        } else if(randomNumber(6)==2){
			 imgCount = 0;
			}
        associativeArray[index] = new memory(s, s, srcMusic, a.getYearPos(s), array[s], "a", "a", typeRandom, index, personalRand, imgCount);
        index++;
    }
//ALTERNATIVE
 var counter = 0;
   var decade = ("" + a.roundedFirstYear)[2];
    for (var w in associativeArray) {
        var tmp = associativeArray[w];
        if (decade != tmp.nominalYear[2]) {
            var base = decade;
            var index = 0;
            while (base != tmp.nominalYear[2]) {
                index++;
                base = (base * 1 + 1) % 10;
            }
            decade = tmp.nominalYear[2];
            counter += index;
		}
		
			$(tmp.placeHolder).css(getColor(COLORS[counter], YEARSIGNSBGCOLOR));
			$(tmp.placeHolder).css("visibility","hidden");
      
		 
	}
	/*
    var counter = 0;
    var decade = ("" + a.roundedFirstYear)[2];
    for (var w in associativeArray) {
        var tmp = associativeArray[w];
        if (decade != tmp.nominalYear[2]) {
            var base = decade;
            var index = 0;
            while (base != tmp.nominalYear[2]) {
                index++;
                base = (base * 1 + 1) % 10;
            }
            decade = tmp.nominalYear[2];
            counter += index;
        }

        $(tmp.placeHolder).css(getColor(COLORS[counter], YEARSIGNSBGCOLOR));

       tmp.append(timeline);
		
        if (!tmp.isDrawable(tmp.index)) {
            remaining[tmp.index] = tmp;
        } else {
            tmp.scale = 1;
        }

    }
*/
  for (var w in associativeArray) {addMemory();}

    getVisbles();
}
var addIndex=0;

function addMemory(){
	var tmp=associativeArray[addIndex++];
	  tmp.append(timeline);
	if(!tmp.isDrawable(tmp.index)){   remaining[tmp.index] = tmp;}else {
            tmp.scale = 1;
        }
	
	}

memory.prototype.shuffleImage = function () {
    changeImage(this.divdiv);
}

function getMememoryByNominalYear(year) {
    for (var u in associativeArray) {
        if (associativeArray[u].nominalYear == year) {
            return associativeArray[u];
        }
    }
}
var tmpID;

var changeImage = function (div) {
    var s = getMememoryByNominalYear(div.id);
    var src = "url('" + s.getRandomPhoto() + "')";
    tmpID = div.id;
    div.id = "target";
    var tmpDiv = document.createElement("div");
    tmpDiv.id = "target2";
    tmpDiv.className += "photo";
    div.appendChild(tmpDiv);
    var width = $(div).width();

    $('#target2').css({
        "background-image": src,
        "width": "0px",
        "left": width + "px",
        "height": $(div).height(),
        "top": "0px"
    });

    $('#target2').animate({
        width: width + "px",
        left: '0px',
    }, 1000, function (div) {

        $("#target").css("background-image", src)
        var tar = document.getElementById("target");

        tar.id = tmpID;
        $('#target2').remove();

    });

};

function getVisbles() {
    var tmp = document.getElementById("timeLine");
    var left = Math.abs(dePixel(tmp.style.left));
    var dx = left * 1 + windowWidth; //rigthborder

    var sx = left * 1; //zero
    //alert(sx+" "+dx);
    dx = a.getPosYear(dx);
    sx = a.getPosYear(sx);

    var picker = [];
    for (var u in associativeArray) {
        if (associativeArray[u].photoCount > 1 && associativeArray[u].drawed && associativeArray[u].actualYear > sx && associativeArray[u].actualYear < dx) {
            picker.push(u);
        }
    }
    //alert(picker.length+" "+sx+" "+dx);
    var number;
    if (picker.length > 0) {
        associativeArray[picker[randomNumber(picker.length)]].shuffleImage();
        number = picker.length;
    } else {
        number = 1;
    }
    setTimeout(getVisbles, 5000 + randomNumber(25 / number) * 100);
}

var zoomed = false;
var toVerify = [];
var lastScale = 1,
    maxScale = 1,
    lastScale2 = 1,
    maxScale2 = 1;
var temporaryScale;

function checkSpaces(scale, register) {
    if (!register && globalScale > maxScale) {
        zoomed = true;
        temporaryScale = globalScale;
        lastScale2 = globalScale;
    }
    if (!zoomed) {
        maxScale = maxScale > lastScale ? maxScale : lastScale;
        if (globalScale >= maxScale) {
            for (var w in remaining) {

                var tmp = remaining[w];
                if (tmp.isDrawable(w)) {
                    remaining[w].scale = lastScale;
                    delete remaining[w];
                }
            }

            if (associativeArrayLength(remaining) == 0) {
                globalScaleLimit = globalScale;
            }
        } else if (scale > 1) {

            for (var w in associativeArray) {
                if (associativeArray[w].scale < globalScale) {
                    associativeArray[w].setVisible(true);
                }
            }
        } else if (scale <= 1) {
		//alert(globalScale);
			//console.log("magia");
            for (var w in associativeArray) {
			//alert(associativeArray[w].scale+" "+globalScale);
                if (associativeArray[w].scale > globalScale) {
                    associativeArray[w].setVisible(false);
                }
            }

        }

        lastScale = globalScale;

    } else {

        var direction = maxScale2 > lastScale2 ? maxScale2 : lastScale2;

        if (globalScale >= direction && globalScale >= temporaryScale) {

            for (var w in remaining) {
                var tmp = remaining[w];
                if (tmp.isDrawable(w)) {
                    tmp.scale = lastScale2;
                    toVerify[w] = tmp;
                    delete remaining[w];

                }
            }

            if (associativeArrayLength(remaining) == 0) {
                globalScaleLimit = globalScale;
            }
        } else if (scale > 1) {

            for (var w in associativeArray) {
                if (associativeArray[w].scale < scale) {
                    associativeArray[w].setVisible(true);
                }
            }

        } else if (scale <= 1) {
            if (globalScale <= maxScale) {
                zoomed = false;

            }

            if (globalScale < temporaryScale && globalScale > maxScale) {
                var toRemove = [];
                for (var w in toVerify) {
                    var tmp = toVerify[w];

                    if (!tmp.isDrawable(w)) {
                        tmp.scale = globalScale;

                        toRemove.push(w);
                    }

                }
                for (var s in toRemove) {
                    delete toVerify[s];
                }


            }
            if (!zoomed || globalScale > temporaryScale) {
                for (var w in associativeArray) {
                    if (associativeArray[w].scale > globalScale) {
                        associativeArray[w].setVisible(false);
                    }
                }
            }

        }
        temporaryScale = (temporaryScale <= globalScale ? temporaryScale : globalScale);
        lastScale2 = globalScale;
    }
}




memory.prototype.setVisible = function (boolean) {
    var target = document.getElementById("compiler").innerHTML;
    this.placeHolder.style.left = (this.pivot * 1 + 12) + "px";

    if (boolean) {
        document.getElementById("compiler").innerHTML = (target).replace((" " + this.actualYear), "");
    }

    if (boolean) {


        this.div.style.visibility = "visible";

        this.placeHolder.className += " icon";
        this.placeHolder.className = this.placeHolder.className.replace("rhombus", "");
        this.placeHolder.style.left = this.pivot + "px";

        if (middleLine == this.placeHolder.style.top) {
            if (this.upper) {
                this.placeHolder.style.top = (dePixel(this.placeHolder.style.top) * 1 - 50) + "px";

            } else {

                this.placeHolder.style.top = (dePixel(this.placeHolder.style.top) * 1 + 30) + "px";
            }
            this.placeHolderSpan.style.visibility = "visible";


        }

        this.generateContent();
    } else {
        this.div.style.visibility = "hidden";
        this.placeHolder.style.visibility = "visible";
        this.placeHolder.className += " rhombus";
        this.placeHolder.className = this.placeHolder.className.replace("icon", "");
        if (middleLine != this.placeHolder.style.top) {
            if (this.upper) {
                this.placeHolderSpan.style.visibility = "hidden";
                this.placeHolder.style.top = (dePixel(this.placeHolder.style.top) * 1 + 50) + "px";
            } else {
                this.placeHolderSpan.style.visibility = "hidden";
                this.placeHolder.style.top = (dePixel(this.placeHolder.style.top) * 1 - 30) + "px";
            }

        }

    }

}

function popUpVideo(src) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.className += " backgroundVideo";
    div.style.top = "0px";
    div.style.left = "0px";
    var windowWidth = $(document).width();
    var windowHeight = $(document).height();
    div.style.width = windowWidth + "px";
    div.style.height = windowHeight + "px";
    var width, height;
    width = (640 < windowWidth ? 640 : windowWidth * 0.8);
    height = (640 < windowWidth ? 390 : width * 390 / 460);
    var url = src.replace("watch?v=", "v/") + "?version=3&amp;";
    var iframe = document.createElement("Object");
    var param1 = $('<param name="movie" value=' + url + '></param>');
    var param2 = $('<param name="allowFullScreen" value="true"></param>');
    var param3 = $('<param name="allowscriptaccess" value="always"></param>');
    var embed = $('<embed src="' + url + '" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '" allowscriptaccess="always" allowfullscreen="true"></embed>');
    $(iframe).append(param1);
    $(iframe).append(param2);
    $(iframe).append(param3);
    $(iframe).append(embed);
    iframe.style.width = width + "px";
    iframe.style.height = height + "px";
    iframe.style.position = "absolute";
    iframe.style.top = ((windowHeight - height) / 2) + "px";
    iframe.style.left = ((windowWidth - width) / 2) + "px";
    $("body").append(div);
    $(".backgroundVideo").append(iframe);
    div.onclick = removePlayer;



}

function removePlayer() {

    $(".backgroundVideo").remove();
    $("#player").remove();
}


function associativeArrayLength(array) {
    var counter = 0;
    for (s in array) {
        counter++;
    }
    return counter;
}

function findPos(id) {
    var node = document.getElementById(id);
    var curtop = 0;
    var curtopscroll = 0;
    if (node.offsetParent) {
        do {
            curtop += node.offsetTop;
            curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
        } while (node = node.offsetParent);


    }

    return (curtop - curtopscroll);
}

//Timeline functions

Timeline.prototype.getPosYear = function (position) {
    var div_width = $("#timeLine").width() * 0.95;
    position = Math.abs(position);
    var distance2 = this.endYear - this.roundedFirstYear;
    return Math.round((this.roundedFirstYear + Math.abs(position / div_width) * distance2));
}

Timeline.prototype.getYearPos = function (year) {
    var div_width = $("#timeLine").width() * 0.95;
    var actualWidth = div_width * 0.95;
    var initialPos = div_width * 0.025;
    var distance2 = this.endYear - year;
    var sol = 1 - distance2 / this.distance;
    return Math.round(initialPos + actualWidth * sol);
}