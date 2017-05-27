
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
    }
}
$(window).resize(function(){
    layout.initPage();
    layout.initMaterial();
});
