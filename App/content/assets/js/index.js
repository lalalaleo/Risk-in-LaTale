//用户[登陆]
var user = {
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
                user.next();
            }
        });
        if(sessionStorage.user_name!=null){
            user.login();
        }
    },
    next : function(){
        var username = $(".login").children("input[name='username']").val();
        var password = $(".login").children("input[name='password']").val();
        if(username.length==0){
            dialog.load("用户名不能为空",1);
            $(".login").children("input[name='username']").val("");
            $(".login").children("input[name='password']").val("");
        }
        else if(password.length<6){
            dialog.load("密码至少需要6位",1);
            $(".login").children("input[name='username']").val("");
            $(".login").children("input[name='password']").val("");
        }
        else {
            $.ajax({
                type: "post",
                url: "login",
                dataType: "JSON",
                data: "type=login&username="+$(".login").children("input[name='username']").val()+"&password="+$(".login").children("input[name='password']").val(),
                success: function(data){
                    if(data.result == "true"){
                        sessionStorage.user_id=$(".login").children("input[name='username']").val();
                        sessionStorage.user_name=data.username;
                        user.login();
                    }
                    else {
                        dialog.load("用户名或密码错误！",1);
                        $(".login").children("input[name='username']").val("");
                        $(".login").children("input[name='password']").val("");
                    }
                }
            });
        }
    },
    login: function(){
        runGame(data_maps, DOMDisplay);
        $("#login_page").remove();
        userInfo.load();
        gameTop.load();
    }
}

//提示框
var dialog = {
    load: function(content,type){
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var html = "";
        var source;
        switch(type){
            case 1:{
                html=document.getElementById("page_dialog_1").innerHTML;
                source = html.replace(reg, function (node, key) { return {"content":content}[key]; });
                $("body").append(source);
                break;
            }
            case 2:{

            }
            default :{

            }
        }
        $("#dialog_page").click(function(){
            $("#dialog_page").remove();
        });
    }
}


//----------------------------------------------------------------------------------------------------------------------------//


//用户信息框

var userInfo = {
    load: function(){
        $(".userInfo").remove();
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var html = document.getElementById("page_userInfo").innerHTML;
        var source = html.replace(reg, function (node, key) { return {}[key]; });
        $("#page").append(source);
        $(".userInfo .userName").text(sessionStorage.user_name);
        $(".userInfo .gamePoint").text(gamePoint.num);
        $(".userInfo .exit").click(userInfo.signOut);
    },
    signOut: function(){
        $(".world").children().remove();
        $(".page").children().remove();
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("user_name");
        gamePoint.num = 0;
        gamePoint.levePoint = null;
        user.load();
    }
}

//排行榜

var gameTop = {
    load: function(){
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var html = document.getElementById("page_gameTop").innerHTML;
        var source = html.replace(reg, function (node, key) { return {}[key]; });
        $("#page").append(source);
        $(".gameTop .list").children().remove();
        gamePoint.getTop();
    }
}