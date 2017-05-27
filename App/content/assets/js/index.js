var world = {
    "unitSize":30,
    "load":function(){
        $("#page").append("<div id='forest' class='world'></div>");
    }
}
$(document).ready(function(){
    layout.initPage();
    world.load();
    map.get();
    map.load();
});