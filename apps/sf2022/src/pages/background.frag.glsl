uniform float time;
uniform float velocity;
uniform vec2 resolution;
uniform float presence;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(132.9898, 34.1414))) * (43758.5453 + time * 0.1));
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
  vec2 p = gl_FragCoord.xy;
  vec2 uv = gl_FragCoord.xy / resolution.xy;
	vec2 xuv = gl_FragCoord.xy / max(resolution.x,resolution.y);

  //uv.x += time * 0.1;

  float m = noise(xuv*3.);// - abs(presence);
  vec4 col = vec4(mix(vec3(0.), vec3((xuv.x)*.4,xuv.x,xuv.y), m), m);

	//col = vec4(noise(xuv * 100.),0.,0.,1.);

  gl_FragColor = col;
}