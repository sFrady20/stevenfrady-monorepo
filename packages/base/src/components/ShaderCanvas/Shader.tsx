import React, { RefAttributes, useEffect, useRef } from "react";
import { Canvas, ShaderMaterialProps, useFrame } from "@react-three/fiber";
import { ScreenQuad } from "./ScreenQuad";
import defaultFragmentShader from "./frag.glsl";
import defaultVertexShader from "./vert.glsl";
import _ from "lodash";
import { Vector2 } from "three";

const ShaderScene = (props: {
  uniforms?: { [s: string]: { value: any } };
  frag?: string;
  vert?: string;
}) => {
  const { uniforms, frag, vert } = props;
  const mouseVec = useRef(new Vector2()).current;

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      mouseVec.set(e.clientX, e.clientY);
    };
    document.addEventListener("mousemove", listener);
    return () => {
      document.removeEventListener("mousemove", listener);
    };
  }, []);

  const ref = React.useRef<ShaderMaterialProps>(null);
  useFrame((state) => {
    if (ref.current?.uniforms) {
      _.merge(ref.current.uniforms, {
        time: {
          value: state.clock.elapsedTime,
        },
        mouse: {
          value: mouseVec,
        },
        resolution: {
          value: [
            state.viewport.width * state.viewport.factor,
            state.viewport.height * state.viewport.factor,
          ],
        },
      });
    }
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={ref}
        attach="material"
        uniforms={uniforms}
        fragmentShader={frag || defaultFragmentShader}
        vertexShader={vert || defaultVertexShader}
      />
    </ScreenQuad>
  );
};

const Shader = (
  props: {
    frag?: string;
    vert?: string;
    uniforms?: { [s: string]: { value: any } };
  } & RefAttributes<HTMLCanvasElement>
) => {
  const { uniforms, frag, vert, ...innerProps } = props;

  return (
    <Canvas gl={{ alpha: true }} {...innerProps}>
      <ShaderScene uniforms={uniforms} frag={frag} vert={vert} />
    </Canvas>
  );
};

export default Shader;
