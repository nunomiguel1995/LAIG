/**
* MyCylinder
* @constructor
* <cylinder base="ff" top="ff" height="ff" slices="ii" stacks="ii" />
*/
function MyCylinder(scene, base, top, height, slices, stacks) {
  CGFobject.call(this,scene);

  this.surface = new MyCylinderSurface(scene, base, top, height, slices, stacks);
  this.topCircle = new MyCylinderCircle(scene, top, slices);
  this.baseCircle = new MyCylinderCircle(scene, base, slices);

  this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.display = function() {
  this.scene.pushMatrix();
    this.surface.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.baseCircle.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.translate(0, this.height, 0);
    this.topCircle.display();
  this.scene.popMatrix();
}