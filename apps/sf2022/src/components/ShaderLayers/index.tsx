import {
  ScrollOutlet,
  ShaderCanvas,
  useCursorSpringRef,
  useUniforms,
} from "base";
import { ReactNode } from "react";
import foregroundFrag from "~/shaders/foreground.frag.glsl";
import backgroundFrag from "~/shaders/background.frag.glsl";
import { merge } from "lodash";

export const ShaderLayers = (props: {
  children: ReactNode;
  uniforms?: { [s: string]: { value: any } };
}) => {
  const { children, uniforms: propUniforms } = props;
  const cursorSpringRef = useCursorSpringRef({ stiffness: 200, damping: 50 });

  const uniforms = useUniforms(
    {
      cursorSpring: { value: cursorSpringRef },
    },
    [cursorSpringRef]
  );

  return (
    <>
      <ScrollOutlet>
        <div className="fixed left-0 top-0 w-full h-full pointer-events-none z-0">
          <ShaderCanvas
            uniforms={merge(uniforms, propUniforms)}
            frag={backgroundFrag}
          />
        </div>
        <div className="fixed left-0 top-0 w-full h-full pointer-events-none z-50">
          <ShaderCanvas
            uniforms={merge(uniforms, propUniforms)}
            frag={foregroundFrag}
          />
        </div>
      </ScrollOutlet>
      {children}
    </>
  );
};

export default ShaderLayers;
