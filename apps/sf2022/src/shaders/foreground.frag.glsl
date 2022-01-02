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


void main() {
  vec2 p = gl_FragCoord.xy - scroll * 1.2;
	p.y = resolution.y - p.y;

  vec2 uv = gl_FragCoord.xy / resolution.xy;

	vec3 col = vec3(0.);
	float a = 0.;
	
	//noise
	float n = noise(p + time) * nMag;
	col = mix(col, vec3(1.), n);
	a = max(a, n);

	//fade
	float f = uv.x*0.33+pow(abs(transition), 0.8)*sign(transition);
	f = smoothstep(0.33,0.66, f) + (1.-smoothstep(-0.66,-0.33, f));
	col = mix(col, vec3(0.), f);
	a += f;

  gl_FragColor = vec4(col, a);
}