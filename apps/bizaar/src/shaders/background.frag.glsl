uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;

vec4 bgCol = vec4(244./255., 244./255., 244./255., 1.);
vec4 fadeCol = vec4(244./255., 244./255., 244./255., 1.);
vec4 backfaceCol1 = vec4(0.75,0.75,0.85,1.);
vec4 backfaceCol2 = vec4(0.8,0.8,0.9,1.);
vec4 backfaceShadow = vec4(0., 0., 0., 1.);
vec4 frontfaceCol1 = vec4(0.7,1.,1.,1.);
vec4 frontfaceCol2 = vec4(0.7,1.,1.,1.);

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

void curves (inout vec4 col, inout vec2 uv) {
    float ang = max(pow(pow(uv.x,0.5) * 0.1,0.8) + pow(pow(uv.x,2.), 2.), 0.01);

    float b = step (uv.y, ang);
    b *= step( 0., uv.x ); // carve out negative x
    col = mix (col, mix ( backfaceCol1, backfaceCol2, ang * 5. ), b * (1. - ang) * 0.5);

    float f = step (uv.y, -ang);
    f *= step( 0., uv.x ); // carve out negative x
    col = mix (col, mix ( frontfaceCol1, frontfaceCol2, ang * 5. ), f * (1. - ang) * 0.5);
}

void fade(inout vec4 col, inout vec2 uv) {
    float h = (noise(vec3(uv*8., time * 0.5))+0.5) * .04;
    h = 1. - smoothstep(-0.25, 0.2,uv.y+h);
    col = mix (col, fadeCol, h);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec4 col = bgCol;

    vec2 aspect = vec2(1., resolution.y/resolution.x);

    uv -= 0.5;
    uv *= aspect;

    curves(col, uv);
    fade(col, uv);

    gl_FragColor = col;
}