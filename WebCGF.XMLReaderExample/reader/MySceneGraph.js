
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;

	this.transformations={};
	this.materials={};
	this.textures={};
	this.spotLights = [];
	this.omniLights = [];
	this.primitives= {};
	this.nodes= {};
	this.views=[];
	this.illumination;
	this.root;
	this.axisLength;

	this.toRad = Math.PI / 180; //Conversion from degree to radian
		
	// File reading 
	this.reader = new CGFXMLreader();

	this.maxMaterialIndex=0;

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
MySceneGraph.prototype.onXMLReady=function() {
	var rootElement = this.reader.xmlDoc.documentElement;
	
	var error = this.dsxOrder(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}
	// Here should go the calls for different functions to parse the various blocks
	error = this.parseGlobals(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}	

	error = this.parseViews(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseIllumination(rootElement);
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

	error = this.parseComponents(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	this.loadedOk=true;
	console.log("XML Loading finished.");
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};

MySceneGraph.prototype.dsxOrder = function(rootElement){
	if(rootElement.children[0].tagName != 'scene'){
		return 'First DSX tag should be scene';	
	} 
	else if(rootElement.children[1].tagName != 'views'){
		return 'First DSX tag should be views';
	}
	else if(rootElement.children[2].tagName != 'illumination'){
		return 'First DSX tag should be illumination';
	}
	else if(rootElement.children[3].tagName != 'lights'){
		return 'First DSX tag should be lights';
	}
	else if(rootElement.children[4].tagName != 'textures'){
		return 'First DSX tag should be textures';
	}
	else if(rootElement.children[5].tagName != 'materials'){
		return 'First DSX tag should be materials';
	}
	else if(rootElement.children[6].tagName != 'transformations'){
		return 'First DSX tag should be transformations';
	}
	else if(rootElement.children[7].tagName != 'primitives'){
		return 'First DSX tag should be primitives';
	}
	else if(rootElement.children[8].tagName != 'components')
		return 'First DSX tag should be components';
}

/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobals= function(rootElement) {
	var elems =  rootElement.getElementsByTagName('scene');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}

	var globals = elems[0];
	this.root = this.reader.getString(globals,'root',true);
	this.axisLength = this.reader.getFloat(globals, 'axis_length', true);
};

MySceneGraph.prototype.parseViews = function(rootElement) {
	var views = rootElement.getElementsByTagName('views');
	if(views == null || views.length <1){
		return "views element is missing.";
	}

	var default_view = views[0].attributes.getNamedItem("default").value;
	var listPerspectives = views[0].getElementsByTagName('perspective');

	var i =0;
	for(i; i< listPerspectives.length; i++){
		var tagFrom, tagTo;
		tagFrom = listPerspectives[i].getElementsByTagName('from')[0];  
		tagTo = listPerspectives[i].getElementsByTagName('to')[0];

		var id, near, far, angle, from, to;
		id= this.reader.getString(listPerspectives[i], 'id', true);
		near= this.reader.getFloat(listPerspectives[i], 'near', true);
		far= this.reader.getFloat(listPerspectives[i], 'far', true);
		angle= this.reader.getFloat(listPerspectives[i], 'angle', true) * this.toRad;
		from = new Coordinates(this.reader.getFloat(tagFrom, 'x',true), this.reader.getFloat(tagFrom,'y',true), this.reader.getFloat(tagFrom,'z', true));
		to = new Coordinates(this.reader.getFloat(tagTo,'x',true), this.reader.getFloat(tagTo,'y',true), this.reader.getFloat(tagTo,'z', true));

		var view = new CGFcamera(angle, near, far,vec3.fromValues(from.x,from.y,from.z), vec3.fromValues(to.x,to.y,to.z));
		this.views.push(view);
	}	
};

MySceneGraph.prototype.parseIllumination = function(rootElement) {
	var illumination = rootElement.getElementsByTagName('illumination')[0];

	if(illumination == null || illumination.length <1){
		return "illumination element is missing.";
	}

	var doubleside = this.reader.getBoolean(illumination, 'doublesided', true);
	var local = this.reader.getBoolean(illumination, 'local', true);

	var tagAmbient = illumination.getElementsByTagName('ambient')[0];
	if(tagAmbient == null){
		return 'ambient element is missing';
	}
	var ambient = new Color(this.reader.getFloat(tagAmbient, 'r', true),this.reader.getFloat(tagAmbient, 'g', true),this.reader.getFloat(tagAmbient, 'b', true),this.reader.getFloat(tagAmbient, 'a', true));
	
	var tagBackground = illumination.getElementsByTagName('background')[0];
	if(tagBackground == null){
		return 'background element is missing';
	}
	var background = new Color(this.reader.getFloat(tagBackground, 'r', true),this.reader.getFloat(tagBackground, 'g', true),this.reader.getFloat(tagBackground, 'b', true),this.reader.getFloat(tagBackground, 'a', true));

	this.illumination = new Illumination(doubleside, local, ambient, background);
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
		var id = omni[i].attributes.getNamedItem('id').value;
		var enabled = this.reader.getBoolean(omni[i], 'enabled', true);

		var location, ambient = [], diffuse= [], specular=[];
		var tagLocation = omni[i].getElementsByTagName('location')[0];
		var tagAmbient = omni[i].getElementsByTagName('ambient')[0];
		var tagDiffuse = omni[i].getElementsByTagName('diffuse')[0];
		var tagSpecular = omni[i].getElementsByTagName('specular')[0];
		
		location = new OmniLocation(this.reader.getFloat(tagLocation, 'x', true),this.reader.getFloat(tagLocation, 'y', true), this.reader.getFloat(tagLocation, 'z', true), this.reader.getFloat(tagLocation, 'w', true));
		ambient = new Color(this.reader.getFloat(tagAmbient, 'r', true),this.reader.getFloat(tagAmbient, 'g', true),this.reader.getFloat(tagAmbient, 'b', true),this.reader.getFloat(tagAmbient, 'a', true));
		diffuse = new Color(this.reader.getFloat(tagDiffuse, 'r', true),this.reader.getFloat(tagDiffuse, 'g', true),this.reader.getFloat(tagDiffuse, 'b', true),this.reader.getFloat(tagDiffuse, 'a', true));
		specular = new Color(this.reader.getFloat(tagSpecular, 'r', true),this.reader.getFloat(tagSpecular, 'g', true),this.reader.getFloat(tagSpecular, 'b', true),this.reader.getFloat(tagAmbient, 'a', true));

		var o=  new Omni(id, enabled,location, ambient, diffuse, specular);
		this.omniLights.push(o);
	}

	//Deals with spot bloc
	var spot = lights[0].getElementsByTagName('spot');
	i=0;
	for(i;i<spot.length;i++){
		var id = spot[i].attributes.getNamedItem('id').value;
		var enabled = spot[i].attributes.getNamedItem('enabled').value;
		var angle = this.reader.getFloat(spot[i], 'angle', true) * this.toRad; 
		var exponent = this.reader.getFloat(spot[i], 'exponent', true);

		var tagLocation = spot[i].getElementsByTagName('location')[0];
		var tagTarget = spot[i].getElementsByTagName('target')[0];
		var tagAmbient = spot[i].getElementsByTagName('ambient')[0];
		var tagDiffuse = spot[i].getElementsByTagName('diffuse')[0];
		var tagSpecular = spot[i].getElementsByTagName('specular')[0];
		
		var location, target, ambient , diffuse, specular;
		location = new Coordinates(this.reader.getFloat(tagLocation, 'x', true),this.reader.getFloat(tagLocation, 'y', true), this.reader.getFloat(tagLocation, 'z', true));
		target = new Coordinates(this.reader.getFloat(tagTarget, 'x', true),this.reader.getFloat(tagTarget, 'y', true), this.reader.getFloat(tagTarget, 'z', true));
		ambient = new Color(this.reader.getFloat(tagAmbient, 'r', true),this.reader.getFloat(tagAmbient, 'g', true),this.reader.getFloat(tagAmbient, 'b', true),this.reader.getFloat(tagAmbient, 'a', true));
		diffuse = new Color(this.reader.getFloat(tagDiffuse, 'r', true),this.reader.getFloat(tagDiffuse, 'g', true),this.reader.getFloat(tagDiffuse, 'b', true),this.reader.getFloat(tagDiffuse, 'a', true));
		specular = new Color(this.reader.getFloat(tagSpecular, 'r', true),this.reader.getFloat(tagSpecular, 'g', true),this.reader.getFloat(tagSpecular, 'b', true),this.reader.getFloat(tagSpecular, 'a', true));

		var s = new Spot(id, enabled,angle,exponent,target,location, ambient, diffuse, specular);
		this.spotLights.push(s);
	}
};

MySceneGraph.prototype.parseTextures = function(rootElement) {
	var textures = rootElement.getElementsByTagName('textures');
	if(textures == null || textures.length <1){
		return "textures element is missing.";
	}

	var listTextures = textures[0].getElementsByTagName('texture');		
	if(textures == null || textures.length <1){
		return "textures element is missing.";
	}

	var i=0;
	for(i;i<listTextures.length;i++){
		var texture, id, file, length_s, length_t;
		id = this.reader.getString(listTextures[i], 'id', true);
		file = this.reader.getString(listTextures[i], 'file', true);		
		length_s = this.reader.getFloat(listTextures[i], 'length_s', true);
		length_t = this.reader.getFloat(listTextures[i], 'length_t', true);
		texture = new CGFtexture(this.scene,file,length_t,length_s);
		var t= new Texture(id, texture, length_s, length_t);
		this.textures[id]=t;
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
		var tagAmbient, tagDiffuse, tagSpecular, tagEmission, tagShininess;
		tagAmbient = listMaterials[i].getElementsByTagName('ambient')[0];
		tagDiffuse = listMaterials[i].getElementsByTagName('diffuse')[0];
		tagSpecular = listMaterials[i].getElementsByTagName('specular')[0]; 
		tagEmission = listMaterials[i].getElementsByTagName('emission')[0];
		tagShininess = listMaterials[i].getElementsByTagName('shininess')[0];

		var id, emission, ambient, diffuse, specular, shininess;
		id = this.reader.getString(listMaterials[i], 'id', true);
		emission = new Color(this.reader.getFloat(tagEmission, 'r', true),this.reader.getFloat(tagEmission, 'g', true),this.reader.getFloat(tagEmission, 'b', true),this.reader.getFloat(tagEmission, 'a', true));
		ambient = new Color(this.reader.getFloat(tagAmbient, 'r', true),this.reader.getFloat(tagAmbient, 'g', true),this.reader.getFloat(tagAmbient, 'b', true),this.reader.getFloat(tagAmbient, 'a', true));
		diffuse = new Color(this.reader.getFloat(tagDiffuse, 'r', true),this.reader.getFloat(tagDiffuse, 'g', true),this.reader.getFloat(tagDiffuse, 'b', true),this.reader.getFloat(tagDiffuse, 'a', true));
		specular = new Color(this.reader.getFloat(tagSpecular, 'r', true),this.reader.getFloat(tagSpecular, 'g', true),this.reader.getFloat(tagSpecular, 'b', true),this.reader.getFloat(tagSpecular, 'a', true));

		shininess = this.reader.getFloat(tagShininess, 'value', true);

		var material = new CGFappearance(this.scene);
		material.setEmission(emission.r, emission.g, emission.b, emission.a);
		material.setAmbient(ambient.r, ambient.g, ambient.b, ambient.a);
		material.setDiffuse(diffuse.r, diffuse.g, diffuse.b, diffuse.a);
		material.setSpecular(specular.r, specular.g, specular.b, specular.a);
		material.setShininess(shininess);
		material.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.materials[id] = material;
	}
};

MySceneGraph.prototype.parseTransformations = function(rootElement) {
	var tagTransformations = rootElement.getElementsByTagName('transformations');
	if(tagTransformations == null || tagTransformations.length <1){
		return "transformations element is missing.";
	}

	var listTransformations = tagTransformations[0].getElementsByTagName('transformation');
	if(listTransformations == null || listTransformations.length <1){
		return "transformation element is missing.";
	}

	var i =0;
	for(i; i< listTransformations.length; i++){
		var j= 0;
		var t = listTransformations[i];
		var transformationID = this.reader.getString(t, 'id', true);
		var matrix= mat4.create();
		
		for(j;j < listTransformations[i].children.length;j++){
			var transformation = listTransformations[i].children[j];
			switch(transformation.tagName){
				case "rotate":
					var axis = this.reader.getString(transformation, 'axis', true);
					var angle = this.reader.getFloat(transformation, 'angle', true) * this.toRad;
					var coord;
					if(axis == 'x')
						coord= [1,0,0];
					if(axis == 'y')
						coord = [0,1,0];
					if(axis == 'z')
						coord = [0,0,1];
					mat4.rotate(matrix,matrix, angle,coord);
					break;
				case "translate":
					var x = this.reader.getFloat(transformation, 'x', true);
					var y = this.reader.getFloat(transformation, 'y', true);
					var z = this.reader.getFloat(transformation, 'z', true);
					var coord = [x, y, z];
					mat4.translate(matrix, matrix, coord);
					break;
				case "scale":
					var x = this.reader.getFloat(transformation, 'x', true);
					var y = this.reader.getFloat(transformation, 'y', true);
					var z = this.reader.getFloat(transformation, 'z', true);
					var coord = [x,y,z];
					mat4.scale(matrix, matrix, coord);
					break;
				default: break;
			}
		}

		this.transformations[transformationID] = matrix;
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

	var i =0;
	for(i; i< listPrimitives.length; i++){
		var primitive = listPrimitives[i].children[0];
		var id = this.reader.getString(listPrimitives[i], 'id', true);
		switch(primitive.tagName){
			case "rectangle":
				var x1 = this.reader.getFloat(primitive, 'x1', true);
				var x2 = this.reader.getFloat(primitive, 'x2', true);
				var y1 = this.reader.getFloat(primitive, 'y1', true);
				var y2 = this.reader.getFloat(primitive, 'y2', true);
				var rectangle = new MyRectangle(this.scene, x1,y1,x2,y2);
				this.primitives[id] = rectangle;
				break;
			case "sphere":
				var radius = this.reader.getFloat(primitive, 'radius', true);
				var slices = this.reader.getFloat(primitive, 'slices', true);
				var stacks = this.reader.getFloat(primitive, 'stacks', true);
				var sphere = new MySphere(this.scene,radius, slices,stacks);
				this.primitives[id] = sphere;
				break;
			case "triangle":
				var x1 = this.reader.getFloat(primitive, 'x1', true);
				var x2 = this.reader.getFloat(primitive, 'x2', true);
				var x3 = this.reader.getFloat(primitive, 'x3', true);
				var y1 = this.reader.getFloat(primitive, 'y1', true);
				var y2 = this.reader.getFloat(primitive, 'y2', true);
				var y3 = this.reader.getFloat(primitive, 'y3', true);
				var z1 = this.reader.getFloat(primitive, 'z1', true);
				var z2 = this.reader.getFloat(primitive, 'z2', true);
				var z3 = this.reader.getFloat(primitive, 'z3', true);
				var triangle = new MyTriangle(this.scene, x1,y1,z1,x2,y2,z2,x3,y3,z3);
				this.primitives[id] = triangle;
				break;
			case "cylinder":
				var base = this.reader.getFloat(primitive, 'base', true);
				var top = this.reader.getFloat(primitive, 'top', true);
				var height = this.reader.getFloat(primitive, 'height', true);
				var slices = this.reader.getFloat(primitive, 'slices', true);
				var stacks = this.reader.getFloat(primitive, 'stacks', true);
				var cylinder = new MyCylinder(this.scene, base, top, height, slices, stacks);
				this.primitives[id] = cylinder;
				break;
			case "torus":
				var inner = this.reader.getFloat(primitive, 'inner', true);
				var outer = this.reader.getFloat(primitive, 'outer', true);
				var slices = this.reader.getFloat(primitive, 'slices', true);
				var loops = this.reader.getFloat(primitive, 'loops', true);
				var torus = new MyTorus(this.scene, inner, outer, slices, loops);
				this.primitives[id] = torus;
				break;

			default: break;
		}
	}
};
	
MySceneGraph.prototype.parseComponents = function(rootElement){
	var components = rootElement.getElementsByTagName('components');
	if(components == null || components.length < 1){
		return "components element is missing.";
	}

	var listComponents = components[0].getElementsByTagName('component');
	if(listComponents == null || listComponents.length < 1){
		return "component element is missing.";
	}

	var i = 0;
	//Percorre todas as componentes
	for(i; i < listComponents.length; i++){
		var id;
		var component = listComponents[i];
		var componentId = this.reader.getString(component, "id", true);
		var node = new Node(componentId);

		//Percorre todos os elementos de componente
		var j =0;
		for(j; j < listComponents[i].children.length; j++){	
			var componentTag = listComponents[i].children[j];

			switch(componentTag.tagName){
				case "transformation":
					var t = 0 , matrix = mat4.create();
					for(t; t < componentTag.children.length ; t++){
						switch(componentTag.children[t].tagName){
							case "transformationref":
								var id = this.reader.getString(componentTag.children[t], "id", true);
								matrix = this.transformations[id]; 
								break;
							case "rotate":
								var axis = this.reader.getString(componentTag.children[t], 'axis', true);
								var angle = this.reader.getFloat(componentTag.children[t], 'angle', true) * this.toRad;
								var coord;
								if(axis == 'x')
									coord= [1,0,0];
								if(axis == 'y')
									coord = [0,1,0];
								if(axis == 'z')
									coord = [0,0,1];
								mat4.rotate(matrix,matrix, angle,coord);
								break;
							case "translate":
								var x = this.reader.getFloat(componentTag.children[t], 'x', true);
								var y = this.reader.getFloat(componentTag.children[t], 'y', true);
								var z = this.reader.getFloat(componentTag.children[t], 'z', true);
								var coord = [x, y, z];
								mat4.translate(matrix, matrix, coord);
								break;
							case "scale":
								var x = this.reader.getFloat(componentTag.children[t], 'x', true);
								var y = this.reader.getFloat(componentTag.children[t], 'y', true);
								var z = this.reader.getFloat(componentTag.children[t], 'z', true);
								var coord = [x,y,z];
								mat4.scale(matrix, matrix, coord);
								break;
							default:
								break;
						}
					}
					node.transformation = matrix;
					break;
				case "materials":
					var k = 0;
					if(componentTag.children.length - 1  > this.maxMaterialIndex)
						this.maxMaterialIndex = componentTag.children.length -1;
					for(k; k< componentTag.children.length; k++){
						var materialID = this.reader.getString(componentTag.children[k], "id", true);;
						node.material.push(materialID);						
					}
					break;
				case "texture": 
					var textureRefId = this.reader.getString(componentTag, "id", true);
					node.texture = textureRefId;
					break;
				case "children":
					var t = 0;
					for(t; t < componentTag.children.length; t++){
						switch(componentTag.children[t].tagName){
							case "primitiveref":
								var primitiveRefId = this.reader.getString(componentTag.children[t], "id", true);
								node.primitive = primitiveRefId;
								break;
							case "componentref":
								var componentRefId = this.reader.getString(componentTag.children[t], "id", true);
								node.children.push(componentRefId);
								break;
							default:
								break;
						}
					}
					break;
				default:
					break;
			}
		}
		this.nodes[node.id] = node;
	}
}

/*
 * Callback to be executed on any read error
 */
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


