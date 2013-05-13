
	/*
<iframe width="420" height="345"
src="http://www.youtube.com/embed/XGSy3_Czz8k">
</iframe>

function pushControl(a,array){
var b=array.indexOf(a)<0;
if(b){array.push(a);}
return !b;
}




function checkWidth(a, b) {
    var tmp = Math.abs(associativeArray[b].posx1() - associativeArray[a].posx2());
    if (tmp > sizedef) {
        return associativeArray[a].posx2() + tmp / 2;
    }
    return -1;
}

function checkDrawable(start, finish, index) {
	return associativeArray[index].posx1() > start && associativeArray[index].posx2() < finish ;
}



function findPost(array, index, isUpper) {
    //alert("aaaaaaaaaaa "+this.length);
    for (var i = index; i < array.length; i++) {



        if (array[i].drawed == true && array[i].upper == isUpper) {
            return array[i];
        }
    }
    return null;
}

function findPrev(array, index, isUpper) {
    for (var i = index; i >= 0; i--) {
        if (array[i].drawed == true && array[i].upper == isUpper) {
            return array[i];
        }
    }
    return null;
}


function findPostIndex(array, index, isUpper) {
    //alert("aaaaaaaaaaa "+this.length);
    for (var i = index; i < array.length; i++) {
        if (array[i] != null) {
            if (array[i].drawed == true && array[i].upper == isUpper) {
                return i;
            }
        }
    }
    return -1;
}

function findPrevIndex(array, index, isUpper) {
    for (var i = index; i >= 0; i--) {
        if (array[i] != null) {
            if (array[i].drawed == true && array[i].upper == isUpper) {
                return i;
            }
        }
    }
    return -1;
}

function theresRoom(array, index) {
    var prev, post;
    prev = findPrev(array, index, true);
    post = findPost(array, index, true);
    var prev1, post1;
    prev1 = findPrev(array, index, false);
    post1 = findPost(array, index, false);
    var tmp = array[index];

    if (post == null && prev == null) {

        if (tmp.insideLimits()) {
            return 0;
        } else return -1;
    }

    if (post == null) {
        //console.log(tmp.posx1()+" "+prev.posx2()+" "+tmp.nominalYear);
        if (tmp.posx1() > prev.posx2() && tmp.insideLimits()) {
            return 0;
        }
    }

    if (post1 == null && prev1 == null) {
        if (tmp.insideLimits()) {
            return 1;
        } else return -1;
    }

    if (post1 == null) {
        if (tmp.posx1() > prev1.posx2() && tmp.insideLimits()) {
            return 1;
        }
        return -1;
    }

    if ((post.posx1() - prev.posx2()) > sizedef) {
        return 0;
    }

    if ((post1.posx1() - prev1.posx2()) > sizedef) {
        return 1;
    }

    return -1;
}


function checkSpace(array, index, isUpper) {
    var prev, post;
    prev = findPrev(array, index, isUpper);
    post = findPost(array, index, isUpper);

    if (prev != null) {}
    array[index].drawed = true;
    if (post != null && prev != null) {
        if ((post.posx1() - prev.posx2()) < sizedef) {

            return 0;

        }
    } else if (post != null) {

        return (post.posx1() - 10) - size / 2;
    } else if (prev != null) {
        return (prev.posx2() + 10) + size / 2;
    } else return array[index].pivot;
}


memory.prototype.insideLimits = function () {
    return this.posx1() >= leftLimit && this.posx2() <= rightLimit;
}

function searchBetween(array, a, b) {
    var tmparray = [];
    var tmpEl;
    for (var i = a; i < b; i++) {
        tmpEl = array[i];
        if (tmpEl != null && tmpEl.drawed == false) {
            tmparray[i]=tmpEl;
        }
    }
   return tmparray;
}

function findMinIndex(array, i) {
    var tmpD = 0;
    var tmpDist = sizedef * 2;

    for (s in array) {
        if (tmpDist > array[s].distance(i)) {
            tmpDist = array[s].distance(i);
            tmpD = s;
        }
    }
  
    if (tmpDist < (sizedefHalf - 10)) {
        return tmpD;
    } else return -1;
}


memory.prototype.distance = function (i) {
    return Math.abs(this.pivot - i);
}

function getScale(a, b) { 
    var l = Math.abs(b - a);

    return sizedef / l;
}


memory.prototype.isInside = function (i) {
    return distance(i) < (sizedefHalf - 10);
}
*/


	/*
memory.prototype.draw = function () {
    this.div.style.position = "absolute";
    this.div.style.width = size + "px";
    this.div.style.height = (size + 20) + "px";
    var children = this.div.getElementsByTagName('img');
    children[0].style.width = size + "px";
}
*/

/*
function checkdecentralized(associativeArray, remaining) {
	
	while(associativeArrayLength(remaining)>0){
		//alert(associativeArrayLength(remaining));
		var tmpScale=1;
//alert("ne restano: "+associativeArrayLength(remaining));
 	var scale1 =0,index1=[], scale2 = 0,index2=[];
	var pos1=[],pos2=[];
 var toRemove=[];
    for (position in remaining) {
		var tmp = remaining[position];
        var u1 = [];
        var u2 = [];
        var a1, a2, b1, b2;
       
        a1 = findPrevIndex(associativeArray, position, true);
        a2 = findPostIndex(associativeArray, position, true);
		
       		var sindex,eindex;
			var dist2;
			var s2;
			var pivot;
			var left,right;
			var leftPos;
			if(a1<0&&a2<0){
				sindex=leftLimit*globalScale;
				eindex=rightLimit*globalScale;
				dist1=eindex-sindex;
				s1=s;
				pivot=associativeArray[position].pivot;
				left=associativeArray[position].posx1()*globalScale;
				right=associativeArray[position].posx2()*globalScale;
				leftPos=associativeArray[position].posx1();
				}
			else if(a1<0)
			{
				sindex=leftLimit*globalScale;
				dist1=eindex-sindex;
				s1=s;
				pivot=associativeArray[position].pivot;
				left=associativeArray[position].posx1()*globalScale;
				right=associativeArray[position].posx2()*globalScale;
				leftPos=associativeArray[position].posx1();
				}
			else if(a2<0){
				eindex=rightLimit*globalScale;
				dist1=eindex-sindex;
				s1=s;
				pivot=associativeArray[position].pivot;
				right=associativeArray[position].posx2()*globalScale;
				left=associativeArray[position].posx1()*globalScale;
				leftPos=associativeArray[position].posx1();
				}
			else {
				sindex=associativeArray[a2].posx1()*globalScale;
				eindex=associativeArray[a1]*globalScale.posx2()
				dist1=eindex-sindex;
				 u1 = searchBetween(associativeArray, a1, a2);
            	s1 = findMinIndex(u1, associativeArray[a2].posx1() - sizedefHalf);
				pivot=associativeArray[a2].posx1()*globalScale - sizedefHalf;
				right=associativeArray[a2].posx1()*globalScale;
				left=associativeArray[a1].posx2()*globalScale;
				leftPos=(associativeArray[a1].posx2() + 20);
			}
						
		
           	if (dist1 > sizedef && s1 >= 0) {
				var tmpEl = associativeArray[s1];
                tmpEl.drawed = true;
                tmpEl.div.style.left = leftPos + "px";
                tmpEl.div.style.top = toptop + "px";
                tmpEl.upper = true;
				
				if(toRemove.indexOf(s)<0){
					toRemove.push(s);
					}
            } else {
				//alert("s1 "+s1);
				alert("s1 "+s1+" "+a1+" "+a2);
                if (s1 >= 0) {
					var tmpS=getScale(left,right);
						//alert(tmpS+" 1");
					if(tmpS<scale1||scale1==0){
					scale1 = tmpS;
					pos1=[];
                    index1 = [];
					pos1.push(pivot);
					index1.push(position);
					} else if(tmpS==scale1){
						index1.push(position);
						pos1.push(pivot);
						}
					
                }
            
        }
		
        b1 = findPrevIndex(associativeArray, position, false);
        b2 = findPostIndex(associativeArray, position, false);
	//alert(b1+" "+b2);
       
			
			if(b1<0&&b2<0){
				sindex=leftLimit*globalScale;
				eindex=rightLimit*globalScale;
				dist2=eindex-sindex;
				s2=s;
				pivot=associativeArray[position].pivot;
				left=associativeArray[position].posx1()*globalScale;
				right=associativeArray[position].posx2()*globalScale;
				leftPos=associativeArray[position].posx1();
				}
			else if(b1<0)
			{
				sindex=leftLimit*globalScale;
				dist2=eindex-sindex;
				s2=s;
				pivot=associativeArray[position].pivot;
				left=associativeArray[position].posx1()*globalScale;
				right=associativeArray[position].posx2()*globalScale;
				leftPos=associativeArray[position].posx1();
				}
			else if(b2<0){
				eindex=rightLimit*globalScale;
				dist2=eindex-sindex;
				s2=s;
				pivot=associativeArray[position].pivot;
				right=associativeArray[position].posx2()*globalScale;
				left=associativeArray[position].posx1()*globalScale;
				leftPos=associativeArray[position].posx1();
				} else {
				sindex=associativeArray[b2].posx1()*globalScale;
				eindex=associativeArray[b1]*globalScale.posx2()
				dist2=eindex-sindex;
				 u2 = searchBetween(associativeArray, b1, b2);
            	s2 = findMinIndex(u2, associativeArray[b2].posx1() - sizedefHalf);
				pivot=associativeArray[b2].posx1()*globalScale - sizedefHalf;
				right=associativeArray[b2].posx1()*globalScale;
				left=associativeArray[b1].posx2()*globalScale;
				leftPos=(associativeArray[b1].posx2() + 20);
			}
			
			
			if (dist2 > sizedef && s2 >= 0) {
				var tmpEl = associativeArray[s2];
                tmpEl.drawed = true;
                tmpEl.div.style.left =leftPos  + "px";
                tmpEl.div.style.top = topdown + "px";
                tmpEl.upper = false;
				
		if(toRemove.indexOf(s)<0){
					toRemove.push(s);
					}
            } else {
				alert("s2 "+s2+" "+b1+" "+b2);
				 if (s2 >= 0) {
				var tmpS = getScale(left,right);
				//alert(tmpS+" 2");
				if(tmpS<scale2||scale2==0){
					scale2 = tmpS;
                    index2 = [];
					pos2=[];
					pos2.push(pivot);
					index2.push(position);
					} else if(tmpS==scale2){
						index2.push(position);
						pos2.push(pivot);
						}
				}
            
			//QUIIIIIIIIIIIIIIIIIIIIIIIII O
        }

    }
	
	if ((scale2 == scale1) && (scale1 != 0)) {
            tmpScale = scale1;
			for(ind in index2){
				
				var tmp=remaining[index2[ind]];
				target.appendChild(tmp.div);
				tmp.div.style.top = toptop + "px";
				tmp.upper = true;
				tmp.drawed = true;
				tmp.adjustPos(pos1[ind]);
				tmp.div.style.left = (tmp.posx1() + 10) + "px";
				tmp.setVisible(false);
			}
			
            for(ind in index1){
				var tmp=remaining[index1[ind]];
				target.appendChild(tmp.div);
				tmp.div.style.top = toptop + "px";
				tmp.upper = true;
				tmp.drawed = true;
				tmp.adjustPos(pos1[ind]);
				tmp.div.style.left = (tmp.posx1() + 10) + "px";
				tmp.setVisible(false);
			}
			for(ind in index2){
				delete remaining[index2[ind]];
				
				}
			   for(ind in index1){
				   delete remaining[index1[ind]];
				   }
        }
      else if (scale1 < scale2&& (scale1 != 0)) {
            tmpScale = scale1;
			index2=[];
			
			for(ind in index1){
			
				
				var tmp=remaining[index1[ind]];
				target.appendChild(tmp.div);
				tmp.div.style.top = toptop + "px";
				tmp.upper = true;
				tmp.drawed = true;
				tmp.adjustPos(pos1[ind]);
				tmp.div.style.left = (tmp.posx1() + 10) + "px";
				tmp.setVisible(false);
			}
			   for(ind in index1){
				   delete remaining[index1[ind]];
				   }

        } else if (scale2 != 0) {
			
            tmpScale = scale2;
				index1=[];
				for(ind in index2){
				
				var tmp=remaining[index2[ind]];
				target.appendChild(tmp.div);
				tmp.div.style.top = toptop + "px";
				tmp.upper = true;
				tmp.drawed = true;
				tmp.adjustPos(pos1[ind]);
				tmp.div.style.left = (tmp.posx1() + 10) + "px";
				tmp.setVisible(false);
				}
			for(ind in index2){
				delete remaining[index2[ind]];
				}
		}
		

		for(ind in toRemove){
				delete remaining[toRemove[ind]];
				}
	alert(associativeArrayLength(remaining)+" "+index1.length+" ("+scale1+") "+" "+index2.length+" ("+scale2+") ");
		globalScale*=tmpScale;
	
//alert(associativeArrayLength(remaining));
}
	//alert("gS "+globalScale);
}

*/

/*
function checkSpaces() {
      var toRemove = [];
      for (position in remaining) {
		
        var tmp = remaining[position];
        var a1 = findPrevIndex(associativeArray, position, true);
        var a2 = findPostIndex(associativeArray, position, true);
		
        if (a1<0) {
            if (checkDrawable(leftLimit, associativeArray[a2].posx1(), position)) {
               
                tmp.upper = true;
                tmp.setVisible(true);
                tmp.scale = globalScale;
                tmp.drawed = true;
				  target.appendChild(tmp.div);
                pushControl(position,toRemove);
		tmp.div.style.top = toptop + "px";
		tmp.div.style.left = (tmp.posx1() + 10) + "px";
            }
        } else if (a2<0) {
            if (checkDrawable(associativeArray[a1].posx2(), rightLimit, position)) {
              
                tmp.upper = true;
                tmp.scale = globalScale;
                tmp.setVisible(true);
                tmp.drawed = true;
				  target.appendChild(tmp.div);
                      pushControl(position,toRemove);  tmp.div.style.top = toptop + "px";
				 tmp.div.style.left = (tmp.posx1() + 10) + "px";
            }
        } else {
            if (checkWidth(a1, a2)) {
                var sb = searchBetween(remaining, a1, a2);
				//console.log(associativeArrayLength(sb));
                for (u in sb) {
					//alert(sb[u].upper);
                    if (checkDrawable(associativeArray[a1].posx2(), associativeArray[a2].posx1(), u)) {
                      
                        sb[u].upper = true;
                        sb[u].setVisible(true);
                        sb[u].drawed = true;
                        sb[u].scale = globalScale;
                          pushControl(position,toRemove); 
                      
						target.appendChild(tmp.div); tmp.div.style.left = (tmp.posx1() + 10) + "px";
					//console.log("disegno "+u);
                        break;  tmp.div.style.top = toptop + "px";
                    }

                }
            }

        }
       


            var b1 = findPrevIndex(associativeArray, position, true);
            var b2 = findPostIndex(associativeArray, position, true);
			//console.log(a1+" "+a2+" B");
            if (b1<0) {

                if (checkDrawable(leftLimit, associativeArray[b2].posx1(), position)) {
                   if(pushControl(position,toRemove)){
                    tmp.upper = false;
                    tmp.scale = globalScale;
                    tmp.setVisible(true);
                    tmp.drawed = true;  
					target.appendChild(tmp.div); tmp.div.style.left = (tmp.posx1()+ 10) + "px";
                   // console.log("AAA");
                    
			 tmp.div.style.top = topdown + "px";}
                }

            } else if (b2<0) {

                if (checkDrawable(associativeArray[b1].posx2(), rightLimit, position)) {
                      if( pushControl(position,toRemove)){
                    tmp.upper = false;
                    tmp.scale = globalScale;
                    tmp.setVisible(true);
                    tmp.drawed = true;  
					target.appendChild(tmp.div); tmp.div.style.left = (tmp.posx1() + 10) + "px";
                   // console.log("AAA");
                     
			tmp.div.style.top = topdown + "px";}
                }

            } else {
				if (checkWidth(b1, b2)) {
                var sb = searchBetween(remaining, b1, b2);
				//console.log(associativeArrayLength(sb));
                for (u in sb) {
                    if (checkDrawable(associativeArray[b1].posx2(), associativeArray[b2].posx1(), u)) {
                      if( pushControl(position,toRemove)){
                        sb[u].upper = true;
                        sb[u].setVisible(true);
                        sb[u].drawed = true;
                        sb[u].scale = globalScale;
                        target.appendChild(tmp.div); tmp.div.style.left = (tmp.posx1() + 10) + "px";
                        tmp.div.style.top = topdown + "px";}
			//console.log("disegno "+u);
                        break;
                    }
                  }
            }
        }
        /*  if (toRemove) {
			alert("removing");
            delete remaining[int];
            toRemove = false;
        }
    }


	for(a in toRemove){
        //alert(remaining[toRemove[a]].actualYear+" "+associativeArray[toRemove[a]].actualYear);
	//alert("removing" +remaining[a].actualYear);
	delete remaining[toRemove[a]];
	toRemove=[];
        }
        
        //alert(associativeArrayLength(toRemove));
}*/

/*
    function createMemories(array) {
		//prima funzione chiamata
        target = document.getElementById("timeLine");
        size = target.clientHeight * 0.35;
        sizedef = size + 20;
        sizedefHalf = sizedef / 2;
        startingPoint = a.getYearPos(a.roundedFirstYear);
        var offset = findPos("timeLine");
        toptop = offset;
        topdown = offset + (target.clientHeight * 0.5) + 35;
        leftLimit = 10;
        rightLimit = target.clientWidth - 10;
        associativeArray = new Array();
        var index = 0;
        globalScale = 1;
        for (var s in array) {
            //alert(s);
            associativeArray[index] = new memory(s, s, url + imgArray[randomNumber(4)] + extension, a.getYearPos(s), array[s]);
            index++;
        }

        for (var w in associativeArray) {
            var tmp = associativeArray[w];

            var swt = theresRoom(associativeArray, w);
            if (swt >= 0) {
                target.appendChild(tmp.div);
                tmp.setVisible(true);
                if (swt == 0) {
                    tmp.div.style.top = toptop + "px";
                    tmp.upper = true;
                } else {
                    tmp.div.style.top = topdown + "px";
                    tmp.upper = false;
                }
                tmp.drawed = true;
               tmp.div.style.left = (tmp.posx1() + 10) + "px";
            } else {

                remaining[w] = tmp;
            }
            tmp.draw();
        }
  
    }
*/