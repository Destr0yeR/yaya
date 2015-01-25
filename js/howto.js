Tunki.Howto = function(game) {
	// buttonContinue = null;
	// state = null;
};

Tunki.Howto.prototype = {
	create: function() {
		this.showHowto();
	},

	showHowto: function() {
		this.buttonContinue = this.add.button(0, 0, 'how_to', this.startGame, this);
	},
	
	startGame: function() {
		this.game.state.start('Game');
	}
};