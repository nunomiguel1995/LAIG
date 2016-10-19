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
        var sinAlfa = Math.sin(alfa);
        var cosAlfa = Math.cos(alfa);

        for(var j = 0; j <= this.slices; j++){
            var beta = j * 2 * Math.PI / this.slices;
            var sinBeta = Math.sin(beta);
            var cosBeta = Math.cos(beta);

            var x = (this.outer + this.inner * cosBeta) * cosAlfa;
            var y = (this.outer + this.inner * cosBeta) * sinAlfa;
            var z = this.inner * sinBeta;

            var u = 1 - (j / this.slices);
            var v = 1 - (i / this.stacks);
            
            this.vertices.push(x, y, z);
            this.normals.push(x, y, z);
            this.texCoords.push(u,v);
        }
    }
    
    for(var i = 0; i < this.loops; i++){
        for(var j = 0; j < this.slices; j++){
            var first = (i * (this.slices + 1)) + j;
            var second = first + this.slices + 1;

            this.indices.push(first, second, first + 1);
            this.indices.push(second, second + 1, first + 1);
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
