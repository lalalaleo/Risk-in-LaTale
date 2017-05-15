init();
function init(){
    var man = document.getElementById("man");
    man.style.bottom = 50+"px";
}
var man = {
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
            var bottom = 50;
            if(man.style.bottom != ""){
                bottom = parseInt(man.style.bottom) + 100;
            }
            $(".man").animate({
                "bottom":bottom
            },200,"linear",function(){
                bottom = 50;
                $(".man").animate({
                    "bottom":bottom
                },200,"linear",function(){;});
            });            
        },
        "jumpRight":function(){
            $(".man").stop(true,false);
            var man = document.getElementById("man");
            var bottom = 50;
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
                bottom = 50;
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
function keydown(){
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
}
function keyup(){
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

document.onkeydown = keydown;
document.onkeyup = keyup;