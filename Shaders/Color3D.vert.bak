attribute vec3 in_Vertex;
attribute vec4 in_Color;
attribute vec3 in_Normal;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

varying vec3 fragNormal;
varying vec3 fragVertex;
varying vec4 fragColor;
varying mat4 fragModel;

void main()
{
	fragVertex = in_Vertex;
	fragColor = in_Color;
	fragNormal = in_Normal;
	fragModel = model;
	
	gl_Position = projection * view * model * vec4(in_Vertex, 1.0);
}


