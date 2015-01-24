var Tunki = {}

Tunki.Boot = function(game) {};
Tunki.Boot.prototype = {
	preload: function() {
		this.load.image('background_loading', 'assets/loading-bg.png');
		this.load.image('title_loading', 'assets/loading-title.png');
	},
	create: function() {

		this.game.state.start('Preloader');
	}


};