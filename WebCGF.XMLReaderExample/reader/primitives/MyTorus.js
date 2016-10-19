/**
 * MyTorus
 * @constructor
 * <torus inner="ff" outer="ff" slices="ii" loops="ii" /> 
 */
function MyTorus(scene, inner, outer, slices, loops) {
	CGFobject.call(this,scene);

	this.inner = inner;
	this.outer = outer;
	this.slices = slices;
	this.loops = loops;

	this.initBuffers();
};

MyTorus.prototype = Object.create(CGFobject.prototype);
MyTorus.prototype.constructor = MyTorus;

MyTorus.prototype.initBuffers = function() {
	this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    for(var i = 0; i <= this.loops; i++){
    	var alfa = i * 2 * Math.PI / this.loops;

    	for(var sl = 0; sl <= this.slices; sl++){
    		var beta = sl * 2 * Math.PI / this.slices;

    		this.vertices.push((this.outer + (this.inner * Math.cos(alfa)) * Math.cos(beta)),
    			               (this.outer + (this.inner * Math.cos(alfa)) * Math.sin(beta)),
    			        	   (this.inner * Math.sin(alfa)));
    		this.normals.push((this.outer + (this.inner * Math.cos(alfa)) * Math.cos(beta)),
    			               (this.outer + (this.inner * Math.cos(alfa)) * Math.sin(beta)),
    			        	   (this.inner * Math.sin(alfa)));
    		this.texCoords.push(1 - (i / this.loops), 1 - (sl / this.slices));
    	}
    }

    for(var st = 0; st <= this.stacks; st++){
        for(var sl = 0; sl <= this.slices; sl++){
            var fInd = (st * (this.slices + 1)) + sl;
            var sInd = fInd + this.slices + 1;

            this.indices.push(fInd, sInd + 1, sInd);
            this.indices.push(fInd, fInd + 1, sInd + 1);
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
