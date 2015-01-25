Tunki.Menu = function(game) {};
Tunki.Menu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'background_main');
		//this.add.sprite( _screen.width/2 - 133 , _screen.height/4 - 43, 'title_main');
		this.startButton = this.add.button( _screen.width/2 - 60, 440, 'button_start', this.startGame, this, 1, 0, 2);
		this.startButton = this.add.button( _screen.width/2 + 195, 470, 'button_credit', this.creditsGame, this, 1, 0, 2);
		// instructions = this.game.add.text(
		// 	60, 250, "Use arrow keys on desktop, \n  accelerometer on mobile",
		// 	{ font: "16px Arial", fill: "#b921fe", stroke: "#22053a", strokeThickness: 3 }
		// );
	},
	startGame: function() {
		this.game.state.start('Howto');
	}
};