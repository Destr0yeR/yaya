var Enigma = function(){

	this.message = "ADIVINANZA";

	this.active  = false;

	this.setMessage = function(new_message){
		this.message = new_message;
		console.log(this.message);
	};
};


Tunki.Game = function(game) {
	this.player = function(){
		this.touching_up 	= false;
		this.touching_down 	= false;
		this.touching_left 	= false;
		this.touching_right = false;

		this.is_colliding 	= false;
		this.was_colliding	= false;
	};

	this.enigmaText;
	this.enigmaBackground;
	this.enigma = new Enigma();
	this.messages;

	this.cursors;

	this.objects;
	this.iterations 		= 0;
	this.is_overlapped 	= false;
	this.was_overlapped 	= false;

	this.pictures_stack;
	this.pictures;
};

Tunki.Game.prototype = {
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

	    this.game.add.sprite(0, 0, 'sky');   

	   	this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

	   	this.game.physics.arcade.enable(this.player);

	   	this.player.body.bounce.y = 0.2;

	    this.player.body.collideWorldBounds = true;
	    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

	    this.objects = this.game.add.group();
	    this.objects.enableBody = true;

	    var object = this.objects.create(400, 300, 'star');


	   	pictures_stack = this.game.add.group();
	   	pictures_stack.enableBody = true;

	   	pictures = new Array();

		for( var i = 0 ; i < 4 ; ++i)
		{
			var x = ( Math.random() * 8 );
			var y = ( Math.random() * 6 );

			var picture = pictures_stack.create( x*100 , y*100 , 'picture');
		   	picture.body.immovable = true;
		   	pictures.push(picture);						
		}

	   	this.createEnigma();

	    this.cursors = this.game.input.keyboard.createCursorKeys();
	},

	update: function() {
		var collide = this.game.physics.arcade.collide(this.player, pictures_stack, this.createEnigma, null, this);
		if(collide)
		{
			this.player.is_colliding = true;
		}
		else
		{
			this.player.is_colliding = false;
		}

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
	    }
	    else if (this.cursors.down.isDown)
	    {
	    	this.player.body.velocity.y = 150;
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

		   	enigmaBackground = messages.create( _screen.width/2 - _screen.width/4 , _screen.height/2 - _screen.height/4 , 'enigma_background' );
		   	enigmaClose = messages.create( _screen.width*3/4 - 25 , _screen.height/2 - _screen.height/4 , 'close_enigma');
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
	}
};