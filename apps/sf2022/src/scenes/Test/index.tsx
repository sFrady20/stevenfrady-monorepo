import { ScreenQuad } from "@react-three/drei";
import { useRef } from "react";
import vert from "~/shaders/default.vert.glsl";
import frag from "~/shaders/background.frag.glsl";
import Scene, { useScene } from "~/components/Scene";
import useAnimationFrame from "~/hooks/useAnimationFrame";
import { SpringValue } from "react-spring";
import { Link } from "react-router-dom";

const ShaderBg = () => {
  const scene = useScene();

  const uniforms = useRef({
    resolution: {
      value: [0, 0],
    },
    scroll: { value: [0, 0] },
    time: { value: 0 },
    presence: { value: 0 },
  }).current;

  useAnimationFrame((time) => {
    if (!scene) return;
    uniforms.resolution.value = [
      scene.window.width.get(),
      scene.window.height.get(),
    ];
    uniforms.scroll.value = [0, scene.scroll.get()];
    uniforms.time.value = time;
    uniforms.presence.value = scene.presence.get();
  });

  return (
    <ScreenQuad position={[0, 0, 1000]}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
      />
    </ScreenQuad>
  );
};

const TestScene = (props: { presence: SpringValue<number> }) => {
  const { presence } = props;

  return (
    <Scene presence={presence}>
      <Scene.Three fixed>
        <ShaderBg />
      </Scene.Three>

      <Scene.Html>
        <Link to="/">Back</Link>
      </Scene.Html>
    </Scene>
  );
};

export default TestScene;
