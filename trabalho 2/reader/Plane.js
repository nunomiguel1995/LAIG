/**
* Plane
* @constructor
*/
function Plane(scene, divX, divY) {
  this.scene = scene;

  getKnotsVector = function(degree) {
  	var v = new Array();
  	for (var i=0; i<=degree; i++) {
  		v.push(0);
  	}
  	for (var i=0; i<=degree; i++) {
  		v.push(1);
  	}
  	return v;
  }

  var knots1 = getKnotsVector(1); // to be built inside webCGF in later versions ()
  var knots2 = getKnotsVector(1); // to be built inside webCGF in later versions

  var controlPoints = [
                        [
                          [-divX/2 , -divY/2, 0, 1],
                          [-divX/2, divY/2, 0, 1]
                        ],
                        [
                          [divX/2, -divY/2, 0, 1],
                          [divX/2, divY/2, 0, 1]
                        ]
                      ];

    var nurbsSurface = new CGFnurbsSurface(1, 1, knots1, knots2, controlPoints);
  	getSurfacePoint = function(u, v) {
  		return nurbsSurface.getPoint(u, v);
  	};

  	 this.obj = new CGFnurbsObject(this.scene, getSurfacePoint, divX, divY );
}

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.display = function(){
  this.obj.display();
}
