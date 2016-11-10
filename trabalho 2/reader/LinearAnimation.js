/**
* LinearAnimation
* @constructor
*/
function LinearAnimation(id, span, listControlPoints) {
    this.init(id, span);

    this.controlPoints = listControlPoints;
}

LinearAnimation.prototype = new Animation();