Tunki.Preloader = function(game) {};
Tunki.Preloader.prototype = {
	preload: function() {
		this.game.stage.backgroundColor = '#16181a';

		this.add.sprite(0, 0, 'background_loading');
		this.add.sprite(_screen.width/2 - 133, _screen.height/2 - 43, 'title_loading');

		this.load.image('background_main', 'assets/portada.jpg');
		this.load.image('title_main', 'assets/title_main.png');

		this.load.image('button_start', 'assets/button_start.png');
		this.load.image('button_retry', 'assets/button_retry.png');

		this.load.image('how_to', 'assets/how_to.png');

		this.load.image('picture', 'assets/picture.png');

		this.load.image('Tunki', 'assets/dude.png');
		this.load.image('background_game', 'assets/sky.png');

		this.load.image('sky', 'assets/sky.png');
	    this.load.image('ground', 'assets/platform.png');
	    this.load.image('star', 'assets/star.png');
	    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	    this.load.image('enigma_background', 'assets/enigma_background.png');
	    this.load.image('close_enigma', 'assets/close.png');

	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};