uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;
uniform float leftPanePresence;
uniform float rightPanePresence;

#define OCTAVES 6
#define BASE_COL vec4(1., 0.97, 0.94, 1.)
#define PATTERN_TIME_SCALE 0.1
#define STRIPE_COL vec4(0.9, 0.87, 0.84,1.)
#define MARBLE_SCALE 0.0025

#define PANE_COLOR vec4(1.,1.,1.,1.)
#define SPLASH_COLOR_1 vec4(0.9412, 0.9412, 0.9412, 1.0)
#define SPLASH_COLOR_2 vec4(0.6549, 0.5373, 0.8078, 1.0)
#define LINKS_COLOR_1 vec4(0.7098, 0.6706, 0.8392, 1.0)
#define LINKS_COLOR_2 vec4(0.4, 0.698, 0.9412, 1.0)
#define LODGING_COLOR_1 vec4(0.7765, 0.7647, 0.8549, 1.0)
#define LODGING_COLOR_2 vec4(0.7686, 0.8431, 1.0, 1.0)
#define RSVP_COLOR_1 vec4(0.5294, 0.4784, 0.6784, 1.0)
#define RSVP_COLOR_2 vec4(0.8275, 0.7961, 0.902, 1.0)
#define COLOR_5_1 vec4(0.3333, 0.2745, 0.4902, 1.0)
#define COLOR_5_2 vec4(1.0, 1.0, 1.0, 1.0)
#define COLOR_6_1 vec4(0.6549, 0.5373, 0.702, 1.0)
#define COLOR_6_2 vec4(0.8941, 0.8941, 0.8941, 1.0)

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

void marble (inout vec4 col, inout vec2 uv) {
    vec2 scaledMarblePos = uv * MARBLE_SCALE;
    float marbleVal = pattern(scaledMarblePos);
    vec2 scrollUv = scroll.xy / resolution.xy;

    col = mix (SPLASH_COLOR_1, SPLASH_COLOR_2, pow(marbleVal, 5.));

    vec4 linksCol = mix (LINKS_COLOR_1, LINKS_COLOR_2, pow(marbleVal, 5.));
    col = mix (col, linksCol, smoothstep(0.5,1.,scrollUv.y + marbleVal));

    vec4 lodgingCol = mix (LODGING_COLOR_1, LODGING_COLOR_2, pow(marbleVal, 5.));
    col = mix (col, lodgingCol, smoothstep(1.0,2.0,scrollUv.y + marbleVal));

    vec4 rsvpCol = mix (RSVP_COLOR_1, RSVP_COLOR_2, pow(marbleVal, 5.));
    col = mix (col, rsvpCol, smoothstep(2.0,3.0,scrollUv.y + marbleVal));

    vec4 col5 = mix (COLOR_5_1, COLOR_5_2, pow(marbleVal, 5.));
    col = mix (col, col5, smoothstep(3.0,4.0,scrollUv.y + marbleVal));

    vec4 col6 = mix (COLOR_6_1, COLOR_6_2, pow(marbleVal, 5.));
    col = mix (col, col6, smoothstep(4.0,6.0,scrollUv.y + marbleVal));

}

void leftPane (inout vec4 col, inout vec2 uv) {
    //pos *= 1. + pow(scroll.y / resolution.y, 2.);
    col = mix (col, PANE_COLOR, step(uv.y, leftPanePresence));
}

void magnifyingGlass (inout vec4 col, inout vec2 uv) {
  float dx = (cursor.x - gl_FragCoord.x) / resolution.x;
  float dy = (resolution.y - cursor.y - gl_FragCoord.y) / resolution.x;
  
  float effect = pow(clamp( 1. - sqrt(pow(dx, 2.) + pow(dy, 2.)) * 10., .0, 1.), 0.1);

  uv.x += dx * effect * 100.;
  uv.y += dy * effect * 100.;
  
  //col = vec4(effect, effect, effect, 1.);
}

void main() {

    vec4 col = vec4(0.,0.,0.,1.);
    vec2 uv = gl_FragCoord.xy - scroll.xy;

    //magnifyingGlass(col,pos);
    marble(col, uv);

    uv /= resolution;
    //leftPane(col, uv);
    
    gl_FragColor = col;
}