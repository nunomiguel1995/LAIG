/**
* MyHelice
* @constructor
*/
function MyHelice(scene) {
  this.scene = scene;
  this.front = new MyRectangle(this.scene, 0,0,0.2,0.8);
  this.back = new MyRectangle(this.scene, 0,0,0.2,0.8);
  this.initBuffers();
};

MyHelice.prototype = Object.create(CGFobject.prototype);
MyHelice.prototype.constructor = MyHelice;

MyHelice.prototype.display = function() {
  this.scene.pushMatrix();
    this.front.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.scene.rotate(-Math.PI, 0, 1, 0);
    this.back.display();
  this.scene.popMatrix();

}
