/**
* Animation
* @constructor
*/
function Animation(scene, id, span) {
  CGFobject.call(this,scene);

  this.id = id;
  this.span = span;
};

Animation.prototype.apply = function(currTime, node){}
