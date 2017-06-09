var login = {
    load : function(){
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var html = document.getElementById("page_login").innerHTML;
        var source = html.replace(reg, function (node, key) { return {}[key]; });
        $("body").append(source);
        $(".login").children("input[name='password']").keypress(function(){
            if(event.which == 13){
                $("#btn_login").click();
            }
        });
        $("#btn_login").click(function(){
            if($(".dialog").length==0){
                login.next();
            }
        });
    },
    next : function(){
        var username = $(".login").children("input[name='username']").val();
        var password = $(".login").children("input[name='password']").val();
        if(username.length==0){
            dialog.load("用户名不能为空");
            $(".login").children("input[name='username']").val("");
            $(".login").children("input[name='password']").val("");
        }
        else if(password.length<6){
            dialog.load("密码至少需要6位");
            $(".login").children("input[name='username']").val("");
            $(".login").children("input[name='password']").val("");
        }
        else {
            $.ajax({
                type: "post",
                url: "login",
                dataType: "JSON",
                data: "username="+$(".login").children("input[name='username']").val()+"&password="+$(".login").children("input[name='password']").val(),
                success: function(data){
                    if(data.result == "true"){
                        sessionStorage.user_id=$(".login").children("input[name='username']").val();
                        sessionStorage.user_name=data.username;
                        $("#login_page").remove();
                        runGame(data_maps, DOMDisplay);
                    }
                    else {
                        dialog.load("用户名或密码错误！");
                        $(".login").children("input[name='username']").val("");
                        $(".login").children("input[name='password']").val("");
                    }
                }
            });
        }
    },
}

var dialog = {
    load: function(content){
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var html = document.getElementById("page_dialog").innerHTML;
        var source = html.replace(reg, function (node, key) { return {"content":content}[key]; });
        $("body").append(source);
        $("#dialog_page").click(function(){
            $("#dialog_page").remove();
        });
    }
}