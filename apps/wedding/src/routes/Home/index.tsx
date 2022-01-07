import React, { memo } from "react";
import { useScroll, useUniforms } from "base";
import { useSpring, useTransform } from "framer-motion";
import RsvpForm from "~/components/RsvpForm";
import AboutContent from "~/content/About";
import Map from "~/components/Map";
import forsythImg from "./forsyth.jpeg";

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
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center space-y-8 p-20">
        <div className="flex flex-col flex-1 justify-center">
          <h1 className="text-size-120px">Ariana & Steven</h1>
          <div className="flex space-x-8 text-size-20px items-center justify-center">
            <h3>September 18th, 2022</h3>
            <span className="w-5px h-5px rounded-full bg-black" />
            <h3>Savannah, Georgia</h3>
          </div>
        </div>
        <div className="flex flex-row rounded overflow-hidden border-width-1px divide-x-1">
          <div className="w-320px bg-gray-50 space-y-2 px-8 py-5 cursor-pointer hover:bg-gray-100 transition transition-colors relative">
            <div className="text-md inline border-b-width-1px pb-1">When</div>
            <div className="text-lg leading-normal">
              Sunday, 18 September 2022
              <br />
              3:00PM to 8:30PM
            </div>
            <div className="bg-[rgba(20,20,20,0.8)] text-sm text-white absolute left-1/2 top-0 rounded-md px-3 py-2 hidden">
              Add to calendar
            </div>
          </div>
          <div className="w-400px bg-gray-50 space-y-2 px-8 py-5 cursor-pointer hover:bg-gray-100 transition transition-colors relative">
            <div className="text-md inline border-b-width-1px pb-1">Where</div>
            <div className="text-lg leading-normal">
              Mansion on Forsyth Park
              <br />
              700 Drayton St, Savannah, GA 31401
            </div>
            <div className="bg-[rgba(20,20,20,0.8)] text-sm text-white absolute left-1/2 top-0 rounded-md px-3 py-2 hidden">
              Open in Google Maps
            </div>
          </div>
          <div className="w-500px bg-gray-100 py-6 px-8 flex flex-row space-x-8 items-center">
            <button className="border border-solid border-black px-12 py-4 text-lg transform transition-all hover:bg-gray-200 hover:-translate-y-2px">
              RSVP
            </button>
            <div className="text-size-xs leading-leading-snug">
              Click here to RSVP online, or mail your response as per your
              wedding invite
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center space-y-8">
        {/* <div className="flex flex-row w-1400px">
          <div
            className={`flex-1 px-12 text-lg bg-white h-80 bg-center bg-cover opacity-90`}
            style={{ backgroundImage: `url(${forsythImg})` }}
          ></div>
          <div
            className={`flex-1 px-12 text-lg bg-white h-80 bg-center bg-cover opacity-90`}
            style={{ backgroundImage: `url(${forsythImg})` }}
          ></div>
          <div
            className={`flex-1 px-12 text-lg bg-white h-80 bg-center bg-cover opacity-90`}
            style={{ backgroundImage: `url(${forsythImg})` }}
          ></div>
        </div> */}
      </div>
      {/* <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
        <div className="w-800px text-size-24px leading-40px bg-white py-15 px-10">
          <AboutContent />
        </div>
      </div> */}
      <div className="min-h-screen min-w-screen flex flex-col items-center">
        <div className="flex flex-row flex-1 py-16">
          <div className="w-800px flex flex-row justify-center items-center">
            <div>Photo Gallery</div>
            <div>Domino Gallery</div>
          </div>
          <div className="flex flex-col space-y-6">
            <RsvpForm />
            <div className="w-600px text-sm leading-relaxed bg-gray-100 py-5 px-8 ">
              We have no wedding registry! Seeing as how we’ve already bought a
              house and filled it with most everything we need, we’d much prefer
              donations to go toward our impending Honeymoon; additionally, we
              don’t live in Savannah, so bringing back gifts would be somewhat
              onerous. Obviously, there’s no need to give anything material, as
              your presence would be the best gift we could receive 😊
            </div>
          </div>
        </div>
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
