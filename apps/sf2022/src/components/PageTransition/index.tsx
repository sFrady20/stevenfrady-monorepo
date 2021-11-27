import { useUniforms } from "base";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router";

const PageTransition = (props: { children?: ReactNode }) => {
  const { children } = props;

  const location = useLocation();
  const uniforms = useUniforms({
    transition: { value: 0 },
  });

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <motion.div
        key={location.pathname}
        variants={{
          pageInitial: { x1: -1 },
          pageAnimate: {
            x1: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          },
          pageExit: { x1: 1, transition: { duration: 0.4, ease: "easeInOut" } },
        }}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        onUpdate={(cur) => {
          uniforms.transition.value = cur.x1;
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
