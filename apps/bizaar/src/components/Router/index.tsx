import { BrowserRouter } from "react-router-dom";
import HomePage from "~/routes/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
};

export default Router;
