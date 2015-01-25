Tunki.GameOver = function(game) {

};

Tunki.GameOver.prototype = {
	create: function() {
		this.showGameOver();
	},

	showGameOver: function() {
		this.game.add.sprite(0, 0, 'background_main'); 
		this.add.button(_screen.width/2 - 60, 440, 'button_retry', this.retryGame, this);
		this.startButton = this.add.button( _screen.width/2 + 195, 470, 'button_credit', this.creditsGame, this, 1, 0, 2);
	},

	retryGame: function() {
		this.game.state.start('Game');
	}
};