function Node(id){
    this.id = id;
    this.material = [];
    this.children = [];
    this.primitive= null;
    this.texture = null;
    this.transformation= mat4.create();
}

function Texture(id, file, lenght_s, lenght_t){
    this.id = id;
    this.file= file;
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

function Omni(id,enable,target,location,ambient,diffuse,specular){
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