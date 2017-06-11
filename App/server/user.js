var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'latale',
  password : 'riskinlatale',
  port      : 3306,
  database : 'risk_in_latale'
});
 
connection.connect(function(error,res){
	if(error){
		console.log('Connection error:'+error.message);
		return;
	}
	console.log('Connection sucessfully')
});

exports.login = function(userid,password,fn){
  var sql = 'SELECT NICKNAME,USER_AVATAR from USER WHERE USER_ID="'+userid+'" AND PASSWORD="'+password+'"';
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    if(results.length==0) {
      fn({result:"false"});
    }
    else fn({result:"true",nickname:results[0].NICKNAME,useravatar: results[0].USER_AVATAR});
    return 0;
  });
}

exports.changeNickname = function(userid,nickname,fn){
  var sql = 'UPDATE user SET NICKNAME = "'+nickname+'" WHERE USER_ID= "'+userid+'"';
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    else{
      fn({result:"ok"});
    }
    return 0;
  });
}

exports.updateAvatar = function(userid,avatar,fn){
  var sql = 'UPDATE user SET USER_Avatar = "'+avatar+'" WHERE USER_ID= "'+userid+'"';
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    else{
      fn("ok");
    }
    return 0;
  });
}

exports.register = function(userid,nickname,password,fn){
  var sql = 'SELECT userid FROM user WHERE USER_ID="'+userid+'"';
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    if(results.length>0){
      fn({result:"false"});
    }
    else {
      sql = 'INSERT INTO user VALUES ("'+userid+'", "'+nickname+'", "'+password+'", "default.png")';
      connection.query(sql, function (error, results, fields){
        if (error) throw error;
        else {
          fn({result:"true",useravatar:"default.png"});
        }
      });
    }
  });
}