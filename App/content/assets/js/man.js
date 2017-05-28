var man = {
    name:"Leo",
    load:function(){
        var manDiv = document.createElement("div");
        manDiv.className="man";
        manDiv.id = "man";
        $(".world").append(manDiv);
        layout.initMan();
    },
    primary:{
        speedX:3,
        speedY:9,
        acceleration:1
    },
    flag:{
        move:0,
        jump:0,
        animate:0
    },
    speedX:0,
    speedY:0,
    manFlag:0,
    moveAnimate:function(action){
        if(action=="right"){
            if(parseInt(this.flag.animate/6)>=3){
                this.flag.animate=1;
            }
            $("#man").css("background-image","url(./image/man/"+"r_"+(parseInt(this.flag.animate/6)+1)+".png)");
            this.flag.animate++;
        }
        else if(action=="left"){
             if(parseInt(this.flag.animate/6)>=3){
                this.flag.animate=1;
            }
            $("#man").css("background-image","url(./image/man/"+"l_"+(parseInt(this.flag.animate/6)+1)+".png)");
            this.flag.animate++; 
        }
        
    },
    actionState:function(){
        if(this.flag.move==0){//不动
            this.speedX = 0;
            this.speedY = 0;
        }
        else if(this.flag.move==1){//左移
            this.speedX = - this.primary.speedX;
            this.speedY = 0;
            this.moveAnimate("left");
        }
        else if(this.flag.move==2){//右移
            this.speedX = this.primary.speedX;
            this.speedY = 0;
            this.moveAnimate("right");
        }
        else if(this.flag.move==3){//左右一起（不动）
            this.speedX = 0;
            this.speedY = 0;
        }
        else if(this.flag.move==4){//跳跃
            this.speedX = 0;
            if(this.flag.jump == 0){
                this.speedY = this.primary.speedY;
            }
        }
        else if(this.flag.move==5){//左跳
            this.speedX = - this.primary.speedX;
            if(this.flag.jump == 0){
                this.speedY = this.primary.speedY;
            }
        }
        else if(this.flag.move==6){//右跳
            this.speedX = this.primary.speedX;
            if(this.flag.jump == 0){
                this.speedY = this.primary.speedY;
            }
        }
        else if(this.flag.move==7){//左右一起（不动）跳跃
            this.speedX = 0;
            if(this.flag.jump == 0){
                this.speedY = this.primary.speedY;
            }
        }
        cancelAnimationFrame(this.moveID);
        this.moveID=requestAnimationFrame(this.move);
    },
    move:function(){
        var manDiv = document.querySelector("#man");
        var bottom = manDiv.style.bottom;
        var left = manDiv.style.left;
        if(left == '') left='0';
        if(bottom == '') bottom='30px';
        left = parseInt(left) + man.speedX;
        bottom = parseInt(bottom) + man.speedY;
        manDiv.style.left = left + "px";
        manDiv.style.bottom = bottom + "px";
        if((man.flag.move==4||man.flag.move==5||man.flag.move==6||man.flag.move==7)&&(man.flag.jump<(man.primary.speedY/man.primary.acceleration*2))){
            man.speedY -= man.primary.acceleration;
            man.flag.jump++;
        }
        else if(man.flag.jump==(man.primary.speedY/man.primary.acceleration*2)){
            man.flag.jump=0;        
            man.flag.move -= 4;
        }
        // if(bottom==630)
        // {
        //     man.primary.speedY=-man.primary.speedY;
        //     man.flag.move=4;
        // }
        // if(bottom<=30)
        // {
        //     if($(".material:first-child").attr("class")=="material grass"){
        //         if((man.flag.move==4||man.flag.move==5||man.flag.move==6||man.flag.move==7)){
        //             man.flag.move-=4;
        //             man.flag.jump=0;
        //         }
        //     }
        // }
    
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
            if(man.flag.move==0||man.flag.move==1||man.flag.move==4||man.flag.move==5){
                man.flag.move+=2;
            }
        }
        else if(event.keyCode==37){
            if(man.flag.move==0||man.flag.move==2||man.flag.move==4||man.flag.move==6){
                man.flag.move+=1;
            }
        }
        else if(event.keyCode==67){
            if(man.flag.move==0||man.flag.move==1||man.flag.move==2||man.flag.move==3){
                man.flag.move+=4;
            }
        }
        man.actionState();
    },
    keyup:function(){
        if(event.keyCode==39){
            man.flag.move -= 2;
        }
        else if(event.keyCode==37){
            man.flag.move -= 1;
        }
        else if(event.keyCode==67){
        }
        man.actionState();
    }
}
