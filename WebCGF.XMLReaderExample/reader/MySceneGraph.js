
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	 
	this.reader.open('scenes/'+filename, this);  
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;
	
	// Here should go the calls for different functions to parse the various blocks
	var error = this.parseGlobals(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}	

	error = this.parseViews(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseIlumination(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseLights(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseTextures(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseMaterials(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseTransformations(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

    error = this.parsePrimitives(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};

/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobals= function(rootElement) {
	var elems =  rootElement.getElementsByTagName('globals');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}

	// various examples of different types of access
	var globals = elems[0];
	this.background = this.reader.getRGBA(globals, 'background');
	this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill","line","point"]);
	this.cullface = this.reader.getItem(globals, 'cullface', ["back","front","none", "frontandback"]);
	this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw","cw"]);

	//console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");
};

MySceneGraph.prototype.parseViews = function(rootElement) {
	var views = rootElement.getElementsByTagName('views');
	if(views == null || views.length <1){
		return "views element is missing.";
	}

	var default_view = views[0].attributes.getNamedItem("default").value;
	var listPerspectives = views[0].getElementsByTagName('perspective');
	//console.log(listPerspectives.length);

	var i =0;
	for(i; i< listPerspectives.length; i++){
		var id, near, far, angle, from, to;
		id= listPerspectives[i].attributes.getNamedItem("id").value;
		near= listPerspectives[i].attributes.getNamedItem("near").value;
		far= listPerspectives[i].attributes.getNamedItem("far").value;
		angle= listPerspectives[i].attributes.getNamedItem("angle").value;
		from = listPerspectives[i].getElementsByTagName('from')[0];  
		to = listPerspectives[i].getElementsByTagName('to')[0];
		//console.log(id + " " + near +" " + far+ " "+angle);

		//TODO Guardar os valores de cada tag
	}	
};

MySceneGraph.prototype.parseIlumination = function(rootElement) {
	var ilumination = rootElement.getElementsByTagName('ilumination');

	if(ilumination == null || ilumination.length <1){
		return "ilumination element is missing.";
	}

	var ambient = ilumination[0].getElementsByTagName('ambient')[0];
	if(ambient == null){
		return 'ambient element is missing';
	}
	//console.log(ambient.attributes.getNamedItem("r").value);

	var background = ilumination[0].getElementsByTagName('background')[0];
	if(background == null){
		return 'background element is missing';
	}
	//console.log(background.attributes.getNamedItem("r").value);
};

MySceneGraph.prototype.parseLights = function(rootElement) {
	var lights = rootElement.getElementsByTagName('lights');
	if(lights == null || lights.length <1){
		return "lights element is missing.";
	}

	//Deals with omni blocks 
	var omni = lights[0].getElementsByTagName('omni');
	var i=0;
	for(i;i<omni.length;i++){
		var id, enabled;
		id = omni[i].attributes.getNamedItem('id').value;
		enabled = omni[i].attributes.getNamedItem('enabled').value;

		//Gets the different tags
		var location, ambient, difuse, specular;
		location = omni[i].getElementsByTagName('location')[0];
		ambient = omni[i].getElementsByTagName('ambient')[0];
		difuse = omni[i].getElementsByTagName('difuse')[0];
		specular = omni[i].getElementsByTagName('specular')[0];

		//TODO Guardar os valores de cada tag
	}

	var spot = lights[0].getElementsByTagName('spot');
	var i=0;
	for(i;i<omni.length;i++){
		var id, enabled, angle, exponent;
		id = spot[i].attributes.getNamedItem('id').value;
		enabled = spot[i].attributes.getNamedItem('enabled').value;
		angle = spot[i].attributes.getNamedItem('angle').value;
		exponent = spot[i].attributes.getNamedItem('exponent').value;

		//Gets the different tags
		var target, location, ambient, difuse, specular;
		target = omni[i].getElementsByTagName('target')[0];
		location = omni[i].getElementsByTagName('location')[0];
		ambient = omni[i].getElementsByTagName('ambient')[0];
		difuse = omni[i].getElementsByTagName('difuse')[0];
		specular = omni[i].getElementsByTagName('specular')[0];

		//TODO Guardar os valores de cada tag
	}

};

MySceneGraph.prototype.parseTextures = function(rootElement) {
	var textures = rootElement.getElementsByTagName('textures');
	if(textures == null || textures.length <1){
		return "textures element is missing.";
	}

	var listTextures = textures[0].getElementsByTagName('texture');
	var i=0;
	for(i;i<listTextures.length;i++){
		var texture, id, file, length_s, length_t;
		texture = listTextures[i];
		id = texture.attributes.getNamedItem('id').value;
		file = texture.attributes.getNamedItem('file').value;
		length_s = texture.attributes.getNamedItem('length_s').value;
		length_t = texture.attributes.getNamedItem('length_t').value;
		//console.log(id +" "+file+" "+" "+length_s+" "+length_t);
	}
};

MySceneGraph.prototype.parseMaterials = function(rootElement) {
	var materials = rootElement.getElementsByTagName('materials');
	if(materials == null || materials.length <1){
		return "materials element is missing.";
	}
	
	var listMaterials = materials[0].getElementsByTagName('material');
	var i=0;
	for(i; i< listMaterials.length;i++){
		var id, emission, ambient, diffuse, specular, shininess;
		id = listMaterials[i].attributes.getNamedItem('id').value;
		emission = listMaterials[i].getElementsByTagName('emission');
		ambient = listMaterials[i].getElementsByTagName('ambient');
		difuse = listMaterials[i].getElementsByTagName('difuse');
		specular = listMaterials[i].getElementsByTagName('specular');
		shininess = listMaterials[i].getElementsByTagName('shininess');

		//TODO Guardar valores de cada tag
	}
};

MySceneGraph.prototype.parseTransformations = function(rootElement) {
	var transformations = rootElement.getElementsByTagName('transformations');
	if(transformations == null || transformations.length <1){
		return "transformations element is missing.";
	}

	var listTransformations = transformations[0].getElementsByTagName('transformation');
	if(listTransformations == null || listTransformations.length <1){
		return "transformations element is missing.";
	}

	//console.log("transformations size: " + listTransformations.length);

	var i =0;
	for(i; i< listTransformations.length; i++){
		var j=0;
		var t = listTransformations[i].children.length;
		
		for(j;j<t;j++){
			var transformation = listTransformations[i].children[j];
			switch(transformation.tagName){
				case "rotation":
					break;
				case "translate":
					break;
				case "scale":
					break;
				default: break;
			}
		}
	}
};

MySceneGraph.prototype.parsePrimitives = function(rootElement) {
	var primitives = rootElement.getElementsByTagName('primitives');
	if(primitives == null || primitives.length <1){
		return "primitives element is missing.";
	}

	var listPrimitives = primitives[0].getElementsByTagName('primitive');
	if(listPrimitives == null || listPrimitives.length <1){
		return "primitive element is missing.";
	}

	//console.log("primitives size: " + listPrimitives.length);

	var i =0;
	for(i; i< listPrimitives.length; i++){
		//console.log(listPrimitives[i].attributes.getNamedItem("id"));
		var primitive = listPrimitives[i].children[0];
		switch(primitive.tagName){
			case "rectangle":
				var x1 =primitive.attributes.getNamedItem("x1").value;
				var x2 =primitive.attributes.getNamedItem("x2").value;
				var y1 =primitive.attributes.getNamedItem("y1").value;
				var y2 =primitive.attributes.getNamedItem("y2").value;

				var rectangle = new MySquare(this.scene, x1,y1,x2,y2);
				break;
			case "sphere":
				break;
			case "triangle":
				break;
			case "cylinder":
				break;
			case "torus":
				break;

			default: break;
		}
	}
};
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


