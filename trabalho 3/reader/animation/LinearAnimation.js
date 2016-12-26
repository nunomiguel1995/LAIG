/**
* LinearAnimation
* @constructor
*/
function LinearAnimation(scene, id, span, listControlPoints) {
    Animation.call(this, scene, id, span);

    this.scene = scene;
    this.controlPoints = listControlPoints;
    this.segments = [];
    this.totalDistance = 0;

    for(var i = 0; i < this.controlPoints.length - 1; i++){
      var pointA = this.controlPoints[i];
      var pointB = this.controlPoints[i+1];
      this.totalDistance += vec3.dist(vec3.fromValues(pointB[0],pointB[1],pointB[2]), vec3.fromValues(pointA[0],pointA[1],pointA[2]));
      this.segments[i] = this.totalDistance;
    }

    this.speed = this.totalDistance / this.span;
    this.angle = 0;
}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.apply = function(currTime){
  if(currTime > this.span){
    currTime = this.span;
    this.scene.time = 0;
    this.scene.elapsedTime = 0;
  }else{
    this.currPosition = this.speed * currTime;

    var i = 0;
    while(this.currPosition > this.segments[i] && i < this.segments.length){
      i++;
    }

    var pointA = this.controlPoints[i];
    var pointB = this.controlPoints[i+1];

    var lastSegment;
    if(i == 0){
      lastSegment = 0;
    }else{
      lastSegment = this.segments[i-1];
    }

    var offset = (this.currPosition - lastSegment) / (this.segments[i] - lastSegment);

    var x = (pointB[0] - pointA[0]) * offset + pointA[0];
    var y = (pointB[1] - pointA[1]) * offset + pointA[1];
    var z = (pointB[2] - pointA[2]) * offset + pointA[2];

    var rotAngle = Math.atan((pointB[0] - pointA[0]) / (pointB[2] - pointA[2]));

    if (pointB[2] - pointA[2] < 0){
      rotAngle += Math.PI;
    }

    if (pointB[0] - pointA[0] == 0 && pointB[2] - pointA[2] == 0){
      rotAngle = this.angle;
    }

    this.angle = rotAngle;

    this.scene.translate(x, y, z);
    //this.scene.rotate(rotAngle, 0, 1, 0);
  }
}
