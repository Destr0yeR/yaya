Tunki.Slide1 = function(game){
	this.startTime;
}

Tunki.Slide1.prototype = {
	preload: function() {
		this.load.image('slide1', 'assets/intro/animatic1.jpg');

	},
	
	create: function() {
		var currentDate = new Date();

		this.startTime = currentDate.getTime();

		this.add.sprite(0, 0, 'slide1');
	},
	update: function() {
		var currentDate = new Date();
		var currentTime = currentDate.getTime();

		if(currentTime > this.startTime + 2000)
		{
			this.game.state.start('Slide2');
		}
	}
};

Tunki.Slide2 = function(game){
	this.startTime;
}

Tunki.Slide2.prototype = {
	preload: function() {
		this.load.image('slide2', 'assets/intro/animatic2.jpg');
	},
	
	create: function() {
		var currentDate = new Date();

		this.startTime = currentDate.getTime();

		this.add.sprite(0, 0, 'slide2');
		
	},
	update: function() {
		var currentDate = new Date();
		var currentTime = currentDate.getTime();

		if(currentTime > this.startTime + 3000)
		{
			this.game.state.start('Slide3');
		}
	}
};

Tunki.Slide3 = function(game){
	this.startTime;
}

Tunki.Slide3.prototype = {
	preload: function() {
		this.load.image('slide3', 'assets/intro/animatic3.jpg');
	},
	
	create: function() {
		var currentDate = new Date();

		this.startTime = currentDate.getTime();

		this.add.sprite(0, 0, 'slide3');
		
	},
	update: function() {
		var currentDate = new Date();
		var currentTime = currentDate.getTime();

		if(currentTime > this.startTime + 3000)
		{
			this.game.state.start('Slide4');
		}
	}
};

Tunki.Slide4 = function(game){
	this.startTime;
}

Tunki.Slide4.prototype = {
	preload: function() {
		this.load.image('slide4', 'assets/intro/animatic4.jpg');
	},
	
	create: function() {
		var currentDate = new Date();

		this.startTime = currentDate.getTime();

		this.add.sprite(0, 0, 'slide4');
		
	},
	update: function() {
		var currentDate = new Date();
		var currentTime = currentDate.getTime();

		if(currentTime > this.startTime + 2000)
		{
			this.game.state.start('Slide5');
		}
	}
};

Tunki.Slide5 = function(game){
	this.startTime;
}

Tunki.Slide5.prototype = {
	preload: function() {
		this.load.image('slide5', 'assets/intro/animatic5.jpg');
	},
	
	create: function() {
		var currentDate = new Date();

		this.startTime = currentDate.getTime();

		this.add.sprite(0, 0, 'slide5');
		
	},
	update: function() {
		var currentDate = new Date();
		var currentTime = currentDate.getTime();

		if(currentTime > this.startTime + 2000)
		{
			this.game.state.start('Slide6');
		}
	}
};

Tunki.Slide6 = function(game){
	this.startTime;
}

Tunki.Slide6.prototype = {
	preload: function() {
		this.load.image('slide6', 'assets/intro/animatic6.jpg');
	},
	
	create: function() {
		var currentDate = new Date();

		this.startTime = currentDate.getTime();

		this.add.sprite(0, 0, 'slide6');
		
	},
	update: function() {
		var currentDate = new Date();
		var currentTime = currentDate.getTime();

		if(currentTime > this.startTime + 2000)
		{
			this.game.state.start('Game');
		}
	}
};