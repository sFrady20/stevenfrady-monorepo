uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 cursorSpring;
uniform vec2 scroll;
uniform float transition;

const vec3 bubbleBaseCol = vec3(0.1,0.4,.2);
const vec3 bubbleHighlightCol = vec3(5., 2.5, 3.);

vec2 aspect;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(132.9898, 34.1414))) * (43758.5453 + seed * 0.74235));
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

//bubbles
mat2 m(float a){
	float c=cos(a), s=sin(a);
	return mat2(c,-s,s,c);
}

float etherMap(vec3 p, float t){
	p.xz*= m(t*0.4);p.xy*= m(t*0.3);
	vec3 q = p*1.+t;
	return length(p+vec3(sin(t*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.5 - 1.;
}

vec3 etherBubble (vec2 p, float t, float s) {
	vec3 cl = vec3(0.);
	float d = 2.5;

	float ts = 2. + (1.-s) * 20.;

	for(int i=0; i<=5; i++)	{
		vec3 p = vec3(0,0,5.) + normalize(vec3(p * ts, -1.))*d;
    float rz = etherMap(p, t);
		float f = clamp((rz - etherMap(p+.1, t))*0.5, -.1, 1. );
    vec3 l = bubbleBaseCol + bubbleHighlightCol*f;
    cl = cl*l + smoothstep(2.5, .0, rz)*.7*l;
		d += min(rz, 1.);
	}
  return vec3(cl);
}

vec3 etherLayer(vec2 p) {
	//scrolling
	p -= vec2(0., scroll.y);
	//mouse movement
	p -= cursorSpring.xy*vec2(0.1,-0.1);

	//uv
	p /= resolution.xy;

	//transform
	p -= vec2(0.5, 0.5);
	//scale
	p *= aspect;

	vec3 rCol = vec3(0.);

	//rCol += etherBubble(p, time, 1.);

	// float rep = p.y;
	// for(int i=0; i<10; i++)	{
	// 	float rpx = (noise(vec2(float(i) * 62.415, seed)) * 1. - 0.25) * aspect.x;
	// 	float rpy = (noise(vec2(float(i) * 53.52, seed)) * 1. - 0.25) * aspect.y;
	// 	float rpt = time + noise(vec2(float(i) * 125.35, seed)) * 100.;
	// 	float rps = noise(vec2(seed, float(i) * 125.35)) * 10.;

	// 	rCol += etherBubble(p + vec2(rpx, rpy), rpt, 0.01);
	// }

	return rCol;
}

float footer(vec2 p) {
	float amt = 1. - smoothstep(0., 50., p.y);
	return amt;
}

void main() {
	aspect = vec2(
		min(resolution.x/resolution.y, 1.),
		min(resolution.y/resolution.x, 1.)
	);

  vec2 p = gl_FragCoord.xy;
  vec2 uv = gl_FragCoord.xy / resolution.xy * aspect;

	vec3 col = vec3(0.);
	float a = 0.;

	//bg
  float m = noise(uv*3. - vec2(scroll.y * 0.3, scroll.y * 0.3) / resolution.xy * aspect);
	col = mix(col, vec3((uv.x)*.4,uv.x,uv.y), m);
	a += m;

	//ether
	vec3 e = etherLayer(p);
	col = mix(col, e, length(e));
	a += length(e);

  gl_FragColor = vec4(col, a);
}