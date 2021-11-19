import { BrowserRouter } from "react-router-dom";
import { PageRoute, PageSwitch } from "@/components/Pages";
import HomePage from "@/pages/Home";
import ShadersPage from "@/pages/Experiments";
import { Route } from "react-router";
import BottomBar from "../BottomBar";

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
      <BottomBar />
    </BrowserRouter>
  );
};

export default Router;
