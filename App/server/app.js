var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sql = require('./login.js');
var url = require('url');

app.use(express.static("../"));

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendfile("index.html");
});

app.post('/login',function(req,res){
  sql.login(req.body.username,req.body.password,function(msg){
    res.send(msg);
  });
});

app.listen(8888, function () {
  console.log('Risk in LaTale is Running , listening on port 8888!');
});
