function MyHalfSphere(scene, slices, stacks) {
 CGFobject.call(this,scene);

 this.slices = slices;
 this.stacks = stacks;

 this.initBuffers();
};

MyHalfSphere.prototype = Object.create(CGFobject.prototype);
MyHalfSphere.prototype.constructor = MyHalfSphere;

MyHalfSphere.prototype.initBuffers = function() {
   this.vertices = [];
 this.indices = [];
 this.normals = [];

   var halfPi = Math.PI / 2;
 var pi = halfPi / this.stacks;
 var beta = (Math.PI * 2) / this.slices;

   for(var i = 0; i <= this.stacks; i++){
       for(var j = 0; j < this.slices; j++){
           this.vertices.push(Math.sin(halfPi - i * pi) * Math.cos(j * beta), Math.sin(halfPi - i * pi) * Math.sin(j * beta), Math.cos(halfPi - i * pi));
           this.normals.push(Math.sin(halfPi - i * pi) * Math.cos(j * beta), Math.sin(halfPi - i * pi) * Math.sin(j * beta), Math.cos(halfPi - i * pi));
       }
   }

   for (var i = 0; i < this.stacks; i++){
   var aux = this.slices*i;
   for (var j = 0; j < this.slices; j++){
     if(j == this.slices - 1){
       this.indices.push(aux + j, aux + j+1, aux + this.slices + j);
       this.indices.push(aux + j, aux + j+1 - this.slices , aux + j+1);
     }else{
       this.indices.push(aux + j, aux + this.slices + j+1,aux + this.slices + j);
       this.indices.push(aux + j,aux + j+1, aux + this.slices + j+1);
     }
   }
 }

 this.primitiveType = this.scene.gl.TRIANGLES;
 this.initGLBuffers();
};
