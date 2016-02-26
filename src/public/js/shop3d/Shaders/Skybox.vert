attribute vec3 in_Vertex;
attribute vec2 in_TextureCoord;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

varying vec3 fragVertex;
varying vec2 fragTextureCoord;

void main()
{
	fragTextureCoord = in_TextureCoord;

	gl_Position = projection * view * model * vec4(in_Vertex, 1.0);
}
