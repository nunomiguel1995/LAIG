/**
 * MyGameboard
 * @constructor
 */
function MyGameboard(scene) {
	CGFobject.call(this,scene);

  this.gameboard = new MyCylinder(this.scene, 1, 1, 2, 6, 6);
  this.boardUnit = new MyCylinder(this.scene, 1, 1, 2, 50, 50);

	this.waterT = new CGFappearance(this.scene);
	this.waterT.loadTexture("./res/water.jpg");

	this.rockT = new CGFappearance(this.scene);
	this.rockT.loadTexture("./res/rock.jpg");

	this.initBuffers();
};

MyGameboard.prototype = Object.create(CGFobject.prototype);
MyGameboard.prototype.constructor = MyGameboard;

MyGameboard.prototype.display = function() {
  this.scene.pushMatrix();
		this.waterT.apply();
		this.scene.rotate(Math.PI / 6, 0, 1, 0);
		this.scene.scale(10, 0.1, 10);
		this.scene.translate(0, 1, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.gameboard.display();
  this.scene.popMatrix();

	this.rockT.apply();
	this.displayLine1();
	this.displayLine2();
	this.displayLine3();
	this.displayLine4();
	this.displayLine5();
};

MyGameboard.prototype.displayLine1 = function() {
	this.scene.pushMatrix();
		this.scene.translate(-6.5, 0, 4);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-6.5, 0, 0);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-6.5, 0, -4);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();
}

MyGameboard.prototype.displayLine2 = function() {
	this.scene.pushMatrix();
		this.scene.translate(-3, 0, 6);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-3, 0, 2);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-3, 0, -2);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-3, 0, -6);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();
}

MyGameboard.prototype.displayLine3 = function() {
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 8);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 4);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, -4);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, -8);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();
}

MyGameboard.prototype.displayLine4 = function() {
	this.scene.pushMatrix();
		this.scene.translate(3, 0, 6);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(3, 0, 2);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(3, 0, -2);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(3, 0, -6);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();
}

MyGameboard.prototype.displayLine5 = function() {
	this.scene.pushMatrix();
		this.scene.translate(6.5, 0, 4);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(6.5, 0, 0);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(6.5, 0, -4);
		this.scene.scale(1.5, 0.1, 1.5);
		this.scene.translate(0, 2, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.boardUnit.display();
	this.scene.popMatrix();
}
