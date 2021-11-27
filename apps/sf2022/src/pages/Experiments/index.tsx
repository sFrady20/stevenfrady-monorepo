import { motion } from "base";
import { Link } from "react-router-dom";

const ExperimentsPage = () => {
  return (
    <motion.div variants={{}} className="container mx-auto space-x-3">
      <motion.span variants={{}}>
        <Link to="/">Home</Link>
      </motion.span>
      <motion.span variants={{}}>
        <Link to="/">Home</Link>
      </motion.span>
      <motion.span variants={{}}>
        <Link to="/">Home</Link>
      </motion.span>
    </motion.div>
  );
};

export default ExperimentsPage;
