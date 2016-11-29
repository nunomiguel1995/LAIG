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


	var p1 = this.point0;
	var p2 = this.point1;
	var p3 = this.point2;

	var x = ((p2[1] - p1[1])*(p3[2] - p1[2]) - (p2[2] - p1[2])*(p3[1] - p1[1]))/Math.sqrt(Math.pow((p2[1] - p1[1])*(p3[2] - p1[2]) - (p2[2] - p1[2])*(p3[1] - p1[1]),2) + Math.pow((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0]) * (p3[2] - p1[2]),2) + Math.pow((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]),2));
    var y = ((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0])*(p3[2] - p1[2]))/Math.sqrt(Math.pow((p2[1] - p1[1])*(p3[2] - p1[2]) - (p2[2] - p1[2])*(p3[1] - p1[1]), 2) + Math.pow((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0])*(p3[2] - p1[2]),2) + Math.pow((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]),2));
    var z = ((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]))/Math.sqrt(Math.pow((p2[1] - p1[1])*(p3[2] - p1[2])- (p2[2] - p1[2])*(p3[1] - p1[1]), 2) + Math.pow((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0])*(p3[2] - p1[2]),2) + Math.pow((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]), 2));


 	var dA = vec3.create();
 	vec3.sub(dA, this.point1, this.point0);

 	var dB = vec3.create();
 	vec3.sub(dB, this.point2, this.point0);

 	var dC = vec3.create();
 	vec3.sub(dC, this.point2, this.point1);

 	var norm = vec3.create();
 	vec3.cross(norm, dB, dC);
 	vec3.normalize(norm, norm);

 	this.normals = [norm[0], norm[1], norm[2],
 					norm[0], norm[1], norm[2],
 					norm[0], norm[1], norm[2]];

    var u = (vec3.sqrLen(dA) + vec3.sqrLen(dB) - vec3.sqrLen(dC))/ (2 * vec3.length(dA));
	var v = Math.sqrt(vec3.sqrLen(dB) - u * u);

	this.texCoords = [0,0,
					  u,0,
					  v, u
	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
