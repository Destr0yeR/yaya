Tunki.GameOver = function(game) {

};

Tunki.GameOver.prototype = {
	create: function() {
		this.showGameOver();
	},

	showGameOver: function() {
		this.game.add.sprite(0, 0, 'sky'); 
		this.add.button(_screen.width/2 - 50, _screen.height/2, 'button_retry', this.retryGame, this);
	},

	retryGame: function() {
		this.game.state.start('Game');
	}
};