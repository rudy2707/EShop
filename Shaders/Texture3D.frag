precision mediump float;
#define MAXLIGHTSQUANTITY 32

struct LightSource
{
	float intensity;
	vec3 color;
	vec3 position;
};

varying vec3 fragVertex;
varying vec2 fragTextureCoord;
varying vec3 fragNormal;

//varying vec4 fragColor; //Test

varying mat4 fragModel;
uniform sampler2D uSampler;
uniform LightSource lightSources[MAXLIGHTSQUANTITY];
//uniform LightSource lightSource;
uniform int lightSourcesQuantity;

void main()
{
	vec4 surfaceColor = texture2D(uSampler, fragTextureCoord);
	vec3 surfacePosition = vec3(fragModel * vec4(fragVertex, 1.0));
	vec3 linearColor;

	vec3 normal = normalize(mat3(fragModel) * fragNormal);
	for(int i = 0; i < MAXLIGHTSQUANTITY; i++)
	{
		if(i < lightSourcesQuantity)
		{
			vec3 surfaceToLight = normalize(lightSources[i].position - surfacePosition);

			vec3 ambient = vec3(0.2, 0.2, 0.2) * surfaceColor.rgb * lightSources[i].color;

			float diffuseCoefficient = max(0.0, dot(normal, surfaceToLight));
			vec3 diffuseColor = diffuseCoefficient * surfaceColor.rgb * lightSources[i].color * lightSources[i].intensity;
	
			float distanceToLight = length(lightSources[i].position - surfacePosition);
			float attenuation = 1.0 / (1.0 + 1.0 * pow(distanceToLight, 2.0));

			linearColor += ambient + attenuation * diffuseColor;
		}
		else
			break;
	}

	vec3 gamma = vec3(1.0 / 2.2);

	//*
	gl_FragColor = vec4(pow(linearColor, gamma), surfaceColor.a);
	/*/
	gl_FragColor = vec4(linearColor, surfaceColor.a);
	//*/
}
