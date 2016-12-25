/**
* MySign
* @constructor
*/
function MySign(scene) {
  CGFobject.call(this,scene);

  this.sign = new MyCube(this.scene);
  this.post = new MyCylinder(this.scene, 0.5, 0.5, 3, 20, 20)

  this.wood = new CGFappearance(this.scene);
  this.wood.loadTexture("res/Scene/wood.jpg");
  
  this.player1 = new CGFappearance(this.scene);
  this.player1.loadTexture("res/Scene/player1.png");

  this.player2 = new CGFappearance(this.scene);
  this.player2.loadTexture("res/Scene/player2.png");

  this.initBuffers();
};

MySign.prototype = Object.create(CGFobject.prototype);
MySign.prototype.constructor = MySign;
MySign.prototype.display = function(){
    this.scene.pushMatrix();
        if(this.scene.isPlayer1Turn == true){
            this.player1.apply();
        }else{
            this.player2.apply();
        }
        this.scene.translate(0,1,0);
        this.scene.scale(2, 1, 0.2);
        this.sign.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.wood.apply();
        this.scene.translate(-1,0,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.25, 0.25 ,0.5);
        this.post.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
        this.wood.apply();
        this.scene.translate(1,0,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.25, 0.25 ,0.5);
        this.post.display();
    this.scene.popMatrix();
} 