//怪物
function Moster(pos) {
  this.pos = pos.plus(new Vector(0, 0));
  this.size = new Vector(1, 1);
}
Moster.prototype.type = "moster";


Moster.prototype.act = function(step) {
};