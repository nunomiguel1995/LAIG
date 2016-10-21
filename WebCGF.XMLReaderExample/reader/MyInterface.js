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

	return true;
};

MyInterface.prototype.addLightBox = function(i,id){
	this.Lights.add(this.scene.lightBoolean, i, this.scene.lightBoolean[i]).name(id);
}

