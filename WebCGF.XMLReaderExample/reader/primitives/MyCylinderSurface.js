function MyCylinderSurface(scene, base, top, height, slices, stacks) {
    CGFobject.call(this,scene);
    
    this.base = base;
    this.top = top;
    this.height = height;
    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
};

MyCylinderSurface.prototype = Object.create(CGFobject.prototype);
MyCylinderSurface.prototype.constructor = MyCylinderSurface;

MyCylinderSurface.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var alfa = (Math.PI * 2) / this.slices;
    var zStep = this.height / this.stacks;
    var rStep = (this.top - this.base) / this.stacks;

    for(var i = 0; i <= this.stacks; i++){

        for(var j = 0; j <= this.slices; j++){
            var r = this.base + (i * rStep);
            var z = i * zStep;

            var x = r * Math.cos(alfa * j);
            var y = r * Math.sin(alfa * j);
            
            var norm = vec3.fromValues(x,y,z);
            vec3.normalize(norm,norm);
            var u = 0.5 + (Math.atan2(norm[2], norm[0]) / (Math.PI * 2));
            var v = 0.5 - (Math.asin(norm[1]) / Math.PI);

            this.vertices.push(x, y, z);
            this.normals.push(x, y, z);
            this.texCoords.push(u,v);
        }
    }

    for(var i = 0; i < this.stacks; i++){
        for(var j = 0; j < this.slices; j++){
            var first = (i * (this.slices + 1)) + j;
            var second = first + this.slices + 1;

            this.indices.push(first, second + 1, second);
            this.indices.push(first, first + 1, second + 1);
        }
    }
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers(); 
};