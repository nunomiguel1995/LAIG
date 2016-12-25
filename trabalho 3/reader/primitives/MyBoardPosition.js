/**
* MyBoardPosition
* @constructor
*/
function MyBoardPosition(scene,x,y,pieces,id,row,col) {
  this.scene = scene;
  this.x =x;
  this.y =y;
  this.pieces = pieces;
  this.boardUnit = new MyCylinder(this.scene, 0.5, 0.5, 0.05, 50, 50);

  this.id = id;
  this.row = row;
  this.col = col;

  this.ytranslation = 0;
  this.xtranslation = 0;

  this.getPosition(this.xtranslation,this.ytranslation);

  this.positionMatrix = mat4.create();
  mat4.identity(this.positionMatrix);
  mat4.translate(this.positionMatrix,this.positionMatrix,[this.xtranslation,this.ytranslation,0.1]);

  this.initBuffers();
};

MyBoardPosition.prototype = Object.create(CGFobject.prototype);
MyBoardPosition.prototype.constructor = MyBoardPosition;

MyBoardPosition.prototype.getPosition = function(){
  switch (this.y) {
    case 0:
      this.ytranslation = 2.63;
      break;
    case 1:
      this.ytranslation = 1.31;
      break;
    case 2:
      this.ytranslation = 0;
      break;
    case 3:
      this.ytranslation = -1.31;
      break;
    case 4:
      this.ytranslation = -2.63;
      break;
    default:
      break;
  }

  switch (this.y) {
    case 0:
    case 4:
      if(this.x== 0){
        this.xtranslation = -1.5;
      }else if(this.x == 2){
        this.xtranslation = 1.5;
      }
      break;
    case 1:
    case 3:
      if(this.x==0){
        this.xtranslation = -2.25;
      }else if(this.x == 1){
        this.xtranslation = -0.75;
      }else if (this.x == 2) {
        this.xtranslation = 0.75;
      }else if (this.x == 3) {
        this.xtranslation = 2.25;
      }
      break;
    case 2:
      if(this.x== 0){
        this.xtranslation = -3;
      }else if (this.x==1) {
        this.xtranslation = -1.5;
      }else if (this.x == 3) {
        this.xtranslation = 1.5;
      }else if (this.x == 4) {
        this.xtranslation = 3;
      }
      break;
    default:
      break;
  }
}

MyBoardPosition.prototype.display = function() {

  this.scene.pushMatrix();
    this.scene.rockTexture.apply();
    this.scene.multMatrix(this.positionMatrix);
    this.boardUnit.display();
  this.scene.popMatrix();

  var i = 0;
  var top = 0.05;
  for(i ; i < this.pieces.length; i++){
    this.scene.pushMatrix();
      this.scene.multMatrix(this.positionMatrix);
      this.scene.translate(0,0,top);
      this.pieces[i].display();
      top += this.pieces[i].height+0.02;
    this.scene.popMatrix();
  }
}

MyBoardPosition.prototype.convertPiecesToProlog = function(){
  var prologPiece='[';
  var i = 0;

  for(i; i < this.pieces.length; i++){
    var token = this.pieces[i].getToken();
    prologPiece += token + ',';
  }
  prologPiece += '.]';
  return prologPiece;
}
