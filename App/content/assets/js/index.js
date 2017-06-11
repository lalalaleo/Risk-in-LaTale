//用户[登陆]
var user = {
    login: {
        load:function(){
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
                    user.login.next();
                }
            });
            $("#btn_register").click(function(){
                user.login.register();
            });
            if(sessionStorage.nickname!=null){
                user.login.ok();
            }
        },
        next:function(){
            var userid = $(".login").children("input[name='userid']").val();
            var password = $(".login").children("input[name='password']").val();
            if(userid.length==0){
                dialog.load("User ID can not be empty.",1,null);
                $(".login").children("input").val("");
            }
            else if(password.length<6){
                dialog.load("Password length must be longer than 6.",1,null);
                $(".login").children("input").val("");
            }
            else {
                $.ajax({
                    type: "post",
                    url: "user",
                    dataType: "JSON",
                    data: "type=login&userid="+userid+"&password="+password,
                    success: function(data){
                        if(data.result == "true"){
                            sessionStorage.user_id=userid;
                            sessionStorage.nickname=data.nickname;
                            sessionStorage.user_avatar=data.useravatar;
                            user.login.ok();
                        }
                        else {
                            dialog.load("用户名或密码错误！",1,null);
                            $(".login").children("input[name='userid']").val("");
                            $(".login").children("input[name='password']").val("");
                        }
                    }
                });
            }
        },
        ok:function(){
            runGame(data_maps, DOMDisplay);
            $("#login_page").remove();
            userInfo.load();
            gameTop.load();
        },
        register: function(){
            $("#login_page").remove();
            user.register.load();
        }
    },
    register: {
        load: function(){
            var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
            var html = document.getElementById("page_register").innerHTML;
            var source = html.replace(reg, function (node, key) { return {}[key]; });
            $("body").append(source);
            $(".register").children("input[name='rePassword']").keypress(function(){
                if(event.which == 13){
                    $("#btn_register").click();
                }
            });
            $("#btn_register").click(function(){
                if($(".dialog").length == 0)
                    user.register.next();
            });
            $("#btn_login").click(function(){
                user.register.login();
            });
        },
        next: function(){
            var userid = $(".register").children("input[name='userid']").val();
            var nickname = $(".register").children("input[name='nickname']").val();
            var password = $(".register").children("input[name='password']").val();
            var rePassword = $(".register").children("input[name='rePassword']").val();
            if(userid.length == 0){
                dialog.load("User ID can not be empty.",1,null);
                $(".register").children("input").val("");
            }
            else if(nickname.length == 0){
                dialog.load("Nickname can not be empty.",1,null);
                $(".register").children("input").val("");
            }
            else if(password.length<6){
                dialog.load("Password length must be longer than 5.",1,null);
                $(".register").children("input").val("");
            }
            else if(password!=rePassword){
                dialog.load("Two password inputs are different.",1,null);
                $(".register").children("input").val("");
            }
            else {
                $.ajax({
                    type: "post",
                    url: "user",
                    dataType: "JSON",
                    data: "type=register&userid="+userid+"&nickname="+nickname+"&password="+password,
                    success: function(data){
                        if(data.result == "true"){
                            sessionStorage.user_id=userid;
                            sessionStorage.nickname=nickname;
                            sessionStorage.user_avatar=data.useravatar;
                            user.register.ok();
                        }
                        else if(data.result == "false") {
                            dialog.load("用户名已存在.",1,null);
                            $(".login").children("input").val("");
                        }
                    }
                });
            }
        },
        ok: function(){
            runGame(data_maps, DOMDisplay);
            $("#register_page").remove();
            userInfo.load();
            gameTop.load();
        },
        login: function(){
            $("#register_page").remove();
            user.login.load();
        }
    }
}

//提示框
var dialog = {
    load: function(content,type,fn){
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
                html=document.getElementById("page_dialog_2").innerHTML;
                source = html.replace(reg, function (node, key) { return {"title":content}[key]; });
                $("body").append(source);
                $(".dialog_input div .cancel").click(function(){
                    $("#dialog_page").click();
                });
                $(".dialog_input div .ok").click(function(){
                    fn($(".dialog_input input").val());
                });
                break;
            }
            case 3:{
                html=document.getElementById("page_dialog_3").innerHTML;
                source = html.replace(reg, function (node, key) { return {"title":content}[key]; });
                $("body").append(source);
                $("#file").change(function(){
                    var reader = new FileReader();
                    if($("#file").val()!=""){
                        $(".dialog_upload label").text("Re Choose");
                    }
                    else{
                        $(".dialog_upload label").text("Choose a Image");
                    }
                    reader.onload = function(e){
                        $(".dialog_upload .img_box").css("display","block");
                        $(".dialog_upload img").attr("src",e.target.result);
                    }
                    reader.readAsDataURL(this.files[0]);
                });
                $(".dialog_upload div .cancel").click(function(){
                    $("#dialog_page").click();
                });
                $(".dialog_upload div .ok").click(function(){
                    fn();
                });
                break;
            }
            default :{

            }
        }
        $("#dialog_page").click(function(){
            $("#dialog_page").remove();
        });
        $("#dialog_page").children("div").click(function(){
            event.stopPropagation();
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
        $(".userInfo .avatar").attr("src","./content/image/avatar/"+sessionStorage.user_avatar);
        $(".userInfo .userName").text(sessionStorage.nickname);
        $(".userInfo .gamePoint").text(gamePoint.num);
        $(".userInfo .exit").click(userInfo.signOut);
        $(".userInfo .userName").click(function(){dialog.load("Update Nickname",2,userInfo.changeNickname)});
        $(".userInfo .avatar").click(function(){dialog.load("Update Avatar",3,userInfo.uploadAvatar)});
    },
    changeNickname:function(nickname){
        $.ajax({
            type: "post",
            url: "user",
            dataType: "JSON",
            data: "type=changeNickname&userid="+sessionStorage.user_id+"&nickname="+nickname,
            success: function(data){
                if(data.result=="ok"){
                    sessionStorage.nickname = nickname;
                    $(".userInfo .userName").text(nickname);
                    gameTop.load();
                    $("#dialog_page").click();
                }
            }
        });
    },
    uploadAvatar: function(){
        var file = document.getElementById("file").files[0];
        var formData = new FormData();
        formData.append("file",file);
        formData.append("userid",sessionStorage.user_id);
        $.ajax({
            url: '/uploadAvatar',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
                if(data.result=="ok") {
                    sessionStorage.user_avatar=data.filePath;
                    $(".userInfo .avatar").attr("src","./content/image/avatar/"+sessionStorage.user_avatar);
                    gameTop.load();
                    $("#dialog_page").click();
                } 
                else {
                    alert("error");
                }
            }
        });
    },
    signOut: function(){
        $(".world").children().remove();
        $(".page").children().remove();
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("nickname");
        sessionStorage.removeItem("user_avatar");
        gamePoint.num = 0;
        gamePoint.levePoint = null;
        user.login.load();
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