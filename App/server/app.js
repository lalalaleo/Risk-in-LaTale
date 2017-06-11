var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var user = require('./user.js');
var gamePoint = require('./gamePoint.js');
var url = require('url');
var path = require('path');


app.use(express.static("../"));

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendfile("index.html");
});


//选择diskStorage存储
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, path.resolve('../content/image/avatar'));
 },
 filename: function (req, file, cb) {
  cb(null, Date.now() + path.extname(file.originalname));//增加了文件的扩展名
 }
});

var upload = multer({storage: storage});


// 头像上传
app.post('/uploadAvatar', upload.single('file'), function(req, res, next) {
  user.updateAvatar(req.body.userid,path.basename(req.file.path),function(msg){
    res.send({
      result: msg,
      filePath: path.basename(req.file.path),
    });
  });
});

app.post('/user',function(req,res){
  if(req.body.type=="login"){
    user.login(req.body.userid,req.body.password,function(msg){
      res.send(msg);
    });
  }
  else if(req.body.type=="register"){
    user.register(req.body.userid,req.body.username,req.body.password,function(msg){
      res.send(msg);
    });
  }
  else if(req.body.type=="changeUserName"){
    user.changeUserName(req.body.userid,req.body.username,function(msg){
      res.send(msg);
    });
  }
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
