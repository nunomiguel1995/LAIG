/**
* MyToken
* @constructor
* <piece type="ii" player ="ii" />
* type: 1 (small piece), 2 (medium piece) or 3 (big piece)
* player: 1 or 2
*/
function MyToken(scene, type, player) {
  CGFobject.call(this,scene);
  this.height = type * 0.25;
  this.player = player;
  this.cylinder = new MyCylinder(this.scene,0.5, 0.5, this.height , 50, 50);
  this.top = new MyCylinderCircle(this.scene, 0.5, 50);
  this.type = type;
  this.position = 0;
  this.initBuffers();
};

MyToken.prototype = Object.create(CGFobject.prototype);
MyToken.prototype.constructor = MyToken;

MyToken.prototype.display = function() {
  this.scene.pushMatrix();
    if(this.player == 1){
        this.scene.player1Body.apply();
    }else if(this.player == 2){
        this.scene.player2Body.apply();
    }
    this.cylinder.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    switch (this.type) {
      case 1:
        if(this.player == 1)
          this.scene.small1.apply();
        else
          this.scene.small2.apply();
        break;
      case 2:
        if(this.player == 1)
          this.scene.medium1.apply();
        else
          this.scene.medium2.apply();
          break;
      case 3:
        if(this.player == 1)
          this.scene.big1.apply();
        else
          this.scene.big2.apply();
          break;
      default:
        break;
    }
    this.scene.rotate(Math.PI,0,0,1);
    this.scene.translate(0,0,this.height);
    this.top.display();
  this.scene.popMatrix();
}

MyToken.prototype.getToken = function(){
  var token;
  switch (this.type) {
    case 1:
      if(this.player == 1)
        token = 'cp1';
      else
        token = 'cp2';
      break;
    case 2:
      if(this.player == 1)
        token = 'cm1';
      else
        token = 'cm2';
      break;
    case 3:
      if(this.player == 1)
        token = 'cg1';
      else
        token = 'cg2';
      break;
    default:
      break;
  }
  return token;
}

MyToken.prototype.isPlayer2Crab = function(){
  if(this.player == 2){
    return true;
  }else{
    return false;
  }
}