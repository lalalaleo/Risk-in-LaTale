//
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
      var target = parseInt(moveFlag/actor.FPS())+1;//人物运动FPS
      if(target>3) moveFlag=1,target=1;
      if(actor.direction=="left")
        rect.style.backgroundImage="url(./content/image/man/l_"+target+".png)";
      if(actor.direction=="right")
        rect.style.backgroundImage="url(./content/image/man/r_"+target+".png)";
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