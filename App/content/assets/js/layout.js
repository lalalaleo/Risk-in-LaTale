
var layout = {
    "initPage":function(){
        $(".page").css({
            "width":$(window).width()+"px",
            "height":$(window).height()+"px"
        });
    },
    "initMaterial":function(){
        $(".material").css({
            "width":world.unitSize+"px",
            "height":world.unitSize+"px"
        });
        $(".map").css({
            "width":world.unitSize*100 + "px"
        });
    },
    "initMan":function(){
        var man = document.getElementById("man");
        man.style.width = world.unitSize+"px";
        man.style.height = 1.5*world.unitSize+"px";
    }
}
$(window).resize(function(){
    layout.initPage();
    layout.initMaterial();
});
