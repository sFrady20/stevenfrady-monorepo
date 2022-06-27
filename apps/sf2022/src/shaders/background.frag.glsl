uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float presence;

void main() {
	float a = 1.;
  gl_FragColor = vec4(vec3(0.5, 0.5 + sin((-scroll.y + gl_FragCoord.y)/100.)* 0.1, 1.0), step(1., presence));
}