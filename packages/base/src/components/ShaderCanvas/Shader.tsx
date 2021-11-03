import React, { RefAttributes } from "react";
import { Canvas, ShaderMaterialProps, useFrame } from "@react-three/fiber";
import { ScreenQuad } from "./ScreenQuad";
import defaultFragmentShader from "./default.frag.glsl";
import defaultVertexShader from "./default.vert.glsl";
import _ from "lodash";
import { useCursorRef, useScrollRef } from "..";

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

  const scrollRef = useScrollRef();
  const cursorRef = useCursorRef();

  return (
    <Canvas gl={{ alpha: true }} {...innerProps}>
      <ShaderScene
        uniforms={_.merge(uniforms, {
          cursor: {
            value: cursorRef,
          },
          scroll: {
            value: scrollRef,
          },
        })}
        frag={frag}
        vert={vert}
      />
    </Canvas>
  );
};

export default Shader;
