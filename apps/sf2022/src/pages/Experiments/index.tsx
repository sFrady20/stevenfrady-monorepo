import { motion } from "base";
import { Link } from "react-router-dom";
import { pageVariants } from "@/components/Pages";

const ExperimentsPage = () => {
  return (
    <motion.div
      variants={pageVariants({
        animate: {
          transition: { staggerChildren: 0.1, when: "beforeChildren" },
        },
        exit: {
          transition: {
            staggerChildren: 0.1,
            staggerDirection: -1,
            after: "afterChildren",
          },
        },
      })}
      className="container mx-auto space-x-3"
    >
      <motion.span variants={pageVariants("opacity")}>
        <Link to="/">Home</Link>
      </motion.span>
      <motion.span variants={pageVariants("opacity")}>
        <Link to="/">Home</Link>
      </motion.span>
      <motion.span variants={pageVariants("opacity")}>
        <Link to="/">Home</Link>
      </motion.span>
    </motion.div>
  );
};

export default ExperimentsPage;