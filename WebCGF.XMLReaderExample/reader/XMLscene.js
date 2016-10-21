
function XMLscene(myInterface) {
    CGFscene.call(this);
    this.myInterface = myInterface;
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis=new CGFaxis(this);

	this.materials = new Stack(null);
	this.textures = new Stack(null);

	this.materialIndex = 0;
	this.viewIndex = 0;
	this.lightBoolean = [];
};

XMLscene.prototype.initLights = function () {
};

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{
	this.gl.clearColor(this.graph.illumination.background.r,this.graph.illumination.background.g,this.graph.illumination.background.b,this.graph.illumination.background.a);
	this.setGlobalAmbientLight(this.graph.illumination.ambient.r, this.graph.illumination.ambient.g, this.graph.illumination.ambient.b, this.graph.illumination.ambient.a);
	this.lights[0].setVisible(true);
    this.lights[0].enable();
    this.loadViews();
    this.loadLights();
};

XMLscene.prototype.processGraph = function(nodeID){
	var material = null;
	var texture = new CGFappearance(this);

	if(nodeID != null){
		var node = this.graph.nodes[nodeID];
		if(node.material[0] != "inherit"){
			this.materials.push(this.graph.materials[node.material[0]]);
			material = this.materials.top();
		}else{
			this.materials.push(this.materials.top());
		}

		if(material != null){
			material.apply();
			this.materials.pop();
		}

		if(node.texture != "none"){
			if(node.texture != "inherit"){
				this.textures.push(this.graph.textures[node.texture].texture);
				texture.setTexture(this.textures.top());
				texture.apply();
			}else{
				this.textures.push(this.textures.top());
			}
		}
		
		this.textures.pop();

		this.multMatrix(node.transformation);
		if(node.primitive != null){
			this.pushMatrix();
				this.graph.primitives[node.primitive].display();
			this.popMatrix();
		}
		for(var i = 0; i < node.children.length; i++){
			this.pushMatrix();
				this.processGraph(node.children[i]);
			this.popMatrix();
		}
	}
}

XMLscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
	
	// Clear image and depth buffer everytime we update the scene
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

	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{
		this.processGraph(this.graph.root);
		this.updateLights();
	};	
};

XMLscene.prototype.loadViews = function(){
	//this.camera = this.graph.pers[this.viewIndex];
}

XMLscene.prototype.loadLights = function (){
	var lighti = 0;

	for(var i =0 ; i< this.graph.spotLights.length; i++){
		//Loads Light
		var spot = this.graph.spotLights[i];
		this.lights[lighti].setPosition(spot.location.x, spot.location.y, spot.location.z, 1);
		this.lights[lighti].setAmbient(spot.ambient.r, spot.ambient.g, spot.ambient.b, spot.ambient.a);
	    this.lights[lighti].setDiffuse(spot.diffuse.r, spot.diffuse.g, spot.diffuse.b, spot.diffuse.a);
	    this.lights[lighti].setSpecular(spot.specular.r, spot.specular.g, spot.specular.b, spot.specular.a);
	    this.lights[lighti].setSpotDirection((spot.target.x - spot.location.x ), (spot.target.y - spot.location.y), (spot.target.z - spot.location.z));
	    this.lights[lighti].setSpotExponent(spot.exponent);

	    //Enable light
	    if(spot.enable == true)
	    	this.lights[lighti].enable();

	    this.lights[lighti].setVisible(true);
	    this.lights[lighti].update();

	    //Adds light to MyInterface
	  	this.lightBoolean[lighti] = spot.enable;
	  	this.myInterface.addLightBox(lighti,spot.id);
	  	lighti++;
	}

	for(var j = 0; j < this.graph.omniLights.length;j++){
		//Loads Light
	    var omni = this.graph.omniLights[0];
		this.lights[lighti].setPosition(omni.location.x, omni.location.y, omni.location.z, omni.location.w);
		this.lights[lighti].setAmbient(omni.ambient.r, omni.ambient.g, omni.ambient.b, omni.ambient.a);
	    this.lights[lighti].setDiffuse(omni.diffuse.r, omni.diffuse.g, omni.diffuse.b, omni.diffuse.a);
	    this.lights[lighti].setSpecular(omni.specular.r, omni.specular.g, omni.specular.b, omni.specular.a);

	    //Enable light
	    if(omni.enable == true)
	    	this.lights[lighti].enable();

	    this.lights[lighti].setVisible(true);
	    this.lights[lighti].update();
	
	    //Adds light to MyInterface
	    this.lightBoolean[lighti] = omni.enable;
	  	this.myInterface.addLightBox(lighti,omni.id);
	  	lighti++;
	}
}

XMLscene.prototype.updateLights = function(){
	for(var i = 0; i < this.lightBoolean.length; i++){
		if(this.lightBoolean[i] == true)
			this.lights[i].enable();
		else
			this.lights[i].disable();

		this.lights[i].update();
	}
}
