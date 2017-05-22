var world = {
    "unitSize":20,
    "load":function(){
        $("#page").append("<div id='forest' class='world'></div>");
    }
}
$(document).ready(function(){
    layout.initPage();
    world.load();
});