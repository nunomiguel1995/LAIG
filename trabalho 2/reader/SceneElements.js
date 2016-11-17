function Stack(stackItem){
    this.stack = [];
    if(stackItem != null)
        this.stack.push(stackItem);
}

Stack.prototype.push = function(stackItem){
    this.stack.push(stackItem);
}

Stack.prototype.pop = function(){
    this.stack.pop();
}

Stack.prototype.top = function(){
    return this.stack[this.stack.length - 1];
}

function Node(id){
    this.id = id;
    this.material = [];
    this.children = [];
    this.animation = [];
    this.animationIndex = 0;
    this.primitive= null;
    this.texture = null;
    this.transformation= mat4.create();
}

function Texture(id, texture, lenght_s, lenght_t){
    this.id = id;
    this.texture= texture;
    this.lenght_s = lenght_s;
    this.lenght_t = lenght_t;
}

function Spot(id,enable,angle,exponent,target,location,ambient,diffuse,specular){
    this.id = id;
    this. enable = false;
    this.angle = angle;

    this.exponent = exponent;
    this.target = target;
    this.location = location;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
}

function Omni(id,enable,location,ambient,diffuse,specular){
    this.id = id;
    this. enable = false;

    this.location = location;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
}

function Coordinates(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}

function Color(r,g,b,a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

function Illumination(doubleside, local, ambient, background){
    this.doubleside = doubleside;
    this.local = local;
    this.ambient = ambient;
    this.background = background;
}

function OmniLocation(x,y,z,w){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
}

function MaterialInfo(id){
    this.id = id;
}

function Material(id, emission, ambient, diffuse, specular, shininess){
    this.id = id;
    this.emission = emission;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.shininess = shininess;
}
