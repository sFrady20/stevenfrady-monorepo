import {
  Switch,
  SwitchProps,
  Route,
  useLocation,
  RouteProps,
} from "react-router-dom";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  usePresence,
  Variant,
  Variants,
} from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { ShaderCanvas } from "base";
import foregroundFrag from "./foreground.frag.glsl?raw";
import backgroundFrag from "./background.frag.glsl?raw";

export const PAGE_VARIANTS = {
  initial: "pageInit",
  animate: "pageEnter",
  exit: "pageExit",
} as const;
const variantPresets = {
  opacity: {
    [PAGE_VARIANTS.initial]: { opacity: 0 },
    [PAGE_VARIANTS.animate]: { opacity: 1 },
    [PAGE_VARIANTS.exit]: { opacity: 0 },
  },
};
export const pageVariants = (
  variants:
    | keyof typeof variantPresets
    | {
        [s in keyof typeof PAGE_VARIANTS]?: Variant;
      } = {}
): Variants =>
  typeof variants === "string"
    ? variantPresets[variants]
    : {
        [PAGE_VARIANTS.initial]: variants["initial"] || {},
        [PAGE_VARIANTS.animate]: variants["animate"] || {},
        [PAGE_VARIANTS.exit]: variants["exit"] || {},
      };

const PageTransition = (props: {
  children?: ReactNode;
  onEnter?: () => void;
  onExit?: () => Promise<void>;
}) => {
  const { children, onEnter, onExit } = props;
  const [isPresent, exit] = usePresence();

  useEffect(() => {
    (async () => {
      if (isPresent) {
        onEnter?.();
      } else if (exit) {
        await onExit?.();
        exit();
      }
    })();
  }, [isPresent]);

  return <>{children}</>;
};

export const PageSwitch = (props: SwitchProps & { children: ReactNode }) => {
  const { children, ...innerProps } = props;
  const location = useLocation();

  const transitionPresence = useMotionValue(1);

  const uniforms = useRef({
    transition: { value: -1 },
    velocity: { value: 0 },
  }).current;

  return (
    <>
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-50">
        <ShaderCanvas uniforms={uniforms} frag={foregroundFrag} />
      </div>
      <div className="absolute left-0 top-0 w-full h-full z-20">
        <AnimatePresence exitBeforeEnter initial={false}>
          <PageTransition
            key={location.pathname}
            onEnter={() => {
              transitionPresence.updateAndNotify(-1);
              animate(transitionPresence, 0, {
                duration: 0.5,
                onUpdate: (v) => {
                  uniforms.transition.value = v;
                },
              });
            }}
            onExit={async () => {
              await new Promise<void>((resolve) => {
                animate(transitionPresence, 1, {
                  duration: 0.5,
                  onUpdate: (v) => {
                    uniforms.transition.value = v;
                  },
                  onComplete: () => {
                    resolve();
                  },
                });
              });
            }}
          >
            <Switch {...innerProps} location={location}>
              {children}
            </Switch>
          </PageTransition>
        </AnimatePresence>
      </div>
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0">
        <ShaderCanvas uniforms={uniforms} frag={backgroundFrag} />
      </div>
    </>
  );
};

export const PageRoute = (props: RouteProps & { children: ReactNode }) => {
  const { children, ...innerProps } = props;

  return (
    <Route {...innerProps}>
      <motion.div
        className="absolute w-full h-full left-0 top-0 flex justify-center items-center overflow-x-hidden"
        {...PAGE_VARIANTS}
        variants={pageVariants({
          initial: { scale: 0.98, translateX: -32, opacity: 0 },
          animate: {
            scale: 1,
            translateX: 0,
            opacity: 1,
            transition: {
              duration: 1,
            },
          },
          exit: {
            scale: 0.98,
            translateX: 32,
            opacity: 0,
          },
        })}
      >
        {children}
      </motion.div>
    </Route>
  );
};
