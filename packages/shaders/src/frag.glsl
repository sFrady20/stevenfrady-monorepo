uniform float time;
uniform float velocity;
uniform vec2 resolution;
uniform float presence;
void main() {
  vec2 p = gl_FragCoord.xy;
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  float uvx = uv.x - presence + uv.y * velocity;
  float n = step(0.,uvx) * step(uvx,1.0);

  vec3 col = mix(vec3(0.), vec3(uv.x,uv.y,0.), n);
  gl_FragColor = vec4(col,n);
}