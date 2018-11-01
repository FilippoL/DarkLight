function DarkLightGame()
{


	//VARIABLES
	var _this = this;
	var canvas = document.getElementById("mycanvas");
	ctx = canvas.getContext("2d");
	this.pause = false;
	var width = 700;
	var height = 700;
	var tutorialtimer = 0;

	var pulse = 0;

	var initialised = false;
	var keysDown = {};
	var timeAnimate;

	var walls = [];
	var lightwaves = [];
	var particles = [];
	var rocks = [];
	var holes = [];
	var buttons = [];

	var floor = new Image();
	var heart = new Image();
	var level1 = new Image();
	var heartbox = new Image();

	var playbutton = new Image();
	playbutton.src = "Assets/UI/play_small.png"
	heartbox.src = "Assets/UI/Life_bg_small.png";

	heart.src = "Assets/UI/Life.png";
	level1.src = "pics/LEVEL_01/LEVEL_Wall_01.png";

	var stonebox = new Image();
	stonebox.src = "Assets/UI/Stone_bg.png";

	var stone = new Image();
	stone.src = "Assets/UI/Stone.png";

	var smallstone = new Image()
	smallstone.src = "Assets/UI/Stone_small.png";

	var wallstextures = [];

	var levellabel = new Image();


	var music = new Audio("music/music.mp3");


	var wide2 = new Image();
	wide2.src = "pics/Walls/wide-2.png";

	var wide3 = new Image();
	wide3.src = "pics/Walls/wide-3.png";

	var wide4 = new Image();
	wide4.src = "pics/Walls/wide-4.png";

	var wide5 = new Image();
	wide5.src = "pics/Walls/wide-5.png";

	var wide7 = new Image();
	wide7.src = "pics/Walls/wide-7.png";

	var wide8 = new Image();
	wide8.src = "pics/Walls/wide-8.png";

	var wide9 = new Image();
	wide9.src = "pics/Walls/wide-9.png";

	var wide12 = new Image();
	wide12.src = "pics/Walls/wide-12.png";

	var wide14 = new Image();
	wide14.src = "pics/Walls/wide-14.png";

	var wide16 = new Image();
	wide16.src = "pics/Walls/wide-16.png";

	var wide17 = new Image();
	wide17.src = "pics/Walls/wide-17.png";

	var wide18 = new Image();
	wide18.src = "pics/Walls/wide-18.png";

	var wide19 = new Image();
	wide19.src = "pics/Walls/wide-19.png";

	var wide23 = new Image();
	wide23.src = "pics/Walls/wide-23.png";

	var tall2 = new Image();
	tall2.src = "pics/Walls/tall-2.png";

	var tall3 = new Image();
	tall3.src = "pics/Walls/tall-3.png";

	var tall5 = new Image();
	tall5.src = "pics/Walls/tall-5.png";

	var tall8 = new Image();
	tall8.src = "pics/Walls/tall-8.png";

	var tall9 = new Image();
	tall9.src = "pics/Walls/tall-9.png";

	var tall10 = new Image();
	tall10.src = "pics/Walls/tall-10.png";

	var tall12 = new Image();
	tall12.src = "pics/Walls/tall-12.png";

	var tall15 = new Image();
	tall15.src = "pics/Walls/tall-15.png";

	var tall16 = new Image();
	tall16.src = "pics/Walls/tall-16.png";

	var tall17 = new Image();
	tall17.src = "pics/Walls/tall-17.png";

	var tall18 = new Image();
	tall18.src = "pics/Walls/tall-18.png";

	var tall19 = new Image();
	tall19.src = "pics/Walls/tall-19.png";

	var tall23 = new Image();
	tall23.src = "pics/Walls/tall-23.png";

	//Player Anmination Frames
	var walkFrames = new Array();
	var dieFrames = new Array();

	for (var i = 0; i < 12; i++)
		{
			walkFrames.push(new Image());
			dieFrames.push(new Image());

			walkFrames[i].src ="Assets/PLAYER_ANIM/Character_Walk/Character_Walk_"+i+".png";
			dieFrames [i].src ="Assets/PLAYER_ANIM/Character_Die/Character_Die_"  +i+".png";
		}
	var gamestate =0;
	//0 - MENU
	//1 - GAME
	//2 -

	//////////////////////VARIABLES OF EVENTS

	var mx, my; //X AND Y OF MOUSE CLICK
	var mouseX, mouseY; //X AND Y OF MOUSE POSITION

	//EVENT LISTENERS

	window.addEventListener('keydown', function(e)		//Event listener for key presses
		{
			keysDown[e.keyCode] = true, false;

		});
	window.addEventListener('keyup', function(e)		//Event listener for key releases
		{
			delete keysDown[e.keyCode];

		});

	music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

	//LISENING FOR MOUSE EVENT
	canvas.addEventListener('click', function canvas_click(ev)  //Detecting mouse CLICK
	{

	mx = ev.clientX - canvas.offsetLeft; //Pointer Horizontal coord - Pixels off set from Left
	my = ev.clientY - canvas.offsetTop;  //Pointer Vertical coord - Pixels off set from Right

	switch (gamestate)
	{
		case 0:
		var lightwave = new Lightwave(mx, my, 300, 2);
		lightwave.create();
		lightwaves.push(lightwave);

		if (mx > buttons[0].x && mx < buttons[0].x + buttons[0].width
			&& my > buttons[0].y && my < buttons[0].y + buttons[0].height)
		{
			gamestate =1;
			SetFloorTexture();
			SetUpLevel();

			lightwaves.splice(0, lightwaves.length);
			rocks.splice(0, rocks.length);
		}

		break;
		case 1:
		case 2:
		case 3:
		case 4:
		{
			var dy, dx;
			dy = my - Player.y;
			dx = mx - Player.x;
			var angle = Math.atan2(-dy, dx) + Math.PI/2;
			//if (angle < 0) angle = 360 + angle;
			textangle = angle;

			if (Player.canshoot && Player.stones > 0)
			{

				var rock = new Rock(Player.x, Player.y, angle);
				rocks.push(rock);
				Player.canshoot = !Player.canshoot;
				Player.delay = 100;
				Player.stones -= 1;
			}
			break;
		}

	}

	//var lightwave = new Lightwave (mx, my);
	//lightwave.create();
	//lightwaves.push(lightwave);

	//for (var i = 0; i < 8; i++)
	{
		/*var particle = new Particle(mx, my, i * toRadians( 45), i, mousetimes);
		particles.push(particle);*/
	}

	});

	canvas.addEventListener('mousemove',function canvas_mousemove(ev) //Detecting mouse position (X,Y)
	{

	mouseX = ev.clientX - canvas.offsetLeft; //Pointer Horizontal coord - Pixels off set from Left
	mouseY = ev.clientY - canvas.offsetTop; //Pointer Vertical coord - Pixels off set from Right

	});

	document.onkeydown = function(scrollLock)			//Disables scrolling on page caused by using the arrow keys
	{
		scrollLock = scrollLock || window.event;
		var keyCode = scrollLock.keyCode;
		if (keyCode >= 37 && keyCode <= 40 || keyCode == 32)
		{
			return false;
		}
	};

	if ( window.addEventListener ) 						//Event listener for Konami code input
		{
			var state1 = 0;
			var konami = [38,38,40,40,37,39,37,39,66,65];
		  	window.addEventListener("keydown", function(e)
		  	{
			    if (e.keyCode == konami[state1])
			    {
			    	state1++;
			    }
			    else
			    {
			    	state1 = 0;
			    }
			    if ( state1 == 10 )
			    {

			    	/*var popup = new Popup(50, 400, "Well done, cheater!");
					popups.push(popup);
			    	konamiactive = true;
			    	konamitimes += 1;*/
			    	for (var i =0; i < walls.length; i++)
			    	{
			    		walls[i].a = 10000;
			    	}
			  	}
			},
		true);
	}

	//FUNCTION DEFINITIONS

	var Player =
	{
		x: 500,
		y: height/2,
		rotation: 0,
		stones: 5,
		facing: 0,
		lives: 3,
		speed: 4,
		delay: 20,
		canshoot: true,
		flicker: 0.01,
		animdelay: 5,
		animtimer: 0,
		anim_playframe:0,
		anim_deathframe:0,
		animDie_play:false,
		moving:false,

		draw: function()
		{

			if (this.animDie_play==false && this.moving==false)
			{

				var dy, dx;
				dy = -(mouseY - Player.y);
				dx = -(mouseX - Player.x);
				var angle = Math.atan2(-dy, dx) + Math.PI/2;

				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.rotate(-angle);
				ctx.translate(-this.x, -this.y);

				ctx.drawImage(walkFrames[0], this.x-100, this.y-100);
				ctx.restore();

				this.animtimer++;
				if (this.animtimer > this.animdelay)
				{
					this.animtimer = 0;
					this.anim_playframe++;
				}

				if(this.anim_playframe>11){this.anim_playframe=0;}
			}
			if (this.animDie_play==false && this.moving==true)
			{
				this.anim_deathframe = 0;
				var dy, dx;
				dy = -(mouseY - Player.y);
				dx = -(mouseX - Player.x);
				var angle = Math.atan2(-dy, dx) + Math.PI/2;

				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.rotate(-angle);
				ctx.translate(-this.x, -this.y);

				ctx.drawImage(walkFrames[this.anim_playframe], this.x-100, this.y-100);
				ctx.restore();

				this.animtimer++;
				if (this.animtimer > this.animdelay - 2)
				{
					this.animtimer = 0;
					this.anim_playframe++;
				}

				if(this.anim_playframe>11){this.anim_playframe=0;}
			}
			else if (this.animDie_play==true)
			{
				ctx.drawImage(dieFrames[this.anim_deathframe], this.x-100, this.y-100);
				this.animtimer++;
				if (this.animtimer > this.animdelay-3)
				{
					this.animtimer = 0;
					this.anim_deathframe++;
				}
				if(this.anim_deathframe>11)
				{
					this.anim_deathframe=0;
					this.animDie_play=false;
					Player.lives -= 1;
					switch (gamestate)
					{
						case 1:
						this.x = 50;
						this.y = 300;
						break;

						case 2:
						this.x = 130;
						this.y = 550;
						break;

						case 3:
						this.x = 520;
						this.y = 60;
						break;

						case 4:
						this.x= 70;
						this.y = 540;
						break;
					}
				}
			}

			var gradient;
			 // Create gradient
		      gradient = ctx.createRadialGradient(Player.x, Player.y, 5, Player.x + Math.sin(Player.flicker) * 10, Player.y +Math.cos(Player.flicker) * 5, 100 + 8 *Math.sin(Player.flicker));

		      // Add colors
		      gradient.addColorStop(0.000, 'rgba(155, 65, 0, 0)');
		      gradient.addColorStop(1.000, 'rgba(0, 0, 0, 1.000)');

		      // Fill with gradient
		      ctx.fillStyle = gradient;
		      ctx.fillRect(0, 0, width, height);
		},
		displayValues: function()
		{
			var size = 20;
			ctx.drawImage(heartbox, 28, height- 75);
			for (var i = 0; i < Player.lives; i++)
			{
				ctx.beginPath();
				ctx.drawImage(heart, 50 + 35*i, height - 50);
				ctx.closePath();
			}

			ctx.drawImage(stonebox, height-170, width -90);
			ctx.drawImage(stone, height-140, width -57);

			ctx.font = "25px Pixellari";
			if (Player.stones > 0)
			{
				ctx.fillStyle = "black";
			}
			else
			{
				ctx.fillStyle = "red";
			}
			ctx.fillText("x " + Player.stones, width - 100, height - 35);
			ctx.lineWidth = 1;
		},
		move: function(dt)
		{
			if (!this.animDie_play)
			{
				if (65 in keysDown)	//A
				{
					if (Player.x > 5)
					{
						this.moving=true;
						Player.x -= Player.speed; //* dt;
					}
				}

				else if (83 in keysDown) //S
				{
					if (Player.y < height )
					{

						this.moving=true;
						Player.y += Player.speed; //* dt;
					}
				}
				else if (87 in keysDown ) // W
				{
					if (Player.y > 5)
					{
						this.moving=true;
						Player.y -= Player.speed;
					}
				}
				else if (68 in keysDown) //d
				{
					if (Player.x < width)
					{
						this.moving=true;
						Player.x += Player.speed;
					}
				}
				else{this.moving=false;}
			}

		},
		update(dt)
		{
			Player.flicker += 0.04;
			Player.delay -= 1;
			if (Player.delay <= 0)
			{
				Player.canshoot = true;
			}

		}
	}


	var Button = function(x,y, width, height, text)
	{
		this.x = x,
		this.y = y,
		this.width = width,			//drawn from middle
		this.height = height,				//drawn from middle
		this.opacity = 0,
		this.text = text,
		this.image = new Image(),


		this.setup = function(src)
		{
			this.image.src = src;
		}
		this.draw = function()
		{
			/*ctx.strokeStyle = 'rgba(255, 0,0,' + this.opacity + ')';
			ctx.beginPath();
			ctx.moveTo(this.x - (this.width / 2), this.y - (this.height /2));
			ctx.lineTo(this.x + (this.width / 2), this.y - (this.height /2));
			ctx.lineTo(this.x + (this.width / 2), this.y + (this.height /2));
			ctx.lineTo(this.x - (this.width / 2), this.y + (this.height /2));
			ctx.closePath();
			ctx.stroke();*/

			/*ctx.lineWidth = 0.5;
			ctx.strokeStyle = 'rgba(255, 0,0,1)';
			ctx.beginPath();
			ctx.moveTo(this.x  , this.y  );
			ctx.lineTo(this.x + this.width , this.y  );
			ctx.lineTo(this.x + this.width, this.y + this.height);
			ctx.lineTo(this.x  , this.y + this.height );
			ctx.closePath();
			ctx.stroke();*/

			/*ctx.font = "70px Idilica Regular";
			ctx.fillStyle = 'rgba(255, 255,255,' + this.opacity + ')';
			ctx.fillText(this.text, this.x - (this.width / 2) + 50, this.y + 20);*/
			ctx.globalAlpha = this.opacity;
			ctx.drawImage(this.image, this.x, this.y);
			ctx.globalAlpha = 1;


			//ctx.lineWidth = 1;
			//ctx.fill();
		},
		this.update = function()
		{
			if (this.opacity > 0)
			{
				this.opacity -= 0.01;
			}
			if (this.opacity < 0)
			{
				this.opacity = 0;
			}
		}
	}

	var Wall = function(x, y, type)
	{
		this.x = x,
		this.y = y,
		this.length,
		this.width,
		this.r = 255,
		this.g = 255,
		this.b = 255,
		this.a = 0,
		this.type = type,
		this.angle = toRadians(0),

		this.setup = function()
		{
			if (this.type ==  "TALL-2")
			{
				this.length = 30;
				this.width = 60;
				return;
			}
			if (this.type ==  "TALL-3")
			{
				this.length = 30;
				this.width = 3*30;
				return;
			}
			if (this.type == "TALL-5")
			{
				this.length = 30;
				this.width = 150;
				return;
			}
			if (this.type == "TALL-8")
			{
				this.length = 30;
				this.width = 30*8;
				return;
			}
			if(this.type == "TALL-10")
			{
				this.length = 30;
				this.width = 30*10;
				return;
			}

			if(this.type == "TALL-12")
			{
				this.length = 30;
				this.width = 30*12;
				return;
			}
			if(this.type == "TALL-16")
			{
				this.length = 30;
				this.width = 30*16;
				return;
			}

			if (this.type ==  "WIDE-19")
			{
				this.length = 30*19;
				this.width = 30;
				return;
			}
			if (this.type == "TALL-15")
			{
				this.length = 30;
				this.width = 30*15;
				return;
			}
			if (this.type == "TALL-17")
			{
				this.length = 30;
				this.width = 30*17;
				return;
			}
			if (this.type ==  "TALL-18")
			{
				this.length = 30;
				this.width = 30*18;
				return;
			}
			if (this.type ==  "TALL-19")
			{
				this.length = 30;
				this.width = 30*19;
				return;
			}
			if (this.type ==  "TALL-23")
			{
				this.length = 30;
				this.width = 30*23;
				return;
			}
			if (this.type ==  "WIDE-12")
			{
				this.length = 30*12;
				this.width = 30;
				return;
			}
			if (this.type ==  "WIDE-14")
			{
				this.length = 30*14;
				this.width = 30;
				return;
			}
			if (this.type ==  "WIDE-16")
			{
				this.length = 30*16;
				this.width = 30;
				return;
			}
			if (this.type == "WIDE-2")
			{
				this.length = 30 * 2;
				this.width = 30;
				return;
			}
			if (this.type ==  "WIDE-3")
			{
				this.length = 30*3;
				this.width = 30;
				return;
			}
			if (this.type ==  "WIDE-4")
			{
				this.length = 30*4;
				this.width = 30;
				return;
			}
			if (this.type == "WIDE-5")
			{
				this.length = 30*5;
				this.width = 30;
				return;
			}
			if (this.type == "WIDE-7")
			{
				this.length = 30*7;
				this.width = 30;
				return;
			}
			if (this.type == "WIDE-8")
			{
				this.length = 30*8;
				this.width = 30;
				return;
			}
			if (this.type == "WIDE-9")
			{
				this.length = 30*9;
				this.width = 30;
				return;
			}
			if (this.type == "WIDE-23")
			{
				this.length = 30 * 23;
				this.width = 30;
				return;
			}
		},

		this.draw = function()
		{
			ctx.fillStyle = 'rgba(0,0,0,0.2)';
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.length, this.width);
			ctx.closePath();
			ctx.fill();

			ctx.save();
			ctx.globalAlpha = this.a;
			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle);
			ctx.translate(-this.x, -this.y);




			switch(this.type)
			{
				case "TALL-2":
				ctx.drawImage(tall2, this.x, this.y);
				break;

				case "TALL-3":
				ctx.drawImage(tall3, this.x, this.y);
				break;

				case "TALL-5":
				ctx.drawImage(tall5, this.x, this.y);
				break;

				case "TALL-8":
				ctx.drawImage(tall8, this.x, this.y);
				break;

				case "TALL-10":
				ctx.drawImage(tall10, this.x, this.y);
				break;

				case "TALL-12":
				ctx.drawImage(tall12, this.x, this.y);
				break;

				case "TALL-15":
				ctx.drawImage(tall15, this.x, this.y);
				break;

				case "TALL-16":
				ctx.drawImage(tall16, this.x, this.y);
				break;

				case "TALL-17":
				ctx.drawImage(tall17, this.x, this.y);
				break;

				case "TALL-18":
				ctx.drawImage(tall18, this.x, this.y);
				break;

				case "TALL-19":
				ctx.drawImage(tall19, this.x, this.y);
				break;

				case "TALL-23":
				ctx.drawImage(tall23, this.x, this.y);
				break;

				case "WIDE-2":
				ctx.drawImage(wide2, this.x, this.y);
				break;

				case "WIDE-3":
				ctx.drawImage(wide3, this.x, this.y);
				break;

				case "WIDE-4":
				ctx.drawImage(wide4, this.x, this.y);
				break;

				case "WIDE-5":
				ctx.drawImage(wide5, this.x, this.y);
				break;

				case "WIDE-7":
				ctx.drawImage(wide7, this.x, this.y);
				break;

				case "WIDE-8":
				ctx.drawImage(wide8, this.x, this.y);
				break;

				case "WIDE-9":
				ctx.drawImage(wide9, this.x, this.y);
				break;

				case "WIDE-10":
				ctx.drawImage(wide10, this.x, this.y);
				break;

				case "WIDE-12":
				ctx.drawImage(wide12, this.x, this.y);
				break;

				case "WIDE-14":
				ctx.drawImage(wide14, this.x, this.y);
				break;

				case "WIDE-16":
				ctx.drawImage(wide16, this.x, this.y);
				break;

				case "WIDE-17":
				ctx.drawImage(wide17, this.x, this.y);
				break;

				case "WIDE-18":
				ctx.drawImage(wide18, this.x, this.y);
				break;

				case "WIDE-19":
				ctx.drawImage(wide19, this.x, this.y);
				break;

				case "WIDE-23":
				ctx.drawImage(wide23, this.x, this.y);
				break;


			}

			ctx.restore();
			/*ctx.font = "30px Arial";
			ctx.fillStyle = "white";
			ctx.fillText(this.a, this.x, this.y);*/
		},
		this.update = function()
		{
			if (this.r > 0)
			{
				this.r -=2;
			}
			if (this.g > 0)
			{
				this.g -=2;
			}
			if (this.b > 0)
			{
				this.b -=2;
			}
			if (this.a > 0)
			{
				this.a -=0.01;
			}
			if (this.a < 0)
			{
				this.a = 0;
			}
			//this.angle += toRadians(1);
		}
	}

	var Hole = function(x,y, length, width)
	{
		this.x = x,
		this.y = y,
		this.length = length,
		this.width = width,
		this.opacity = 0,

		this.draw = function()
		{
			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.fillRect(this.x, this.y, this.length, this.width);
			ctx.closePath();

			ctx.strokeStyle = 'rgba(255,255,255,' + this.opacity + ')';
			ctx.beginPath();
			ctx.strokeRect(this.x, this.y, this.length,  this.width);
			ctx.closePath();
		},
		this.update = function()
		{
			if (this.opacity > 0)
			{
				this.opacity -= 0.05;
			}
		}
	}


	var Rock = function(x,y, angle)
	{
		this.x = x,
		this.y = y,
		this.angle = angle,
		this.speed = 5,
		this.waved = false;
		this.lifetime = 100,
		this.bounced = false,

		this.draw = function()
		{
			/*ctx.fillStyle = "red";
			ctx.beginPath();
			ctx.arc(this.x, this.y, 3, 0, Math.PI*2, false);
			ctx.closePath();
			ctx.fill();*/
			ctx.drawImage(smallstone, this.x, this.y);
		},
		this.update = function()
		{
			this.lifetime -= 1;
			this.x += this.speed * Math.sin(this.angle);
			this.y += this.speed * Math.cos(this.angle);
			if (this.speed > 0)
			{
				this.speed -= 0.1;
			}
			else
			{
				if (!this.waved)
				{
					var lightwave = new Lightwave(this.x, this.y, 90, 1.5);
					lightwave.create();
					lightwaves.push(lightwave);
					this.waved = true;
				}
				this.speed = 0;
			}
		}
	}

	var Lightwave = function(x,y,lifetime, multiplier)
	{
		this.startx = x,
		this.starty = y,
		this.size = 0.1,
		this.particles = [],
		this.thickness = 40,
		this.lifetime = lifetime,
		this.totallife = this.lifetime,
		this.theta = 0,
		this.particlecount = 360,
		this.create = function()
		{
			for (var i = 0; i < this.particlecount; i++)
			{
				var particle = new Particle(this.startx, this.starty, i* toRadians(360/this.particlecount), multiplier);	//use sin(i) for cool shit
				this.particles.push(particle);
			}
		}

		this.draw = function()
		{
			/*ctx.fillStyle = 'rgba(255,255,255, 0.2)';
			ctx.beginPath();
			ctx.arc(this.startx, this.starty, this.size, 0, Math.PI*2, false);
			ctx.closePath();
			ctx.fill();*/
			var constant = 1.2;

			ctx.strokeStyle = "rgba(255,255,255," + (constant + Math.sin(this.theta)) + ")";
			ctx.lineWidth = this.thickness;
			ctx.beginPath();

			for (var i =0; i< this.particles.length; i++)
			{
				ctx.lineTo(this.particles[i].x, this.particles[i].y);
			}

			ctx.closePath();
			ctx.stroke();
		},
		this.update = function()
		{
			//this.size += 0.2;
			this.thickness -= 0.5;
			this.lifetime -= 1;
			this.theta += 0.25;
		}


	}

	var CreditLightwave = function(x,y,lifetime, multiplier)
	{
		this.startx = x,
		this.starty = y,
		this.size = 0.1,
		this.particles = [],
		this.thickness = 40,
		this.lifetime = lifetime,
		this.totallife = this.lifetime,
		this.theta = 0,
		this.particlecount = 360,
		this.create = function()
		{
			for (var i = 0; i < this.particlecount; i++)
			{
				var particle = new Particle(this.startx, this.starty, i* toRadians(360/this.particlecount), Math.sin(i));	//use sin(i) for cool shit
				this.particles.push(particle);
			}
		}

		this.draw = function()
		{
			/*ctx.fillStyle = 'rgba(255,255,255, 0.2)';
			ctx.beginPath();
			ctx.arc(this.startx, this.starty, this.size, 0, Math.PI*2, false);
			ctx.closePath();
			ctx.fill();*/
			var constant = 1.2;

			ctx.strokeStyle = "rgba(255,255,255," + (constant + Math.sin(this.theta)) + ")";
			ctx.lineWidth = this.thickness;
			ctx.beginPath();

			for (var i =0; i< this.particles.length; i++)
			{
				ctx.lineTo(this.particles[i].x, this.particles[i].y);
			}

			ctx.closePath();
			ctx.stroke();
		},
		this.update = function()
		{
			//this.size += 0.2;
			this.thickness -= 0.5;
			this.lifetime -= 1;
			this.theta += 0.25;
		}


	}
	var Particle = function(x,y, angle, multiplier)
	{
		this.x = x,
		this.y = y,
		this.radius = 5,
		this.direction = angle,		//angle ( 0 is down, 180 is up)
		this.speed = 1,
		this.bounced = false,
		this.multiplier = multiplier,
		this.r = Math.floor(Math.random() * 255),
		this.g = Math.floor(Math.random() * 255),
		this.b = Math.floor(Math.random() * 255),

		this.draw = function()
		{
			/*ctx.fillStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
			ctx.closePath();
			ctx.fill();*/

			//ctx.font = "10px Arial";
			//ctx.fillText(this.id, this.x, this.y -5);
		},
		this.update = function()
		{
			this.x += this.speed * Math.sin(this.direction) * this.multiplier;
			this.y += this.speed * Math.cos(this.direction) * this.multiplier;
		}
	}



	/*function Button(x,y,w,h)
	{
		ctx.beginPath();
		 ctx.rect(x, y, w, h);
		 ctx.fillStyle = 'yellow';
		 ctx.fill();
		 ctx.lineWidth = 7;
		 ctx.strokeStyle = 'Red';
		 ctx.stroke();
		ctx.closePath();
	}*/

	function clear()
	{
		ctx.fillStyle = 'rgba(0,0,0,1)';
		ctx.beginPath();
		ctx.rect(0, 0, width, height);
		ctx.closePath();
		ctx.fill();
	}


	this.konamicheat = function()						//Konami code function
	{

	}


	function toDegrees(radians)
	{
		return radians * (180/Math.PI);
	}

	function toRadians(degrees)
	{
		return degrees * (Math.PI/180);
	}
																//1			//1
	function detectAngleCollision(	 ObjX,		 ObjY,		 ObjSizeX,	  ObjSizeY,   ObjAngle,
									 WallX,	 WallY,	 WallSizeX,  WallSizeY,  WallAngle )
	{
		/*ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.moveTo(WallX, WallY);
		ctx.lineTo( WallSizeX*Math.sin(WallAngle), WallY);
		ctx.lineTo(WallSizeX*Math.sin(WallAngle),WallY + WallSizeY*Math.cos(WallAngle));
		ctx.lineTo(WallSizeX*Math.sin(WallAngle), WallY);
		ctx.closePath();
		ctx.stroke();*/
		if ((vertexCheck(ObjX, WallX,WallSizeX*Math.sin(toRadians(90))) == true) && (vertexCheck(ObjY, WallY,WallSizeY*Math.cos(toRadians(90))) == true))
		{
			return angleSwap(ObjAngle, toRadians(90));
		}
		if ((vertexCheck(ObjX, WallX,WallSizeX*Math.sin(toRadians(90))) == true) && (vertexCheck(ObjY+ObjSizeY, WallY,WallSizeY*Math.cos(toRadians(90))) == true))
		{
			return angleSwap(ObjAngle, toRadians(90));
		}
		if ((vertexCheck(ObjX + ObjSizeX, WallX,WallSizeX*Math.sin(toRadians(90))) == true) && (vertexCheck(ObjY + ObjSizeY, WallY,WallSizeY*Math.cos(toRadians(90))) == true))
		{
			return angleSwap(ObjAngle, toRadians(90));
		}
		if ((vertexCheck(ObjX + ObjSizeX, WallX,WallSizeX*Math.sin(toRadians(90))) == true) && (vertexCheck(ObjY, WallY,WallSizeY*Math.cos(toRadians(90))) == true))
		{
			return angleSwap(ObjAngle, toRadians(90));
		}

	}

	function vertexCheck( VertexDimension,  CheckDimension1,  CheckDimension2)
	{
		if ((VertexDimension > CheckDimension1) && (VertexDimension < CheckDimension1 + CheckDimension2))
		{
			return true;
		}
	}

	function angleSwap( A, B)
	{
		var C = 180 - toDegrees(A) ;
		return (toRadians(C* 2)  + A + toRadians(90) - B);
	}

	function angleSwap2(A,B)
	{
		B = 180 - A ;
		return B* 2  + A + 90;
	}

	function DrawLevel()
	{
		switch (gamestate)
		{
			case 1:
			ctx.drawImage(level1label, this.width/2, 300);
			break;

			case 2:
			ctx.drawImage(level2label, this.width/2, 300);
			break;

			case 3:
			ctx.drawImage(level3label, this.width/2, 300);
			break;

			case 4:
			ctx.drawImage(level4label, this.width/2, 300);
			break;
		}
	}

	function Tutorial()
	{
		tutorialtimer++;
		switch(gamestate)
		{
			case 1:
			ctx.font = "18px Pixellari";
				ctx.fillStyle = "white";
			if (tutorialtimer < 100)
			{

				ctx.fillText("Walls are invisible and lethal", width/4 +30, height - 10);

			}
			if (tutorialtimer >100 && tutorialtimer < 200)
			{
				ctx.fillText("Throw rocks with left mouse button", width/4 +30, height - 10 );
			}
			if (tutorialtimer >200 && tutorialtimer < 300)
			{
				ctx.fillText("The sound waves will reveal walls", width/4 +30, height - 10);
			}
			if (tutorialtimer > 300)
			{
				tutorialtimer= 0;
			}
		}
	}


	function Collision()
	{
		switch(gamestate)
		{
			case 0:
			{
				for (var b = 0; b < buttons.length; b++)
				{
					for (var l = 0; l < lightwaves.length; l++)
					{
						for (var p = 0; p < lightwaves[l].particles.length; p++)
						{
							if (!lightwaves[l].particles[p].bounced)
							{
								if (lightwaves[l].particles[p].x > buttons[b].x &&  lightwaves[l].particles[p].x < buttons[b].x + buttons[b].width
									&& lightwaves[l].particles[p].y > buttons[b].y &&  lightwaves[l].particles[p].y < buttons[b].y + buttons[b].height)
								{

									lightwaves[l].particles[p].direction -= 180;
									buttons[b].opacity = 1;
									//lightwaves[l].particles[p].bounced = true;
								}
							}
						}
					}
				}
			}
			break;
			case 1:
			case 2:
			case 3:
			case 4:
			{
				for (var w = 0; w < walls.length; w++)
				{
					for (var l = 0; l < lightwaves.length; l++)
					{
						for (var p =0; p < lightwaves[l].particles.length; p++)
						{
							if (lightwaves[l].particles[p].x > walls[w].x && lightwaves[l].particles[p].x < walls[w].x + walls[w].length &&
								lightwaves[l].particles[p].y > walls[w].y && lightwaves[l].particles[p].y < walls[w].y + walls[w].width)
							{
								if (!lightwaves[l].particles[p].bounced)
								{
									lightwaves[l].particles[p].direction = angleSwap(lightwaves[l].particles[p].direction, walls[w].angle) + toRadians(90);
									// detectAngleCollision(lightwaves[l].particles[p].x, lightwaves[l].particles[p].y, 0, 0, lightwaves[l].particles[p].direction,
														//walls[w].x, walls[w].y, walls[w].length, walls[w].width, walls[w].angle) - toRadians(45);
									lightwaves[l].particles[p].bounced = true;


								}
								/*walls[w].r = 255;
								walls[w].g = 255;
								walls[w].b = 255;*/
								walls[w].a = 1;
							}
						}
					}
					for (var r = 0; r < rocks.length; r++)
					{
						if (!rocks[r].bounced)
						{
							if (rocks[r].x > walls[w].x && rocks[r].x < walls[w].x + walls[w].length &&
								rocks[r].y > walls[w].y && rocks[r].y < walls[w].y + walls[w].width)
							{
								/*rocks[r].angle = detectAngleCollision(rocks[r].x, rocks[r].y, 0, 0, rocks[r].angle,
													walls[w].x, walls[w].y, walls[w].length, walls[w].width, walls[w].angle) - toRadians(45);*/
								rocks[r].angle = angleSwap(rocks[r].angle, walls[w].angle) + toRadians(90);
								rocks[r].bounced = true;
								/*walls[w].r = 255;
								walls[w].g = 0;
								walls[w].b = 0;*/
								walls[w].a = 1;
								var lightwave = new Lightwave(rocks[r].x, rocks[r].y, 100, 0.5);
								lightwave.create();
								lightwaves.push(lightwave);

							}
						}
					}
					if (Player.x > walls[w].x && Player.x < walls[w].x + walls[w].length &&
						Player.y > walls[w].y && Player.y < walls[w].y + walls[w].width)
						{
							/*var lightwave = new Lightwave(Player.x, Player.y, 300, 2);
							lightwave.create();
							lightwaves.push(lightwave);*/
							//Player.x = 20;
							//Player.y = height/2;

							Player.animDie_play=true;


						}
				}
				for (var h = 0; h < holes.length; h++)
				{
					for (var l = 0; l < lightwaves.length; l++)
					{
						for (var p = 0; p < lightwaves[l].particles.length; p++)
						{
							if (lightwaves[l].particles[p].x > holes[h].x && lightwaves[l].particles[p].x < holes[h].x + holes[h].length
								&& lightwaves[l].particles[p].y > holes[h].y && lightwaves[l].particles[p].y < holes[h].y + holes[h].width)
							{
								holes[h].opacity = 2;
								lightwaves[l].particles[p].speed = 0.5;
							}
							else
							{
								lightwaves[l].particles[p].speed = 1;
							}
						}
					}
				}
			}
		}


	}

	var Title =
	{
		x: width / 2 - 170,
		y: height/2 - 200,
		text: "Dark Light",
		theta: 0.01,
		constant: 1.2,

		draw: function()
		{
			ctx.font = "100px Idilica Regular";
			ctx.fillStyle = 'rgba(255,255,255,' + (this.constant + Math.sin(this.theta)) + ')';
			ctx.fillText(this.text, this.x, this.y);
			this.theta += 0.1;
		}



	}

	var Win =
	{
		x: width / 2 - 330,
		y: height/2 - 200,
		text: "Congratulations",
		theta: 0.01,
		constant: 1.2,

		draw: function()
		{
			ctx.font = "100px Idilica Regular";
			ctx.fillStyle = 'rgba(255,255,255,' + (this.constant + Math.sin(this.theta)) + ')';
			ctx.fillText(this.text, this.x, this.y);
			this.theta += 0.1;

			ctx.font = "20px Pixellari";
			ctx.fillText("Press space to start over", width/2 - 50, height - 100);

			Player.lives =3
		}



	}

	var GameOver =
	{
		x: width / 2 -150,
		y: height/2 - 200,
		text: "Game Over",
		theta: 0.01,
		constant: 1.2,

		draw: function()
		{
			ctx.font = "100px Idilica Regular";
			ctx.fillStyle = 'rgba(255,255,255,' + (this.constant + Math.sin(this.theta)) + ')';
			ctx.fillText(this.text, this.x, this.y);
			this.theta += 0.1;

			ctx.font = "20px Pixellari";
			ctx.fillText("Press space to start over", width/2 - 50, height - 100);

			Player.lives = 3;
		}



	}

	function Draw(dt)
	{

		switch (gamestate)
		{


			case 0:
			{
				pulse++;
				if (pulse >200)
				{
					pulse = 0;
					var lightwave = new Lightwave(425, 115, 500, 1 + Math.random() * 2);
					lightwave.create();
					lightwaves.push(lightwave);
				}
				Title.draw();
				for (var b = 0; b < buttons.length; b++)
				{
					buttons[b].draw();
				}
				for (var l = 0; l < lightwaves.length; l++)
				{
					for (var p = 0; p < lightwaves[l].particles.length; p++)
					{
						lightwaves[l].particles[p].draw();
					}
					lightwaves[l].draw();
					ctx.lineWidth = 1;
				}

				//Button(50, 50, 50, 50);

			}
			break;
			case 1:
			case 2:
			case 3:
			case 4:

			{
				ctx.drawImage(floor, 0,0);

				Player.draw();

				for (var r= 0; r < rocks.length; r++)
				{
					rocks[r].draw();
				}
				for (var h = 0; h < holes.length; h++)
				{
					holes[h].draw();
				}
				for (var i = 0; i < walls.length; i++)
				{
					walls[i].draw();
					walls[i].update();
				}

				for (var i = 0; i < lightwaves.length; i++)
				{
					for (var p = 0; p < lightwaves[i].particles.length; p++)
					{
						lightwaves[i].particles[p].draw();
					}
					lightwaves[i].draw();
					ctx.lineWidth = 1;
				}
				ctx.drawImage(levellabel, 300, 10);
				Player.displayValues();
				//ctx.fillText(textangle, mx+10, my+10);
				//ctx.fillStyle = "white";
				//ctx.fillText(Player.x + "," + Player.y, Player.x, Player.y);

				//ctx.drawImage(level1, -10,-10);
				/*for (var rows = 0; rows < 700; rows+= 30)
				{
					ctx.beginPath();
					ctx.moveTo(0, rows);
					ctx.lineTo(width, rows);
					ctx.stroke();

				}
				for (var columns = 0; columns < 700; columns+= 30)
				{
					ctx.beginPath();
					ctx.moveTo(columns, 0);
					ctx.lineTo(columns, height);
					ctx.stroke();

				}*/
				Tutorial();
				break;

			}
			case 5:
			{
				pulse++;
				if (pulse >200)
				{
					pulse = 0;
					var lightwave = new CreditLightwave(Math.random() * width, Math.random() * height, 500, 3);
					lightwave.create();
					lightwaves.push(lightwave);
				}
				Win.draw();

				for (var l = 0; l < lightwaves.length; l++)
				{
					for (var p = 0; p < lightwaves[l].particles.length; p++)
					{
						lightwaves[l].particles[p].draw();
					}
					lightwaves[l].draw();
					ctx.lineWidth = 1;
				}
			}
			break;
			case -1:
				{

				GameOver.draw();

				}


		}




		/*ctx.beginPath();
		ctx.arc(mouseX, mouseY, 5, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.fill();*/


		/*var size = 10;
		ctx.beginPath();
		ctx.fillRect(mx-size, my-size, size*2, size*2);
		ctx.closePath();*/
	}
	function Update(dt)
	{
		switch(gamestate)
		{
			case 0:
			{
				Collision();
				for (var l = 0; l < lightwaves.length; l++)
				{
					for (var p = 0; p < lightwaves[l].particles.length; p++)
					{
						lightwaves[l].particles[p].update();
					}
					lightwaves[l].update();
					if (lightwaves[l].lifetime <= 0)
					{
						lightwaves.splice(l, 1);
					}
				}
				for (var b = 0; b < buttons.length; b++)
				{
					buttons[b].update();
				}
				break;
			}
			case 1:
			case 2:
			case 3:
			case 4:
			{
				Player.move(dt);
				Player.update(dt);

				Collision();

				for (var i = 0; i < lightwaves.length; i++)
				{
					for (var p = 0; p < lightwaves[i].particles.length; p++)
					{
						lightwaves[i].particles[p].update();
					}
					lightwaves[i].update();
					if (lightwaves[i].lifetime <= 0)
					{
						lightwaves.splice(i, 1);
					}
				}
				/*for (var i = 0; i < particles.length; i++)
				{
						particles[i].update();
				}*/
				for (var r = 0; r < rocks.length; r++)
				{
					rocks[r].update();
					if (rocks[r].lifetime <= 0)
					{
						rocks.splice(r,1);
					}
				}
				for (var h = 0; h < holes.length; h++)
				{
					holes[h].update();
				}
				if (Player.lives < 0)
				{
					gamestate = -1;
				}
				switch (gamestate)
				{
					case 1:
					if (Player.x > width -5)
					{
					 	gamestate = 2;
						walls.splice(0, walls.length);
					 	lightwaves.splice(0, lightwaves.length);
					 	rocks.splice(0, rocks.length);
						SetUpLevel();
						SetFloorTexture();
					}
					break;
					case 2:
					if (Player.x > width -5)
					{
					 	gamestate = 3;
						walls.splice(0, walls.length);
					 	lightwaves.splice(0, lightwaves.length);
					 	rocks.splice(0, rocks.length);
						SetUpLevel();
						SetFloorTexture();
					}
					break;
					case 3:
					{
						if (Player.x > 335 && Player.x < 450 && Player.y > 300 && Player.y < 440)
						{
						 	gamestate = 4;
							walls.splice(0, walls.length);
						 	lightwaves.splice(0, lightwaves.length);
						 	rocks.splice(0, rocks.length);
							SetUpLevel();
							SetFloorTexture();
						}

					}
					break;
					case 4:
						if (Player.y < 10)
						{
							gamestate =5;
							walls.splice(0, walls.length);
						 	lightwaves.splice(0, lightwaves.length);
						 	rocks.splice(0, rocks.length);
						}
						break;
					}


			}
			case 5:
			for (var l = 0; l < lightwaves.length; l++)
				{
					for (var p = 0; p < lightwaves[l].particles.length; p++)
					{
						lightwaves[l].particles[p].update();
					}
					lightwaves[l].update();
					if (lightwaves[l].lifetime <= 0)
					{
						lightwaves.splice(l, 1);
					}
				}
				break;
			//any other cases
		}



	}

	this.Setup = function()
	{
		//var wall = new Wall(1, 200);

		var button1 = new Button(width/2 - 80, height/2, 158,77, "PLAY");
		button1.setup("Assets/UI/play_small.png");
		buttons.push(button1);

		music.play();







	}

	function SetFloorTexture()
	{

		floor.src = "pics/LEVEL_01/LEVEL_BG_01.png";



	}

	function SetUpLevel()
	{
		var tile = 30;
		Player.stones = 5;
		walls.splice(0, walls.length);
		switch (gamestate)
		{
		case 1:

			Player.x = 50;
			Player.y = 300;
			levellabel.src = "Assets/LEVELS/Level_01_s.png";



			var wall1 = new Wall(0,0,"WIDE-23");
			var wall2 = new Wall(0,0,"TALL-8");
			var wall3 = new Wall(0, tile*8, "WIDE-2");

			var wall4 = new Wall(0, tile*11, "WIDE-2");
			var wall5 = new Wall(0, tile*12, "TALL-8");
			var wall6 = new Wall(0, tile*20, "WIDE-23");
			var wall7 = new Wall(tile*22, 0, "TALL-8");
			var wall8 = new Wall(tile*21, tile*8, "WIDE-2");

			var wall9 = new Wall(tile*21, tile*11, "WIDE-2");
			var wall10 = new Wall(tile*22, tile*12, "TALL-8");
			var wall11 = new Wall(tile*11, tile*6, "TALL-8");


			walls.push(wall1);
			walls.push(wall2);
			walls.push(wall3);
			walls.push(wall4);
			walls.push(wall5);
			walls.push(wall6);
			walls.push(wall7);
			walls.push(wall8);
			walls.push(wall9);
			walls.push(wall10);
			walls.push(wall11);


			for (var i = 0; i < walls.length; i++)
			{
				walls[i].setup();
			}

		break;
		case 3:

			Player.x = 560;
			Player.y = 590;
			levellabel.src = "Assets/LEVELS/Level_03_s.png";
			var wall1 = new Wall(0, tile*2, "WIDE-3");
			var wall2 = new Wall(0, tile*3, "TALL-19");
			var wall3 = new Wall(0, tile*22, "WIDE-23");
			var wall4 = new Wall(tile*22, tile*20, "TALL-2");
			var wall5 = new Wall(tile*20, tile*20, "WIDE-2");

			var wall6 = new Wall(tile*20, tile*18, "WIDE-2");
			var wall7 = new Wall(tile*22, 0, "TALL-19");
			var wall8 = new Wall(tile*3, 0, "WIDE-19");
			var wall9 = new Wall(tile*10, tile*15, "WIDE-12");
			var wall10 = new Wall(tile*10, tile*10, "TALL-5");
			var wall11 = new Wall(tile*10, tile*9, "WIDE-2");
			var wall12 = new Wall(tile*14, tile*9, "WIDE-2");
			var wall13 = new Wall(tile*15, tile*10, "TALL-5");
			var wall14 = new Wall(tile*3, 0, "TALL-3")

			walls.push(wall1);
			walls.push(wall2);
			walls.push(wall3);
			walls.push(wall4);
			walls.push(wall5);
			walls.push(wall6);
			walls.push(wall7);
			walls.push(wall8);
			walls.push(wall9);
			walls.push(wall10);
			walls.push(wall11);
			walls.push(wall12);
			walls.push(wall13);
			walls.push(wall14);


			for (var i = 0; i < walls.length; i++)
			{
				walls[i].setup();
			}

		break;
		case 2:
			Player.x = 80;
			Player.y = 550;
			levellabel.src = "Assets/LEVELS/Level_02_s.png";

			var wall1 = new Wall(tile, 0, "WIDE-9");
			var wall2 = new Wall(tile*10,0, "TALL-10");
			var wall3 = new Wall(tile*10, tile*10, "WIDE-5");
			var wall4 = new Wall(tile*15, tile, "TALL-10");
			var wall18 = new Wall(tile*15, 0, "WIDE-8");
			var wall5 = new Wall(tile*22, tile, "TALL-3");
			var wall6 = new Wall(tile*20, tile*3, "WIDE-2");

			var wall7 = new Wall(tile*20, tile*6, "WIDE-2");
			var wall8 = new Wall(tile*22, tile*6, "TALL-17");
			var wall9 = new Wall(tile*13, tile*22, "WIDE-9");
			var wall10 = new Wall(tile*12, tile*13, "TALL-10");
			var wall11 = new Wall(tile*7, tile*13, "WIDE-5");
			var wall12 = new Wall(tile*6, tile*13, "TALL-10");
			var wall13 = new Wall(0, tile*22, "WIDE-7");
			var wall14 = new Wall(0, tile*19, "TALL-3");
			var wall15 = new Wall(0, tile*19, "WIDE-2");
			var wall16 = new Wall(0, tile*17, "WIDE-2");
			var wall17 = new Wall(0,0, "TALL-17");


			walls.push(wall1);
			walls.push(wall2);
			walls.push(wall3);
			walls.push(wall4);
			walls.push(wall5);
			walls.push(wall6);
			walls.push(wall7);
			walls.push(wall8);
			walls.push(wall9);
			walls.push(wall10);
			walls.push(wall11);
			walls.push(wall12);
			walls.push(wall13);
			walls.push(wall14);
			walls.push(wall15);
			walls.push(wall16);
			walls.push(wall17);
			walls.push(wall18);

			for (var i = 0; i < walls.length; i++)
			{
				walls[i].setup();
			}



		break;

		case 4:

			Player.x = 60;
			Player.y = 540;
			levellabel.src = "Assets/LEVELS/Level_04_s.png";

			var wall1 = new Wall(0, 0, "TALL-16");
			var wall2 = new Wall(0, tile*16, "WIDE-2");

			var wall3 = new Wall(0, tile*19, "WIDE-2");
			var wall4 = new Wall(0, tile*20, "TALL-2");
			var wall5 = new Wall(0, tile*22, "WIDE-23");
			var wall6 = new Wall(0, 0, "WIDE-14");
			var wall7 = new Wall(tile*14, 0, "TALL-2");
			var wall8 = new Wall(tile*17, 0, "TALL-2");
			var wall9 = new Wall(tile*18, 0, "WIDE-4");
			var wall10 = new Wall(tile*22, 0, "TALL-23");
			var wall11 = new Wall(tile*20, 0, "TALL-12");
			var wall12 = new Wall(tile*12, 0, "TALL-15");
			var wall13 = new Wall(tile*6, 0, "TALL-18");

			walls.push(wall1);
			walls.push(wall2);
			walls.push(wall3);
			walls.push(wall4);
			walls.push(wall5);
			walls.push(wall6);
			walls.push(wall7);
			walls.push(wall8);
			walls.push(wall9);
			walls.push(wall10);
			walls.push(wall11);
			walls.push(wall12);
			walls.push(wall13);

		for (var i = 0; i < walls.length; i++)
			{
				walls[i].setup();
			}


		break;
		}
	}



	this.gameLoop = function()							///MAIN GAME LOOP
	{

		if (_this.pause == false)
		{
			loop = requestAnimationFrame(_this.gameLoop);
		}
		else
		{
			return false;
		}

		var now = new Date().getTime(),
		dt = now - (timeAnimate || now);
		timeAnimate = now;

		clear();

		Update();
		Draw();

		if (32 in keysDown)	//SPACE
		{
			initialised = false;
		}

		 /*if (49 in keysDown)	//1
		 {
		 	walls.splice(0, walls.length);
		 	lightwaves.splice(0, lightwaves.length);
		 	rocks.splice(0, rocks.length);
		 	SetUpLevel();
		 	SetFloorTexture();

		 	gamestate = 1;
		 }
		 if (50 in keysDown)	//2
		 {
		 	walls.splice(0, walls.length);
		 	lightwaves.splice(0, lightwaves.length);
		 	rocks.splice(0, rocks.length);
			SetUpLevel();
			SetFloorTexture();
		 	gamestate = 2;
		 }
		 if (51 in keysDown)	//3
		 {
		 	walls.splice(0, walls.length);
		 	lightwaves.splice(0, lightwaves.length);
		 	rocks.splice(0, rocks.length);
			SetUpLevel();
			SetFloorTexture();
		 	gamestate = 3;
		 }
		 if (52 in keysDown)	//4
		 {
		 	walls.splice(0, walls.length);
		 	lightwaves.splice(0, lightwaves.length);
		 	rocks.splice(0, rocks.length);
			SetUpLevel();
			SetFloorTexture();
		 	gamestate = 4;
		 }*/
		 if (53 in keysDown)
		 	{
		 		gamestate = 5;
		 	}

		 if (gamestate == 5 || gamestate == -1)
		 {
		 	if (32 in keysDown)
		 	{
		 		gamestate = 0;
		 	}
		 }

	}

}
//SOUNDS http://www.superflashbros.net/as3sfxr/
