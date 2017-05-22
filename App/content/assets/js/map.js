function mapLevel ( plan ) 
{
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
        fieldType = "css/material/grass ";
      }
        
      else if (ch == "!"){
        fieldType = "css/material/ice ";  
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
