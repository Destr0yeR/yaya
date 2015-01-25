var Enigma = function(message){

	if(typeof(message) === 'undefined') message = "ADIVINANZA";
	this.message = message;

	this.active  = false;

	this.setMessage = function(new_message){
		this.message = new_message;
		console.log(this.message);
	};
};

var Map = function(file_name, trigger ){

	if(typeof(file_name) === 'undefined') file_name = "default";

	this.background = file_name;
	this.trigger    = trigger;
}

Tunki.Game = function(game) {
	this.player = function(){
		this.touching_up 	= false;
		this.touching_down 	= false;
		this.touching_left 	= false;
		this.touching_right = false;

		this.is_colliding 	= false;
		this.was_colliding	= false;
	};

	this.scenario = triggers_map[Scenario];

	this.enigmaText;
	this.enigmaBackground;
	this.enigma = new Enigma("");
	this.messages;

	this.cursors;

	this.objects;
	this.iterations 		= 0;
	this.is_overlapped 		= false;
	this.was_overlapped 	= false;

	this.pictures_stack;
	this.pictures;

	this.pictures_stack;

   	this.doors_stack;

	this.doors_stack_up;	
	this.doors_stack_down;
	this.doors_stack_left;
	this.doors_stack_right;

	this.map = new Map('background_game', triggers_map[Scenario]);
	this.comportamiento;
	this.comportamiento_active = false;
	this.music;
    
    
	this.setComportamiento = function(comportamiento)
	{
		this.comportamiento = comportamiento;
	};
	this.comportamiento = new Comportamiento(game);
    console.log(this.comportamiento);
};

Tunki.Game.prototype = {
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

	    this.game.add.sprite(0, 0, 'background_game');   

	   	this.player = this.game.add.sprite(_screen.width/2-50, _screen.height/2-50, 'dude');

	   	this.game.physics.arcade.enable(this.player);

	   	this.player.body.bounce.y = 0.2;

	    this.player.body.collideWorldBounds = true;

	    this.player.animations.add('right', [0, 1, 2, 3], 10, true);
	    this.player.animations.add('down', [4, 5, 6, 7], 10, false);
	    this.player.animations.add('left', [8, 9, 10, 11], 10, true);
	    this.player.animations.add('up', [12, 13, 14, 15], 10, true);

	    this.objects = this.game.add.group();
	    this.objects.enableBody = true;

	    var object = this.objects.create(400, 300, 'star');

	    this.set_up();
	   	

	   	this.createEnigma();

	    this.cursors = this.game.input.keyboard.createCursorKeys();
	    
	    this.music = this.game.add.audio('museosound',1,true);
        this.music.play('',0,1,true);
	},

	update: function() {

		console.log(Scenario);

		var collide = this.game.physics.arcade.collide(this.player, this.pictures_stack, this.createEnigma, null, this);
		if(collide)
		{
			this.player.is_colliding = true;
		}
		else
		{
			this.player.is_colliding = false;
		}

		this.game.physics.arcade.overlap(this.player, this.doors_stack_up, this.changeScenarieUp, null, this);
		this.game.physics.arcade.overlap(this.player, this.doors_stack_down, this.changeScenarieDown, null, this);
		this.game.physics.arcade.overlap(this.player, this.doors_stack_left, this.changeScenarieLeft, null, this);
		this.game.physics.arcade.overlap(this.player, this.doors_stack_right, this.changeScenarieRight, null, this);

	    this.player.body.velocity.x = 0;
	    this.player.body.velocity.y = 0;

	    if (this.cursors.left.isDown)
	    {
	        this.player.body.velocity.x = -150;

	        if(this.player.body.x < 100)
	        {
	        	this.player.body.velocity.x = 0;
	        }

	        this.player.animations.play('left');
	    }
	    else if (this.cursors.right.isDown)
	    {
	        this.player.body.velocity.x = 150;

	        if(this.player.body.x > 600)
	        {
	        	this.player.body.velocity.x = 0;
	        }

	        this.player.animations.play('right');
	    }
	    else
	    {
	        this.player.animations.stop();

	        this.player.frame = 4;
	    }
	    
	    if (this.cursors.up.isDown)
	    {
	        this.player.body.velocity.y = -150;
	        this.player.animations.play('up');
	    }
	    else if (this.cursors.down.isDown)
	    {
	    	this.player.body.velocity.y = 150;
	    	this.player.animations.play('down');
	    }
		
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
	    {
	    	this.game.state.start('GameOver');
	    }

	    if(this.comportamiento_active)
	    {
	    	this.comportamiento.update();
	    }
	},

	destroyEnigma: function() {
		enigmaText.text = "";
		messages.destroy();
		this.enigma.active = false;
	},

	createEnigma: function() {
		console.log("createEnigma");

		var exist = false;

		for(var i = 0; i<6; i++)
		{
			if(puzzles_map[i][Index_Scenario] == Scenario)
			{
				this.enigma.setMessage(puzzles_map[i][Message]);
				exist = true;
				break;
			}
		}

		if(this.player.is_colliding)
		{
			this.player.was_colliding = true;
		}
		else
		{
			this.player.was_colliding = false;
		}

		this.player.is_colliding = true;

		if(this.player.is_colliding && !this.player.was_colliding && !this.enigma.active && exist)
		{
			messages = this.game.add.group();
		   	messages.enableBody = false;

		   	enigmaBackground = messages.create( 0, 0 , 'enigma_background' );
		   	enigmaClose = messages.create( _screen.width - 100 , 60 , 'close_enigma');
		   	enigmaClose.inputEnabled = true;

		   	//add enigma text

		   	enigmaText = this.game.add.text(16, 16, this.enigma.message , { fontSize: '32px', fill: '#000' });

		   	//add enigma graphic input for close
		   	enigmaClose.events.onInputDown.add(this.destroyEnigma, this);

		   	//set enigma text on center 
		   	enigmaText.x = _screen.width/2 - enigmaText.width/2;
		   	enigmaText.y = _screen.height/2 - enigmaText.height/2;
		   	this.enigma.active = true;
		   	console.log(this.iterations);
		}
	},
	changeScenarieUp: function(){
		scene = this.findScenarie(Scenario,'up');

		if(!(scene <1 || scene > 10))
		{
			this.changeScenarie(scene);
		}
	},
	changeScenarieDown: function(){
		scene = this.findScenarie(Scenario,'down');

		if(!(scene <1 || scene > 10))
		{
			this.changeScenarie(scene);
		}
	},
	changeScenarieLeft: function(){
		scene = this.findScenarie(Scenario,'left');

		if(!(scene <1 || scene > 10))
		{
			this.changeScenarie(scene);
		}

	},
	changeScenarieRight: function(){
		scene = this.findScenarie(Scenario,'right');

		if(!(scene <1 || scene > 10))
		{
			this.changeScenarie(scene);
		}
	},
	changeScenarie: function(scene){
		Scenario = scene;
		this.destroy_all();
		this.set_up();
	},
	findScenarie: function(scene, where)
	{
		var x = -1;
		var y = -1;

		for(var i = 0 ; i < 6 ; ++i )
		{
			for(var j = 0 ; j < 4 ; ++j)
			{
				if(global_map[i][j] == scene)
				{
					x = j;
					y = i;
					break;
				}
			}
		}

		switch(where)
		{
			case 'left':
			{
				if(x > 0)
				{
					return global_map[y][x-1];
				}
				else 
					return -1;
				break;
			}
			case 'right':
			{
				if(x < 3)
					return global_map[y][x+1];
				else 
					return -1;
				break;
			}
			case 'up':
			{
				if(y > 0)
					return global_map[y-1][x];
				else 
					return -1;
				break;
			}
			case 'down':
			{
				if(y < 5)
					return global_map[y+1][x];
				else 
					return -1;
				break;
			}
			default:
			{
				return -1;
				break;
			}
		}

	},

	set_up: function() {

		this.map = new Map('background_game', triggers_map[Scenario]);
		
		this.player.body.x = _screen.width/2-50;
		this.player.body.y = _screen.height/2-50;
		
		
		this.xx=this.game.add.group();
		this.xx.enableBody =  true;

		this.pictures_stack = this.game.add.group();
	   	this.pictures_stack.enableBody = true;

		this.vicuna_stack = this.game.add.group();
	   	this.vicuna_stack.enableBody = true;

		this.kero_stack = this.game.add.group();
	   	this.kero_stack.enableBody = true;

		this.ekeko_stack = this.game.add.group();
	   	this.ekeko_stack.enableBody = true;
	   	
	   	this.luna_stack = this.game.add.group();
	   	this.luna_stack.enableBody = true;

		this.pictures_stack = this.game.add.group();
	   	this.pictures_stack.enableBody = true;
	   	
	   	this.tumi_stack = this.game.add.group();
	   	this.tumi_stack.enableBody = true;
	   	
	   	this.chakana_stack = this.game.add.group();
	   	this.chakana_stack.enableBody = true;

        this.pistola_stack = this.game.add.group();
	   	this.pistola_stack.enableBody = true;

        this.mapa_stack = this.game.add.group();
	   	this.mapa_stack.enableBody = true;
        
        this.sarcofago_stack = this.game.add.group();
	   	this.sarcofago_stack.enableBody = true;
	   	
	   	this.llama_stack = this.game.add.group();
	   	this.llama_stack.enableBody = true;

        this.papa_stack = this.game.add.group();
	   	this.papa_stack.enableBody = true;

        this.maiz_stack = this.game.add.group();
	   	this.maiz_stack.enableBody = true;
        
        this.quinua_stack = this.game.add.group();
	   	this.quinua_stack.enableBody = true;
	   	
	   	this.chirimoya_stack = this.game.add.group();
	   	this.chirimoya_stack.enableBody = true;
	   	
	   	this.bota_stack = this.game.add.group();
	   	this.bota_stack.enableBody = true;
	   	
	   	this.caballo_stack = this.game.add.group();
	   	this.caballo_stack.enableBody = true;
	   	
	   	this.sombrero_stack = this.game.add.group();
	   	this.sombrero_stack.enableBody = true;
	   	
	   	this.bala_stack = this.game.add.group();
	   	this.bala_stack.enableBody = true;
	   	
	   	
	   	this.cabezaclava_stack = this.game.add.group();
	   	this.cabezaclava_stack.enableBody = true;
	   	
	   	this.lineanazca_stack = this.game.add.group();
	   	this.lineanazca_stack.enableBody = true;
	   	
	   	this.portadasol_stack = this.game.add.group();
	   	this.portadasol_stack.enableBody = true;
	   	
	   	this.tierra_stack = this.game.add.group();
	   	this.tierra_stack.enableBody = true;
	   	
	   	this.estrella_stack = this.game.add.group();
	   	this.estrella_stack.enableBody = true;
	   	
	   	this.sol_stack = this.game.add.group();
	   	this.sol_stack.enableBody = true;
	   	
	   	
	   	this.doors_stack = this.game.add.group();
		this.doors_stack.enableBody = true;	

		this.doors_stack_up = this.game.add.group();
		this.doors_stack_up.enableBody = true;		

		this.doors_stack_down = this.game.add.group();
		this.doors_stack_down.enableBody = true;

		this.doors_stack_left = this.game.add.group();
		this.doors_stack_left.enableBody = true;

		this.doors_stack_right = this.game.add.group();
		this.doors_stack_right.enableBody = true;

	   	pictures 	= new Array();
	   	doors 		= new Array();
	   	doors_up 	= new Array();
	   	doors_down  = new Array();
	   	doors_left  = new Array();
	   	doors_right = new Array();
	   	
	   	tumis = new Array();
	   	chakanas = new Array();
	   	keros = new Array();
	   	cascos = new Array();
	   	pistolas = new Array();
	   	caballos = new Array();
	   	mapas = new Array();
	   	sarcofagos = new Array();
	   	alpacas = new Array();
	   	papas = new Array();
	   	maizs = new Array();
	   	quinuas = new Array();
	   	chirimoyas = new Array();
	   	botas = new Array();
	   	caballos = new Array();
	   	sombreros = new Array();
	   	balas = new Array();
	   	cabezaclavas = new Array();
	   	lineanazcas = new Array();
	   	portadasols = new Array();
	   	lunas = new Array();
	   	tierras = new Array();
	   	estrellas = new Array();
	   	soles = new Array();
	   	

	   	var is_there_a_picture;
 
		for (var  i = 0 ; i < 6 ;  i++ )
	    {
	    	for(var j = 0 ; j < 8 ; j++ )
	    	{

	    		var trigger = this.map.trigger;
	    		if( trigger[i][j] == Picture )
	    		{
		    		var picture = this.pictures_stack.create( j*100 , i*100 , 'picture');
				   	picture.body.immovable = true;
				   	pictures.push(picture);	
				   	is_there_a_picture = true;
	    		}
	    		else if ( trigger[i][j] == DoorUp )
	    		{
	    			var door = this.doors_stack_up.create( j*100 , i*100 , 'door');
				   	door.body.immovable = true;
				 	doors_up.push(door);	  		
	    		}
	    		else if ( trigger[i][j] == DoorDown ) 
	    		{
	    			var door = this.doors_stack_down.create( j*100 , i*100 , 'door');
				   	door.body.immovable = true;
				 	doors_down.push(door);
	    		}
	    		else if ( trigger[i][j] == DoorLeft ) 
	    		{
	    			var door = this.doors_stack_left.create( j*100 , i*100 , 'door');
				   	door.body.immovable = true;
				 	doors_left.push(door);
	    		}
	    		else if ( trigger[i][j] == DoorRight )
	    		{
	    			var door = this.doors_stack_right.create( j*100 , i*100 , 'door');
				   	door.body.immovable = true;
				 	doors_right.push(door);
	    		}
			    else if ( trigger[i][j] == Vicuna )
	    		{
	    			var vicuna = this.vicuna_stack.create( j*100 , i*100 , 'vicuna');
				   	vicuna.body.immovable = true;
				    vicunas.push(vicuna);	  		
	    		}
	    		else if ( trigger[i][j] == Kero )
	    		{
	    			var kero = this.kero_stack.create( j*100 , i*100 , 'kero');
				   	kero.body.immovable = true;
				    keros.push(kero);	  		
	    		}
	    		else if ( trigger[i][j] == Ekeko )
	    		{
	    			var ekeko = this.ekeko_stack.create( j*100 , i*100 , 'ekeko');
				   	ekeko.body.immovable = true;
				    ekekos.push(ekeko);	  		
	    		}
	    		else if ( trigger[i][j] == Luna )
	    		{
	    			var luna = this.luna_stack.create( j*100 , i*100 , 'luna');
				   	luna.body.immovable = true;
				    lunas.push(luna);	  		
	    		}
	    		else if ( trigger[i][j] == Tumi )
	    		{
	    			var tumi = this.xx.create( j*100 , i*100 , 'tumi');
				   	tumi.body.immovable = true;
				    tumis.push(luna);	  		
	    		}
	    		else if ( trigger[i][j] == Chakana )
	    		{
	    			var chakana = this.xx.create( j*100 , i*100 , 'chakana');
				   	chakana.body.immovable = true;
				    chakanas.push(chakana);	  		
	    		}
	    		else if ( trigger[i][j] == Casco )
	    		{
	    			var casco = this.xx.create( j*100 , i*100 , 'casco');
				   	casco.body.immovable = true;
				    cascos.push(casco);	  		
	    		}
	    		else if ( trigger[i][j] == Pistola )
	    		{
	    			var pistola = this.xx.create( j*100 , i*100 , 'pistola');
				   	pistola.body.immovable = true;
				    pistolas.push(pistola);	  		
	    		}
	    		else if ( trigger[i][j] == Caballo )
	    		{
	    			var caballo = this.xx.create( j*100 , i*100 , 'caballo');
				   	caballo.body.immovable = true;
				    caballos.push(caballo);	  		
	    		}
	    		else if ( trigger[i][j] == Mapa )
	    		{
	    			var mapa = this.xx.create( j*100 , i*100 , 'mapa');
				    mapa.body.immovable = true;
				    mapas.push(mapa);	  		
	    		}
	    		else if ( trigger[i][j] == Sombrero )
	    		{
	    			var sombrero = this.xx.create( j*100 , i*100 , 'sombrero');
				   	sombrero.body.immovable = true;
				    sombreros.push(sombrero);	  		
	    		}
	    		else if ( trigger[i][j] == Bala )
	    		{
	    			var bala = this.xx.create( j*100 , i*100 , 'bala');
				   	bala.body.immovable = true;
				    balas.push(bala);	  		
	    		}
	    		else if ( trigger[i][j] == CabezaClava )
	    		{
	    			var cabeza = this.xx.create( j*100 , i*100 , 'cabezaClava');
				   	cabeza.body.immovable = true;
				    cabezas.push(luna);	  		
	    		}
	    		else if ( trigger[i][j] == LineaNazca )
	    		{
	    			var lineanazca = this.xx.create( j*100 , i*100 , 'lineasNazca');
				   	lineanazca.body.immovable = true;
				    lineaNazcas.push(lineanazca);	  		
	    		}
	    		else if ( trigger[i][j] == PortadaSol )
	    		{
	    			var portada = this.xx.create( j*100 , i*100 , 'portadaSol');
				   	portada.body.immovable = true;
				    portadasols.push(portada);	  		
	    		}
	    		else if ( trigger[i][j] == Tierra )
	    		{
	    			var tierra = this.xx.create( j*100 , i*100 , 'tierra');
				   	tierra.body.immovable = true;
				    tierras.push(tierra);	  		
	    		}
	    		else if ( trigger[i][j] == Luna )
	    		{
	    			var luna = this.luna_stack.create( j*100 , i*100 , 'luna');
				   	luna.body.immovable = true;
				    lunas.push(luna);	  		
	    		}
	    	}
	    }

	    if(is_there_a_picture)
	    {
	    	this.comportamiento_active = false;
	    }
	    else
	    {
	    	this.comportamiento_active = true;
	    }

	   	if(this.comportamiento_active)
	   	{
	   		var random	= Math.floor(Math.random()*4);

	   		var column = random;
	   		random	= Math.floor(Math.random()*4);
	   		var orientation;

	   		console.log("random: "+random);

	   		if(random%2)
	   		{
	   			orientation = 'vertical';
	   		}
	   		else
	   		{
	   			orientation = 'horizontal';
	   		}

	    	this.comportamiento.setUp(this.player,column,orientation);
	   	}
	    	
	    this.createEnigma();
	},

	destroy_all: function() {

		this.pictures_stack.destroy();

		this.vicuna_stack.destroy();

		this.kero_stack.destroy();

		this.ekeko_stack.destroy();
	   	
	   	this.luna_stack.destroy();

		this.pictures_stack.destroy();

	   	this.doors_stack.destroy();	

		this.doors_stack_up.destroy();		

		this.doors_stack_down.destroy();

		this.doors_stack_left.destroy();

		this.doors_stack_right.destroy();

		if(this.comportamiento_active)
		{
			this.comportamiento.destroy_all();
		}

		this.comportamiento_active = false;
	}
};
