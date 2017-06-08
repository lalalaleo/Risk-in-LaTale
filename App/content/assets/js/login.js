var login = {
    load : function(){
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var html = document.getElementById("page_login").innerHTML;
        var source = html.replace(reg, function (node, key) { return {}[key]; });
        $("body").append(source);
        $("#btn_login").click(login.next);
    },
    next : function(){
        $("#login_page").remove();
        runGame(data_maps, DOMDisplay);
    },
}