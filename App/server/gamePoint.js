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

exports.getTop = function(fn){
    var sql = 'SELECT gamepoint.gp_id,user.USER_NAME,gamepoint.gp_num,gp_time FROM gamepoint,user WHERE gamepoint.gp_username=user.USER_ID group by gp_num desc,gp_time limit 10;';
    connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    else {
        var Obj = {
          result: "true",
          data: []
        }
        for(var i in results){
          var o = {
            username: results[i].USER_NAME,
            gamepoint: results[i].gp_num,
            time: results[i].gp_time
          }
          Obj.data.push(o);
        }
        fn(Obj);
    }
    return 0;
  });
}