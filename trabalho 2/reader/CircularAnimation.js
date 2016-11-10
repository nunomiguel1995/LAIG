/**
* CircularAnimation
* @constructor
*/
function CircularAnimation(id, span, centerx, centery, centerz, radius, startang, rotang) {
    this.init(id, span);

    this.center = vec3.fromValues(centerx, centery, centerz);
    this.radius = radius;
    this.startAng = startang;
    this.rotAng = rotang;
}

CircularAnimation.prototype = new Animation();