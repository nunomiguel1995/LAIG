/**
* MyToken
* @constructor
* <piece type="ii" player ="ii" />
* type: 1 (small piece), 2 (medium piece) or 3 (big piece)
* player: 1 or 2
*/
function MyToken(scene, type, player) {
  CGFobject.call(this,scene);
  this.height = type * 0.5;
  this.player = player;
  this.cylinder = new MyCylinder(this.scene, 1.5, 1.5, this.height , 50, 50);
  this.top = new MyCylinderCircle(this.scene, 1.5, 50);
  this.type = type;

  this.initBuffers();

  //player 1 Textures
  this.player1Body = new CGFappearance(this.scene);
 	this.player1Body.setAmbient(0.5,0.5,0.5,1);
	this.player1Body.setDiffuse(1.0,1.0,1.0,1);
	this.player1Body.setSpecular(0.5,0.5,0.5,1);
	this.player1Body.setShininess(500);
	this.player1Body.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.player1Body.loadTexture("./res/green.png");

  this.small1 = new CGFappearance(this.scene);
 	this.small1.setAmbient(0.5,0.5,0.5,1);
	this.small1.setDiffuse(1.0,1.0,1.0,1);
	this.small1.setSpecular(0.5,0.5,0.5,1);
	this.small1.setShininess(500);
	this.small1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.small1.loadTexture("./res/small1.png");

  this.medium1 = new CGFappearance(this.scene);
  this.medium1.setAmbient(0.5,0.5,0.5,1);
  this.medium1.setDiffuse(1.0,1.0,1.0,1);
  this.medium1.setSpecular(0.5,0.5,0.5,1);
  this.medium1.setShininess(500);
  this.medium1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  this.medium1.loadTexture("./res/medium1.png");

  this.big1 = new CGFappearance(this.scene);
  this.big1.setAmbient(0.5,0.5,0.5,1);
  this.big1.setDiffuse(1.0,1.0,1.0,1);
  this.big1.setSpecular(0.5,0.5,0.5,1);
  this.big1.setShininess(500);
  this.big1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  this.big1.loadTexture("./res/big1.png");

  //player 2 Textures
  this.player2Body = new CGFappearance(this.scene);
 	this.player2Body.setAmbient(1.0,1.0,1.0,1);
	this.player2Body.setDiffuse(1.0,1.0,1.0,1);
	this.player2Body.setSpecular(1.0,1.0,1.0,1);
	this.player2Body.setShininess(500);
	this.player2Body.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.player2Body.loadTexture("./res/yellow.png");

  this.small2 = new CGFappearance(this.scene);
 	this.small2.setAmbient(0.5,0.5,0.5,1);
	this.small2.setDiffuse(1.0,1.0,1.0,1);
	this.small2.setSpecular(0.5,0.5,0.5,1);
	this.small2.setShininess(500);
	this.small2.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.small2.loadTexture("./res/small2.png");

  this.medium2 = new CGFappearance(this.scene);
  this.medium2.setAmbient(0.5,0.5,0.5,1);
  this.medium2.setDiffuse(1.0,1.0,1.0,1);
  this.medium2.setSpecular(0.5,0.5,0.5,1);
  this.medium2.setShininess(500);
  this.medium2.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  this.medium2.loadTexture("./res/medium2.png");

  this.big2 = new CGFappearance(this.scene);
  this.big2.setAmbient(0.5,0.5,0.5,1);
  this.big2.setDiffuse(1.0,1.0,1.0,1);
  this.big2.setSpecular(0.5,0.5,0.5,1);
  this.big2.setShininess(500);
  this.big2.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  this.big2.loadTexture("./res/big2.png");

};

MyToken.prototype = Object.create(CGFobject.prototype);
MyToken.prototype.constructor = MyToken;

MyToken.prototype.display = function() {
  this.scene.pushMatrix();
    if(this.player == 1){
        this.player1Body.apply();
    }else if(this.player == 2){
        this.player2Body.apply();
    }
    this.cylinder.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    switch (this.type) {
      case 1:
        if(this.player == 1)
          this.small1.apply();
        else
          this.small2.apply();
        break;
      case 2:
        if(this.player == 1)
          this.medium1.apply();
        else
          this.medium2.apply();
      case 3:
        if(this.player == 1)
          this.big1.apply();
        else
          this.big2.apply();
      default:
        break;
    }
    this.scene.translate(0,0,this.height);
    this.top.display();
  this.scene.popMatrix();
}
