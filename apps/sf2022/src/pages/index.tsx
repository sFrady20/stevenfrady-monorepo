import {
  Switch,
  SwitchProps,
  Route,
  useLocation,
  RouteProps,
} from "react-router-dom";
import { ScrollOutlet, ShaderCanvas, useCursorSpringRef } from "base";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  usePresence,
  Variant,
  Variants,
} from "base";
import { ReactNode, useEffect, useRef } from "react";
import foregroundFrag from "./foreground.frag.glsl";
import backgroundFrag from "./background.frag.glsl";

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
  onEnter?: () => Promise<void>;
  onExit?: () => Promise<void>;
}) => {
  const { children, onEnter, onExit } = props;
  const [isPresent, exit] = usePresence();

  useEffect(() => {
    (async () => {
      if (isPresent) {
        await onEnter?.();
        exit && exit();
      } else {
        await onExit?.();
        exit && exit();
      }
    })();
  }, [isPresent]);

  return <>{children}</>;
};

const seed = Math.random() * 100;

export const PageSwitch = (props: SwitchProps & { children: ReactNode }) => {
  const { children, ...innerProps } = props;
  const location = useLocation();
  const cursorSpringRef = useCursorSpringRef({ stiffness: 200, damping: 50 });

  const transitionIndex = useRef(-0.5);
  const transitionMotion = useMotionValue(0);

  const uniforms = useRef({
    seed: { value: seed },
    transition: { value: 0 },
    cursorSpring: { value: cursorSpringRef },
  }).current;

  const onValueUpdate = (val: number) => {
    uniforms.transition.value = val;
  };

  return (
    <>
      <ScrollOutlet>
        <div className="fixed left-0 top-0 w-full h-full pointer-events-none z-0">
          <ShaderCanvas uniforms={uniforms} frag={backgroundFrag} />
        </div>
        <div className="fixed left-0 top-0 w-full h-full pointer-events-none z-50">
          <ShaderCanvas uniforms={uniforms} frag={foregroundFrag} />
        </div>
      </ScrollOutlet>

      <AnimatePresence exitBeforeEnter initial={false}>
        <PageTransition
          key={location.pathname}
          onEnter={async () => {
            await new Promise<void>(async (resolve) => {
              const next = Math.round(transitionIndex.current + 0.5);
              transitionIndex.current = next;
              animate(transitionMotion, next, {
                duration: 0.7,
                ease: "easeOut",
                onUpdate: onValueUpdate,
                onComplete: () => {
                  setTimeout(resolve, 300);
                },
              });
            });
          }}
          onExit={async () => {
            await new Promise<void>((resolve) => {
              const next = Math.round(transitionIndex.current + 0.5) - 0.5;
              transitionIndex.current = next;
              animate(transitionMotion, next, {
                duration: 0.7,
                ease: "easeIn",
                onUpdate: onValueUpdate,
                onComplete: () => {
                  setTimeout(resolve, 300);
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
    </>
  );
};

export const PageRoute = (props: RouteProps & { children: ReactNode }) => {
  const { children, ...innerProps } = props;

  return (
    <Route {...innerProps}>
      <motion.div
        className="flex flex-1 justify-center items-center"
        {...PAGE_VARIANTS}
        variants={pageVariants()}
      >
        {children}
      </motion.div>
    </Route>
  );
};
