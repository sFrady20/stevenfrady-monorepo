import gallery from "./us.json";
import { motion } from "framer-motion";

const GalleryPage = () => {
  return (
    <div className="h-screen flex p-50">
      <div className="space-x-10 flex">
        {gallery.map((i) => (
          <motion.img custom={i} animate={{ translateX: i }} src={`/us/${i}`} />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
