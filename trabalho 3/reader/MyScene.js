function MyScene() {
  CGFscene.call(this);
}

MyScene.prototype = Object.create(CGFscene.prototype);
MyScene.prototype.constructor = MyScene;

MyScene.prototype.init = function (application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();
	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);
	this.axis=new CGFaxis(this);

	this.board = new MyGameboard(this);
  this.setPickEnabled(true);

  this.picked = -1;
  this.movePicked = -1;
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

MyScene.prototype.logPicking = function ()
{
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];
          if(this.picked == -1){
            this.picked = customId;
          }else{
            this.movePicked = customId;
            this.board.movePiece();
          }
					console.log("Picked object: " + obj + ", with pick id " + customId);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}
	}
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
}

MyScene.prototype.update = function() {

}
