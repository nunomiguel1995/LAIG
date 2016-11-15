/**
* Patch
* @constructor
*/
function Patch(scene,degree1,degree2, divX, divY, controlPoints) {
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

  var knots1 = getKnotsVector(degree1); // to be built inside webCGF in later versions ()
  var knots2 = getKnotsVector(degree2); // to be built inside webCGF in later versions

  var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlPoints);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

   this.obj = new CGFnurbsObject(this.scene, getSurfacePoint,divX, divY);
}

Patch.prototype = Object.create(CGFobject.prototype);
Patch.prototype.constructor = Patch;

Patch.prototype.display = function(){
  this.obj.display();
}
