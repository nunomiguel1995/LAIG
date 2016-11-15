/**
* CircularAnimation
* @constructor
*/
function CircularAnimation(scene, id, span, centerx, centery, centerz, radius, startang, rotang) {
    CGFobject.call(this,scene);

    this.init(this.scene, id, span);

    this.center = vec3.fromValues(centerx, centery, centerz);
    this.radius = radius;
    this.startAng = startang;
    this.rotAng = rotang;
}

CircularAnimation.prototype = new Animation();
