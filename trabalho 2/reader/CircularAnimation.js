/**
* CircularAnimation
* @constructor
*/
function CircularAnimation(scene, id, span, centerx, centery, centerz, radius, startang, rotang) {
  Animation.call(this,scene,id,span);

  this.center = vec3.fromValues(centerx, centery, centerz);
  this.radius = radius;
  this.startAng = startang;
  this.rotAng = rotang;

  this.speed = this.rotAng / this.span;
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.apply = function(currTime){
  if(currTime > this.time){
    currTime = this.time;
  }

  var currPosition = this.speed * currTime;
  var currAngle = this.startAng + currPosition;

  this.scene.translate(this.center[0], this.center[1], this.center[2]);
  this.scene.rotate(-currAngle, 0, 1, 0);
  this.scene.translate(this.radius, 0, 0);
}
