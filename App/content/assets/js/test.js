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
    initLayout:function(){
        var man = document.getElementById("man");
        man.style.bottom = world.unitSize+"px";
        man.style.width = world.unitSize+"px";
        man.style.height = 2*world.unitSize+"px";
    },
    "actionStete":0,
    "action":{
        "goLeft":function(){
            var man = document.getElementById("man");
            var left = 0;
            if(man.style.left != ""){
                left = parseInt(man.style.left) - 10;
            }
            $(".man").animate({
                "left":-20000
            },100000,"linear",function(){;});
        },
        "goRight":function(){
            var man = document.getElementById("man");
            var left = 0;
            if(man.style.left != ""){
                left = parseInt(man.style.left) + 10;
            }
            $(".man").animate({
                "left":20000
            },100000,"linear",function(){;});            
        },
        "jump":function(){
            var man = document.getElementById("man");
            var bottom = world.unitSize;
            if(man.style.bottom != ""){
                bottom = parseInt(man.style.bottom) + 100;
            }
            $(".man").animate({
                "bottom":bottom
            },200,"linear",function(){
                bottom = world.unitSize;
                $(".man").animate({
                    "bottom":bottom
                },200,"linear",function(){;});
            });            
        },
        "jumpRight":function(){
            $(".man").stop(true,false);
            var man = document.getElementById("man");
            var bottom = world.unitSize;
            var left = 0;
            if(man.style.bottom != ""){
                bottom = parseInt(man.style.bottom) + 100;
            }
            if(man.style.left != ""){
                left = parseInt(man.style.left);
            }
            $(".man").animate({
                "bottom":bottom,
                "left":left+80
            },200,"linear",function(){
                bottom = world.unitSize;
                $(".man").animate({
                    "bottom":bottom,
                    "left":left+80
                },200,"linear",function(){
                    $(".man").animate({
                        "left":20000
                    },100000,"linear",function(){;});
                });
            });
        },
        "stop":function(){
            $(".man").stop(true,false);
        }
    }
}
var keyEvent = {
    set:function(){
        document.onkeydown = this.keydown;
        document.onkeyup = this.keyup;
    },
    keydown:function(){
        if(event.keyCode==37){
            if(man.actionStete == 1){;}
            else{
                man.actionStete = 1;
                man.action.goLeft();
            }
        }
        else if(event.keyCode==39){
            if(man.actionStete == 1){;}
            else{
                man.actionStete = 1;
                man.action.goRight();
            }
        }
        else if(event.keyCode==67){
            console.log(man.actionStete);
            if(man.actionStete == 1){
                man.action.jumpRight();
            }
            else{
                man.action.jump();
            }
        }
    },
    keyup:function(){
        if(event.keyCode==39){
            man.action.stop();
            man.actionStete = 0;
        }
        else if(event.keyCode==37){
            man.action.stop();
            man.actionStete = 0;
        }
        else if(event.keyCode==67){
        }
    }
}
$(document).ready(function(){
    map.load();
    map.initLayout();
    man.initLayout();
    keyEvent.set();
});
