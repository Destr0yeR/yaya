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

	        this.player.animations.play('left');
	    }
	    else if (this.cursors.right.isDown)
	    {
	        this.player.body.velocity.x = 150;

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
	},

	destroyEnigma: function() {
		enigmaText.text = "";
		messages.destroy();
		this.enigma.active = false;
	},

	createEnigma: function() {
		console.log("createEnigma");

		if(this.player.is_colliding)
		{
			this.player.was_colliding = true;
		}
		else
		{
			this.player.was_colliding = false;
		}

		this.player.is_colliding = true;

		if(this.player.is_colliding && !this.player.was_colliding && !this.enigma.active)
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
		this.delete_all();
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

		
		this.player.body.x = _screen.width/2-50;
		this.player.body.y = _screen.height/2-50;

		this.map = new Map('background_game', triggers_map[Scenario]);

		this.pictures_stack = this.game.add.group();
	   	this.pictures_stack.enableBody = true;

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
	    	}
	    }
	},

	delete_all: function() {
		this.pictures_stack.destroy();

	   	this.doors_stack.destroy();	

		this.doors_stack_up.destroy();		

		this.doors_stack_down.destroy();

		this.doors_stack_left.destroy();

		this.doors_stack_right.destroy();
	}
};