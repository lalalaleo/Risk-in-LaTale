var man = {
    name:"Leo",
    initLayout:function(){
        var man = document.getElementById("man");
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
