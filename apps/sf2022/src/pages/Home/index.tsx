import { motion } from "framer-motion";
import { pageVariants } from "..";
import { Link } from "react-router-dom";
import Title from "../../components/Title";

const HomePage = () => {
  return (
    <div className="container mx-auto mx-8 text-center min-h-screen flex flex-col justify-center">
      <Title />
      <motion.div variants={pageVariants("opacity")} className="space-x-4 mt-4">
        <Link to="/shaders">Projects</Link>
        <Link to="/shaders">Experiments</Link>
        <Link to="/shaders">Updates</Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
