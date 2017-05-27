function mapLevel ( plan ) {
  /**存储地图信息
   * 地图宽度
   * 地图高度
   * 网格
   * 人物
   */
  this.width  = plan[0].length;  
  this.height = plan.length;      
  this.grid   = [];               
  this.actors = [];
  
  for (var y = 0; y < this.height; y++) 
  {
    var line = plan[y], gridLine = [];
    for (var x = 0; x < this.width; x++) 
    {
      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];
      if (Actor){
        this.actors.push(new Actor (new Vector(x, y), ch));
      }      
      else if (ch == "x"){
        fieldType = "material grass ";
      }
        
      else if (ch == "!"){
        fieldType = "material ice ";  
      }
      /*
      //关卡传送门出现的初始位置   
      else if (ch == "o"){
        fieldType = " ";  
      }
      //1类怪物
      else if (ch == "q"){
        fieldType = " ";  
      }
      */
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }

  this.player = this.actors.filter(function(actor) {
    return actor.type == "player";
  })[0];
  this.status = this.finishDelay = null;
}

/** Vector 获取活动元素的位置
 *  
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

/*定义活动元素
*
*/
var actorChars = {
  "@": Player,
  "o": NextLevel,
  "q": Monster
};

/*创建元素，并且赋予class属性
*
*/
function elt(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}

function DOMDisplay(parent, level) {
  this.wrap = parent.appendChild(elt("div", " "));//添加地图静态界面
  this.level = level;

  this.wrap.appendChild(this.drawBackground());
  this.actorLayer = null;
  this.drawFrame();
}

/**
 * 一个像素点=20像素
 */
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


