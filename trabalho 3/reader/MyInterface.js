/*
	Creates a new Interface
*/
function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	this.gui = new dat.GUI();

	this.Game = this.gui.addFolder("CrabStack");
	this.Game.open();
	this.Game.add(this,'startGame').name('Start Game');
	this.Game.add(this,'quitGame').name('Quit Game');
	this.Game.add(this,'undo').name('Undo');

	this.Options = this.gui.addFolder("Options");
	this.Options.add(this.scene,'bot1').name('Play w/ computer');
	this.Options.add(this.scene,'bot2').name('Play as computer');
	this.Options.add(this.scene,'alternativeEnv').name('Alternative Scene');

	this.Cameras = this.gui.addFolder("Cameras");
	this.Cameras.add(this.scene,'cameraHIndex').min(1).max(20).name('Side Camera');
	this.Cameras.add(this.scene,'cameraVIndex').min(-4).max(4).name('Vertical Camera');

	return true;
};

MyInterface.prototype.startGame = function() {
	this.scene.board.requestToPl('startgame');
	this.scene.setPickEnabled(true);
}

MyInterface.prototype.quitGame = function(){
	this.scene.board.requestToPl('quitgame');
	this.scene.player1Turn = true;
}

MyInterface.prototype.undo = function(){
	if(this.scene.board.history.stack.length -1 > 0){
		this.scene.board.history.pop();
		this.scene.player1Turn = !this.scene.player1Turn;
		this.scene.board.matrix = this.scene.board.history.top();
	}
}

MyInterface.prototype.processKeyboard = function(event){
	CGFinterface.prototype.processKeyboard.call(this,event);

/*	switch (event.keyCode){
		//If M or m key is pressed materials should change
		case(77):
		case(109):
			this.scene.updateMaterials();
			break;
		//If V or v is pressed views should change
		case(86):
		case(118):
			if(this.scene.defaultCamera == false){
				this.scene.updateViews();
			}
			break;
	} */
}
