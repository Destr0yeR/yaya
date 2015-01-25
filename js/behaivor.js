

var Comportamiento=function(game){
    this.game = game;
     
}


Comportamiento.prototype={    
    setUp : function(player){
        this.player = player;
        this.wallA=new Array();
        this.wallB=new Array();
        this.WALLZISE = 10;
        this.walls = this.game.add.group();
        this.walls.enableBody = true;
        
        for (i = 0; i < this.WALLZISE; i++){
                this.wallA.push(this.walls.create(0, 0+60*i, 'killerwall'));
        }
        for (i = 0; i < this.WALLZISE; i++){
                this.wallB.push(this.walls.create(710, 0+60*i, 'killerwall'));
        }
        this.objects = this.game.add.group();
        this.objects.enableBody = true;
        this.startcrashing = false;
        this.timestart = 0;
    },
    
    update: function(){
        for (i = 0; i < this.WALLZISE; i++){
            this.wallA[i].body.velocity.x = WallVelocity;
        }
        for (i = 0; i < this.WALLZISE; i++){
            this.wallB[i].body.velocity.x = -WallVelocity;
        }
            
            
             //this.game.physics.arcade.overlap(this.player, this.walls, this.crash());
         this.game.physics.arcade.collide(this.player, this.walls, this.crash,null, this);
    },
    
    crash : function(){
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
                    if(actualtime > this.timestart + 3000){
                        this.startcrashing = false;
                       // console.log('inicio '+this.timestart);
                        console.log('fin '+actualtime);
                        this.game.state.start('GameOver');
                        
                    }
                }
    },
    
    destroy_all: function(){
        this.walls.destroy();
        this.objects.destroy();
    } 
    
};


