
function XMLscene() {
    CGFscene.call(this);
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
};

XMLscene.prototype.initLights = function () {

	this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].update();
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
	this.gl.clearColor(this.graph.background[0],this.graph.background[1],this.graph.background[2],this.graph.background[3]);
	this.lights[0].setVisible(true);
    this.lights[0].enable();
};

XMLscene.prototype.processGraph = function(nodeID){
	var material = null;

	if(nodeID == null) return "nodeID is null";

	var node  = this.graph.nodes[nodeID];
	if(node.material[0] != 'inherit'){
		if(material != null){
			material.loadTexture("./res/mars.jpg");
			material.apply();
		}
	}

	this.multMatrix(node.transformation);	
	if(node.primitive != null){
		this.pushMatrix();
			this.graph.primitives[node.primitive].display();
		this.popMatrix();
	}
	var i =0;		
	for(i; i< node.children.length; i++){
		this.pushMatrix();
			this.processGraph(node.children[i]);
		this.popMatrix();
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
		this.lights[0].update();
		this.loadLights();
		this.processGraph(this.graph.root);
	};	
};

XMLscene.prototype.loadLights = function(){
	/*var spot = this.graph.spotLights[0];
	this.lights[0].setPosition(spot.location.x, spot.location.y, spot.location.z, 1);
	this.lights[0].setAmbient(spot.ambient.r, spot.ambient.g, spot.ambient.b, spot.ambient.a);
    this.lights[0].setDiffuse(spot.diffuse.r, spot.diffuse.g, spot.diffuse.b, spot.diffuse.a);
    this.lights[0].setSpecular(spot.specular.r, spot.specular.g, spot.specular.b, spot.specular.a);
    this.lights[0].setSpotDirection((spot.target.x - spot.location.x ), (spot.target.y - spot.location.y), (spot.target.z - spot.location.z));
    this.lights[0].setSpotExponent(spot.exponent);
    this.lights[0].update();*/

    var omni = this.graph.omniLights[0];
	this.lights[0].setPosition(omni.location.x, omni.location.y, omni.location.z, omni.location.w);
	this.lights[0].setAmbient(omni.ambient.r, omni.ambient.g, omni.ambient.b, omni.ambient.a);
    this.lights[0].setDiffuse(omni.diffuse.r, omni.diffuse.g, omni.diffuse.b, omni.diffuse.a);
    this.lights[0].setSpecular(omni.specular.r, omni.specular.g, omni.specular.b, omni.specular.a);
    this.lights[0].update();

}
