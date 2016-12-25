/**
* MyEnvironment
* @constructor
*/
function MyEnvironment(scene) {
  CGFobject.call(this,scene);

  this.sand = new CGFappearance(this.scene);
  this.sand.loadTexture("res/Scene/sand.png");

  this.waves = new CGFappearance(this.scene);
  this.waves.loadTexture("res/Scene/waves.jpg");

  this.side_beach = new CGFappearance(this.scene);
  this.side_beach.loadTexture("res/Scene/side_beach.jpg");

  this.plane = new MyPlane(this.scene,3,2,7,7);

  this.initBuffers();
};

MyEnvironment.prototype = Object.create(CGFobject.prototype);
MyEnvironment.prototype.constructor = MyEnvironment;
MyEnvironment.prototype.display = function(){
    this.scene.pushMatrix();
        this.sand.apply();
    	this.scene.setDefaultAppearance();
        this.scene.translate(-1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(7,10,0);
        this.plane.display();
    this.scene.popMatrix();

     this.scene.pushMatrix();
        this.side_beach.apply();
    	this.scene.setDefaultAppearance();
        this.scene.translate(-1, 10, -10);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI, 1, 0, 0);
        this.scene.scale(7,10,0);
        this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.waves.apply();
        this.scene.setDefaultAppearance();
        this.scene.translate(9.5, 10, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI, 0, 0, 1);
        this.scene.scale(6.7,10,0);
        this.plane.display();
    this.scene.popMatrix();
} 