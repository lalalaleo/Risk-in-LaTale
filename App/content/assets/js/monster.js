var monster = {
    name:"monster",
    init:function(){
        var monsterdiv = document.getElementById("monster");
        monsterdiv.style.bottom = -7*world.unitSize+"px";
        monsterdiv.style.width = world.unitSize+"px";
        monsterdiv.style.height = 2*world.unitSize+"px";
        if(monster.moveID == 2 ){
            monsterdiv.style.left = 8*world.unitSize+"px";
        }
        monster.actionState();
    },
    moveFlag:0,
    jumpFlag:0,
    speedX:0,
    speedY:0,
    setSpeedX:0,
    setSpeedY:30,
    acceleration:1,
    step : 200,
    moveID:2,
    actionState:function(){
        if(this.moveID==1)
            requestAnimationFrame(this.move);
        else if(this.moveID==2){
            this.speedX = 0;
            if(this.jumpFlag == 0){
                this.speedY = this.setSpeedY;
            } 
            requestAnimationFrame(monster.move2);  
        }
    },
    move:function(){
        var monsterdiv = document.querySelector("#monster");
        var bottom = monsterdiv.style.bottom;
        var left = monsterdiv.style.left;
        if(left == '') left='0';
        if(bottom == '') bottom='100px';
        left = parseInt(left) + monster.speedX;
        bottom = parseInt(bottom) + monster.speedY;
        monsterdiv.style.left = left + "px";
        monsterdiv.style.bottom = bottom + "px";
        if(monster.moveFlag<=monster.step){
            monster.speedX = 2;
            monster.moveFlag++;
        }else{
            monster.speedX = -2;
            monster.moveFlag++;
            if(monster.moveFlag == (monster.step*2) ){
                monster.moveFlag=0;
                monster.speedX = 2;
            }
        }
        monster.actionState();
    },

    move2:function(){
        var monsterdiv = document.getElementById(monster.name);
        var bottom = monsterdiv.style.bottom;
        var left = monsterdiv.style.left;
        if(left == '') left='0';
        if(bottom == '') bottom='100px';
        left = parseInt(left) + monster.speedX;
        bottom = parseInt(bottom) + monster.speedY;
        monsterdiv.style.left = left + "px";
        monsterdiv.style.bottom = bottom + "px";
        if((monster.jumpFlag<(monster.setSpeedY/monster.acceleration*2))){

            monster.speedY -= monster.acceleration;
            monster.jumpFlag++;

        }
        else if(monster.jumpFlag==(monster.setSpeedY/monster.acceleration*2)){
            monster.jumpFlag=0;        
        }
        monster.actionState();
    }
}

var door = {
    name:"Hu",
    init:function(){
        var doordiv = document.getElementById("door");
        doordiv.style.bottom = world.unitSize+"px";
        doordiv.style.width = world.unitSize+"px";
        doordiv.style.height = 2*world.unitSize+"px";
        door.actionState();
    },
    moveFlag:0,
    jumpFlag:0,
    speedX:0,
    speedY:0,
    speedUp:1,
    speedDown:10,
    setSpeedX:3,
    setSpeedY:1,
    acceleration:1,
    step : 200,
    moveID:null,
    actionState:function(){
        this.moveID=requestAnimationFrame(this.move);
    },
    move:function(){
        
        var doordiv = document.querySelector("#door");
        var bottom = doordiv.style.bottom;
        var left = doordiv.style.left;
        if(left == '') left='0';
        if(bottom == '') bottom='200px';
        left = parseInt(left) + door.speedX;
        bottom = parseInt(bottom) + door.speedY;
        doordiv.style.left = left + "px";
        doordiv.style.bottom = bottom + "px";
        if(door.jumpFlag<door.step){
            door.speedY = door.speedUp;
            door.jumpFlag++;
        }else{
            door.jumpFlag = door.jumpFlag+(door.speedDown/door.speedUp);
            door.speedY = -door.speedDown;
            if(door.jumpFlag ==door.step*2+(door.speedDown/door.speedUp)){
                door.jumpFlag = 0;
                door.speedY = door.speedUp;
            }
        }
        door.actionState();
    }
}

function knock(){
    var manDiv = document.getElementById("man");
    manDivBottom = parseInt(doordiv.style.bottom);
    manDivHeight = parseInt(doordiv.style.height);
    manDivTop = manDivBottom+manDivHeight;
    manDivLeft =  parseInt(doordiv.style.left);
    manDivWidth = parseInt(doordiv.style.width);
    manDivRight =  manDivLeft+manDivWidth;

    var dl = manDivLeft/world.unitSize;
    var dr = manDivRight/world.unitSize;
    var rb = manDivBottom/world.unitSize;
    var rt = manDivTop/world.unitSize;

    if($("table tr:eq(rt) > td:eq(ul)").text()){
        //判断内容0
    }
}

var bullet ={
    init:function(){
        var bulletdiv = document.getElementById("bullet");
        bulletdiv.style.bottom = world.unitSize+"px";
        bulletdiv.style.width = world.unitSize+"px";
        bulletdiv.style.height = world.unitSize+"px";
        bullet.actionState();
    },
    moveFlag:0,
    jumpFlag:0,
    speedX:10,
    speedY:0,
    speedUp:1,
    speedDown:10,
    setSpeedX:3,
    setSpeedY:1,
    acceleration:1,
    step : 50,
    moveID:null,
    actionState:function(){
        this.moveID=requestAnimationFrame(this.move);
    },
    move:function(){
        
        var bulletdiv = document.querySelector("#bullet");
        var bottom = bulletdiv.style.bottom;
        var left = bulletdiv.style.left;
        if(left == '') left='0';
        if(bottom == '') bottom='200px';
        left = parseInt(left) + bullet.speedX;
        bottom = parseInt(bottom) + bullet.speedY;
        bulletdiv.style.left = left + "px";
        bulletdiv.style.bottom = bottom + "px";
     
       if(bullet.moveFlag<=bullet.step){
            bullet.moveFlag++;
        }else{
            createbullet("door");
            bulletdiv.remove();
            // bulletdiv.style.left =  world.unitSize+"px";
            bullet.moveFlag = 0;
        }
        bullet.actionState();
    }
}

function createbullet(who){
    var whodiv = document.getElementById(who);
    var bottom = parseInt(whodiv.style.bottom);
    var top = parseInt(whodiv.style.height)+bottom;
    var Odiv=document.createElement("div");             //创建一个div
    Odiv.className="monster2";
    Odiv.id="bullet";
    Odiv.style.height = world.unitSize+"px";
    Odiv.style.width = world.unitSize+"px";
    Odiv.style.bottom = (top+bottom)/2 + "px";                            //创建div的id为box
    document.body.appendChild(Odiv);        //在body内创建一个div 

}