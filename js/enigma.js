var game;
var _screen = new Screen();

function gameStart(){
     game = new Phaser.Game(_screen.width, _screen.height, Phaser.AUTO, '', { preload: preload, create:     create, update: update });
}

var Enigma = function(){

	this.message = "ADIVINANZA";
    
	this.setMessage = function(new_message){
		this.message = new_message;
		console.log(this.message);
	};
};

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('enigma_background', 'assets/enigma_background.png');
    game.load.image('close_enigma', 'assets/close.png');
}

var player;

var enigmaText;
var enigmaBackground;

var enigma = new Enigma();

var messages;

var cursors;

var objects;

var iterations = 0;

var is_overlapped = false;
var was_overlapped = false;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');   

   	player = game.add.sprite(32, game.world.height - 150, 'dude');

   	game.physics.arcade.enable(player);

   	player.body.bounce.y = 0.2;

    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    objects = game.add.group();
    objects.enableBody = true;

    var object = objects.create(70, 70, 'star');

   	createEnigma();

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

	game.physics.arcade.overlap(player, objects, createEnigma, null , this) ? null : is_overlapped = false;

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
}

function destroyEnigma()
{
	enigmaText.text = "";
	messages.destroy();
}

function createEnigma()
{
	if(is_overlapped)
	{
		was_overlapped = true;
	}
	else
	{
		was_overlapped = false;
	}

	is_overlapped = true;

	if(is_overlapped && !was_overlapped)
	{
		messages = game.add.group();
	   	messages.enableBody = false;

	   	enigmaBackground = messages.create( _screen.width/2 - _screen.width/4 , _screen.height/2 - _screen.height/4 , 'enigma_background' );
	   	enigmaClose = messages.create( _screen.width*3/4 - 25 , _screen.height/2 - _screen.height/4 , 'close_enigma');
	   	enigmaClose.inputEnabled = true;

	   	//add enigma text

	   	enigmaText = game.add.text(16, 16, enigma.message , { fontSize: '32px', fill: '#000' });

	   	//add enigma graphic input for close
	   	enigmaClose.events.onInputDown.add(destroyEnigma, this);

	   	//set enigma text on center 
	   	enigmaText.x = _screen.width/2 - enigmaText.width/2;
	   	enigmaText.y = _screen.height/2 - enigmaText.height/2;

	   	console.log(iterations);
	}
}