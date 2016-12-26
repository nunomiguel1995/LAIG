function MyScene() {
  CGFscene.call(this);
}

MyScene.prototype = Object.create(CGFscene.prototype);
MyScene.prototype.constructor = MyScene;

MyScene.prototype.init = function (application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();
	this.initLights();
  this.loadTextures();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);
	this.axis=new CGFaxis(this);

  this.setPickEnabled(true);

	this.environment = new MyEnvironment(this);
	this.board = new MyGameboard(this);
  this.setPickEnabled(false);

  this.picked = -1;
  this.movePicked = -1;
  this.player1Turn = true;
  this.moveAnimation = null;

  this.bot = false;
  this.botplay = false;

  this.time = 0;
};

MyScene.prototype.initCameras = function () {
  this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

MyScene.prototype.initLights = function(){
	this.lights[0].setPosition(0, 100 , 0, 20);
    this.lights[0].setAmbient(1, 1, 1, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

	this.lights[1].setPosition(10, 100 , 10, 100);
    this.lights[1].setAmbient(1, 1, 1, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();
}

MyScene.prototype.setDefaultAppearance = function () {
  this.setAmbient(1.0, 1.0, 1.0, 1.0);
  this.setDiffuse(0.8, 0.8, 0.8, 1.0);
  this.setSpecular(0.8, 0.8, 0.8, 1.0);
  this.setShininess(10.0);
};

MyScene.prototype.loadTextures = function (){
  this.waterT = new CGFappearance(this);
  this.waterT.loadTexture("./res/Board/water.jpg");

  this.rockTexture = new CGFappearance(this);
  this.rockTexture.loadTexture("./res/Board/rock.jpg");


  this.red = new CGFappearance(this);
  this.red.loadTexture("./res/red.png");

  //player 1 Textures
  this.player1Body = new CGFappearance(this);
 	this.player1Body.setAmbient(0.5,0.5,0.5,1);
	this.player1Body.setDiffuse(1.0,1.0,1.0,1);
	this.player1Body.setSpecular(0.5,0.5,0.5,1);
	this.player1Body.setShininess(500);
	this.player1Body.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.player1Body.loadTexture("./res/Pieces/green.png");

  this.small1 = new CGFappearance(this);
 	this.small1.setAmbient(0.5,0.5,0.5,1);
	this.small1.setDiffuse(1.0,1.0,1.0,1);
	this.small1.setSpecular(0.5,0.5,0.5,1);
	this.small1.setShininess(500);
	this.small1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.small1.loadTexture("./res/Pieces/small1.png");

  this.medium1 = new CGFappearance(this);
  this.medium1.setAmbient(0.5,0.5,0.5,1);
  this.medium1.setDiffuse(1.0,1.0,1.0,1);
  this.medium1.setSpecular(0.5,0.5,0.5,1);
  this.medium1.setShininess(500);
  this.medium1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  this.medium1.loadTexture("./res/Pieces/medium1.png");

  this.big1 = new CGFappearance(this);
  this.big1.setAmbient(0.5,0.5,0.5,1);
  this.big1.setDiffuse(1.0,1.0,1.0,1);
  this.big1.setSpecular(0.5,0.5,0.5,1);
  this.big1.setShininess(500);
  this.big1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  this.big1.loadTexture("./res/Pieces/big1.png");

  //player 2 Textures
  this.player2Body = new CGFappearance(this);
 	this.player2Body.setAmbient(1.0,1.0,1.0,1);
	this.player2Body.setDiffuse(1.0,1.0,1.0,1);
	this.player2Body.setSpecular(1.0,1.0,1.0,1);
	this.player2Body.setShininess(500);
	this.player2Body.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.player2Body.loadTexture("./res/Pieces/yellow.png");

  this.small2 = new CGFappearance(this);
 	this.small2.setAmbient(0.5,0.5,0.5,1);
	this.small2.setDiffuse(1.0,1.0,1.0,1);
	this.small2.setSpecular(0.5,0.5,0.5,1);
	this.small2.setShininess(500);
	this.small2.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.small2.loadTexture("./res/Pieces/small2.png");

  this.medium2 = new CGFappearance(this);
  this.medium2.setAmbient(0.5,0.5,0.5,1);
  this.medium2.setDiffuse(1.0,1.0,1.0,1);
  this.medium2.setSpecular(0.5,0.5,0.5,1);
  this.medium2.setShininess(500);
  this.medium2.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  this.medium2.loadTexture("./res/Pieces/medium2.png");

  this.big2 = new CGFappearance(this);
  this.big2.setAmbient(0.5,0.5,0.5,1);
  this.big2.setDiffuse(1.0,1.0,1.0,1);
  this.big2.setSpecular(0.5,0.5,0.5,1);
  this.big2.setShininess(500);
  this.big2.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  this.big2.loadTexture("./res/Pieces/big2.png");
}

MyScene.prototype.logPicking = function (){
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj){
					var customId = this.pickResults[i][1];
          if(this.picked == -1){
            this.picked = customId;
          }else{
            this.movePicked = customId;             
            var currPos = this.board.getBoardPositionById(this.picked);
            var newPos = this.board.getBoardPositionById(this.movePicked);

            var distance = Math.sqrt(Math.pow(newPos.xtranslation - currPos.xtranslation,2) + Math.pow(newPos.ytranslation - currPos.ytranslation,2));
            var midpointX = (currPos.xtranslation + newPos.xtranslation) / 2;
            var midpointY = (currPos.ytranslation + newPos.ytranslation) / 2;
            this.moveAnimation = new CircularAnimation(this, "", 2, midpointX, 0, midpointY, distance/2, 0, 180);
            
            this.board.movePiece();
          }
					console.log("Picked object: " + obj + ", with pick id " + customId);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}
	}            
  var currPos = this.board.getBoardPositionById(this.picked);
  var newPos = this.board.getBoardPositionById(this.movePicked);

  var distance = Math.sqrt(Math.pow(newPos.xtranslation - currPos.xtranslation,2) + Math.pow(newPos.ytranslation - currPos.ytranslation,2));
  var midpointX = (currPos.xtranslation + newPos.xtranslation) / 2;
  var midpointY = (currPos.ytranslation + newPos.ytranslation) / 2;
  this.moveAnimation = new CircularAnimation(this, "", 2, midpointX, 0, midpointY, distance/2, 0, 180);

  this.moveAnimation.apply(this.elapsedTime);
}


MyScene.prototype.display = function(){
  this.logPicking();
  this.id = 0;
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
	this.loadIdentity();

	this.enableTextures(true);

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();
  this.board.display();

	this.clearPickRegistration();
	this.environment.display();

  if(this.bot && !this.player1Turn && !this.botplay){
    var player2Pieces = this.board.getPlayer2Pieces();
    var random = Math.floor((Math.random() * player2Pieces.length));
    var randomID = player2Pieces[random];
    var position = this.board.getBoardPositionById(randomID);
    var piece = position.convertPiecesToProlog();
    var board = this.board.convertBoardToProlog();
    var request = 'playBot(' + board + ','+position.row + ',' + position.col + ','+piece +')';

    this.botplay = true;
    this.board.requestToPl(request);
  }


}

MyScene.prototype.update = function(currTime) {
  if (this.time == 0)
    this.time = currTime;

  this.elapsedTime = (currTime - this.time) / 1000;
}
