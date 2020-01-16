window.onload = function(){
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	bulletList = new Array();
	bulletList.push(null);
	ennemyList = new Array();
	ennemyList.push(null);

	
	let click
			
	var shipPink = new Image();
	shipPink.src = "shipPink.png";
	var shipBlue = new Image();
	shipBlue.src = "shipBlue.png";

	var orbPink = new Image();
	orbPink.src = "orbPink.png";
	var orbBlue = new Image();
	orbBlue.src = "orbBlue.png";
	var wandererPink = new Image();
	wandererPink.src = "wandererPink.png";
	var wandererBlue = new Image();
	wandererBlue.src = "wandererBlue.png";
	var follower = new Image();
	follower.src = "follower.png";

	
	function Ennemy (x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		
		ennemyList.push(this);
		
		this.draw = function(){
			context.fillStyle = "#FF0000";
			context.fillRect(this.x,this.y,this.width,this.height);
		}
		
		this.check = function(id){
			for(i=bulletList.length-1;i>0;i--){	
				if(collisionPointToRectangle(bulletList[i].x,bulletList[i].y,this.x,this.y,this.width,this.height)){
					bulletList.splice(i,1);
					ennemyList.splice(id,1);
					i=0;
				}
			}
		}
		
		this.tick = function(id){
			this.draw();
			this.check(id);
		}
	}
		

	function Weapon(){
		
	}

	function Boss (x,y,width,height,health){
		this.x = x;
		this.y = y;
		this.health = health;
		this.width = width;
		this.height = height;
		this.behaviour = 0;
		this.timer = 0;
		this.angle = 0;
		this.xTarget = 600;
		this.yTarget = 600;
		
		ennemyList.push(this);
		
		this.draw = function(){
			context.fillStyle = "#FF0000";
			context.fillRect(this.x,this.y,this.width,this.height);
			
			context.fillStyle = "#00FF00";
			context.fillRect(640 - ((this.health/500) * 100),680,(this.health/500) * 2 * 100,40);
		}
		
		this.check = function(id){
			for(i=bulletList.length-1;i>0;i--){	
				if(collisionPointToRectangle(bulletList[i].x,bulletList[i].y,this.x,this.y,this.width,this.height) && (bulletList[i].team==0)){
					this.health--;
					bulletList.splice(i,1);
					if(this.health < 0){
						ennemyList.splice(id,1);
						i=0;
					}
				}
			}
			
			this.behaviour = Math.floor(this.health / 100);
			
			this.timer++;
			this.angle += 0.03;
			
			
			// if(timer%300 == 0){
				
			// }
			
			
			switch (this.behaviour){
				case 4:
					// if (this.timer % 5 == 0){
						// pow = new OrbVanilla(this.x,this.y,this.x + 50 * Math.cos(this.angle),this.y + 50 * Math.sin(this.angle),1);
						// this.angle += Math.PI / 2;
						// pow = new OrbVanilla(this.x,this.y,this.x + 50 * Math.cos(this.angle),this.y + 50 * Math.sin(this.angle),0);
						// this.angle += Math.PI / 2;
						// pow = new OrbVanilla(this.x,this.y,this.x + 50 * Math.cos(this.angle),this.y + 50 * Math.sin(this.angle),1);
						// this.angle += Math.PI / 2;
						// pow = new OrbVanilla(this.x,this.y,this.x + 50 * Math.cos(this.angle),this.y + 50 * Math.sin(this.angle),0);
						// this.angle += Math.PI / 2;
					// }				
					
					if (this.timer % 30 == 0){
						// pow = new OrbWander(this.x,this.y,0);
						// pow = new OrbWander(this.x,this.y,1);
						pow = new OrbFollow(this.x,this.y,guy.x,guy.y,1);
					}
					break;
			}
			
				
		}
		
		this.tick = function(id){
			this.draw();
			this.check(id);
		}
	}
	
	function Clavier () {
		
		// console.log('----- class.clavier.js');
		
		var HAUT					= 90;
		var DROITE					= 68;
		var BAS						= 83;
		var GAUCHE					= 81;
		var SPACE					= 32;
		var SHIFT					= 16;
		
		var _touche					= this;
		_touche.press				= false;
		_touche.haut				= false;
		_touche.droite				= false;
		_touche.bas					= false;
		_touche.gauche				= false;
		_touche.space				= false;
		_touche.shift				= false;
		
		var _evt					= null;
		var _statut					= false;
		
		document.onkeydown = function (evt) {
			_evt = evt || window.event;
			//console.log('document.onkeydown ' + _evt.keyCode);
			touche(_evt.keyCode, _evt.type);
		};
		
		document.onkeyup = function (evt) {
			_evt = evt || window.event;
			touche(_evt.keyCode, _evt.type);
		};
		
		// METHODES
		
		function touche(code, statut) {
			
			_statut = false;
			if (statut == 'keydown') {
				_statut				= true;
			};
			
			switch (code) {
				case HAUT :
					_touche.press	= _statut;
					_touche.haut	= _statut;
					break;
				case DROITE :
					_touche.press	= _statut;
					_touche.droite	= _statut;
					break;
				case BAS :
					_touche.press	= _statut;
					_touche.bas		= _statut;
					break;
				case GAUCHE :
					_touche.press	= _statut;
					_touche.gauche	= _statut;
					break;
				case SPACE :
					_touche.press	= _statut;
					_touche.space	= _statut;
					break;
				case SHIFT :
					_touche.press	= _statut;
					_touche.shift	= _statut;
					break;
				default :
					break;
			};
		};
	};
	

	function Bullet (x,y,targetx,targety){
		this.color = null;
		this.x = x;
		this.y = y;
		this.team = 0;
		this.angle = Math.atan2(targetx-x,targety-y) - Math.PI/2;	
		
		bulletList.push(this);
		
		this.tick = function(id){
			
			this.x += 10*Math.cos(this.angle);
			this.y -= 10*Math.sin(this.angle);
			
			context.fillStyle = "#FFFFFF";
			context.fillRect(this.x,this.y,5,5);
			
			if(this.x<0 || this.x>1280 || this.y<0 || this.y>720){
				bulletList.splice(id,1);
			}
		}
		
	}
	
	
	function OrbVanilla (x,y,targetx,targety,color) {
		this.color = color;
		this.x = x;
		this.y = y;
		this.team = 1;
		this.angle = Math.atan2(targetx-x,targety-y) - Math.PI/2;	
		
		bulletList.push(this);
		
		this.tick = function(id){
			
			this.x += 10*Math.cos(this.angle);
			this.y -= 10*Math.sin(this.angle);
			
			if(this.color == 1){
				context.drawImage(orbBlue,this.x,this.y);
			}
			else{
				context.drawImage(orbPink,this.x,this.y);
			}
			
			if(this.x<0 || this.x>1280 || this.y<0 || this.y>720){
				bulletList.splice(id,1);
			}
		}
		
	}
	
	function OrbFollow (x,y,targetx,targety,color) {
		this.color = color;
		this.x = x;
		this.y = y;
		this.team = 1;
		this.angle = Math.atan2(targetx-x,targety-y) - Math.PI/2;
		this.angleTarget = Math.atan2(targetx-x,targety-y) - Math.PI/2;
		this.speed = 3;
		this.giveUp = 100;

		
		bulletList.push(this);
		
		this.tick = function(id){
			targetx = guy.x;
			targety = guy.y;
			this.giveUp--;
			
			if(this.giveUp > 0){
				this.angleTarget = Math.atan2(targetx-this.x,targety-this.y) - Math.PI/2;	
			}
			
			this.angle += (this.angleTarget - this.angle) * 0.08;

			this.x += 14 * Math.cos(this.angle);
			this.y -= 14 * Math.sin(this.angle);
			
			
			context.save();
			context.translate(this.x+16,this.y+16);
			context.rotate(-this.angle);
			context.drawImage(follower,-16,-16);
			context.restore();

			
			if(this.x<0 || this.x>1280 || this.y<0 || this.y>720){
				bulletList.splice(id,1);
			}
		}
	}
	
	function OrbWander (x,y,color) {
		this.color = color;
		this.x = x;
		this.y = y;
		this.team = 1;
		this.angle = Math.random() * Math.PI * 2;
		this.curve = Math.random() * Math.PI * 2;
		this.transition = 0;
		this.coolDown = 25;
		
		bulletList.push(this);
		
		this.tick = function(id){
			this.coolDown--;
			
			if(this.transition<=1){
				this.transition+=0.05;
			}
			
			if(this.coolDown<0){
				this.transition = 0;
				this.curve = Math.random() * (Math.PI * 2);
				this.coolDown = 45;
			}
			
			this.angle += (this.curve - this.angle) * this.transition;
			
			this.x += 10 * Math.cos(this.angle);
			this.y -= 10 * Math.sin(this.angle);
			
			if(this.color == 1){
				context.drawImage(wandererBlue,this.x,this.y);
			}
			else{
				context.drawImage(wandererPink,this.x,this.y);
			}
			
			if(this.x<0 || this.x>1280 || this.y<0 || this.y>720){
				bulletList.splice(id,1);
			}
		}
		
	}
	

	function Player () {
		this.x = 64;
		this.y = 64;
		this.hspeed = 0;
		this.vspeed = 0;
		this.maxspeed = 0;
		this.accelerationRate = 0.1;
		this.deccelerationRate = 0.2;
		this.color = 1;
		this.angle = 0;
		this.colorCoolDown = 0;
		this.health = 10;

		this.check = function () {
			if ((clavier.haut || clavier.bas) && (clavier.gauche || clavier.droite)){
				this.maxspeed = 7;
			}
			else{
				this.maxspeed = 10;
			}
			
			if(clavier.haut){
				this.vspeed += (-this.maxspeed - this.vspeed)*this.accelerationRate;
			}
			if(clavier.bas){
				this.vspeed += (this.maxspeed - this.vspeed)*this.accelerationRate;
			}
			if(clavier.gauche){
				this.hspeed += (-this.maxspeed - this.hspeed)*this.accelerationRate;
			}
			if(clavier.droite){
				this.hspeed += (this.maxspeed - this.hspeed)*this.accelerationRate;
			}
			
			if(!(clavier.gauche || clavier.droite)){
				this.hspeed -= this.hspeed * this.deccelerationRate;
			}	
			if(!(clavier.haut || clavier.bas)){
				this.vspeed -= this.vspeed * this.deccelerationRate;
			}

			this.colorCoolDown--;
			if(clavier.space && this.colorCoolDown<0){
				this.color = 1 - this.color;
				this.colorCoolDown = 5;
			}
			
			if(this.x < 10){
				this.hspeed = 5;
			}
			if(this.x > 1250){
				this.hspeed = -5;
			}
			if(this.y < 10){
				this.vspeed = 5;
			}
			if(this.y > 690){
				this.vspeed = -5;
			}
			
			this.x += this.hspeed;
			this.y += this.vspeed;	
			
			if(click){
				this.shoot();
			}
			this.angle = Math.atan2(mousePos.y-this.y,mousePos.x-this.x) + Math.PI/2;
			
			for(i=bulletList.length-1;i>0;i--){
				if(collisionRectangles(this.x,this.y,32,32,bulletList[i].x,bulletList[i].y,32,32) && (bulletList[i].team == 1) && (bulletList[i].color == this.color)){		
					this.health--;
					bulletList.splice(i,1);
				}				
			}
		}
		
		this.shoot = function (){
			pow = new Bullet(this.x+16,this.y+16,mousePos.x,mousePos.y);
		}
		
		this.draw = function () {
			context.save();
			
			context.translate(this.x+16,this.y+16);
			
			context.rotate(this.angle);
			
			if(this.color){
				context.drawImage(shipPink,0,0,32,32,-16,-16,32,32);
			}
			else{
				context.drawImage(shipBlue,0,0,32,32,-16,-16,32,32);
			}
			
			context.restore();
						
			context.fillStyle = "#00FF00";
			context.fillRect(this.x - ((this.health / 10) * 32) + 16,this.y + 32,((this.health / 10) * 64), 6)
		}
		
		this.tick = function () {
			this.check();
			this.draw();
		}
	}
	
	
	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
        };
    }
    canvas.addEventListener('mousemove', function(evt) {
		mousePos = getMousePos(canvas, evt);
        //console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y)
    }, false);
	canvas.addEventListener('mousedown', function(evt) {
		click = 1;
    }, false);
	canvas.addEventListener('mouseup', function(evt) {
		click = 0;
    }, false);


	function collisionRectangles(x1,y1,w1,h1,x2,y2,w2,h2){
		if(((x1<x2 && x2<(x1+w1)) || (x2<x1 && x1<(x2+w2))) && ((y1<y2 && y2<(y1+h1)) || (y2<y1) && (y1<(y2+h2)))){
			return true;
		}
	}
	function collisionPointToRectangle(x1,y1,x2,y2,w2,h2){
		if((x2<x1 && x1<(x2+w2)) && (y2<y1 && y1<(y2+h2))){
			return true;
		}
	}
	
	clavier = new Clavier();

	guy = new Player();
	meanie = new Ennemy(324,321,64,43);
	death = new Boss(600,400,64,110,499);

	
	
	setInterval(loop,30);
	
	function loop(){
		context.fillStyle = "#000000";
		context.fillRect(0,0,1280,720);
		
		

		guy.tick();
		if(bulletList.length!=0){
			for(i=bulletList.length-1;i>0;i--){
				bulletList[i].tick(i);
			}
		}
		
		if(ennemyList.length!=0){
			for(z=ennemyList.length-1;z>0;z--){
				ennemyList[z].tick(z);
			}
		}
	}
}
