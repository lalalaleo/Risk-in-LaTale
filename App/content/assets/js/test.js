var world = {
    "unitSize":30
}
var map = {
    load:function(){
        var mapDiv = $(".map");
        for(var i=0;i<7;i++){
            $('<div />',{
                "class":map.material.grass.class
            }).appendTo(mapDiv);
        }
        for(var i=0;i<2;i++){
            $('<div />',{
                "class":map.material.air.class
            }).appendTo(mapDiv);
        }
        for(var i=0;i<4;i++){
            $('<div />',{
                "class":map.material.ice.class
            }).appendTo(mapDiv);
        }
        for(var i=0;i<7;i++){
            $('<div />',{
                "class":map.material.grass.class
            }).appendTo(mapDiv);
        }
    },
    initLayout:function(){
        $(".map").css({
            "height":world.unitSize+"px"
        });
        $(".material").css({
            "width":world.unitSize+"px",
            "height":world.unitSize+"px"
        });
    },
    material:{
        "air":{
            "class":"material air",
            "speedFactor":1,
            "penetrateAble":false
            
        },        
        "ice":{
            "class":"material ice",
            "speedFactor":1,
            "penetrateAble":false
            
        },        
        "grass":{
            "class":"material grass",
            "speedFactor":1,
            "penetrateAble":false
        }
    }
}
var man = {
    name:"Leo",
    initLayout:function(){
        var man = document.getElementById("man");
        man.style.bottom = world.unitSize+"px";
        man.style.width = world.unitSize+"px";
        man.style.height = 2*world.unitSize+"px";
    },
    moveFlag:0,
    jumpFlag:0,
    speedX:0,
    speedY:0,
    setSpeedX:3,
    setSpeedY:15,
    moveID:null,
    actionState:function(){
        if(this.moveFlag==0){
            this.speedX = 0;
            this.speedY = 0;
        }
        else if(this.moveFlag==1){
            this.speedX = - this.setSpeedX;
            this.speedY = 0;
        }
        else if(this.moveFlag==2){
            this.speedX = this.setSpeedX;
            this.speedY = 0;
        }
        else if(this.moveFlag==3){
            this.speedX = 0;
            this.speedY = 0;
        }
        else if(this.moveFlag==4){
            this.speedX = 0;
            if(this.speedY!=- this.setSpeedY){
            this.speedY = this.setSpeedY;
            }
        }
        else if(this.moveFlag==5){
            this.speedX = - this.setSpeedX;
            if(this.speedY!=- this.setSpeedY){
            this.speedY = this.setSpeedY;
            }
        }
        else if(this.moveFlag==6){
            this.speedX = this.setSpeedX;
            if(this.speedY!=- this.setSpeedY){
            this.speedY = this.setSpeedY;
            }
        }
        else if(this.moveFlag==7){
            this.speedX = 0;
            if(this.speedY!=- this.setSpeedY){
            this.speedY = this.setSpeedY;
            }
        }
        console.log(this.speedX);
        cancelAnimationFrame(this.moveID);
        this.moveID=requestAnimationFrame(this.move);
    },
    move:function(){
        alert(man.name);
        var man = document.querySelector("#man");
        var bottom = man.style.bottom;
        var left = man.style.left;
        if(left == '') left='0';
        if(bottom == '') bottom='100px';
        left = parseInt(left) + man.speedX;
        bottom = parseInt(bottom) + man.speedY;
        man.style.left = left + "px";
        man.style.bottom = bottom + "px";
        if(man.speedY<0){
            if(man.jumpFlag>=15){
                man.speedY=0;
                man.moveFlag -=4;
                man.jumpFlag=0;
            }
            else{
                man.jumpFlag++;
            }
        }
        if(this.speedY>0){
            if(man.jumpFlag>=15){
                man.speedY=- man.setSpeedY;
                man.jumpFlag=0;
            }
            else{
                man.jumpFlag++;
            }
        }
        man.actionState();
    }
}
var keyEvent = {
    set:function(){
        document.onkeydown = this.keydown;
        document.onkeyup = this.keyup;
    },
    keydown:function(){
        if(event.keyCode==39){
            if(man.moveFlag==0||man.moveFlag==1||man.moveFlag==4||man.moveFlag==5){
                man.moveFlag+=2;
            }
        }
        else if(event.keyCode==37){
            if(man.moveFlag==0||man.moveFlag==2||man.moveFlag==4||man.moveFlag==6){
                man.moveFlag+=1;
            }
        }
        else if(event.keyCode==67){
            if(man.moveFlag==0||man.moveFlag==1||man.moveFlag==2||man.moveFlag==3){
                man.moveFlag+=4;
            }
        }
        man.actionState();
    },
    keyup:function(){
        if(event.keyCode==39){
            man.moveFlag -= 2;
        }
        else if(event.keyCode==37){
            man.moveFlag -= 1;
        }
        else if(event.keyCode==67){
        }
        man.actionState();
    }
}
$(document).ready(function(){
    map.load();
    map.initLayout();
    man.initLayout();
    keyEvent.set();
});
