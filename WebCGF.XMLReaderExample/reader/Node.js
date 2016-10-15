
function Node(){
    this.material = null;
    this.m = mat4.create();
    mat4.identity(this.m);
    this.children = [];
    this.primitive= null;
    this.transformations=[];

}