//-----------------------------------------------------------------------------//


var World = {
  unitSize:32,
  gravity:80
}
//坐标
function Vector(x, y) {
  this.x = x; this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};
//标记
var actorSign = {
  "@": Man,
  "o": Coin,
  "S":Moster
};

//计分板
var gamePoint = {
  num: 0,
  levePoint: null,
  update: function(){
    if(this.levePoint!=null&&this.levePoint>=$(".coin").length){
      this.num += this.levePoint - $(".coin").length;
    }
    this.levePoint = $(".coin").length;
    $(".userInfo .gamePoint").text(this.num);
  },
  sendToSever: function(){
    $.ajax({
      type: "POST",
      url: "gamePoint",
      dataType: "JSON",
      data: "type=add&username="+sessionStorage.user_name+"&gamePoint="+gamePoint.num,
      success: function(data){}
    });
  },
  getTop: function(){
    $.ajax({
      type: "POST",
      url: "gamePoint",
      dataType: "JSON",
      data: "type=getTop&username="+sessionStorage.user_name+"&gamePoint="+gamePoint.num,
      success: function(data){
        for(var i in data.data){
          var no = 1+parseInt(i);
          var src="";
          switch(no){
            case 1: src="src='./content/image/icon/no_1.png'";break;
            case 2: src="src='./content/image/icon/no_2.png'";break;
            case 3: src="src='./content/image/icon/no_3.png'";break;
            default : src="";
          }
          $(".gameTop .list").append("<tr>"+
            "<td><img "+src+" /></td>"+
            "<td>"+no+"</td>"+
            "<td>"+data.data[i].username+"</td>"+
            "<td>"+data.data[i].gamepoint+"</td>"+
            "<td></td>"+
            "</tr>"
          );
        }
      }
    });
  }
}


//----------------------------------------------------------------------------//


//屏幕绘制
function elt(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}

function DOMDisplay(parent, map) {
  this.wrap = document.getElementById("world").appendChild(elt("div", "map"));
  this.map = map;

  this.wrap.appendChild(this.drawBackground());
  this.actorLayer = null;
  this.drawFrame();
}

//地图绘画

DOMDisplay.prototype.drawBackground = function() {
  var table = elt("table", "background");
  table.style.width = this.map.width * World.unitSize + "px";
  this.map.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = World.unitSize + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};
var moveFlag = 1;
//运动物体绘画
DOMDisplay.prototype.drawActors = function() {
  var wrap = elt("div");
  this.map.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt("div",
                                    "actor " + actor.type));
    //人物运动动画                                    
    if(actor.type=="man") {
      actor.moveAnimation(rect);
    }
    rect.style.width = actor.size.x * World.unitSize + "px";
    rect.style.height = actor.size.y * World.unitSize + "px";
    rect.style.left = actor.pos.x * World.unitSize + "px";
    rect.style.top = actor.pos.y * World.unitSize + "px";
  });
  return wrap;
};

DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  this.wrap.className = "map " + (this.map.status || "");
  this.scrollPlayerIntoView();
};
//地图随人物滚动
DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;
  var margin = width / 3;

  // The viewport
  var left = this.wrap.scrollLeft, right = left + width;
  var top = this.wrap.scrollTop, bottom = top + height;

  var man = this.map.man;
  var center = man.pos.plus(man.size.times(0.5))
                 .times(World.unitSize);

  if (center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};
//清除
DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};


// --------------------------------------------------------------------------//


//监听
var arrowCodes = {37: "left", 67: "up", 39: "right"};

function trackKeys(codes) {
  var pressed = Object.create(null);
  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}


//-------------------------------------------------------------------------//


//运动动画
function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

var arrows = trackKeys(arrowCodes);


//-------------------------------------------------------------------------//


//运行关卡
function runLevel(map, Display, andThen) {
  var display = new Display(document.body, map);
  runAnimation(function(step) {
    map.animate(step, arrows);
    display.drawFrame(step);
    if (map.isFinished()) {
      display.clear();
      if (andThen)
        andThen(map.status);
      return false;
    }
  });
}


//运行游戏
function runGame(plans, Display) {
  function startLevel(n) {
    runLevel(new Map(plans[n]), Display, function(status) {
      if (status == "lost"){
        // startLevel(n);
        gamePoint.sendToSever();
        dialog.load("你输了！");
      }
      else if (n < plans.length - 1)
        startLevel(n + 1);
      else{
        gamePoint.sendToSever();
        dialog.load("你赢了！");
      }
    });
  }
  startLevel(0);
}
