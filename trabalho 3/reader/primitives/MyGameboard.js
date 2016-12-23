/**
 * MyGameboard
 * @constructor
 */
function MyGameboard(scene) {
	CGFobject.call(this,scene);

  this.gameboard = new MyCylinder(this.scene, 4, 4, 0.1, 6, 6);

	this.waterT = new CGFappearance(this.scene);
	this.waterT.loadTexture("./res/Board/water.jpg");

	this.matrix = [];

	this.initBoardMatrix();

	this.initBuffers();
};

MyGameboard.prototype = Object.create(CGFobject.prototype);
MyGameboard.prototype.constructor = MyGameboard;

MyGameboard.prototype.initBoardMatrix = function(){
	var y = 0;
	var id = 1
	for(y; y<5; y++){
		var x=0, maxPositions;
		switch (y) {
			case 0:
			case 4:
				maxPositions = 3;
				break;
			case 1:
			case 3:
				maxPositions = 4;
				break;
			case 2:
				maxPositions = 5;
				break;
			default:
				break;
		}
		var line = [];
		for(x; x< maxPositions; x++){
			var posStack = new MyBoardPosition(this.scene, x, y,[],id);
			id++;
			line.push(posStack);
		}
		this.matrix.push(line);
	}
}

MyGameboard.prototype.display = function() {
	this.scene.clearPickRegistration();
  this.scene.pushMatrix();
		this.waterT.apply();
		this.scene.rotate(-Math.PI/2,1,0,0);
    this.gameboard.display();
		var i = 0;
		for(i; i < this.matrix.length; i++){
			var j = 0;
			for(j; j < this.matrix[i].length; j++){
				this.scene.registerForPick(this.scene.id + 1, this.matrix[i][j]);
				this.scene.id ++;
				this.matrix[i][j].display();
			}
		}
  this.scene.popMatrix();
};

MyGameboard.prototype.translateProlgBoard = function(response){
	var newMatrix=[];

	var rest = response.substring(response.indexOf("[") + 1, response.lastIndexOf("]"));
	var lines = [];
	var line;
	var stop = false;

	while(!stop){
		line = rest.substring(rest.indexOf('[')+1, rest.indexOf(']]')+1) ;
		if(line.length > 0){
			lines.push(line + ",");
			rest = rest.substring(rest.indexOf(']]')+3);
		}else{
			stop = true;
		}
	}
	 //process each line
	 var i = 0;
	 var stop = false;
	 for(i; i < lines.length; i++){
		 var newMatrixLine = [];
		 var linepos = [];
		 var string = lines[i];
		 while(!stop){
			 var pos = string.substring(string.indexOf('[')+1,string.indexOf('],'));
			 string = string.substring(string.indexOf('],')+2);
			 if(pos.length > 0 ){
				 linepos.push(pos + ',');
			 }else{
				 stop = true;
			 }
		 }
		 stop = false;

		 var j = 0;
		 for(j; j < linepos.length; j++){
			 var positionStack = [];
			 var positionString = linepos[j];
			 while(!stop){

				 var token = positionString.substring(0,linepos[j].indexOf(','));
				 positionString = positionString.substring(linepos[j].indexOf(',')+1);
				 if(token.length > 0 && token != ".," && token != "."){
					 positionStack.push(token);
				 }else{
					 stop = true;
				 }
			 }
			 stop = false;
			 newMatrixLine.push(positionStack);
		 }
		 newMatrix.push(newMatrixLine);
	 }

	 return newMatrix;
}

MyGameboard.prototype.updateBoardMatrix = function(newMatrix){
	var matrix = [];
	var i = 0;
	var id = 1;
	//console.log(newMatrix);
	//percorre todas as linhas
	for(i; i< newMatrix.length; i++){
		var newline = [];
		var j = 0;
		//percorre todas as posições
		for(j; j < newMatrix[i].length; j++){
			var pieces = [];
			var k = 0;
			//percorre todos os elementos da posição
			for(k; k<newMatrix[i][j].length; k++){
				var obj;
				switch (newMatrix[i][j][k]) {
					case 'cp1':
						obj = new MyToken(this.scene, 1,1);
						break;
					case 'cp2':
						obj = new MyToken(this.scene, 1,2);
						break;
					case 'cm1':
						obj = new MyToken(this.scene, 2,1);
						break;
					case 'cm2':
						obj = new MyToken(this.scene, 2,2);
						break;
					case 'cg1':
						obj = new MyToken(this.scene, 3,1);
						break;
					case 'cg2':
						obj = new MyToken(this.scene, 3,2);
						break;
					default:
						break;
				}
				pieces.push(obj);
			}
			var newPosition = new MyBoardPosition(this.scene,j,i,pieces,id);
			id++;
			newline.push(newPosition);
		}
		matrix.push(newline);
	}
	this.matrix = matrix;
}

MyGameboard.prototype.movePiece = function(){
	console.log("picked: "+this.scene.picked+" move: "+this.scene.movePicked);
	this.scene.picked = -1;
	this.scene.movePicked = -1;
}
