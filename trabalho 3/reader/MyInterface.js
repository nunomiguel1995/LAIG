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

	return true;
};

MyInterface.prototype.startGame = function() {
	this.scene.board.requestToPl('startgame');
	this.scene.setPickEnabled(true);
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
