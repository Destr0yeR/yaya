Tunki.Preloader = function(game) {};
Tunki.Preloader.prototype = {
	preload: function() {
		this.game.stage.backgroundColor = '#16181a';

		this.add.sprite(0, 0, 'background_loading');
		this.add.sprite(_screen.width/2 - 133, _screen.height/2 - 43, 'title_loading');

		this.load.image('background_main', 'assets/menu/background.jpg');
		this.load.image('title_main', 'assets/title_main.png');

		this.load.image('button_start', 'assets/menu/play.png');
		this.load.image('button_credit', 'assets/menu/credit.png');
		this.load.image('button_retry', 'assets/retry.png');

		this.load.image('how_to', 'assets/howto.jpg');

		this.load.image('picture', 'assets/picture.png');
		this.load.image('vicuna', 'assets/vicuna.jpg');
		this.load.image('kero', 'assets/kero.jpg');
		this.load.image('ekeko', 'assets/ekeko.png');		
		this.load.image('luna', 'assets/luna.jpg');
		
		this.load.image('killerwall', 'assets/killerwall.png');
		this.load.image('blood', 'assets/blood.png');

		this.load.image('Tunki', 'assets/dude.png');
		this.load.image('background_game', 'assets/Escenario/scenario1.jpg');

		this.load.image('sky', 'assets/sky.png');
	    this.load.image('ground', 'assets/platform.png');
	    this.load.image('star', 'assets/star.png');
	    //this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	    this.load.spritesheet('dude', 'assets/Sprites/thief.png', 125 , 125);

	    this.load.image('enigma_background', 'assets/marco.png');
	    this.load.image('close_enigma', 'assets/close.jpg');

	    this.load.image('door', 'assets/door.png');

	    this.load.image('wall', 'assets/cuadrado.png');
	    
	    this.load.audio('museosound', ['assets/museo.mp3']);


	    /*Fondos
	    */

	    this.load.image('f_up', 'assets/fondos/f_arriba.jpg');
	    this.load.image('f_down', 'assets/fondos/f_abajo.jpg');
	    this.load.image('f_left', 'assets/fondos/f_izquierda.jpg');
	    this.load.image('f_right', 'assets/fondos/f_derecha.jpg');
	    this.load.image('f_center', 'assets/fondos/f_centro.jpg');

	    this.load.spritesheet('door_down', 'assets/door_down.png', 125 , 60);
	    this.load.spritesheet('door_up', 'assets/door_up.png', 125 , 60);
	    this.load.spritesheet('door_left', 'assets/door_left.png', 70 , 125);
	    this.load.spritesheet('door_right', 'assets/door_right.png', 70 , 125);

	    this.load.image('column_red', 'assets/fondos/ojonegro.jpg');
	    this.load.image('column_black', 'assets/fondos/ojorojo.jpg');

	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};
