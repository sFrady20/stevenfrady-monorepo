import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Switch } from "react-router";

const PageTransition = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <Route path="*">
      {({ location }) => (
        <AnimatePresence initial={false} exitBeforeEnter>
          <Switch key={location.pathname} location={location}>
            {children}
          </Switch>
        </AnimatePresence>
      )}
    </Route>
  );
};

export default PageTransition;
