/**
* MyPlane
* @constructor
*/
function MyPlane(scene, dimX, dimY, partsX, partsY) {
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
                          [-dimX/2 , -dimY/2, 0, 1],
                          [-dimX/2, dimY/2, 0, 1]
                        ],
                        [
                          [dimX/2, -dimY/2, 0, 1],
                          [dimX/2, dimY/2, 0, 1]
                        ]
                      ];

    var nurbsSurface = new CGFnurbsSurface(1, 1, knots1, knots2, controlPoints);
  	getSurfacePoint = function(u, v) {
  		return nurbsSurface.getPoint(u, v);
  	};

  	 this.obj = new CGFnurbsObject(this.scene, getSurfacePoint, partsX, partsY );
}

MyPlane.prototype = Object.create(CGFobject.prototype);
MyPlane.prototype.constructor = MyPlane;

MyPlane.prototype.display = function(){
  this.obj.display();
}
