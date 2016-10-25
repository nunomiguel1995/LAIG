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

MyCylinderCircle.prototype.initBuffers = function() {
  this.vertices = [];
  this.indices = [];
  this.normals = [];
  this.texCoords = [];

  var alfa = (Math.PI * 2) / this.slices;

  for(var i = 0; i < this.slices; i++){
    this.vertices.push(this.radius * Math.cos(alfa * i), this.radius * Math.sin(alfa * i), 0);
    this.normals.push(0, 0, 1);
    this.texCoords.push(0.5 + Math.cos(alfa * i)/2, 0.5 + Math.sin(alfa * i)/2);
  }
  
  this.vertices.push(0,0,0);
  this.normals.push(0,0,1);
  this.texCoords.push(0.5,0.5);

  for(var i = 0 ; i < this.slices; i++){
    this.indices.push(this.slices, i, (i+1) % this.slices);
  }

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers(); 
};
