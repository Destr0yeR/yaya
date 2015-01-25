

var Comportamiento=function(game){
    this.game = game;
    
}


Comportamiento.prototype={    
    setUp : function(player, count, orientation){
        this.player = player;
        this.wallA  =new Array();
        this.wallB  =new Array();
        this.WALLZISE = 10;
        this.walls = this.game.add.group();
        this.walls.enableBody = true;
        this.count = count;
        this.orientation = orientation;
        
<<<<<<< HEAD
        for (i = 0; i < this.WALLZISE; i++){
            this.wallA.push(this.walls.create(0, 0+60*i, 'killerwall'));
        }
        for (i = 0; i < this.WALLZISE; i++){
            this.wallB.push(this.walls.create(710, 0+60*i, 'killerwall'));
=======
        if(count%2 == 1)
        {
            for (i = 0; i < this.WALLZISE; i++){
                if(orientation == 'vertical')
                    this.wallA.push(this.walls.create(0+100*i, 0, 'killerwall'));
                if(orientation == 'horizontal')
                    this.wallA.push(this.walls.create(0, 0+60*i, 'killerwall'));
            }
        }

        if(Math.floor(count/2) == 1)
        {
            for (i = 0; i < this.WALLZISE; i++){
                if(orientation == 'vertical')
                    this.wallB.push(this.walls.create(0+100*i, 500, 'killerwall'));
                if(orientation == 'horizontal')
                    this.wallB.push(this.walls.create(700, 0+100*i, 'killerwall'));
            }
>>>>>>> 515c434c5185075a1e03a1a1fb941b2a90018dda
        }
        this.objects = this.game.add.group();
        this.objects.enableBody = true;
        this.startcrashing = false;
        this.timestart = 0;
        this.active = false;
    },
    
    update: function(){

        if(this.count%2 == 1)
        {
            for (i = 0; i < this.WALLZISE; i++){
                if(this.orientation == 'vertical')
                    this.wallA[i].body.velocity.y = WallVelocity;
                if(this.orientation == 'horizontal')
                    this.wallA[i].body.velocity.x = WallVelocity;
            }
        }

        if(Math.floor(this.count/2) == 1)
        {
            for (i = 0; i < this.WALLZISE; i++){
                if(this.orientation == 'vertical')
                    this.wallB[i].body.velocity.y = -WallVelocity;
                if(this.orientation == 'horizontal')
                    this.wallB[i].body.velocity.x = -WallVelocity;
            }
        }
    },
    setActive :function(value){
        this.active=value;
    },
    
    crash : function(){
        if(this.active){
                //console.log("xD");        
                
                //alert(this.objects);
                this.blood = this.objects.create(this.player.body.x+10,this.player.body.y+10, 'blood');
                console.log(this.startcrashing);
                if(this.startcrashing == false){
                    this.startcrashing = true;
                    var currentdate = new Date();
                    this.timestart =currentdate.getTime();
                    console.log('inicio '+this.timestart);
                 
                }else{
                    var currentdate = new Date();
                    var actualtime =currentdate.getTime();;
                    if(actualtime > this.timestart + 2000){
                        this.startcrashing = false;
                       // console.log('inicio '+this.timestart);
                        console.log('fin '+actualtime);
                        this.game.state.start('GameOver');
                        
                    }
                }
          }
    },
    
    destroy_all: function(){
        if(this.active){
            this.walls.destroy();
            this.objects.destroy();
        }
    } 
    
};


