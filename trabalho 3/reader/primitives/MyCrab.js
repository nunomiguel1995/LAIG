/**
* MyCrab
* @constructor
*/
function MyCrab(scene) {
  this.scene = scene;

  this.body = new  MyHalfSphere(this.scene,50,50);
  this.leg = new MyCylinder(this.scene,0.2,0.0,1,50,50);
  this.eye = new MySphere(this.scene,0.2,50,50);

  this.bodytex = new CGFappearance(this.scene);
  this.bodytex.loadTexture("res/body.png");
  this.eyetex = new CGFappearance(this.scene);
  this.eyetex.loadTexture("res/eye.png");


  this.initBuffers();
};

MyCrab.prototype = Object.create(CGFobject.prototype);
MyCrab.prototype.constructor = MyCrab;

MyCrab.prototype.display = function() {
  this.bodytex.apply();
this.scene.pushMatrix();
  this.scene.scale(1.5,1.5,1.5);

  this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.bodytex.apply();
    this.body.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.bodytex.apply();
    this.scene.translate(0.8,0.3,0);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.leg.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.bodytex.apply();
    this.scene.translate(0.7,0.3,0.4);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.leg.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.bodytex.apply();
    this.scene.translate(-0.8,0.3,0);
    this.scene.rotate(-Math.PI/2,0,1,0);
    this.leg.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.bodytex.apply();
    this.scene.translate(-0.7,0.3,0.4);
    this.scene.rotate(-Math.PI/2,0,1,0);
    this.leg.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.eyetex.apply();
    this.scene.translate(-0.3,0.8,0.5);
    this.scene.rotate(-Math.PI/2,0,1,0);
    this.eye.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.scene.translate(0.3,0.8,0.5);
    this.scene.rotate(-Math.PI/2,0,1,0);
    this.eye.display();
  this.scene.popMatrix();

this.scene.popMatrix();
}
