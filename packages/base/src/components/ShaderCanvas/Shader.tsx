import React, { RefAttributes } from "react";
import { Canvas, ShaderMaterialProps, useFrame } from "@react-three/fiber";
import { ScreenQuad } from "./ScreenQuad";
import defaultFragmentShader from "./frag.glsl";
import defaultVertexShader from "./vert.glsl";
import _ from "lodash";

const ShaderScene = (props: {
  uniforms?: { [s: string]: { value: any } };
  frag?: string;
  vert?: string;
}) => {
  const { uniforms, frag, vert } = props;

  const ref = React.useRef<ShaderMaterialProps>(null);
  useFrame((state) => {
    if (ref.current?.uniforms) {
      _.merge(ref.current.uniforms, {
        time: {
          value: state.clock.elapsedTime,
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
