import React, { useEffect } from "react";
import { useScroll, useUniforms } from "base";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

const HomePage = () => {
  const { x, y } = useScroll();

  const uniforms = useUniforms({
    leftPanePresence: {
      value: y.get(),
    },
  });

  const openness = useTransform(y, (y) => {
    let openness = 0;
    openness = y < window.innerHeight / 2 ? 0 : 1;
    return openness;
  });

  const opennessSpring = useSpring(openness);

  useTransform(opennessSpring, (y) => {
    uniforms.leftPanePresence.value = y;
    console.log(uniforms.leftPanePresence.value);
  });

  return (
    <>
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-size-120px">Ariana & Steven</h1>
          <div className="flex space-x-8 text-size-20px items-center">
            <h3>September 18th, 2022</h3>
            <span className="flex-1 h-1px bg-black" />
            <h3>Savannah, Georgia</h3>
          </div>
        </div>
      </div>
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center"></div>
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center"></div>
    </>
  );
};

export default HomePage;
