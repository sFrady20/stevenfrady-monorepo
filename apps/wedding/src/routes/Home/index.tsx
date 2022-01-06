import React, { memo } from "react";
import { useScroll, useUniforms } from "base";
import { useSpring, useTransform } from "framer-motion";
import RsvpForm from "~/components/RsvpForm";
import AboutContent from "~/content/About";

const HomePage = memo(() => {
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
    if (uniforms.leftPanePresence) uniforms.leftPanePresence.value = y;
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
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
        <div className="w-800px text-size-24px leading-40px">
          <div>When: Sunday, 18 September 2022 ; 3:00PM to 8:30PM </div>
          <div>
            Where: Mansion on Forsyth Park, 700 Drayton St, Savannah, GA 31401
          </div>
          <div>
            RSVP: Click here to RSVP online, or mail your response as per your
            wedding invite
          </div>
          <div>
            Registry: We have no wedding registry! Seeing as how we’ve already
            bought a house and filled it with most everything we need, we’d much
            prefer donations to go toward our impending Honeymoon; additionally,
            we don’t live in Savannah, so bringing back gifts would be somewhat
            onerous. Obviously, there’s no need to give anything material, as
            your presence would be the best gift we could receive 😊
          </div>
        </div>
      </div>
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
        <div className="w-800px text-size-24px leading-40px">
          <AboutContent />
        </div>
      </div>
      <div className="min-h-screen min-w-screen flex flex-col justify-end items-center">
        <RsvpForm />
        <div className="container border-t-1 border-white mx-auto p-4 flex flex-row space-x-6 text-white items-center">
          <h1 className="text-size-32px">A&S</h1>
          <div className="text-size-sm">September 18th, 2022</div>
          <div className="text-size-sm">700 Drayton St Savannah, GA 31401</div>
          <div className="flex-1"></div>
          <div className="opacity-30">
            ©{" "}
            <a href="http://stevenfrady.com" target="_blank">
              Steven Frady
            </a>{" "}
            2022
          </div>
        </div>
      </div>
    </>
  );
});

export default HomePage;
