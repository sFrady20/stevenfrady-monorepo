uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;

#define PATTERN_TIME_SCALE 0.8
#define LED_SIZE 2.

int octaves = 10;

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float perlin(in vec2 p){ //or maybe not perlin idunno
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);

	float res = mix(
		mix(random(ip),random(ip+vec2(1.0,0.0)),u.x),
		mix(random(ip+vec2(0.0,1.0)),random(ip+vec2(1.0,1.0)),u.x),u.y);

	return res*res;
}

float fbm(in vec2 st) {
  float value = 0.;
  float amp = .6;
  float freq = 0.;

  for(int i = 0; i < octaves; i++) {
    value += amp * perlin(st);
    st *= 2.1;
    amp *= .35;
  }
  return value;
}

float pattern(in vec2 p) {
  float f = 0.;
  vec2 q = vec2(
    fbm(p + time * PATTERN_TIME_SCALE * .2 + vec2(0.)),
    fbm(p + time * PATTERN_TIME_SCALE * .3 + vec2(2.4, 4.8))
  );
  vec2 r = vec2(
    fbm(q + time * PATTERN_TIME_SCALE * .3 + 4. * q + vec2(3., 9.)),
    fbm(q + time * PATTERN_TIME_SCALE * .2 + 8. * q + vec2(2.4, 8.4))
  );
  f = fbm(p + r * 2. + time * .09);
  return f;
}


void show(inout vec4 col, inout vec2 uv) {
  float r = pattern(uv / 94. + 3825.235);
  float g = pattern(uv / 87. - 23.253);
  float b = pattern(uv / 93. + 2353.2);
  col = vec4(vec3(r,g,b), 1.);
}

void dither(inout vec4 col, inout vec2 uv) {
  vec2 pixel = mod(floor(uv/LED_SIZE), 8.0)/8.0;
  float factor = 1.3;
  vec3 oCol = floor(col.rgb * factor + vec3(0.5)) * factor;
  float rnd = 1.;
  oCol.r = step(rnd, oCol.r);
  oCol.g = step(rnd, oCol.g);
  oCol.b = step(rnd, oCol.b);
  col = vec4(oCol, 1.);
}

void main() {
  vec2 aspect = vec2(1., resolution.y/resolution.x);

  vec4 col = vec4(0.,0.,0.,1.);
  vec2 uv = gl_FragCoord.xy;

  show(col, uv);
  dither(col, uv);

  uv /= resolution.xy; //scale
  uv -= vec2(0.5); //translate
  uv *= aspect; //apply aspect

  //show(col, uv);

  gl_FragColor = col;
}
