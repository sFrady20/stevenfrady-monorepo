import { DependencyList, ReactNode, useEffect, useMemo, useRef } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { merge } from "lodash";

type Uniforms = { [s: string]: { value: any } };
type UniformsContextType = {
  uniforms: Uniforms;
};

const defaultUniforms: Uniforms = {};
const defaultUniformsContext: UniformsContextType = {
  uniforms: defaultUniforms,
};

const UniformsContext = createContext(defaultUniformsContext);

const UniformsProvider = (props: {
  uniforms?: Uniforms;
  children?: ReactNode;
}) => {
  const { uniforms: propUniforms, children } = props;

  const uniforms = useRef<Uniforms>({}).current;

  const combinedUniforms = useMemo(
    () => merge(uniforms, propUniforms),
    [propUniforms]
  );

  return (
    <UniformsContext.Provider value={{ uniforms: combinedUniforms }}>
      {children}
    </UniformsContext.Provider>
  );
};

const useUniforms = (overrides?: Uniforms, deps?: DependencyList) => {
  const uniforms = useContextSelector(UniformsContext, (u) => u.uniforms);
  useEffect(() => {
    merge(uniforms, overrides);
  }, deps);
  return uniforms;
};

export type { UniformsContextType };
export { useUniforms, UniformsContext, UniformsProvider };
