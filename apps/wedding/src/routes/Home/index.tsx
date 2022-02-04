import React, { memo } from "react";
import RsvpForm from "~/components/RsvpForm";
import { createEvent } from "ics";
import { saveAs } from "file-saver";

import dominoImg from "~/assets/domino/IMG_20210617_115548.jpg";
import usImg from "~/assets/us/20161218_135922.jpg";
import AboutCard from "~/components/AboutCard";
import { useNavigate } from "react-router";

const event = createEvent({
  start: [2022, 9, 18, 15, 0],
  duration: { hours: 5, minutes: 30 },
  title: "Ariana & Steven's Wedding",
  location: "Mansion on Forsyth, 700 Drayton St, Savannah, GA 31401",
  geo: { lat: 32.0673266, lon: -81.095102 },
  busyStatus: "BUSY",
  organizer: { name: "Ariana", email: "acguy92@gmail.com" },
  url: "https://www.guyfradywedding.com",
});

const HomePage = memo(() => {
  const navigate = useNavigate();

  return (
    <>
      <section className="min-h-screen min-w-screen flex flex-col justify-center items-center space-y-8 p-20 <md:p-8">
        <div className="flex flex-col flex-1 justify-center min-h-[69vh]">
          <h1 className="text-size-100px">Ariana & Steven</h1>
          <div className="flex space-x-8 text-size-16px items-center justify-center">
            <h3>September 18th, 2022</h3>
            <span className="w-5px h-5px rounded-full bg-black" />
            <h3>Savannah, Georgia</h3>
          </div>
        </div>
        <div className="flex flex-col items-center max-w-1024px w-full">
          <div className="flex w-full flex-row rounded-t border-width-1px divide-x-1 bg-gray-50 text-center">
            <div
              className="flex-1 bg-gray-50 space-y-2 px-10 py-8 cursor-pointer group hover:bg-gray-100 transition transition-colors relative"
              onClick={() => {
                const blob = new Blob([event.value || ""], {
                  type: "text/plain;charset=utf-8",
                });
                saveAs(blob, "guyFradyWeddingCalEvent.ics");
              }}
            >
              <div className="text-md inline border-b-width-1px pb-1">When</div>
              <div className="text-lg leading-normal">
                Sunday, 18 September 2022
                <br />
                3:00PM to 8:30PM
              </div>
              <div className="bg-[rgba(20,20,20,0.8)] text-sm text-white absolute left-1/2 -top-8 rounded-md px-3 py-2 opacity-0 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all group-hover:-top-10">
                Add to Calendar
              </div>
            </div>
            <a
              target="_blank"
              rel="noreferrer nofollow"
              className="group flex-1"
              href="https://www.google.com/maps/place/Mansion+on+Forsyth+Park/@32.0673266,-81.095102,17z/data=!3m1!5s0x88fb9e6ae299308d:0xc2e1ee74bcf72450!4m18!1m9!3m8!1s0x88fb9e6b00fe6bf3:0xc89c03b17fd0602!2sMansion+on+Forsyth+Park!5m2!4m1!1i2!8m2!3d32.0670356!4d-81.0950798!3m7!1s0x88fb9e6b00fe6bf3:0xc89c03b17fd0602!5m2!4m1!1i2!8m2!3d32.0670356!4d-81.0950798"
            >
              <div className="bg-gray-50 space-y-2 px-10 py-8 group-hover:bg-gray-100 transition transition-colors relative box-border">
                <div className="text-md inline border-b-width-1px pb-1">
                  Where
                </div>
                <div className="text-lg leading-normal">
                  Mansion on Forsyth Park
                  <br />
                  700 Drayton St, Savannah, GA 31401
                </div>
                <div className="bg-[rgba(20,20,20,0.8)] text-sm text-white absolute left-1/2 -top-8 rounded-md px-3 py-2 opacity-0 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all group-hover:-top-10">
                  View Map
                </div>
              </div>
            </a>
          </div>
          <div className="w-full flex justify-center p-20 from-gray-200 to-gray-100 bg-gradient-to-b">
            <RsvpForm />
          </div>
          <div className="h-1px w-full bg-gray-200" />
          <div className="bg-gray-50 w-full py-20 relative flex justify-center">
            <div className="pointer-events-none absolute left-0 top-10 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center group cursor-pointer transition-all active:scale-98">
              <div
                className="absolute transform -rotate-10 w-85 h-105 bg-gray-900 bg-cover bg-center shadow shadow-xl rounded-lg transition-all duration-600 group-hover:scale-105 group-hover:-rotate-5 filter group-hover:blur-2px"
                style={{
                  backgroundImage: `url(${usImg})`,
                }}
              />
              <div className="relative z-10 border-width-1px bg-gray-50 rounded-full w-20 h-20 flex justify-center items-center opacity-0 transition-all duration-600 transform group-hover:opacity-100 group-hover:scale-110">
                <i className="fas fa-images text-xl" />
              </div>
            </div>
            <AboutCard />
            <div
              className="pointer-events-none absolute right-0 bottom-15 transform -translate-x-1/2-translate-y-1/2 flex justify-center items-center group cursor-pointer transition-all active:scale-98 z-10"
              onClick={() => navigate("/us")}
            >
              <div
                className="absolute transform rotate-10 w-85 h-105 bg-gray-900 bg-cover bg-center shadow shadow-xl rounded-lg transition-all duration-600 group-hover:scale-105 group-hover:rotate-5 filter group-hover:blur-2px"
                style={{
                  backgroundImage: `url(${dominoImg})`,
                }}
              />
              <div className="relative z-10 border-width-1px bg-gray-50 rounded-full w-20 h-20 flex justify-center items-center opacity-0 transition-all duration-600 transform group-hover:opacity-100 group-hover:scale-110">
                <i className="fas fa-paw text-xl" />
              </div>
            </div>
          </div>
          <div className="h-1px w-full bg-gray-200" />
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
        <div className="container border-t-1 border-white mx-auto p-4 flex flex-row space-x-6 text-white items-center">
          <h1 className="text-size-32px">A&S</h1>
          <div className="text-size-sm">September 18th, 2022</div>
          <div className="text-size-sm">700 Drayton St Savannah, GA 31401</div>
          <div className="flex-1"></div>
          <div className="opacity-80 text-size-sm">
            Des. & Dev. by{" "}
            <a href="http://stevenfrady.com" target="_blank">
              Steven Frady
            </a>
          </div>
        </div>
      </section>
    </>
  );
});

export default HomePage;
