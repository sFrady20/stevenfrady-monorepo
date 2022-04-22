import React, { memo } from "react";
import RsvpForm from "~/components/RsvpForm";
import AboutSection from "./about";
import ActionsSection from "./actions";
import AttractionsSection from "./attractions";
import LodgingSection from "./lodging";

const HomePage = memo(() => {
  return (
    <>
      <section className="min-h-screen min-w-screen flex flex-col justify-center items-center space-y-8 p-20 <md:(p-4)">
        <div className="flex flex-col flex-1 justify-center min-h-[69vh] max-w-1024px w-full space-y-12 <md:(min-h-[40vh] space-y-8 items-center)">
          <h1 className="text-size-100px text-center <md:(max-w-70 text-size-70px text-center)">
            Ariana & Steven
          </h1>
          <div className="flex md:space-x-8 text-size-20px items-center justify-center <md:hidden">
            <p>September 18th, 2022</p>
            <span className="w-5px h-5px rounded-full bg-black <md:hidden" />
            <p>Savannah, Georgia</p>
          </div>
        </div>
        <div className="flex flex-col items-center max-w-1024px w-full">
          <ActionsSection />
          <AboutSection />
          <LodgingSection />
          <AttractionsSection />
          <div className="w-full flex justify-center p-20 from-gray-200 to-gray-100 bg-gradient-to-t <md:(p-5)">
            <RsvpForm />
          </div>
          <div className="w-full text-sm leading-loose bg-gray-50 py-20 px-8 text-gray-500 text-center flex justify-center">
            <div className="max-w-600px">
              <p>
                We have no wedding registry! Seeing as how we’ve already bought
                a house and filled it with most everything we need, we’d much
                prefer donations to go toward our impending Honeymoon;
                additionally, we don’t live in Savannah, so bringing back gifts
                would be somewhat onerous. Obviously, there’s no need to give
                anything material, as your presence would be the best gift we
                could receive 😊
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="min-w-screen flex flex-col items-center">
        <div className="container text-white mx-auto p-4 flex flex-row space-x-6 justify-center items-center <md:(flex-col space-y-2 py-12)">
          <h1 className="text-size-32px">A&S</h1>
          <div className="text-size-sm">September 18th, 2022</div>
          <div className="text-size-sm">700 Drayton St Savannah, GA 31401</div>
        </div>
      </section>
    </>
  );
});

export default HomePage;
