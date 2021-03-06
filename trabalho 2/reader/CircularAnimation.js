/**
* CircularAnimation
* @constructor
*/
function CircularAnimation(scene, id, span, centerx, centery, centerz, radius, startang, rotang) {
  Animation.call(this,scene,id,span);

  this.center = vec3.fromValues(centerx, centery, centerz);
  this.radius = radius;
  this.startAng = startang;
  this.rotAng = rotang * Math.PI / 180;

  this.speed = this.rotAng / this.span;
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.apply = function(currTime, node){
  if(currTime > this.span){
    currTime = this.span;
    if(node.animationIndex < node.animation.length){
      node.animationIndex++;
    }
    this.scene.time = 0;
    this.scene.elapsedTime = 0;
  }

  var currPosition = this.speed * currTime;
  var currAngle = this.startAng + currPosition;

  this.scene.translate(this.center[0], this.center[1], this.center[2]);
  this.scene.rotate(Math.PI/2,1,0,0);
  this.scene.rotate(currAngle, 0, 1, 0);
  this.scene.translate(this.radius, 0, 0);
}
