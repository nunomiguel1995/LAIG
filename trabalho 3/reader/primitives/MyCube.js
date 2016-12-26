/**
 * MyCube
 * @constructor
 */
 function MyCube(scene) {
 	CGFobject.call(this, scene);

 	this.quad = new MyRectangle(this.scene, -0.5, -0.5, 0.5, 0.5);
  this.face = new MyRectangle(this.scene, -0.5, -0.5, 0.5, 0.5);
 };

 MyCube.prototype = Object.create(CGFobject.prototype);
 MyCube.prototype.constructor = MyCube;

 MyCube.prototype.display = function() {
    var degToRad = Math.PI / 180.0;

 	// back face
 	this.scene.pushMatrix();
        this.scene.rotate(180 * degToRad, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
 	this.scene.popMatrix();

 	// top face
 	this.scene.pushMatrix();
        this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
 	this.scene.popMatrix();

 	// right face
 	this.scene.pushMatrix();
        this.scene.rotate(-90 * degToRad, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
 	this.scene.popMatrix();

 	// left face
 	this.scene.pushMatrix();
        this.scene.rotate(90 * degToRad, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
 	this.scene.popMatrix();

  // front face
  this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        if(this.scene.playing && !this.scene.player1won && !this.scene.player2won){
          if(this.scene.player1Turn){
            this.scene.player1turn.apply();
          }else{
            this.scene.player2turn.apply();
          }
        }else if (this.scene.player1won) {
              this.scene.player1winner.apply();
        }else if (this.scene.player2won) {
              this.scene.player2winner.apply();
        }else{
            this.scene.crabstack.apply();
        }
        this.face.display();
  this.scene.popMatrix();
 };
