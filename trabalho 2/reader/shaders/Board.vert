attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float du;
uniform float dv;
uniform float su;
uniform float sv;

void main() {
    vTextureCoord = aTextureCoord;

    	float posX = floor(du * aTextureCoord.s);
    	float posY = floor(dv * aTextureCoord.t);

      vec3 offset = vec3(0.0,0.0,0.0);
      if((posX == su) && (posY == sv)){
        offset.z += 0.1;
      }

      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
