/**
* Animation
* @constructor
*/
function Animation() {
    var id, span;
};

Animation.prototype = Object.create(CGFobject.prototype);
Animation.prototype.constructor = Animation;
Animation.prototype.init = function(scene, id, span){
    CGFobject.call(this,scene);

    this.id = id;
    this.span = span;
}
