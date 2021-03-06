attribute vec3 in_Vertex;
attribute vec2 in_TextureCoord;
attribute vec3 in_Normal;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

varying vec3 fragNormal;
varying vec3 fragVertex;
varying vec2 fragTextureCoord;

varying mat4 fragModel;

void main()
{
	fragTextureCoord = in_TextureCoord;
	fragNormal = in_Normal;
	fragVertex = in_Vertex;
	fragModel = model;

	gl_Position = projection * view * model * vec4(in_Vertex, 1.0);
}
