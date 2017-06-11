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

exports.login = function(username,password,fn){
  var sql = 'SELECT USER_NAME,USER_AVATAR from USER WHERE USER_ID="'+username+'" AND PASSWORD="'+password+'"';
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    if(results.length==0) {
      fn({result:"false"});
    }
    else fn({result:"true",username:results[0].USER_NAME,useravatar: results[0].USER_AVATAR});
    return 0;
  });
}

exports.changeUserName = function(userid,username,fn){
  var sql = 'UPDATE user SET USER_NAME = "'+username+'" WHERE USER_ID= "'+userid+'"';
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

exports.register = function(userid,username,password,fn){
  var sql = 'SELECT * FROM user WHERE USER_ID="'+username+'"';
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    if(results.length>0){
      fn({result:"error_1"});
    }
    else {
      sql = 'INSERT INTO user VALUES ("'+userid+'", "'+username+'", "'+password+'", "default.png")';
      connection.query(sql, function (error, results, fields){
        if (error) throw error;
        else {
          fn({result:"ok"});
        }
      });
    }
  });
}