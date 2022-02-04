import { AnimatePresence, motion, useUniforms } from "base";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import GalleryPage from "~/routes/Gallery";
import HomePage from "~/routes/Home";

const AnimatedPages = () => {
  const location = useLocation();

  const uniforms = useUniforms(
    {
      transition: { value: 0 },
    },
    []
  );

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <motion.div
        variants={{
          pageInitial: { x1: -1 },
          pageAnimate: {
            x1: 0,
            transition: { duration: 1.4 },
          },
          pageExit: {
            x1: 1,
            transition: { duration: 1.4 },
          },
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
          <Route path="/us" element={<GalleryPage />} />
          <Route path="/domino" element={<GalleryPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <AnimatedPages />
    </BrowserRouter>
  );
};

export default Router;
