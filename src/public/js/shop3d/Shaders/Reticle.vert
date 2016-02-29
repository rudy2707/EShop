attribute vec2 in_Vertex;
attribute vec2 in_TextureCoord;

uniform mat4 model;

varying vec2 fragTextureCoord;

void main()
{
	fragTextureCoord = in_TextureCoord;

	gl_Position = model * vec4(in_Vertex, 0.0, 1.0);
}
