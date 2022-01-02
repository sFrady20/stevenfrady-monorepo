import { BrowserRouter } from "react-router-dom";
import HomePage from "~/pages/Home";
import ShadersPage from "~/pages/Experiments";
import { Route, Routes } from "react-router";
import BottomBar from "../BottomBar";
import ShaderLayers from "../ShaderLayers";
import PageTransition from "../PageTransition";
import { useLocation } from "react-router";
import GenuaryPage from "~/pages/Genuary";

const Router = () => {
  return (
    <BrowserRouter>
      <ShaderLayers>
        <PageTransition>
          <RT />
          <BottomBar />
        </PageTransition>
      </ShaderLayers>
    </BrowserRouter>
  );
};

const RT = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/experiments" element={<ShadersPage />} />
      <Route path="/genuary/:day" element={<GenuaryPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default Router;
