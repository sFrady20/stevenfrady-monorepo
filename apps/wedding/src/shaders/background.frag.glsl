uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;

void main() {
    float wx = gl_FragCoord.x*0.01 + sin(gl_FragCoord.y*0.01);
    float p = sin(wx) * 0.02;
    gl_FragColor = vec4(1. + p, 0.97 + p, 0.94 + p, 1.);
}