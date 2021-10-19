import { BrowserRouter } from "react-router-dom";
import { PageRoute, PageSwitch } from "../../pages";
import HomePage from "../../pages/Home";
import ShadersPage from "../../pages/Shaders";

const Router = () => {
  return (
    <BrowserRouter>
      <PageSwitch>
        <PageRoute path="/shaders">
          <ShadersPage />
        </PageRoute>
        <PageRoute path="*">
          <HomePage />
        </PageRoute>
      </PageSwitch>
    </BrowserRouter>
  );
};

export default Router;
