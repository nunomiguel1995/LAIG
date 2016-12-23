/*
	Creates a new Interface
	Allows the user to enable/disable the lights, change perspective and materials
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

	this.Lights = this.gui.addFolder("Lights");
	this.Lights.open();

	this.Cameras = this.gui.addFolder("Cameras");
	//this.Cameras.add(this.scene,'defaultCamera');
	//this.Cameras.open();

	this.Cameras.add(this,'startGame').name('Start Game');

	return true;
};

MyInterface.prototype.startGame = function() {
	this.scene.board.requestToPl('startgame');
}

/*
	Adds a checkbox to change the light value
*/
MyInterface.prototype.addLightBox = function(i,id){
	//this.Lights.add(this.scene.lightBoolean, i, this.scene.lightBoolean[i]).name(id);
}

/*
*/
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
