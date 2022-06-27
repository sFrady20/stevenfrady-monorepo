import { Canvas, useLoader } from "@react-three/fiber";
import React, {
  Children,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { animated, SpringProps, SpringValue, useSpring } from "react-spring";
import { animated as animated3d } from "@react-spring/three";
import { useContextBridge } from "@react-three/drei";
import { TextureLoader } from "three";

export type SceneState = {
  presence: SpringValue;
  scroll: SpringValue;
  window: {
    height: SpringValue;
    width: SpringValue;
  };
  content: {
    height: SpringValue;
    width: SpringValue;
  };
};

type SceneContextType = {
  htmlEl: HTMLDivElement | null;
  state: SceneState;
};
const defaultSceneContext: SceneContextType = {
  htmlEl: null,
  state: {} as any,
};
const SceneContext = createContext(defaultSceneContext);

const Three = (props: { children?: ReactNode; fixed?: boolean }) => {
  const { children } = props;
  return <>{children}</>;
};

const Html = (props: { children?: ReactNode }) => {
  const { children } = props;
  return <>{children}</>;
};

function htmlToImg(html: string) {
  const width = 100,
    height = 100;

  var doc = document.implementation.createHTMLDocument("");
  doc.write(html);
  // You must manually set the xmlns if you intend to immediately serialize
  // the HTML document to a string as opposed to appending it to a
  // <foreignObject> in the DOM
  doc.documentElement.setAttribute(
    "xmlns",
    doc.documentElement.namespaceURI || ""
  );
  // Get well-formed markup
  var xml = new XMLSerializer().serializeToString(doc.body);
  var img = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%">${xml}</foreignObject></svg>`;
  return img;
}
const exampleImg = htmlToImg("<h1>Test</h1>");

const SceneContextBridge = (props: { children?: ReactNode }) => {
  const { children } = props;
  const ContextBridge = useContextBridge(SceneContext);
  return (
    <Canvas className="absolute top-0 z-0" gl={{ alpha: true }}>
      <ContextBridge>{children}</ContextBridge>
    </Canvas>
  );
};

const Scene = (props: {
  children?: ReactNode;
  presence: SpringValue<number>;
}) => {
  const { children, presence } = props;

  const threeChildren = Children.toArray(children).filter(
    (c) => (c as any)?.type?.name === "Three" && !(c as any)?.props?.fixed
  );
  const fixedThreeChildren = Children.toArray(children).filter(
    (c) => (c as any)?.type?.name === "Three" && !!(c as any)?.props?.fixed
  );
  const htmlChildren = Children.toArray(children).filter(
    (c) => (c as any)?.type?.name === "Html"
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const scaffoldRef = useRef<HTMLDivElement>(null);
  const htmlElRef = useRef<HTMLDivElement>(null);

  const state = useRef<SceneState>({
    presence,
    scroll: new SpringValue(0),
    window: {
      width: new SpringValue(0),
      height: new SpringValue(0),
    },
    content: {
      width: new SpringValue(0),
      height: new SpringValue(0),
    },
  }).current;

  useEffect(() => {
    containerRef.current!.addEventListener("scroll", (e) => {
      state.scroll.start(e.target.scrollTop as number);
    });
  });

  const containerObserver = useRef(
    new ResizeObserver((entries) => {
      state.window.height.set(entries[0].contentRect.height);
      state.window.width.set(entries[0].contentRect.width);
    })
  ).current;

  useEffect(() => {
    if (!containerRef.current) return;
    containerObserver.observe(containerRef.current);
    return () => {
      if (!containerRef.current) return;
      containerObserver.unobserve(containerRef.current!);
    };
  }, [state, containerObserver]);

  const contentObserver = useRef(
    new ResizeObserver((entries) => {
      if (!scaffoldRef.current) return;
      const h = entries[0].contentRect.height;
      scaffoldRef.current!.style.height = `${
        h - containerRef.current!.clientHeight
      }px`;
      state.content.height.set(h);
      state.content.width.set(entries[0].contentRect.width);
    })
  ).current;

  useEffect(() => {
    if (!htmlElRef.current) return;
    contentObserver.observe(htmlElRef.current);
    return () => {
      if (!htmlElRef.current) return;
      contentObserver.unobserve(htmlElRef.current!);
    };
  }, [state, contentObserver]);

  const tex = useLoader(TextureLoader, exampleImg);

  return (
    <SceneContext.Provider
      value={{
        htmlEl: htmlElRef.current,
        state,
      }}
    >
      <div
        ref={containerRef}
        className="absolute h-screen overflow-y-auto overflow-x-hidden"
      >
        <div className="sticky z-1 top-0 w-screen h-screen overflow-hidden">
          <animated.div
            className="absolute top-0 z-1 w-full"
            ref={htmlElRef}
            style={{
              translateY: state.scroll.to((x) => {
                return `-${x}px`;
              }),
            }}
          >
            {htmlChildren}
          </animated.div>
          <img src={exampleImg} />
          <SceneContextBridge>
            <ambientLight intensity={0.5} />
            <mesh>
              <planeGeometry attach="geometry" args={[1, 1]} />
              <meshBasicMaterial name="material" map={tex} toneMapped={false} />
            </mesh>
            {/* {fixedThreeChildren} */}
            <animated3d.group
              position={state.scroll.to((x) => [0, x / 100, 0])}
            >
              {threeChildren}
            </animated3d.group>
          </SceneContextBridge>
        </div>
        <div className="relative z-0" ref={scaffoldRef} />
      </div>
    </SceneContext.Provider>
  );
};

export const useScene = () => {
  return useContext(SceneContext).state;
};

type Options = IntersectionObserverInit & {
  spring?: SpringProps<number>;
};
const defaultOptions: Options = {
  root: null,
  rootMargin: "0px 0px 0px 0px",
  threshold: [0, 1],
};
export function useSceneVisibility(options: Options = defaultOptions) {
  const { rootMargin, spring, threshold } = options;

  const s = useSpring({ intersection: 0 });

  const root = useContext(SceneContext).htmlEl;
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (node) {
      const observer = new IntersectionObserver(
        (x) => s.intersection.start(x[0].intersectionRatio, spring),
        options
      );
      observer.observe(node);
      return () => {
        observer.disconnect();
      };
    }
  }, [node, spring, root, rootMargin, threshold]);
  const ref = useCallback((node: HTMLElement | null) => {
    setNode(node);
  }, []);
  return [ref, s.intersection] as const;
}

Scene.Three = Three;
Scene.Html = Html;

export default Scene;
