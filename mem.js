/*setTimeout is used for various functions just to avoid code being executed before an animation is finished*/
/*As there are no major possibilities for errors I didn't use any try-catch-finally statements*/

var i,r,array,p,q,clix,score,source;
	p=0;			/*stores present block id*/
	q=0;			/*stores previous block id*/
	clix=0;			/*stores click count*/
	score=0;		/*stores score*/
var matchedsmall = [0,0,0,0,0,0,0,0,0,0,0,0];	/*stores info whether block is matched or not*/
var matchedbig = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
												/*store image sources*/
var ImgSourcesmall = ["flower.jpg", "ostwald.jpg", "rose.jpg", "donald.jpg", "mickey.jpg", "monkey.jpg",
					  "flower.jpg", "ostwald.jpg", "rose.jpg", "donald.jpg", "mickey.jpg", "monkey.jpg" ];
var ImgSourcebig = ["flower.jpg", "ostwald.jpg", "rose.jpg", "donald.jpg", "mickey.jpg", "monkey.jpg", "star.jpg", "icecream.jpg", "cat.jpg", "dragon.jpg", "plane.jpg", "turtle.jpg",
					"flower.jpg", "ostwald.jpg", "rose.jpg", "donald.jpg", "mickey.jpg", "monkey.jpg", "star.jpg", "icecream.jpg", "cat.jpg", "dragon.jpg", "plane.jpg", "turtle.jpg" ];

			var images = new Array(); /*optional preload of images for better user expirience*/
			function preload() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image();
					images[i].src = preload.arguments[i];
				}
			}
			preload("flower.jpg", "ostwald.jpg", "rose.jpg", "donald.jpg", "mickey.jpg", "monkey.jpg", "star.jpg", "icecream.jpg", "cat.jpg", "dragon.jpg", "plane.jpg", "turtle.jpg");

function show(r){			/*show game after selecting a level*/
	document.getElementById("lvl").style.display = "none";		/*remove level menu*/
	if(r==3){
		    document.getElementById("boxsmall").style.display = "block";	/*checks if level is 3x4*/
	        ImgSourcesmall=shuffleArray(ImgSourcesmall);		/*shuffle source array*/
	}
	if(r==4){
		    document.getElementById("boxlarge").style.display = "block";	/*checks if level is 4x6*/
		   	ImgSourcebig=shuffleArray(ImgSourcebig);			/*shuffle source array*/
	}
}

function clk(i) {				/*called upon clicking any block*/
	if(matchedsmall[i-1]==0){		/*checks if tthe block is alredy matched, if matched do nothing*/
        clix++;
		document.getElementById('clicks').innerHTML="Clicks : " + clix;		/*update no of clicks*/
		
		source=$('#s'+i).attr("src");				/*select the present block*/
		$('img').css("pointer-events", "none");		/*disabling click events*/

		if(source=="def.jpg"){						/*if image is brick wall change the image to the assigned value from source array*/
			$('#s'+i).fadeOut("10");				
	    	setTimeout(function () {$('#s'+i).attr("src",ImgSourcesmall[i-1]);},300);
	    	setTimeout(function () {$('#s'+i).fadeIn("10");},5);
         	q=p;							/*keep track of present and previous block-ids*/
         	p=i;
        }
		
		else{										/*else change it to brick wall*/
			$('#s'+i).fadeOut("10");
            setTimeout(function(){$('#s'+i).attr("src","def.jpg");},300);
            setTimeout(function(){$('#s'+i).fadeIn("10");},5);
        	p=0;
        	q=0;
		}
	  	
	  	if((q!=p)&&(q!=0)){					/*if blocks are different and selected block has an open partner*/
			setTimeout(function() {
				if(ImgSourcesmall[p-1]==ImgSourcesmall[q-1]){	/*checks if both have same image, if yes change both to done*/
					$('#s'+q).fadeOut("10");
    	        	setTimeout(function(){$('#s'+q).attr("src","done.jpg");},300);
    	        	setTimeout(function(){$('#s'+q).fadeIn("10");},5);
    	    		
					$('#s'+p).fadeOut("10");
	   				setTimeout(function(){$('#s'+p).attr("src","done.jpg");},300);
       		 	    setTimeout(function(){$('#s'+p).fadeIn("10");},5);
        			
        			setTimeout(function(){	 /*increase score and display it,change matched state to 1*/
          				score++;
						document.getElementById("score").innerHTML="Score : " + score;
						matchedsmall[q-1]=1;
						matchedsmall[p-1]=1;
						p=0;
						q=0;
   			            $("img").css("pointer-events", "auto");
				},1000);
				}
				else{		/*if not matched flip both to reveal a brick wall*/
					$('#s'+q).fadeOut("10");
    	        	setTimeout(function(){$('#s'+q).attr("src","def.jpg");},300);
    	        	setTimeout(function(){$('#s'+q).fadeIn("10");},5);
    	    		         
					$('#s'+p).fadeOut("10");
		   			setTimeout(function(){$('#s'+p).attr("src","def.jpg");},300);
    	        	setTimeout(function(){$('#s'+p).fadeIn("10");},5);
			    	
			    	setTimeout(function(){		/*releases both ids*/
        				p=0;
						q=0;
						$("img").css("pointer-events", "auto");
					},1000);  
				}

			},1250);
			
		}
		else{
			$("img").css("pointer-events", "auto");
		}
	}
}
function clkl(i) {				/*called upon clicking any block*/
 	if(matchedbig[i-1]==0){		/*checks if tthe block is alredy matched, if matched do nothing*/
		clix++;
		document.getElementById('clicksl').innerHTML="Clicks : " + clix;		/*update no of clicks*/
		
		source=$('#l'+i).attr("src");				/*select the present block*/
		$('img').css("pointer-events", "none");		/*disabling click events*/

		if(source=="def.jpg"){						/*if image is brick wall change the image to the assigned value from source array*/
			$('#l'+i).fadeOut("1500");
			setTimeout(function(){$('#l'+i).attr("src",ImgSourcebig[i-1]);},300);
	    	setTimeout(function(){$('#l'+i).fadeIn("1500");},5);
         	q=p;							/*keep track of present and previous block-ids*/
			p=i;
		}
		
		else{										/*else change it to brick wall*/
			$('#l'+i).fadeOut("10");
			setTimeout(function(){$('#l'+i).attr("src","def.jpg");},300);
    		setTimeout(function(){$('#l'+i).fadeIn("10");},5); 
        	p=0;
        	q=0;
		}

		if((q!=p)&&(q!=0)){					/*if blocks are different and selected block has an open partner*/
			setTimeout(function() {
				if(ImgSourcebig[p-1]==ImgSourcebig[q-1]){	/*checks if both have same image, if yes change both to done*/
					$('#l'+q).fadeOut("10"); 
					setTimeout(function(){$('#l'+q).attr("src","done.jpg");},300);
    		        setTimeout(function(){$('#l'+q).fadeIn("10");},5);

			       	$('#l'+p).fadeOut("10");
  					setTimeout(function(){$('#l'+p).attr("src","done.jpg");},300);
   			 	    setTimeout(function(){$('#l'+p).fadeIn("10");},5);
        			  
			       	setTimeout(function(){	 /*increase score and display it,change matched state to 1*/
        				score++;
						document.getElementById("scorel").innerHTML="Score : " + score;
						matchedbig[q-1]=1;
						matchedbig[p-1]=1;
						p=0;
						q=0;
						$("img").css("pointer-events", "auto"); /*re-enabling click events*/
					},1000);
				
				}
				else{		/*if not matched flip both to reveal a brick wall*/
					$('#l'+q).fadeOut("10");
   		        	setTimeout(function(){$('#l'+q).attr("src","def.jpg");},300);
    	        	setTimeout(function(){$('#l'+q).fadeIn("10");},5);
  		    	  
	    			$('#l'+p).fadeOut("10");
		   			setTimeout(function(){$('#l'+p).attr("src","def.jpg");},300);
	  	        	setTimeout(function(){$('#l'+p).fadeIn("10");},5);
    	    	  	
    	    	  	setTimeout(function(){		/*releases both ids*/
    	    	  		p=0;
						q=0;
						$("img").css("pointer-events", "auto"); /*re-enabling click events*/
					},1000);  
				}
			},1250);
		}
		else{
			$("img").css("pointer-events", "auto"); /*re-enabling click events*/
		}
	}
}

function reset(r){		/*reset the game,score,no of clicks and also shuffle the images*/
	if(r==3){			/*check the level of game*/
		score=0;
		clix=0;
		document.getElementById('clicks').innerHTML="Clicks : 0";
		document.getElementById("score").innerHTML="Score : 0";
		ImgSourcesmall=shuffleArray(ImgSourcesmall);
		matchedsmall = [0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=1;i<13;i++){
			$('#s'+i).attr("src","def.jpg");      		
		}
		$("img").css("pointer-events", "auto"); /*re-enabling click events*/
	}
	
	if(r==4){			/*check the level of game*/
		score=0;	
		clix=0;
		document.getElementById('clicksl').innerHTML="Clicks : 0";
		document.getElementById("scorel").innerHTML="Score : 0";
		ImgSourcebig=shuffleArray(ImgSourcebig);
		matchedbig = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=1;i<25;i++){
			$('#l'+i).attr("src","def.jpg");      		
        }
        $("img").css("pointer-events", "auto"); /*re-enabling click events*/
	}
}
function shuffleArray(array){		/*algorith to shuffle the source array*/
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
