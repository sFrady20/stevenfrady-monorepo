uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;
uniform float leftPanePresence;
uniform float rightPanePresence;

#define OCTAVES 6
#define BASE_COL vec4(1., 0.97, + 0.94, 1.)
#define PATTERN_TIME_SCALE 0.1
#define STRIPE_COL vec4(0.9, 0.87, 0.84,1.)
#define MARBLE_SCALE 0.0025

#define PANE_COLOR vec4(1.,1.,1.,1.)
#define SPLASH_COLOR_1 vec4(0.95,0.95,0.95,1.)
#define SPLASH_COLOR_2 vec4(0.6,0.6,0.6,1.)
#define LINKS_COLOR_1 vec4(1.,0.5,0.5,1.)
#define LINKS_COLOR_2 vec4(0.5,0.5,1.,1.)
#define RSVP_COLOR_1 vec4(.05,0.0,0.1,1.)
#define RSVP_COLOR_2 vec4(.2,.25,.4,1.)

//TODO: fireworks at bottom
//https://www.shadertoy.com/view/lscGRl

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float fbm(in vec2 st) {
  float value = 0.;
  float amp = .55;
  float freq = 0.;

  for(int i = 0; i < OCTAVES; i++) {
    value += amp * noise(st);
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

void marble (inout vec4 col,inout vec2 pos) {
    vec2 scaledMarblePos = pos * MARBLE_SCALE;
    float marbleVal = pattern(scaledMarblePos);
    vec2 scrollUv = scroll.xy / resolution.xy;

    col = mix (SPLASH_COLOR_1, SPLASH_COLOR_2, pow(marbleVal, 3.));

    vec4 linksCol = mix (LINKS_COLOR_1, LINKS_COLOR_2, pow(marbleVal, 1.));
    col = mix (col, linksCol, smoothstep(0.5,1.,scrollUv.y + marbleVal));

    vec4 rsvpCol = mix (RSVP_COLOR_1, RSVP_COLOR_2, pow(marbleVal, 2.));
    col = mix (col, rsvpCol, smoothstep(1.5,2.,scrollUv.y + marbleVal));
}

void leftPane (inout vec4 col, inout vec2 pos) {
    //pos *= 1. + pow(scroll.y / resolution.y, 2.);
    col = mix (col, PANE_COLOR, step((pos.x * leftPanePresence)/resolution.x, 0.5) * leftPanePresence);
}

void limit (inout vec4 col, inout vec2 pos) {
    col = mix(PANE_COLOR, col, step(0.1, pos.x / resolution.x));
    col = mix(PANE_COLOR, col, 1. - step(0.9, pos.x / resolution.x));
    col = mix(PANE_COLOR, col, step(0.1, (pos.y + scroll.y) / resolution.y));
    col = mix(PANE_COLOR, col, 1. - step(0.9, (pos.y + scroll.y) / resolution.y));
}

void main() {

    vec4 col = vec4(0.,0.,0.,1.);
    vec2 pos = gl_FragCoord.xy - scroll.xy;

    leftPane(col, pos);
    marble(col, pos);
    //limit(col, pos);
    
    gl_FragColor = col;
}