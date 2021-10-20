import { motion } from "framer-motion";
import { pageVariants } from "..";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mx-auto m-8 text-center ">
      <h1 className="text-size-100px text-blue-gray-100 font-extrabold">
        CREATIVE
        <br />
        DEVELOPER
      </h1>
      <motion.div variants={pageVariants("opacity")} className="space-x-4 mt-4">
        <Link to="/shaders">Projects</Link>
        <Link to="/shaders">Experiments</Link>
        <Link to="/shaders">Updates</Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
