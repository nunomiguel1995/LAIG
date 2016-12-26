/**
 * MyRectangle
 * @constructor
 */
 function MyRectangle(scene, minX, minY, maxX, maxY) {
 	CGFobject.call(this,scene);

  
 };

 MyRectangle.prototype = Object.create(CGFobject.prototype);
 MyRectangle.prototype.constructor = MyRectangle;

 MyRectangle.prototype.initBuffers = function() {

 };
