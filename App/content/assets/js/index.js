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
            if(sessionStorage.user_name!=null){
                user.login.ok();
            }
        },
        next:function(){
            var username = $(".login").children("input[name='username']").val();
            var password = $(".login").children("input[name='password']").val();
            if(username.length==0){
                dialog.load("用户名不能为空",1,null);
                $(".login").children("input[name='username']").val("");
                $(".login").children("input[name='password']").val("");
            }
            else if(password.length<6){
                dialog.load("密码至少需要6位",1,null);
                $(".login").children("input[name='username']").val("");
                $(".login").children("input[name='password']").val("");
            }
            else {
                $.ajax({
                    type: "post",
                    url: "user",
                    dataType: "JSON",
                    data: "type=login&username="+$(".login").children("input[name='username']").val()+"&password="+$(".login").children("input[name='password']").val(),
                    success: function(data){
                        if(data.result == "true"){
                            sessionStorage.user_id=$(".login").children("input[name='username']").val();
                            sessionStorage.user_name=data.username;
                            sessionStorage.user_avatar=data.useravatar;
                            user.login.ok();
                        }
                        else {
                            dialog.load("用户名或密码错误！",1,null);
                            $(".login").children("input[name='username']").val("");
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
        $(".userInfo .userName").text(sessionStorage.user_name);
        $(".userInfo .gamePoint").text(gamePoint.num);
        $(".userInfo .exit").click(userInfo.signOut);
        $(".userInfo .userName").click(function(){dialog.load("修改用户名",2,userInfo.changeUserName)});
        $(".userInfo .avatar").click(function(){dialog.load("上传图片作为头像",3,userInfo.uploadAvatar)});
    },
    changeUserName:function(username){
        $.ajax({
            type: "post",
            url: "user",
            dataType: "JSON",
            data: "type=changeUserName&userid="+sessionStorage.user_id+"&username="+username,
            success: function(data){
                if(data.result=="ok"){
                    sessionStorage.user_name = username;
                    $(".userInfo .userName").text(username);
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
        sessionStorage.removeItem("user_name");
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