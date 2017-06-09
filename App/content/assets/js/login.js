var login = {
    load : function(){
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var html = document.getElementById("page_login").innerHTML;
        var source = html.replace(reg, function (node, key) { return {}[key]; });
        $("body").append(source);
        $("#btn_login").click(login.next);
    },
    next : function(){
        $.ajax({
            type: "post",
            url: "login",
            dataType: "JSON",
            data: "username="+$(".login").children("input[name='username']").val()+"&password="+$(".login").children("input[name='password']").val(),
            success: function(data){
                if(data.result == "true"){
                    $("#login_page").remove();
                    runGame(data_maps, DOMDisplay);
                }
                else {
                    var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
                    var html = document.getElementById("page_dialog").innerHTML;
                    var source = html.replace(reg, function (node, key) { return {}[key]; });
                    $("body").append(source);
                    $("#dialog_page").click(function(){
                        $("#dialog_page").remove();
                    });
                }
            }
        });
      
    },
}

var dialog = {
    load: function(){

    }
}