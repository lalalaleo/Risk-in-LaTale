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
  var sql = 'SELECT USER_NAME from USER WHERE USER_ID="'+username+'" AND PASSWORD="'+password+'"';
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    if(results.length==0) {
      fn({result:"false"});
    }
    else fn({result:"true",username:results[0].USER_NAME});
    return 0;
  });
}