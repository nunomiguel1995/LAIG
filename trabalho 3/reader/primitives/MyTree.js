/**
* MyTree
* @constructor
*/
function MyTree(scene) {
  this.scene = scene;
  //Asa
  var controlPoints = [
                        [
                           [ -0.2, -1.5, 0.0, 1 ],
                           [ -0.2,  0.0, 0.0, 1 ],
                           [ -0.2,  1.5, 0.0, 1 ]

                        ],
                        [
                           [ 0, -1.5,0.8, 1 ],
                           [ 0, 0.0, 0.8, 1 ],
                           [ 0, 2.0, 0.0, 1 ]
                        ],
                        [
                          [ 0.2, -1.5, 0.0, 1 ],
                          [ 0.2,  0.0, 0.0, 1 ],
                          [ 0.2,  1.5, 0.0, 1 ]
                        ]
                      ];
  this.leaf = new MyCylinder(this.scene,0.5,0,4,50,50);
  this.trunk = new MyCylinder(this.scene, 0.5, 0.1,4, 50, 50);
  this.initBuffers();
};

MyTree.prototype = Object.create(CGFobject.prototype);
MyTree.prototype.constructor = MyTree;

MyTree.prototype.display = function() {
  var i = 0;
  var inc = Math.PI / 4;

  for(i;i<=8;i++){
    this.scene.pushMatrix();
      this.scene.translate(0,5.8,0);
      this.scene.rotate(-Math.PI/2.3,0,0,1);
      this.scene.rotate(Math.sin(inc)*i,1,0,0);
      this.scene.greenLeaf.apply();
      this.leaf.display();
    this.scene.popMatrix();
  }

  this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.scale(1.5,1.5,1.5);
    this.scene.trunk.apply();
    this.trunk.display();
  this.scene.popMatrix();

}
