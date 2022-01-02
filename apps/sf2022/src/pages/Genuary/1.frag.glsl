uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;

float border = 0.1;
float gridSize = 100.;

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void grid (inout vec4 col, inout vec2 uv) {
  vec2 aspect = vec2(1., resolution.y/resolution.x);
  uv = (fract(uv * gridSize) - vec2(0.5)) * aspect;
}

void sun(inout vec4 col, inout vec2 uv, in float rnd) {
  float dist = sqrt(pow(uv.x,2.) + pow(uv.y,2.));
  col = vec4(vec3(step(dist, 0.2) - step(dist, 0.1)),1.);
}

void main() {
  vec2 aspect = vec2(1., resolution.y/resolution.x);

  vec4 col = vec4(0.,0.,0.,1.);
  vec2 uv = gl_FragCoord.xy;

  uv /= resolution.xy;

  uv *= pow(sin(time * 0.5) * 0.5 + 0.5 , 5.) + 0.01;

  vec2 gridPos = floor(uv * gridSize);
  grid(col, uv);
  uv *= (vec2(sin(random(gridPos) + time * 2.2 + 32.252), cos(random(gridPos) + time * 1.3 + 6526.943)) - 1.) * 0.1 + 1.;
  sun(col, uv, random(gridPos) + sin(time * 0.8) * 0.05 - 0.8);

  gl_FragColor = col;
}
