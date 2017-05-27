var monster = {
    name:"Leo Hu",
    init:function(){
        var monsterdiv = document.getElementById("monster");
        monsterdiv.style.bottom = world.unitSize+"px";
        monsterdiv.style.width = world.unitSize+"px";
        monsterdiv.style.height = 2*world.unitSize+"px";
        monster.actionState();
    },
    moveFlag:0,
    jumpFlag:0,
    speedX:2,
    speedY:0,
    setSpeedX:3,
    setSpeedY:20,
    acceleration:1,
    step : 200,
    moveID:null,
    actionState:function(){
        this.moveID=requestAnimationFrame(this.move);
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