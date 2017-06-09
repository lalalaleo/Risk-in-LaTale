var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'latale',
  password : 'riskinlatale',
  port      : 3306,
  database : 'risk_in_latale'
});

exports.add = function(username,gamepoint,fn){
  var d = new Date();
  var sql = 'INSERT INTO gamepoint (gp_username,gp_num,gp_time) VALUES ( "'+username+'", "'+gamepoint+'","'+d.toLocaleString()+'")';
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    else fn({result:"ok"});
    return 0;
  });
}

exports.getTop = function(){
    var sql = 'SELECT * FROM gamepoint ORDER BY gp_num DESC,gp_time limit 10';
    connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    else {
        
    }
    return 0;
  });
}