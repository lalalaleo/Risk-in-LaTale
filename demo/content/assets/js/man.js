var Man = {
  XSpeed:9,  
  YSpeed:30,
  get FPS(){
    return 72/this.XSpeed;
  }
}

//人物
function Player(pos) {
    this.XSpeed = 9; //移动速度
    this.YSpeed = 30; //跳跃高度
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(1, 1.5);
  this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";
//人物运动
Player.prototype.moveX = function(step, map, keys) {
  
  this.speed.x = 0;
  if (keys.left) {
    this.speed.x -= Man.XSpeed;
    moveFlag++;
    this.direction = "left";
  }
  if (keys.right) {
    this.speed.x += Man.XSpeed;
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

Player.prototype.moveY = function(step, map, keys) {
  this.speed.y += step * World.gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = map.obstacleAt(newPos, this.size);
  if (obstacle) {
    map.playerTouched(obstacle);
    if (keys.up && this.speed.y > 0)
      this.speed.y = -Man.YSpeed;
    else
      this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
};

Player.prototype.act = function(step, map, keys) {
  this.moveX(step, map, keys);
  this.moveY(step, map, keys);

  var otherActor = map.actorAt(this);
  if (otherActor)
    map.playerTouched(otherActor.type, otherActor);

  // 失败动画
  if (map.status == "lost") {
    this.pos.y += step;
    this.size.y -= step;
  }
};
//运动动画
Player.prototype.moveAnimation = function() {
  
}
