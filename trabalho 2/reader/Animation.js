/**
* Animation
* @constructor
*/
function Animation(id, span) {
    var id, span;
};

Animation.prototype = Object.create(CGFobject.prototype);
Animation.prototype.constructor = Animation;
Animation.prototype.init = function(id, span){
    this.id = id;
    this.span = span;
}