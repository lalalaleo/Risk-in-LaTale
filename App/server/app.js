var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var user = require('./user.js');
var gamePoint = require('./gamePoint.js');
var url = require('url');

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});
var upload = multer({
    storage: storage
});

app.use(express.static("../"));

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendfile("index.html");
});

app.post('/user',function(req,res){
  if(req.body.type=="login"){
    user.login(req.body.username,req.body.password,function(msg){
      res.send(msg);
    });
  }
  else if(req.body.type=="changeUserName"){
    user.changeUserName(req.body.userid,req.body.username,function(msg){
      res.send(msg);
    });
  }
});

app.post('/uploadAvatar',function(req,res){
  var url = 'http://' + req.headers.host + '/images/' + req.file.originalname
  res.json({
      code : 200,
      data : url
  })
});

app.post('/gamePoint',function(req,res){
  if(req.body.type=="add"){
    gamePoint.add(req.body.userid,req.body.gamePoint,function(msg){
      res.send(msg);
    });
  }
  else if(req.body.type=="getTop"){
    gamePoint.getTop(function(msg){
      res.send(msg);
    });
  }
});
app.listen(8888, function () {
  console.log('Risk in LaTale is Running , listening on port 8888!');
});
