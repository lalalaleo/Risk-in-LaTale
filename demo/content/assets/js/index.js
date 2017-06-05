var World = {
  unitSize:20,
  gravity:80
}
//胜利
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
  "o": Coin
};

// ----------------------------------------------------------------
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
      if (status == "lost")
        startLevel(n);
      else if (n < plans.length - 1)
        startLevel(n + 1);
      else
        console.log("You win!");
    });
  }
  startLevel(0);
}
