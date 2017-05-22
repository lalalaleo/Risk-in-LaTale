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
        man.style.bottom = 630+"px";
        man.style.width = world.unitSize+"px";
        man.style.height = 2*world.unitSize+"px";
    },
    moveFlag:0,
    jumpFlag:0,
    speedX:0,
    speedY:0,
    setSpeedX:3,
    setSpeedY:20,
    acceleration:1,
    stop:0,
    nextstop :0,
    startbottom : "30px",
    moveID:null,
    actionState:function(){
        nextstop = stop;
        stop = 0;
        if(this.moveFlag==0){//不动
            this.speedX = 0;
            this.speedY = 0;
        }
        else if(this.moveFlag==1){//左移
            this.speedX = - this.setSpeedX;
            this.speedY = 0;
            stop = 0;
        }
        else if(this.moveFlag==2){//右移
            this.speedX = this.setSpeedX;
            this.speedY = 0;
        }
        else if(this.moveFlag==3){//左右一起（不动）
            this.speedX = 0;
            this.speedY = 0;
        }
        else if(this.moveFlag==4){//跳跃
            this.speedX = 0;
            if(this.jumpFlag == 0){
                this.speedY = this.setSpeedY;
            }
        }
        else if(this.moveFlag==5){//左跳
            this.speedX = - this.setSpeedX;
            if(this.jumpFlag == 0){
                this.speedY = this.setSpeedY;
            }
        }
        else if(this.moveFlag==6){//右跳
            this.speedX = this.setSpeedX;
            if(this.jumpFlag == 0){
                this.speedY = this.setSpeedY;
            }
        }
        else if(this.moveFlag==7){//左右一起（不动）跳跃
            this.speedX = 0;
            if(this.jumpFlag == 0){
                this.speedY = this.setSpeedY;
            }
        }
        cancelAnimationFrame(this.moveID);
        this.moveID=requestAnimationFrame(this.move);
    },
    move:function(){
        var manDiv = document.querySelector("#man");
        var bottom = manDiv.style.bottom;
        var left = manDiv.style.left;
        var thingbottom = 149 + "px";
        if(left == '') left='0';
        if(bottom == '') bottom='100px';
        left = parseInt(left) + man.speedX;
        if(nextstop==1){
            manDiv.style.bottom  = thingbottom;
        }
        else{
            bottom = parseInt(bottom) + man.speedY;
        }
        manDiv.style.left = left + "px";
        manDiv.style.bottom = bottom + "px";
        if((man.moveFlag==4||man.moveFlag==5||man.moveFlag==6||man.moveFlag==7)&&(man.jumpFlag<(man.setSpeedY/man.acceleration*2))){
            man.speedY -= man.acceleration;
            if(man.speedY<0){

                var bridge = document.getElementById("bridge");
                var thingbottom = parseInt(bridge.style.bottom);
                var thingheight = parseInt(bridge.style.height);
                var thingleft = parseInt(bridge.style.left);
                var thingtop = thingbottom + thingheight;

                if(thingbottom<=bottom&&thingtop+5>=bottom){
                    // alert(bottom);
                     if(on("bridge")){
                         bottom = thingbottom;
                         stop = 1;jumpflag =0 ;
                     }
                }
            }
            man.jumpFlag++;
        }
        else if(man.jumpFlag==(man.setSpeedY/man.acceleration*2)){
            man.jumpFlag=0;        
            man.moveFlag -= 4;
        }
        if(bottom==630)
        {
            man.setSpeedY=-man.setSpeedY;
            man.moveFlag=7;
        }
        if(bottom<=30)
        {
            if($(".material:first-child").attr("class")=="material grass")
            moveFlag-=4;
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
// var monster = {
//     name:"Leo Hu",
//     initLayout:function(){
//         var monster = document.getElementById("monster");
//         monster.style.bottom = world.unitSize+"px";
//         monster.style.width = world.unitSize+"px";
//         monster.style.height = 2*world.unitSize+"px";
//     },
//     angle : 0 , 
//     lastTime : null ,
//     animate  : function(time) {
//         var monsterDiv = document.querySelector("#monster");
//         if (this.lastTime != null)
//             this.angle += (time - this.lastTime) * 0.0015;
//         this.lastTime = time;
//         monsterDiv.style.left = (Math.cos(this.angle) * 200 + 400) + "px";
//         monster.actionState();
//     },
//     actionState:function(){
//         requestAnimationFrame(this.animate);
//     }
// }
var angle = 0, lastTime = 0 ,jumpflag = 0;
function monstermove(time) {
    var monster = document.getElementById("monster");
    monster.style.bottom = world.unitSize+"px";
    monster.style.width = world.unitSize+"px";
    monster.style.height = 2*world.unitSize+"px";

    var monster2 = document.getElementById("monster2");
    monster2.style.bottom = world.unitSize+"px";
    monster2.style.width = world.unitSize+"px";
    monster2.style.height = 2*world.unitSize+20+"px";
    monster2.style.left = 560 + "px";

    var monster3 = document.getElementById("monster3");
    monster3.style.bottom = world.unitSize+"px";
    monster3.style.width = world.unitSize+"px";
    monster3.style.height = 2*world.unitSize+20+"px";
    monster3.style.left = 640 + "px";

    var monster4 = document.getElementById("monster4");
    monster4.style.bottom = world.unitSize+"px";
    monster4.style.width = world.unitSize+"px";
    monster4.style.height = 2*world.unitSize+20+"px";
    monster4.style.left = 720 + "px";

    var bridge = document.getElementById("bridge");
  
    if (lastTime != 0)
      this.angle += (time - lastTime) * 0.0015;
    lastTime = time;
    monster.style.left = (Math.cos(this.angle) * 150 + 420) + "px";

    monster2.style.bottom = (Math.cos(this.angle) * 40 + 90) + "px";

    var anglenow = this.angle + Math.PI/3;
    monster3.style.bottom = (Math.cos(anglenow) * 40 + 70) + "px";
    
    anglenow += Math.PI/3;
    monster4.style.bottom = (Math.cos(anglenow) * 40 + 70) + "px";

    bridge.style.left = (Math.cos(anglenow) * 150 + 420) + "px";
    var thingbottom = parseInt(bridge.style.bottom);
    var thingheight = parseInt(bridge.style.height);
    var thingtop = thingbottom + thingheight;
    var manDiv = document.querySelector("#man");
    var bottom = parseInt(manDiv.style.bottom);
    if(on("bridge")==true&&bottom >= thingbottom && bottom<=thingtop ){
        manDiv.bottom = thingbottom;
        manDiv.style.left =  bridge.style.left;
    }
    //碰撞判断
    if(knock("monster2")||knock("monster3")||knock("monster4")||knock("monster")){
        alert("游戏结束");
    }
    // if( top - height < monstertop && top > monsterbottom){
    //     alert(1);
    // }
    requestAnimationFrame(monstermove);
}
function  knock(monster){
    var man = document.getElementById("man");
    var left = parseInt(man.style.left);
    var width = parseInt(man.style.width);
    var bottom = parseInt(man.style.bottom);
    var height = parseInt(man.style.height);
    var top = bottom + height;
    var monster2 = document.getElementById(monster);
    var monsterleft = parseInt(monster2.style.left);
    var monsterwidth = parseInt(monster2.style.width);
    var monsterbottom = parseInt(monster2.style.bottom);
    var monsterheight = parseInt(monster2.style.height);
    var monstertop = monsterbottom + monsterheight;
    if(left + width >= monsterleft && left <= monsterwidth+monsterleft && top - height < monstertop && top > monsterbottom){
         return true;
    }else{
        return false;
    }
}
function bridgeInit(){
    var bridge = document.getElementById("bridge");
    bridge.style.bottom = 4* world.unitSize+"px";
    bridge.style.width = 4*world.unitSize+"px";
    bridge.style.height = world.unitSize+"px";
    // on("bridge");
}

function on (thing){
    var man = document.getElementById("man");
    var left = parseInt(man.style.left);
    var width = parseInt(man.style.width);
    var bottom = parseInt(man.style.bottom);
    var height = parseInt(man.style.height);
    var top = bottom + height;

    var things = document.getElementById(thing);
    var thingleft = parseInt(things.style.left);
    var thingwidth = parseInt(things.style.width);
    var thingbottom = parseInt(things.style.bottom);
    var thingheight = parseInt(things.style.height);
    var thingtop = thingbottom + thingheight;
    if( left + width >= thingleft && left <= thingleft+thingwidth){
        return true;
    }
    else {
        return false;
    }
}

$(document).ready(function(){
    map.load();
    map.initLayout();
    bridgeInit();
    man.initLayout();
     // monster.initLayout();
    requestAnimationFrame(monstermove);
    keyEvent.set();
});
