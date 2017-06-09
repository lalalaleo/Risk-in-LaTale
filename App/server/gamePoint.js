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

//   var d = new Date();
//   var sql = 'INSERT INTO gamepoint (gb_username,gb_num,gb_time) VALUES ( "'+username+'", "'+gamepoint+'","'+d.toLocaleString()+'")';
//   var sql = 'INSERT INTO gamepoint (gb_username,gb_num,gb_time) VALUES ( "'+username+'", "'+gamepoint+'","'+d.toLocaleString()+'")';
//   connection.query('INSERT INTO gamepoint (gp_username,gp_num,gp_time) VALUES ( "Test", 18,"2017-06-09 22.54.00")', function (error, results, fields) {
//     if (error) throw error;
//   });