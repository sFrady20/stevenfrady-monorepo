import { motion } from "framer-motion";
import { pageVariants } from "..";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mx-auto m-8">
      <h1 className="text-size-69px text-blue-gray-100 font-extrabold">
        CREATIVE
        <br />
        DEVELOPER
      </h1>
      <motion.div variants={pageVariants("opacity")} className="space-x-4 mt-4">
        <Link to="/shaders">Projects</Link>
        <Link to="/shaders">Updates</Link>
        <Link to="/shaders">Gallery</Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
