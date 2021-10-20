uniform float time;
uniform vec2 resolution;
uniform float transition;

void main() {
  vec2 p = gl_FragCoord.xy;
  vec2 uv = gl_FragCoord.xy / resolution.xy;

	vec3 col = vec3(0.);
	float a = 1.;

	float tp = (transition + uv.x) * 3./2.;
	a = 1. - (smoothstep(-1., 0., tp) * (1. - smoothstep(1., 2., tp)));

  gl_FragColor = vec4(col, a);
}