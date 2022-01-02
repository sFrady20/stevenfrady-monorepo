import { BrowserRouter } from "react-router-dom";
import HomePage from "~/pages/Home";
import ShadersPage from "~/pages/Experiments";
import { Route, Routes } from "react-router";
import BottomBar from "../BottomBar";
import ShaderLayers from "../ShaderLayers";
import { useLocation } from "react-router";
import GenuaryPage from "~/pages/Genuary";
import { AnimatePresence, motion, useUniforms } from "base";

const AnimatedPages = () => {
  const location = useLocation();

  const uniforms = useUniforms({
    transition: { value: 0 },
  });

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <motion.div
        variants={{
          pageInitial: { x1: -1 },
          pageAnimate: {
            x1: 0,
            transition: { duration: 0.6 },
          },
          pageExit: { x1: 1, transition: { duration: 0.6 } },
        }}
        key={location.pathname}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        onUpdate={(cur) => {
          uniforms.transition.value = cur.x1;
        }}
      >
        <Routes location={location}>
          <Route path="/experiments" element={<ShadersPage />} />
          <Route path="/genuary/:day" element={<GenuaryPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <ShaderLayers>
        <AnimatedPages />
        <BottomBar />
      </ShaderLayers>
    </BrowserRouter>
  );
};

export default Router;
