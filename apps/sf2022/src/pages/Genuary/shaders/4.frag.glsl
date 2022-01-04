uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;

//3D gradient noise by Íñigo Quílez
vec3 hash(vec3 p){
	p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
			  dot(p,vec3(269.5,183.3,246.1)),
			  dot(p,vec3(113.5,271.9,124.6)));

	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise(in vec3 p){
  vec3 i = floor( p );
  vec3 f = fract( p );
	
	vec3 u = f*f*(3.0-2.0*f);

  return mix( mix( mix( dot( hash( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ), 
                        dot( hash( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                    mix( dot( hash( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ), 
                        dot( hash( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
              mix( mix( dot( hash( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ), 
                        dot( hash( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                    mix( dot( hash( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ), 
                        dot( hash( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
}

float dist2Line(vec2 a, vec2 b, vec2 p) { 
  p -= a, b -= a;
	float h = clamp(dot(p, b) / dot(b, b), 0., 1.); 
	return length( p - b * h );                       
}

vec2 rotate2D(vec2 _st, float _angle){
  //_st -= 0.5;
  _st =  mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle)) * _st;
  //_st += 0.5;
  return _st;
}


vec2 H(vec2 p) {                   // closestHexCenters(p)
	vec2  f = fract(p);  p -= f;
	float v = fract((p.x + p.y)/3.);
  return  v<.6 ?   v<.3 ?  p  :  ++p  :  p + step(f.yx,f) ; 
}


#define TRUCHET_SCALE 5.
#define TRUCHET_TIME_SCALE 0.

void truchet(inout vec4 col, inout vec2 uv, in float rnd) {
	vec2  h; 
  float Z = TRUCHET_SCALE / resolution.x;
  vec2  p = uv;
  
  p = (p-.5)*Z;  // demo referential

  // NB: M^-1.H(M.p) converts back and forth to hex grid, which is mostly a tilted square grid
	h = H( p+ vec2(.58,.15)*p.y ); // closestHex( mat2(1,0, .58, 1.15)*p ); // 1/sqrt(3), 2/sqrt(3)
	p -=   h- vec2(.5, .13)*h.y;   // p -= mat2(1,0,-.5, .87) * h;          // -1/2, sqrt(3)/2
    
	float s = sign( cos(1e5*cos(h.x+rnd+sin(time*TRUCHET_TIME_SCALE)+h.y)) ); // rnd (tile) = -1 or 1
        
	float l = min(
              min(
                length(p - s*vec2(-1, 0)),
                length(p - s*vec2(.5, .87))
              ),
				      length(p - s*vec2(.5,-.87))
            );

  float bd = 1. - abs(l-.5) * 2.;
  float rp = pow(noise(vec3(uv/resolution.x*3.,time*0.5 + rnd)) + .2, 2.) * 6. + 0.5;
  col = mix(col, vec4(0.9,0.4,0.2, 1.), smoothstep(0.1 + rp, 0.3 + rp, bd) * 0.2);
  col = mix(col, vec4(0.8,0.5,0.2, 1.), smoothstep(0.2 + rp, 0.4 + rp, bd) * 0.2);
  col = mix(col, vec4(0.7,0.6,0.3, 1.), smoothstep(0.3 + rp, 0.5 + rp, bd) * 0.2);
  col = mix(col, vec4(0.7, 0.6,0.3, 1.), smoothstep(0.4 + rp, 0.6 + rp, bd) * 0.2);
  col = mix(col, vec4(0.7,0.7,0.4, 1.), smoothstep(0.5 + rp, 0.7 + rp, bd) * 0.2);

}


void main() {
  vec2 aspect = vec2(1., resolution.y/resolution.x);

  vec2 uv = gl_FragCoord.xy;
  uv.x += noise(vec3(uv, time)) * 100.;

  vec4 bgCol = vec4(vec3((noise(vec3(uv*0.003, time*0.53 + 324.2424))+0.5)*0.3,(noise(vec3(uv*0.003, time*0.53 + 324.2424))+0.5)*0.14,.0)*0.3,1.);
  vec4 col = bgCol;
  
  truchet(col, uv, 325.1414);
  //col = mix(col, vec4(vec3(0.5,0.2,0.4), 1.), step(1. - f, .9));

  //float f2 = truchet(col, uv, 433.249);
  //col = mix(col, bgCol, step(f2, 0.5));

  //truchet(col, uv, 352.2624);

  gl_FragColor = col;
}
