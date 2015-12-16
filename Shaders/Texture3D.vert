attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

varying vec2 vTextureCoord;


void main(void)
{
	vTextureCoord = aTextureCoord;
	gl_Position = projection * view * model * vec4(aVertexPosition, 1.0);
}
