import { memo } from "react";
import AboutCard from "~/components/AboutCard";
import { useNavigate } from "react-router";

const AboutSection = memo(() => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 w-full py-20 relative flex justify-center <md:flex-col <md:p-0 <md:items-center">
      <div
        className="pointer-events-none -left-5 top-1/3 flex justify-center items-center group cursor-pointer transition-all active:scale-98 z-10 md:(absolute transform-gpu -translate-x-1/2 -translate-y-1/2) <md:w-full"
        onClick={() => {
          navigate("/gallery");
        }}
      >
        <div
          className="w-75 h-90 bg-gray-900 bg-cover bg-center shadow shadow-xl rounded-lg transition-all duration-600 filter md:(absolute transform-gpu -rotate-10) group-hover:(scale-105 -rotate-5 blur-2px) <md:(w-80% my-10)"
          style={{
            backgroundImage: `url(/us/20161218_135922.jpg)`,
          }}
        />
        <div className="relative z-10 border-width-1px bg-gray-50 rounded-full w-20 h-20 flex justify-center items-center opacity-0 transition-all duration-600 transform-gpu group-hover:opacity-100 group-hover:scale-110 <md:hidden">
          <i className="fas fa-images text-xl" />
        </div>
      </div>
      <AboutCard />
      <div
        className="pointer-events-none -right-15 bottom-2/8 flex justify-center items-center group cursor-pointer transition-all active:scale-98 z-10 <md:w-full md:(absolute transform-gpu -translate-x-1/2 -translate-y-1/2) "
        onClick={() => {
          navigate("/domino");
        }}
      >
        <div
          className="w-75 h-90 bg-gray-900 bg-cover bg-center shadow shadow-xl rounded-lg transition-all duration-600 filter md:(absolute transform-gpu rotate-10) group-hover:(scale-105 rotate-5 blur-2px) <md:(w-80% my-10)"
          style={{
            backgroundImage: `url(/domino/IMG_20210617_115548.jpg)`,
          }}
        />
        <div className="relative z-10 border-width-1px bg-gray-50 rounded-full w-20 h-20 flex justify-center items-center opacity-0 transition-all duration-600 transform-gpu group-hover:opacity-100 group-hover:scale-110 <md:hidden">
          <i className="fas fa-paw text-xl" />
        </div>
      </div>
    </div>
  );
});

export default AboutSection;
