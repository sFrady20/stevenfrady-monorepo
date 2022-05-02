import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import { useRef } from "react";
import vert from "~/shaders/default.vert.glsl";
import frag from "~/shaders/foreground.frag.glsl";
import BottomBar from "./bottomBar";
import { useSpring, animated, to } from "react-spring";
import { useTheme } from "~/components/Theme";

const Logo = () => {
  const [{ scale, x, y }, moveApi] = useSpring(() => ({
    scale: 0,
    x: 0,
    y: 0,
  }));

  return (
    <div
      className="float-left pointer-events-auto relative"
      style={{ cursor: "none" }}
    >
      <animated.div
        className="absolute w-140px h-140px bg-black rounded-full top-1/2 left-1/2 pointer-events-none"
        style={{
          transform: to(
            [scale, x, y],
            (scale, x, y) =>
              `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`
          ),
        }}
      />
      <div
        className="p-10 text-20px grid grid-cols-2 grid-rows-2 gap-10 relative text-gray-300 mix-blend-difference children:(pointer-events-none)"
        style={{ transform: "translate3d(0,0,0)" }}
        onMouseEnter={(e) =>
          moveApi.start({
            scale: 1,
            x: 0,
            y: 0,
          })
        }
        onMouseMove={(e) => {
          const { offsetX: x, offsetY: y } = e.nativeEvent;
          const { offsetWidth: width, offsetHeight: height } = e.target as any;
          moveApi.start({
            scale: 1,
            x: (x / width - 0.5) * 60,
            y: (y / height - 0.5) * 60,
          });
        }}
        onMouseLeave={(e) => {
          moveApi.start({
            scale: 0,
            x: 0,
            y: 0,
          });
        }}
      >
        <div>S</div>
        <div>F</div>
        <div>2</div>
        <div>2</div>
      </div>
    </div>
  );
};

const OverlayScene = () => {
  const size = useThree((x) => x.size);
  const theme = useTheme();

  const uniforms = useRef({
    resolution: { value: [size.width, size.height] },
    scroll: { value: [0, 0] },
    time: { value: 0 },
    backgroundColor: { value: [0, 0, 0, 0] },
  }).current;

  useFrame((frame) => {
    uniforms.resolution.value = [size.width, size.height];
    uniforms.time.value = frame.clock.elapsedTime;
    uniforms.backgroundColor.value = theme.backgroundColor;
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
      />
    </ScreenQuad>
  );
};

const Overlay = () => {
  return (
    <>
      <Canvas className="z-100 pointer-events-none">
        <OverlayScene />
      </Canvas>
      <div className="h-screen absolute inset-0 pointer-events-none z-101">
        <Logo />
        <div className="absolute bottom-0 pointer-events-auto">
          <BottomBar />
        </div>
      </div>
    </>
  );
};

export default Overlay;
