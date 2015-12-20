precision mediump float;

varying vec3 fragVertex;
varying vec2 fragTextureCoord;

uniform sampler2D uSampler;

void main()
{
    vec4 surfaceColor = texture2D(uSampler, fragTextureCoord);

    gl_FragColor = surfaceColor;
}
