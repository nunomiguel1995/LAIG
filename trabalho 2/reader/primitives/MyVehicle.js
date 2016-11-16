/**
* MyVehicle
* @constructor
*/
function MyVehicle(scene) {
  CGFobject.call(this,scene);
  //Elementos do avião
  this.body = new MyCylinder(this.scene, 0.25, 0.5 , 2.0 , 50,50);
  this.rightWing = new MyWing(this.scene);
  this.leftWing = new MyWing(this.scene);
  this.ball = new MySphere(this.scene,0.1,50,50);
  this.firstHelice = new MyHelice(this.scene);
  this.secHelice = new MyHelice(this.scene);
  this.thirdHelice = new MyHelice(this.scene);
  this.topbody = new MySphere(this.scene,0.3,50,50);
  this.backWing = new MyTriangle(this.scene, 0,0,0, 0,0,1,1,0,1);

  //Texturas
  this.bodyAppearance= new CGFappearance(this.scene);
 	this.bodyAppearance.setAmbient(0.3,0.3,0.3,1);
	this.bodyAppearance.setDiffuse(1.0,1.0,1.0,1);
	this.bodyAppearance.setSpecular(0,0.2,0.2,1);
	this.bodyAppearance.setShininess(100);
	this.bodyAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.bodyAppearance.loadTexture("./res/aviao/body.png");

  this.heliceAppearance= new CGFappearance(this.scene);
  this.heliceAppearance.setAmbient(0.3,0.3,0.3,1);
  this.heliceAppearance.setDiffuse(1.0,1.0,1.0,1);
  this.heliceAppearance.setSpecular(0,0.2,0.2,1);
  this.heliceAppearance.setShininess(100);
  this.heliceAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  this.heliceAppearance.loadTexture("./res/aviao/helices.jpg");

  this.noseAppearance= new CGFappearance(this.scene);
  this.noseAppearance.setAmbient(0.3,0.3,0.3,1);
  this.noseAppearance.setDiffuse(1.0,1.0,1.0,1);
  this.noseAppearance.setSpecular(0,0.2,0.2,1);
  this.noseAppearance.setShininess(100);
  this.noseAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  this.noseAppearance.loadTexture("./res/aviao/nose.jpg");

  this.wingAppearance= new CGFappearance(this.scene);
  this.wingAppearance.setAmbient(0.3,0.3,0.3,1);
  this.wingAppearance.setDiffuse(1.0,1.0,1.0,1);
  this.wingAppearance.setSpecular(0,0.2,0.2,1);
  this.wingAppearance.setShininess(100);
  this.wingAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  this.wingAppearance.loadTexture("./res/aviao/asa.jpg");

  this.windowAppearance= new CGFappearance(this.scene);
 	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(1.0,1.0,1.0,1);
	this.windowAppearance.setSpecular(0,0.2,0.2,1);
	this.windowAppearance.setShininess(100);
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.windowAppearance.loadTexture("./res/aviao/window.jpg");

  this.initBuffers();
};

MyVehicle.prototype = Object.create(CGFobject.prototype);
MyVehicle.prototype.constructor = MyVehicle;

MyVehicle.prototype.display = function() {
  this.scene.pushMatrix();
    this.bodyAppearance.apply();
    this.body.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.scene.translate(-0.7,0,-0,3);
    this.scene.rotate(Math.PI/4, 0,1,0);
    this.backWing.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.windowAppearance.apply();
    this.scene.translate(0,0.3,1.2);
    this.topbody.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.wingAppearance.apply();
    this.scene.translate(0.7,0,1.2);
    this.scene.rotate(-Math.PI/2,0,0,1);
    this.scene.rotate(-Math.PI/2,0,1,0);
    this.scene.scale(0.4,0.5,0.5);
    this.rightWing.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.scene.translate(-0.7,0,1.2);
    this.scene.rotate(Math.PI/2,1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.scene.scale(0.4,0.5,0.5);
    this.rightWing.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.noseAppearance.apply();
    this.scene.translate(0,0,2.05);
    this.ball.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.heliceAppearance.apply();
    this.scene.translate(-0.1,0,2.02);
    this.firstHelice.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/4,0,0,1);
    this.scene.rotate(-Math.PI,0,0,1);
    this.scene.translate(-0.1,0,2.02);
    this.secHelice.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.scene.rotate(Math.PI/4,0,0,1);
    this.scene.rotate(-Math.PI,0,0,1);
    this.scene.translate(-0.1,0,2.02);
    this.thirdHelice.display();
  this.scene.popMatrix();
}
