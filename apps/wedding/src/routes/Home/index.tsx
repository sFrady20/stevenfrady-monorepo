import React, { memo } from "react";
import { useScroll, useUniforms } from "base";
import { useSpring, useTransform } from "framer-motion";
import RsvpForm from "~/components/RsvpForm";
import { createEvent } from "ics";
import { saveAs } from "file-saver";
import styles from "./index.module.scss";

import dominoImg from "~/assets/domino/IMG_20210617_115548.jpg";
import usImg from "~/assets/us/20161218_135922.jpg";

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
        <div className="flex flex-row rounded border-width-1px divide-x-1">
          <div
            className="w-320px bg-gray-50 space-y-2 px-8 py-5 cursor-pointer group hover:bg-gray-100 transition transition-colors relative"
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
            className="group"
            href="https://www.google.com/maps/place/Mansion+on+Forsyth+Park/@32.0673266,-81.095102,17z/data=!3m1!5s0x88fb9e6ae299308d:0xc2e1ee74bcf72450!4m18!1m9!3m8!1s0x88fb9e6b00fe6bf3:0xc89c03b17fd0602!2sMansion+on+Forsyth+Park!5m2!4m1!1i2!8m2!3d32.0670356!4d-81.0950798!3m7!1s0x88fb9e6b00fe6bf3:0xc89c03b17fd0602!5m2!4m1!1i2!8m2!3d32.0670356!4d-81.0950798"
          >
            <div className="w-400px bg-gray-50 space-y-2 px-8 py-5 group-hover:bg-gray-100 transition transition-colors relative box-border">
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
      {/* <div className="min-h-screen min-w-screen flex flex-col justify-center items-center space-y-8">
        <div className="flex flex-row w-1400px">
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
        </div>
      </div> */}
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
        <div className={styles.about}>
          <h2 className="text-size-50px">Our Story</h2>
          <div className="text-size-xl leading-loose">
            <p>
              Steven and Ariana met in Williamsburg, VA at the Brick House
              Tavern—the only place you can dance in Williamsburg. Steven was
              working in Williamsburg as a web developer and Ariana was visiting
              for William & Mary’s Homecoming. Ariana was dancing with friends
              when Steven approached her to say, “Hi, I’m Steven.” He looked
              just like Obama, so Ariana was smitten, and they danced into the
              night. The two exchanged information and, the next day, Steven
              asked Ariana to have dinner (their first date). Being together
              felt like home, although they were practically strangers. Ariana
              had to leave Williamsburg (as she was only visiting), but Steven
              and Ariana continued conversing over the next several months.
            </p>
            <p>
              After a few months of talking and texting with Steven, Ariana
              visited Williamsburg, again, and Steven asked her to be his
              girlfriend. From that point on, Steven and Ariana had a
              long-distance relationship (first, between Williamsburg and
              Fredericksburg and then between Atlanta and Fredericksburg). After
              three years of being apart, they came to live together in Northern
              Virginia in 2018; adopted a beautiful, loving pup named Domino;
              and bought a house.
            </p>
            <p>
              They’ve now been together about seven years and can’t wait to make
              things truly official!
            </p>
          </div>
          <button className="border border-solid border-black px-12 py-4 text-lg transform transition-all hover:bg-gray-200 hover:-translate-y-2px">
            Read More
          </button>
        </div>
      </div>
      <div className="min-h-screen min-w-screen flex flex-col items-center">
        <div className="flex flex-row flex-1 py-16 items-center">
          <div className="w-800px flex flex-row justify-center items-center relative">
            <div className="absolute left-1/5 -top-45 transform -translate-x-1/2-translate-y-1/2 flex justify-center items-center group cursor-pointer transition-all active:scale-98">
              <div
                className="absolute transform rotate-10 w-100 h-120 bg-gray-900 bg-cover bg-center shadow shadow-xl rounded-lg transition-all duration-600 group-hover:scale-105 group-hover:rotate-5 filter group-hover:blur-2px"
                style={{
                  backgroundImage: `url(${dominoImg})`,
                }}
              />
              <div className="relative z-10 border-width-1px bg-gray-50 rounded-full w-20 h-20 flex text-center items-center opacity-0 transition-all duration-600 transform group-hover:opacity-100 group-hover:scale-110">
                Photo Gallery
              </div>
            </div>
            <div className="absolute left-3/5 top-25 transform -translate-x-1/2-translate-y-1/2 flex justify-center items-center group cursor-pointer transition-all active:scale-98">
              <div
                className="absolute transform -rotate-10 w-100 h-120 bg-gray-900 bg-cover bg-center shadow shadow-xl rounded-lg transition-all duration-600 group-hover:scale-105 group-hover:-rotate-5 filter group-hover:blur-2px"
                style={{
                  backgroundImage: `url(${usImg})`,
                }}
              />
              <div className="relative z-10 border-width-1px bg-gray-50 rounded-full w-20 h-20 flex text-center items-center opacity-0 transition-all duration-600 transform group-hover:opacity-100 group-hover:scale-110">
                Photo Gallery
              </div>
            </div>
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
          <div className="opacity-80 text-size-sm">
            Des. & Dev. by{" "}
            <a href="http://stevenfrady.com" target="_blank">
              Steven Frady
            </a>
          </div>
        </div>
      </div>
    </>
  );
});

export default HomePage;
