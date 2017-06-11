var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'latale',
  password : 'riskinlatale',
  port      : 3306,
  database : 'risk_in_latale'
});

exports.add = function(userid,gamepoint,fn){
  var d = new Date();
  var sql = 'INSERT INTO gamepoint (gp_userid,gp_num,gp_time) VALUES ( "'+userid+'", "'+gamepoint+'","'+d.toLocaleString()+'")';
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    else fn({result:"ok"});
    return 0;
  });
}

exports.getTop = function(fn){
    var sql = 'SELECT user.USER_AVATAR,gamepoint.gp_id,user.NICKNAME,gamepoint.gp_num,gp_time FROM gamepoint,user WHERE gamepoint.gp_userid=user.USER_ID group by gp_num desc,gp_time limit 10;';
    connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    else {
        var Obj = {
          result: "true",
          data: []
        }
        for(var i in results){
          var o = {
            nickname: results[i].NICKNAME,
            gamepoint: results[i].gp_num,
            time: results[i].gp_time,
            avatar: results[i].USER_AVATAR
          }
          Obj.data.push(o);
        }
        fn(Obj);
    }
    return 0;
  });
}