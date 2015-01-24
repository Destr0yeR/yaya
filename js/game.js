var Enigma = function(){

	this.message = "ADIVINANZA";

	this.active  = false;

	this.setMessage = function(new_message){
		this.message = new_message;
		console.log(this.message);
	};
};

var player = function(){
	this.touching_up 	= false;
	this.touching_down 	= false;
	this.touching_left 	= false;
	this.touching_right = false;

	this.is_colliding 	= false;
	this.was_colliding	= false;
};

var enigmaText;
var enigmaBackground;
var enigma = new Enigma();
var messages;

var cursors;

var objects;
var iterations 		= 0;
var is_overlapped 	= false;
var was_overlapped 	= false;

var pictures_stack;
var pictures;

Tunki.Game = function(game) {

};

Tunki.Game.prototype = {
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

	    this.game.add.sprite(0, 0, 'sky');   

	   	player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

	   	this.game.physics.arcade.enable(player);

	   	player.body.bounce.y = 0.2;

	    player.body.collideWorldBounds = true;
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);

	    objects = this.game.add.group();
	    objects.enableBody = true;

	    var object = objects.create(400, 300, 'star');


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

	    cursors = this.game.input.keyboard.createCursorKeys();
	},

	update: function() {
		var collide = this.game.physics.arcade.collide(player, pictures_stack, this.createEnigma, null, this);

		if(collide)
		{
			player.is_colliding = true;
		}
		else
		{
			player.is_colliding = false;
		}

	    player.body.velocity.x = 0;
	    player.body.velocity.y = 0;

	    if (cursors.left.isDown)
	    {
	        player.body.velocity.x = -150;

	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {
	        player.body.velocity.x = 150;

	        player.animations.play('right');
	    }
	    else
	    {
	        player.animations.stop();

	        player.frame = 4;
	    }
	    
	    if (cursors.up.isDown)
	    {
	        player.body.velocity.y = -150;
	    }
	    else if (cursors.down.isDown)
	    {
	    	player.body.velocity.y = 150;
	    }
		
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
	    {
	    	this.game.state.start('GameOver');
	    }
	},

	destroyEnigma: function() {
		enigmaText.text = "";
		messages.destroy();
		enigma.active = false;
	},

	createEnigma: function() {
		console.log("createEnigma");

		if(player.is_colliding)
		{
			player.was_colliding = true;
		}
		else
		{
			player.was_colliding = false;
		}

		player.is_colliding = true;

		if(player.is_colliding && !player.was_colliding && !enigma.active)
		{
			messages = this.game.add.group();
		   	messages.enableBody = false;

		   	enigmaBackground = messages.create( _screen.width/2 - _screen.width/4 , _screen.height/2 - _screen.height/4 , 'enigma_background' );
		   	enigmaClose = messages.create( _screen.width*3/4 - 25 , _screen.height/2 - _screen.height/4 , 'close_enigma');
		   	enigmaClose.inputEnabled = true;

		   	//add enigma text

		   	enigmaText = this.game.add.text(16, 16, enigma.message , { fontSize: '32px', fill: '#000' });

		   	//add enigma graphic input for close
		   	enigmaClose.events.onInputDown.add(this.destroyEnigma, this);

		   	//set enigma text on center 
		   	enigmaText.x = _screen.width/2 - enigmaText.width/2;
		   	enigmaText.y = _screen.height/2 - enigmaText.height/2;
		   	enigma.active = true;
		   	console.log(iterations);
		}
	}
};