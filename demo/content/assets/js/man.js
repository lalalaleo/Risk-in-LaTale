//人物
function Man(pos) {
  this.XSpeed = 9; //移动速度
  this.YSpeed = 30; //跳跃高度
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(1, 1.5);
  this.speed = new Vector(0, 0);
  this.FPS = function(){
    return 72/this.XSpeed;
  }
}
Man.prototype.type = "man";
//人物运动
Man.prototype.moveX = function(step, map, keys) {
  
  this.speed.x = 0;
  if (keys.left) {
    this.speed.x -= this.XSpeed;
    moveFlag++;
    this.direction = "left";
  }
  if (keys.right) {
    this.speed.x += this.XSpeed;
    moveFlag++;
    this.direction = "right";
  }
  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var obstacle = map.obstacleAt(newPos, this.size);
  if (obstacle)
    map.playerTouched(obstacle);
  else
    this.pos = newPos;
};

Man.prototype.moveY = function(step, map, keys) {
  this.speed.y += step * World.gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = map.obstacleAt(newPos, this.size);
  if (obstacle) {
    map.playerTouched(obstacle);
    if (keys.up && this.speed.y > 0)
      this.speed.y = -this.YSpeed;
    else
      this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
};
//人物动作
Man.prototype.act = function(step, map, keys) {
  this.moveX(step, map, keys);
  this.moveY(step, map, keys);

  var otherActor = map.actorAt(this);
  if (otherActor)
    map.playerTouched(otherActor.type, otherActor);

  // 失败动画
  if (map.status == "lost") {
    this.pos.y += step;
    this.size.x = 1.5;
    if(this.size.y == 1.5)
      this.size.y = 1;
    this.size.y -= step;
    this.direction = "dead"
    this.XSpeed = 0;
    this.YSpeed = 0;
  }
  else if(map.status == "won") {
    this.direction = "win"
    this.XSpeed = 0;
    this.YSpeed = 0;
  }
};
//运动动画
Man.prototype.moveAnimation = function(rect) {
  var target = parseInt(moveFlag/this.FPS())+1;//人物运动FPS
  if(target>3) moveFlag=1,target=1;
  switch(this.direction){
    case "dead": rect.style.backgroundImage="url(./content/image/man/dead.png)";break;
    case "win": rect.style.backgroundImage="url(./content/image/man/win.png)";break;
    case "left": rect.style.backgroundImage="url(./content/image/man/l_"+target+".png)";break;
    case "right": rect.style.backgroundImage="url(./content/image/man/r_"+target+".png)";break;
    default : ;
  }
}
