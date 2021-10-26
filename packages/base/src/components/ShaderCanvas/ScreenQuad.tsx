// reference: https://medium.com/@luruke/simple-postprocessing-in-three-js-91936ecadfb7
// and @gsimone ;)
import React, { forwardRef, useMemo } from "react";
import { BufferAttribute, BufferGeometry, Mesh } from "three";

type Props = Omit<JSX.IntrinsicElements["mesh"], "args">;

export const ScreenQuad = forwardRef<Mesh, Props>(function ScreenQuad(
  { children, ...restProps },
  ref
) {
  const geometry = useMemo(() => {
    const geometry = new BufferGeometry();
    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    geometry.setAttribute("position", new BufferAttribute(vertices, 2));
    return geometry;
  }, []);

  return (
    <mesh ref={ref} geometry={geometry} frustumCulled={false} {...restProps}>
      {children}
    </mesh>
  );
});
