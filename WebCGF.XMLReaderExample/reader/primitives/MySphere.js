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

    var halfPi = Math.PI / 2;
 	var pi = halfPi / this.stacks;
 	var beta = (Math.PI * 2) / this.slices;

    for(var i = 0; i <= this.stacks; i++){
        var alfa = i * Math.PI / this.stacks;

        for(var j = 0; j <= this.slices; j++){
            var beta = 2 * j * Math.PI / this.slices;

            this.vertices.push(this.radius * Math.cos(beta) * Math.sin(alfa),
                               this.radius * Math.cos(alfa),
                               this.radius * Math.sin(beta) * Math.sin(alfa));
            this.normals.push(this.radius * Math.cos(beta) * Math.sin(alfa),
                               this.radius * Math.cos(alfa),
                               this.radius * Math.sin(beta) * Math.sin(alfa));
            this.texCoords.push(1 - (i / this.stacks), 1 - (j / this.slices));
        }
    }

    for(var st = 0; st <= this.stacks; st++){
        for(var sl = 0; sl <= this.slices; sl++){
            var fInd = (st * (this.slices + 1)) + sl;
            var sInd = fInd + this.slices + 1;

            this.indices.push(fInd, sInd + 1, sInd);
            this.indices.push(fInd, fInd + 1, sind + 1);
        }
    }
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers(); 
};