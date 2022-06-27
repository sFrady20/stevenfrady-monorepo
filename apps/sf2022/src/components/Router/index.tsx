import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, useLocation } from "react-router";
import HomeScene from "~/scenes/Home";
import { animated, useTransition } from "react-spring";
import TestScene from "~/scenes/Test";

const Transitions = (props: { children?: ReactNode }) => {
  const { children } = props;
  const location = useLocation();

  const transitions = useTransition(location, {
    from: {
      presence: 0,
      zIndex: 2,
    },
    enter: {
      presence: 1,
      zIndex: 1,
    },
    leave: {
      presence: 0,
      zIndex: 0,
    },
  });

  return transitions((props, item) => (
    <animated.div key={location.pathname} style={{ zIndex: props.zIndex }}>
      <Routes location={item}>
        <Route path="*" element={<HomeScene {...props} />} />
        <Route path="/test" element={<TestScene {...props} />} />
      </Routes>
    </animated.div>
  ));
};

const Router = () => {
  return (
    <BrowserRouter>
      <Transitions />
    </BrowserRouter>
  );
};

export default Router;
