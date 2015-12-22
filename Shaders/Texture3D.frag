precision mediump float;

varying vec3 fragVertex;
varying vec2 fragTextureCoord;
varying vec3 fragNormal;

//varying vec4 fragColor; //Test

varying mat4 fragModel;

uniform sampler2D uSampler;

void main()
{
	vec3 lightPosition = vec3(2, 5, 5);
	vec3 lightColor = vec3(1.0, 1.0, 1.0);
	float lightStrength = 10.0;

	vec4 surfaceColor = texture2D(uSampler, fragTextureCoord);    //Test
	//vec4 surfaceColor = texture2D(uSampler, fragTextureCoord);

	vec3 normal = normalize(mat3(fragModel) * fragNormal);
	vec3 surfacePosition = vec3(fragModel * vec4(fragVertex, 1.0));
	vec3 surfaceToLight = normalize(lightPosition - surfacePosition);

	vec3 ambient = vec3(0.2, 0.2, 0.2) * surfaceColor.rgb * lightColor;

	float diffuseCoefficient = max(0.0, dot(normal, surfaceToLight));
	vec3 diffuseColor = diffuseCoefficient * surfaceColor.rgb * lightColor * lightStrength;
	
	float distanceToLight = length(lightPosition - surfacePosition);
	float attenuation = 1.0 / (1.0 + 1.0 * pow(distanceToLight, 2.0));

	vec3 linearColor = ambient + attenuation * diffuseColor;

	vec3 gamma = vec3(1.0 / 2.2);

	/*
	gl_FragColor = vec4(pow(linearColor, gamma), surfaceColor.a);
	/*/
	gl_FragColor = vec4(linearColor, surfaceColor.a);
	//*/

	//gl_FragColor = vec4(surfaceColor);
}
