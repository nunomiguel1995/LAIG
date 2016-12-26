/**
* MySign
* @constructor
*/
function MySign(scene) {
  CGFobject.call(this,scene);

  this.sign = new MyCube(this.scene);
  this.post = new MyCylinder(this.scene, 0.5, 0.5, 3, 20, 20);

  this.initBuffers();
};

MySign.prototype = Object.create(CGFobject.prototype);
MySign.prototype.constructor = MySign;
MySign.prototype.display = function(){
    this.scene.pushMatrix();
    if((this.scene.playing && this.scene.player1Turn == true) || this.scene.player1won){
      this.scene.player1Body.apply();
    }else if ((this.scene.playing && !this.scene.player1Turn == true) || this.scene.player2won) {
      this.scene.player2Body.apply();
    }else{
      this.scene.crab.apply();
    }
        this.scene.translate(0,1,0);
        this.scene.scale(2.8, 1.5, 0.2);
        this.sign.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.wood.apply();
        this.scene.translate(-1.5,0,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.25, 0.25 ,0.6);
        this.post.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
        this.scene.wood.apply();
        this.scene.translate(1.5,0,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.25, 0.25 ,0.6);
        this.post.display();
    this.scene.popMatrix();
}
