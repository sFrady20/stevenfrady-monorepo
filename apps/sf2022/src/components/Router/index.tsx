import { BrowserRouter } from "react-router-dom";
import { PageRoute, PageSwitch } from "../../pages";
import HomePage from "../../pages/Home";
import ShadersPage from "../../pages/Experiments";
import { Route } from "react-router";

const Router = () => {
  return (
    <BrowserRouter>
      <PageSwitch>
        <Route
          path="/experiments"
          element={
            <PageRoute>
              <ShadersPage />
            </PageRoute>
          }
        />
        <Route
          path="*"
          element={
            <PageRoute>
              <HomePage />
            </PageRoute>
          }
        />
      </PageSwitch>
    </BrowserRouter>
  );
};

export default Router;
