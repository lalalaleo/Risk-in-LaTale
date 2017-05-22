
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
    }
}
$(window).resize(function(){
    layout.initPage();
    layout.initMaterial();
});
