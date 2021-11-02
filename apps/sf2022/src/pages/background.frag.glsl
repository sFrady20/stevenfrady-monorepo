uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(132.9898, 34.1414))) * (43758.5453 + floor(transition + 0.5) + seed * 0.74235));
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
mat2 m(float a){float c=cos(a), s=sin(a);return mat2(c,-s,s,c);}
float map(vec3 p){
    p.xz*= m(time*0.4);p.xy*= m(time*0.3);
    vec3 q = p*1.+time;
    return length(p+vec3(sin(time*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.5 - 1.;
}
vec3 ether(){	
	vec2 p = gl_FragCoord.xy/resolution.y - vec2(.9,.5) - cursor.xy/resolution.y*vec2(0.1,-0.1) - vec2(0., scroll.y/resolution.y);
	//p.x = mod(p.x + .5, 1.5) - .75;
	//p.y = mod(p.y + .5, 1.5) - .75;
	vec3 cl = vec3(0.);
	float d = 2.5;
	for(int i=0; i<=5; i++)	{
		vec3 p = vec3(0,0,5.) + normalize(vec3(p, -1.))*d;
    float rz = map(p);
		float f = clamp((rz - map(p+.1))*0.5, -.1, 1. );
    vec3 l = vec3(0.1,0.4,.2) + vec3(5., 2.5, 3.)*f;
    cl = cl*l + smoothstep(2.5, .0, rz)*.7*l;
		d += min(rz, 1.);
	}
  return vec3(cl);
}

void main() {
  vec2 p = gl_FragCoord.xy;
  vec2 uv = gl_FragCoord.xy / resolution.xy;
	vec2 xuv = gl_FragCoord.xy / max(resolution.x,resolution.y);

	vec3 col = vec3(0.);
	float a = 0.;

	//bg
  float m = noise(xuv*3.);
	col = mix(col, vec3((xuv.x)*.4,xuv.x,xuv.y), m);
	a += m;

	//ether
	vec3 e = ether();
	col = mix(col, e, length(e));
	a += length(e);

  gl_FragColor = vec4(col, a);
}