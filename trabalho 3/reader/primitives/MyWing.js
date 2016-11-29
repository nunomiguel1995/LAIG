/**
* MyWing
* @constructor
*/
function MyWing(scene) {
  this.scene = scene;
  //Asa
  var controlPoints = [
                        [
                           [ -0.8, -1.5, 0.0, 1 ],
                           [ -0.8,  0.0, 0.0, 1 ],
                           [ -0.8,  1.5, 0.0, 1 ]

                        ],
                        [
                           [ 0, -1.5,0.5, 1 ],
                           [ 0, 0.0, 0.5, 1 ],
                           [ 0, 2.0, 0.0, 1 ]
                        ],
                        [
                          [ 0.8, -1.5, 0.0, 1 ],
                          [ 0.8,  0.0, 0.0, 1 ],
                          [ 0.8,  1.5, 0.0, 1 ]
                        ]
                      ];
  this.asa = new MyPatch(this.scene, 2, 2, 10, 10, controlPoints);
  this.initBuffers();
};

MyWing.prototype = Object.create(CGFobject.prototype);
MyWing.prototype.constructor = MyWing;

MyWing.prototype.display = function() {
  this.scene.pushMatrix();
    this.asa.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.asa.display();
  this.scene.popMatrix();

}
