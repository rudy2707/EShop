precision mediump float;

varying vec2 fragTextureCoord;

uniform sampler2D uSampler;

void main()
{
    vec4 surfaceColor = texture2D(uSampler, fragTextureCoord);

    gl_FragColor = vec4(surfaceColor.rgb, 0.5);
}
