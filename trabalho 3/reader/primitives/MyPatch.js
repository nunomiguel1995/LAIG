/**
* MyPatch
* @constructor
*/
function MyPatch(scene,orderU,orderV, partsU, partsV, controlPoints) {
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

  var knots1 = getKnotsVector(orderU); // to be built inside webCGF in later versions ()
  var knots2 = getKnotsVector(orderV); // to be built inside webCGF in later versions

  var nurbsSurface = new CGFnurbsSurface(orderU, orderV, knots1, knots2, controlPoints);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

   this.obj = new CGFnurbsObject(this.scene, getSurfacePoint,partsU, partsV);
}

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.display = function(){
  this.obj.display();
}
