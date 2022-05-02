import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import HomeScene from "~/scenes/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes location={location}>
        <Route path="*" element={<HomeScene />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
