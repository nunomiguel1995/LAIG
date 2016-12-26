/**
* MyEnvironment
* @constructor
*/
function MyEnvironment(scene) {
  CGFobject.call(this,scene);


  this.plane = new MyPlane(this.scene,3,2,7,7);
  this.sign = new MySign(this.scene);
  this.tree = new MyTree(this.scene);
  this.ball = new MySphere(this.scene,0.8,50,50);

  this.initBuffers();
};

MyEnvironment.prototype = Object.create(CGFobject.prototype);
MyEnvironment.prototype.constructor = MyEnvironment;
MyEnvironment.prototype.display = function(){

  if(!this.scene.alternativeEnv){
    this.scene.pushMatrix();
         this.scene.waves.apply();
       this.scene.setDefaultAppearance();
         this.scene.translate(-1, 0, 0);
         this.scene.rotate(Math.PI, 0, 1, 0);
         this.scene.rotate(-Math.PI/2, 1, 0, 0);
         this.scene.scale(7,10,0);
         this.plane.display();
     this.scene.popMatrix();

  }else{
    this.scene.pushMatrix();
         this.scene.sand.apply();
       this.scene.setDefaultAppearance();
         this.scene.translate(-1, 0, 0);
         this.scene.rotate(Math.PI, 0, 1, 0);
         this.scene.rotate(-Math.PI/2, 1, 0, 0);
         this.scene.scale(7,10,0);
         this.plane.display();
     this.scene.popMatrix();

     this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(-5,0,-8);
        this.tree.display();
     this.scene.popMatrix();

     this.scene.pushMatrix();
        this.scene.translate(7,0.8,5);
        this.scene.ball.apply();
        this.ball.display();
     this.scene.popMatrix();
  }

   this.scene.pushMatrix();
       this.scene.setDefaultAppearance();
       this.scene.translate(-5, 0, -6);
       this.scene.scale(2,2,2);
       this.scene.rotate(Math.PI/7,0,1,0);
       this.sign.display();
   this.scene.popMatrix();
}
