uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;

const	float nMag = 0.05;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(132.9898, 34.1414))) * (43758.5453 * 0.1));
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);

	return res*res;
}

void grain(inout vec4 col, inout vec2 uv) {
	vec2 pos = uv * resolution;
	float n = noise(pos) * nMag;
	col = vec4(mix(col.rgb, vec3(1.), n), max(col.a, n));
}

void fade(inout vec4 col, inout vec2 uv) {
	float f = uv.x*0.33+pow(abs(transition), 0.8)*sign(transition);
	f = smoothstep(0.33,0.66, f) + (1.-smoothstep(-0.66,-0.33, f));
	col = vec4(mix(col.rgb, vec3(0.), f), col.a + f);
}


void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
	vec4 col = gl_FragColor;
	
	grain(col, uv);
	fade(col, uv);

  gl_FragColor = col;
}