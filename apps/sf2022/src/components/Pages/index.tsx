import { Routes, RoutesProps, useLocation } from "react-router-dom";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  usePresence,
  Variant,
  Variants,
  useUniforms,
} from "base";
import { ReactNode, useEffect, useRef } from "react";
import ShaderLayers from "@/components/ShaderLayers";

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

export const PageSwitch = (props: RoutesProps & { children: ReactNode }) => {
  const { children, ...innerProps } = props;
  const location = useLocation();

  const transitionIndex = useRef(-0.5);
  const transitionMotion = useMotionValue(0);

  const uniforms = useUniforms({
    transition: { value: 0 },
  });

  const onValueUpdate = (val: number) => {
    uniforms.transition.value = val;
  };

  return (
    <ShaderLayers uniforms={uniforms}>
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
          <Routes {...innerProps} location={location}>
            {children}
          </Routes>
        </PageTransition>
      </AnimatePresence>
    </ShaderLayers>
  );
};

export const PageRoute = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <motion.div
      className="flex flex-1 flex-col justify-center items-center min-h-100vh"
      {...PAGE_VARIANTS}
      variants={pageVariants()}
    >
      {children}
    </motion.div>
  );
};
