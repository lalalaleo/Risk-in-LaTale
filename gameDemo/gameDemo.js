var simpleLevelPlan = [
  "                      ",
  "                      ",
  "  x               xx  ",
  "  x                x  ",
  "  x @      xxxxx   x  ",
  "  xxxxx            x  ",
  "      x!!!!!!!!!!!!x  ",
  "                      ",
  "                      "
];

function Level(plan) {
  this.width = plan[0].length;  //地图宽度
  this.height = plan.length;    //地图高度
  this.grid = [];               //网格
  this.actors = [];             //活动元素

  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];
    for (var x = 0; x < this.width; x++) {
      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];
      if (Actor)
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch == "x")
        fieldType = "grass ";
      else if (ch == "!")
        fieldType = "ice ";
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }

  this.player = this.actors.filter(function(actor) {
    return actor.type == "player";
  })[0];
  this.status = this.finishDelay = null;
}

/*
*Vector 获取活动元素的位置
*/
function Vector(x, y) {
  this.x = x; this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};

/**
 * actorChars对象来讲字符和构造函数关联起来
 */
var actorChars = {
  "@": Player,
};

function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";


var simpleLevel = new Level(simpleLevelPlan);

/**
 * 创建元素并赋予class属性
 */
function elt(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}

/**
 * 显示器DOMDDisplay
 */
function DOMDisplay(parent, level) {
  this.wrap = parent.appendChild(elt("div", "map"));
  this.level = level;

  this.wrap.appendChild(this.drawBackground());
  this.actorLayer = null;
  this.drawFrame();
}

var scale = 20;
/**
 * 打印出背景 scale=20 相乘之后可以控制背景的大小
 */
DOMDisplay.prototype.drawBackground = function() {
  var table = elt("table", "background");
  table.style.width = this.level.width * scale + "px";
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr")); //tr指的是网格中每一行对应表格中的一行
    rowElt.style.height = scale + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type)); //td指的是网格中每个字符串对应表格的单元格元素的类型名
    });
  });
  return table;
};

/**
 * 打印出人物 scale=20 相乘之后可以控制人物的大小
 */
DOMDisplay.prototype.drawActors = function() {
  var wrap = elt("div");
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt("div",
                                    "actor " + actor.type));
    rect.style.width = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left = actor.pos.x * scale + "px";
    rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};

/**
 * 
 */
DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  this.wrap.className = "map " + (this.level.status || "");
};






