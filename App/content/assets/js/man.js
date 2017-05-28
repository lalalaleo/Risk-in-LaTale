var man = {
    name:"Leo",//名字
    speedX:0,//速度
    speedY:0,//跳跃速度
    left:0,//人物x轴坐标
    bottom:0,//人物y周坐标
    width:0,
    height:0,
    // 设定的基础数值（固定数值）
    primary:{
        speedX:3,//人物横向移动速度
        speedY:19,//人物跳跃垂直速度
        acceleration:1//重力
    },
    //各种标记
    flag:{
        move:0,//移动标记
        jump:0,//跳跃标记
        animate:0//动画标记
    },
    //碰撞箱判断
    moveAble:{
        left:true,
        right:true,
        down:true
    },
    //周围距离
    around:{
        bottom:null,
    },
    //移动动画
    moveAnimate:function(action){
        var time = 24 / this.primary.speedX; //动画切换频率，与移动速度成反比
        if(action=="right"){
            if(parseInt(this.flag.animate/time)>=3){
                this.flag.animate=1;
            }
            $("#man").css("background-image","url(./image/man/"+"r_"+(parseInt(this.flag.animate/time)+1)+".png)");
            this.flag.animate++;
        }
        else if(action=="left"){
             if(parseInt(this.flag.animate/time)>=3){
                this.flag.animate=1;
            }
            $("#man").css("background-image","url(./image/man/"+"l_"+(parseInt(this.flag.animate/time)+1)+".png)");
            this.flag.animate++; 
        }
    },
    //动作状态
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
    //移动
    move:function(){
        man.judgeAround();
        var manDiv = document.querySelector("#man");
        var bottom = manDiv.style.bottom;
        var left = manDiv.style.left;
        if(man.around.bottom!=null&&man.around.bottom==0){
            if(man.speedY<0&&(man.flag.move==4||man.flag.move==5||man.flag.move==6||man.flag.move==7)){
                man.flag.move -= 4;
                man.speedY = 0;
                man.flag.jump=0;
            }
        }
        else if(man.around.bottom!=null&&man.around.bottom<-man.speedY){
            man.speedY=-man.around.bottom;
        }
        if(left == '') left='0';
        left = parseInt(left) + man.speedX;
        // console.log();
        bottom = parseInt(bottom) + man.speedY;
        man.left = left;
        man.bottom = bottom;
        manDiv.style.left = left + "px";
        manDiv.style.bottom = bottom + "px";


        if(man.flag.move==4||man.flag.move==5||man.flag.move==6||man.flag.move==7){
            // if(man.moveAble.down==true){
                man.speedY -= man.primary.acceleration;
                man.flag.jump++;
            // }
            // else{
                // man.speedY = 0;
                // man.flag.jump=0;
                // man.flag.move -= 4;
            // }
        }

        man.actionState();
      
    },
    //判断周围
    judgeAround:function(){
        var site1 = {x:man.left,y:man.bottom+man.height}
        var site2 = {x:man.left+man.height, y:man.bottom+man.height}
        var site3 = {x:man.left,y:man.bottom}
        var site4 = {x:man.left+man.width,y:man.bottom}
        function judgeDown(){
            man.isMoveAble.down(man.tratransformSite(site3));
        }
        judgeDown();
    },
    tratransformSite:function(site){
        var Site = {
            x:parseInt(site.x / world.unitSize),
            y:parseInt(site.y / world.unitSize)
        }
        return Site;
    },
    isMoveAble:{
        left:function(){

        },
        right:function(){

        },
        down:function(site){
            var m0 = map.getMaterial(site);
            var m1 = map.getMaterial({x:site.x,y:site.y-1});
            if(m1.type=="block"){
                man.around.bottom = parseInt(document.getElementById("man").style.bottom) - (site.y*world.unitSize);
            }
            else{
                man.around.bottom = null;
            }
        }
    },
    //加载
    load:function(){
        var manDiv = document.createElement("div");
        manDiv.className="man";
        manDiv.id = "man";
        $(".world").append(manDiv);
        layout.initMan();
        this.width=$("#man").width();
        this.height=$("#man").height();
        this.init();
    },
    init:function(){
        var manDiv = document.getElementById("man");
        manDiv.style.bottom = $(window).height()+"px";
        this.flag.move = 4;
        this.flag.jump = 1;
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
