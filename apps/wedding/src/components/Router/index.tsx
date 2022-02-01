import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "~/routes/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/us" element={<>Us</>} />
        <Route path="/domino" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
