import { useFrame, useThree } from "@react-three/fiber";
import { Scroll, ScreenQuad, useScroll } from "@react-three/drei";
import { useRef } from "react";
import vert from "~/shaders/default.vert.glsl";
import frag from "~/shaders/new.frag.glsl";
import CreateSection from "./create";
import ExploreSection from "./explore";
import ContactSection from "./contact";
import LandingSection from "./landing";

const HomeScene = () => {
  const size = useThree((x) => x.size);
  const scroll = useScroll();

  const uniforms = useRef({
    resolution: { value: [size.width, size.height] },
    scroll: { value: [0, 0] },
    time: { value: 0 },
  }).current;

  useFrame((frame) => {
    uniforms.resolution.value = [size.width, size.height];
    uniforms.scroll.value = [0, scroll.range(0, 1) * size.height * 3];
    uniforms.time.value = frame.clock.elapsedTime;
  });

  return (
    <>
      <ScreenQuad>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vert}
          fragmentShader={frag}
        />
      </ScreenQuad>
      <Scroll html>
        <LandingSection />
        <CreateSection />
        <ExploreSection />
        <ContactSection />
      </Scroll>
    </>
  );
};

export default HomeScene;
