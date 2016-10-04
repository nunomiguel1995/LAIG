
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

    error = this.parsePrimitives(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseTransformations(rootElement);

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

	console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");
};

MySceneGraph.prototype.parseTransformations = function(rootElement) {
	var transformations = rootElement.getElementsByTagName('transformations');
	if(transformations == null){
		return "transformations element is missing.";
	}

	if (transformations.length < 1) {
		return "zero 'transformations' element found.";
	}

	var listTransformations = transformations[0].getElementsByTagName('transformation');

	if(listTransformations== null){
		return "transformation element is missing.";
	}

	if (listTransformations.length < 1) {
		return "zero 'transformation' element found.";
	}

	console.log("transformations size: " + listTransformations.length);

	var i =0;
	for(i; i< listTransformations.length; i++){
		var transformation = listTransformations[i].children[0];
		switch(transformation.tagName){
			case "rotation":
				console.log("Rotation angle= " + transformation.attributes.getNamedItem("angle").value);
				break;
			case "translate":
				console.log("Translate x=" + transformation.attributes.getNamedItem("x").value);
				break;
			case "scale":
				console.log("Scale x= " + transformation.attributes.getNamedItem("x").value);
				break;
			default: break;
		}
	}

}

MySceneGraph.prototype.parsePrimitives = function(rootElement) {
	var primitives = rootElement.getElementsByTagName('primitives');
	if(primitives == null){
		return "primitives element is missing.";
	}

	if (primitives.length < 1) {
		return "zero 'primitives' element found.";
	}

	var listPrimitives = primitives[0].getElementsByTagName('primitive');

	if(listPrimitives== null){
		return "primitive element is missing.";
	}

	if (listPrimitives.length < 1) {
		return "zero 'primitive' element found.";
	}

	console.log("primitives size: " + listPrimitives.length);

	var i =0;
	for(i; i< listPrimitives.length; i++){
		var primitive = listPrimitives[i].children[0];
		switch(primitive.tagName){
			case "rectangle":
				console.log("Rectangle x1= " + primitive.attributes.getNamedItem("x1").value);
				break;
			case "sphere":
				console.log("sphere radius= " + primitive.attributes.getNamedItem("radius").value);
				break;
			case "triangle":
				console.log("triangle x1= " + primitive.attributes.getNamedItem("x1").value);
				break;
			case "cylinder":
				console.log("cylinder base= " + primitive.attributes.getNamedItem("base").value);
				break;
			case "torus":
				console.log("torus inner= " + primitive.attributes.getNamedItem("inner").value);
				break;

			default: break;
		}
	}

}
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


