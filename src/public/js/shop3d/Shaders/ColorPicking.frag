#ifdef GL_ES
precision mediump float;
#endif

uniform float shelfId;
uniform float spotId;


void main()
{
    float shelfIdColor = shelfId / 255.0;
    float spotIdColor = spotId / 255.0;

    vec3 color = vec3(shelfIdColor, spotIdColor, 0);

    gl_FragColor = vec4(color, 1.0);

}


