/**
* MyCylinderCircle
* @constructor
* <cylinder base="ff" top="ff" height="ff" slices="ii" stacks="ii" />
*/
function MyCylinderCircle(scene, radius, slices) {
  CGFobject.call(this,scene);
    
  this.radius = radius;
  this.slices = slices;

  this.initBuffers();
};

MyCylinderCircle.prototype = Object.create(CGFobject.prototype);
MyCylinderCircle.prototype.constructor = MyCylinderCircle;

MyCylinderCircle.prototype.display = function() {
  this.vertices = [];
  this.indices = [];
  this.normals = [];
  this.texCoords = [];

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers(); 
}
