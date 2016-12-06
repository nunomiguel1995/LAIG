function XMLscene(myInterface) {
  CGFscene.call(this);
  this.myInterface = myInterface;
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
  CGFscene.prototype.init.call(this, application);

  this.initCameras();

  this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

  this.gl.clearDepth(100.0);
  this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
  this.gl.depthFunc(this.gl.LEQUAL);

	this.axis=new CGFaxis(this);

	this.materials = new Stack(null);

	this.cameraModify = false;
	this.defaultCamera = true;
	this.materialIndex = 0;
	this.viewIndex = 0;
	this.lightBoolean = [];

  this.time = 0;
};

XMLscene.prototype.initCameras = function () {
  this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
  this.myInterface.setActiveCamera(this.camera);
};

XMLscene.prototype.setDefaultAppearance = function () {
  this.setAmbient(0.2, 0.4, 0.8, 1.0);
  this.setDiffuse(0.2, 0.4, 0.8, 1.0);
  this.setSpecular(0.2, 0.4, 0.8, 1.0);
  this.setShininess(10.0);
};

// Handler called when the graph is finally loaded.
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function (){
	this.gl.clearColor(this.graph.illumination.background.r,this.graph.illumination.background.g,this.graph.illumination.background.b,this.graph.illumination.background.a);
	this.setGlobalAmbientLight(this.graph.illumination.ambient.r, this.graph.illumination.ambient.g, this.graph.illumination.ambient.b, this.graph.illumination.ambient.a);
	this.lights[0].setVisible(true);
  this.lights[0].enable();
  this.loadLights();
  this.setUpdatePeriod(100/6);
};

XMLscene.prototype.processGraph = function(nodeID, textureID){
	var material = null;
	var appearance = new CGFappearance(this);
  var animation = null;

  if(nodeID != null){
		var node = this.graph.nodes[nodeID];
		if(node.material[this.materialIndex] != "inherit"){
			this.materials.push(this.graph.materials[node.material[this.materialIndex]]);
			material = this.materials.top();
			this.materials.pop();
		}else{
			this.materials.push(this.materials.top());
		}

		if(material != null){
			appearance.setEmission(material.emission.r, material.emission.g, material.emission.b, material.emission.a);
			appearance.setAmbient(material.ambient.r,material.ambient.g,material.ambient.b,material.ambient.a);
			appearance.setDiffuse(material.diffuse.r,material.diffuse.g,material.diffuse.b,material.diffuse.a);
			appearance.setSpecular(material.specular.r,material.specular.g,material.specular.b,material.specular.a);
			appearance.setShininess(material.shininess);
		}

    if(node.texture != "inherit" && node.texture != "none"){
      appearance.setTexture(this.graph.textures[node.texture].texture);
    }else if(node.texture == "inherit"){
      if(textureID != null){
        appearance.setTexture(this.graph.textures[textureID].texture);
      }
    }
    appearance.apply();

		this.multMatrix(node.transformation);

    animation = this.graph.animations[node.animation[node.animationIndex]];
    if(animation != null){
      animation.apply(this.elapsedTime, node);
    }
    if(node.animationIndex == (node.animation.length)){
      node.animationIndex = 0;
    }

		if(node.primitive != null){
			this.pushMatrix();
				this.graph.primitives[node.primitive].display();
			this.popMatrix();
		}
		for(var i = 0; i < node.children.length; i++){
			this.pushMatrix();
        if(node.texture != "inherit"){
				  this.processGraph(node.children[i], node.texture);
        }else{
          this.processGraph(node.children[i], textureID);
        }
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
		this.processGraph(this.graph.root, null);
		this.updateLights();
		if(this.defaultCamera == this.cameraModify){
			this.initCameras();
			if(this.defaultCamera == true)
				this.cameraModify = false;
			else
				this.cameraModify = true;
		}
	};
};

XMLscene.prototype.loadViews = function(){
	this.camera = this.graph.views[this.viewIndex];
	this.myInterface.setActiveCamera(this.camera);
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

XMLscene.prototype.update = function(currTime){
  if (this.time == 0)
    this.time = currTime;

  this.elapsedTime = (currTime - this.time) / 1000;
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

XMLscene.prototype.updateViews = function(){
	if(this.viewIndex < this.graph.views.length - 1){
		this.viewIndex++;
	}else{
		this.viewIndex = 0;
	}

	this.loadViews();
}

XMLscene.prototype.updateMaterials = function(){
	if(this.materialIndex < this.graph.maxMaterialIndex)
		this.materialIndex ++ ;
	else
		this.materialIndex = 0;
}
