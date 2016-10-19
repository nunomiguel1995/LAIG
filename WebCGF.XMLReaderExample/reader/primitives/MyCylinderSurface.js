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

    for(var st = 0; st <= this.stacks; st++){
        var r = this.top - st * rStep;

        for(var sl = 0; sl <= this.slices; sl++){
            this.vertices.push(r * Math.cos(sl * alfa), r * Math.sin(sl * alfa), st * zStep);
            this.normals.push(r * Math.cos(sl * alfa), r * Math.sin(sl * alfa), 0);
            this.texCoords.push(1 - (st / this.stacks), 1 - (sl / this.slices));
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