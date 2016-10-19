/**
* MySphere
* @constructor
<sphere radius="ff" slices="ii" stacks="ii" />
*/
function MySphere(scene, radius, slices, stacks) {
    CGFobject.call(this,scene);

    this.radius = radius;
    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
};

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;

MySphere.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    for(var i = 0; i <= this.stacks; i++){
        var alfa = i * Math.PI / this.stacks;
        var sinAlfa = Math.sin(alfa);
        var cosAlfa = Math.cos(alfa);

        for(var j = 0; j <= this.slices; j++){
            var beta = j * 2 * Math.PI / this.slices;
            var sinBeta = Math.sin(beta);
            var cosBeta = Math.cos(beta);

            var x = cosBeta * sinAlfa;
            var y = cosAlfa;
            var z = sinBeta * sinAlfa;
            var u = 1 - (j / this.slices);
            var v = 1 - (i / this.stacks);

            this.vertices.push(this.radius * x, this.radius * y, this.radius * z);
            this.normals.push(x,y,z);
            this.texCoords.push(u,v);
        }
    }
    
    for(var i = 0; i < this.stacks; i++){
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