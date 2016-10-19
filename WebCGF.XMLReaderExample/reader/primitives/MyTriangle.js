/**
 * MyTriangle
 * @constructor
 * <triangle x1="ff" y1="ff" z1="ff" x2="ff" y2="ff" z2="ff" x3="ff" y3="ff" z3="ff" />
 */
 function MyTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
 	CGFobject.call(this,scene);

 	this.point0 = vec3.fromValues(x1, y1, z1);
 	this.point1 = vec3.fromValues(x2, y2, z2);
 	this.point2 = vec3.fromValues(x3, y3, z3);

 	this.initBuffers();
 };

 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyTriangle;

 MyTriangle.prototype.initBuffers = function() {
 	this.vertices = [this.point0[0], this.point0[1], this.point0[2],
 					 this.point1[0], this.point1[1], this.point1[2],
 					 this.point2[0], this.point2[1], this.point2[2]];

 	this.indices = [0, 1, 2];

 	var dA = vec3.create();
 	vec3.sub(dA, this.point2, this.point0);

 	var dB = vec3.create();
 	vec3.sub(dB, this.point1, this.point0);

 	var dC = vec3.create();
 	vec3.sub(dC, this.point2, this.point1);

 	var norm = vec3.create();
 	vec3.cross(norm, dB, dC);
 	vec3.normalize(norm, norm);

 	this.normals = [norm[0], norm[1], norm[2],
 					norm[0], norm[1], norm[2],
 					norm[0], norm[1], norm[2]];

 	var a = vec3.length(dA);
 	var c = vec3.length(dC);
 	var cosBeta = (vec3.sqrLen(dA) - vec3.sqrLen(dB) + vec3.sqrLen(dC)) / (2 * a * c);
 	var beta = Math.acos(this.cosBeta);

    this.texCoords = [c - a * Math.cos(beta), a * Math.sin(beta),
    				  0, 0,
    				  c, 0];
    				  
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
