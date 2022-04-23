import {
  AnimatePresence,
  useMotionValue,
  motion,
  useAnimationFrame,
} from "framer-motion";
import React, { memo, useEffect, useRef, useState } from "react";

type AttractionProps = {
  link: string;
  name: string;
  imgUrl: string;
  description?: string;
};

const AttractionCard = memo((props: AttractionProps) => {
  const { link, name, description, imgUrl } = props;

  return (
    <a href={link} target="_blank">
      <div className="p-10 transition-all space-y-6 flex flex-col rounded-sm h-full hover:(bg-gray-100) <lg:(p-3) <sm:(py-7)">
        <div className="w-full">
          <img className="rounded-sm" src={imgUrl} />
        </div>
        <div className="flex-1">
          <h5 className="leading-snug text-18px">{name}</h5>
          {description && <p className="italic text-sm mt-1">{description}</p>}
        </div>
      </div>
    </a>
  );
});

const Slide = memo((props: { attractions: AttractionProps[] }) => {
  const { attractions } = props;
  return (
    <motion.div
      className="divide-x flex w-full children:(flex-1) <sm:(flex-col divide-x-0 divide-y-1)"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }}
    >
      {attractions.map((attraction, i) => (
        <div key={i}>
          <AttractionCard {...attraction} />
        </div>
      ))}
    </motion.div>
  );
});

const animationParent = {
  initial: "initial",
  animate: "animate",
  exit: "exit",
  variants: {
    initial: {
      transition: {
        staggerChildren: 0.3,
      },
    },
    animate: {
      transition: {
        when: "beforeChildren",
        staggerChildren: 1,
      },
    },
    exit: {
      transition: {
        when: "afterChildren",
        staggerChildren: 1,
      },
    },
  },
};

const AttractionsSection = memo(() => {
  const [category, setCategory] = useState(0);
  const timerVal = useMotionValue(0);
  const prevTimeStamp = useRef(0);
  const [isPaused, setPaused] = useState(false);

  useAnimationFrame((t) => {
    let v = timerVal.get();
    if (!isPaused) v += (t - prevTimeStamp.current) / 1000 / 15;
    if (v > 1) {
      setCategory((c) => (c + 1) % 3);
      v = 0;
    }
    timerVal.set(v);
    prevTimeStamp.current = t;
  });

  useEffect(() => {
    timerVal.set(0);
  }, [category]);

  return (
    <div className="bg-gray-50 w-full relative p-15 flex flex-col items-center <lg:(px-5)">
      <div className="text-center pb-10">
        <h3 className="text-size-44px inline-block">Things to Do</h3>
      </div>

      <div
        className="w-full flex flex-col items-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mb-10 w-full bg-gray-50 overflow-hidden max-w-600px relative">
          <div className="w-full divide-x flex text-center items-center children:(flex-1)">
            <div
              className="pt-2 pb-4 cursor-pointer hover:(bg-gray-100)"
              style={{ opacity: category === 0 ? 1 : 0.5 }}
              onClick={() => setCategory(0)}
            >
              <span className="sm:(hidden)">Sights</span>
              <span className="<sm:(hidden)">Sight Seeing</span>
            </div>
            <div
              className="pt-2 pb-4 cursor-pointer hover:(bg-gray-100)"
              style={{ opacity: category === 1 ? 1 : 0.5 }}
              onClick={() => setCategory(1)}
            >
              <span className="sm:(hidden)">Food</span>
              <span className="<sm:(hidden)">Restaurants</span>
            </div>
            <div
              className="pt-2 pb-4 cursor-pointer hover:(bg-gray-200)"
              style={{ opacity: category === 2 ? 1 : 0.5 }}
              onClick={() => setCategory(2)}
            >
              <span className="sm:(hidden)">Tours</span>
              <span className="<sm:(hidden)">Tours / Travel</span>
            </div>
          </div>
          <div className="absolute h-1px w-full bottom-0 left-0">
            <motion.div
              className="absolute bottom-0 left-0 top-0 bg-gray-300 w-full"
              style={{
                transformOrigin: "0% 0%",
                scaleX: timerVal,
              }}
            />
          </div>
        </div>

        <div className="h-470px <lg:(h-440px) <sm:(h-auto)">
          <AnimatePresence exitBeforeEnter>
            {category === 0 ? (
              <motion.div key="sights" {...animationParent}>
                <Slide
                  attractions={[
                    {
                      link: "https://www.tripadvisor.com/Attraction_Review-g60814-d259614-Reviews-Forsyth_Park-Savannah_Georgia.html",
                      name: "Forsyth Park",
                      imgUrl:
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/e7/21/57/fountain.jpg?w=800&h=-1&s=1",
                      description:
                        "Forsyth Park is the largest park in the historic district of Savannah, Georgia. The beauty and peacefulness of Forsyth Park are appreciated by all who visit",
                    },
                    {
                      link: "https://www.tripadvisor.com/Attraction_Review-g60814-d1090246-Reviews-Historic_River_Street-Savannah_Georgia.html",
                      name: "Historic River Street",
                      imgUrl:
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/ee/20/6e/beautiful-bridge.jpg?w=1200&h=-1&s=1",
                      description:
                        "River Street is one of the most visited parts of Savannah for tourists in the city. During the day, the area offers shops and galleries, historic architecture and monuments to figures and events in the city’s past.",
                    },
                    {
                      link: "https://www.tripadvisor.com/Attraction_Review-g60814-d103143-Reviews-Cathedral_of_St_John_the_Baptist-Savannah_Georgia.html",
                      name: "Cathedral of St. John the Baptist",
                      imgUrl:
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/45/f1/ba/alter-at-st-john-the.jpg?w=1200&h=-1&s=1",
                      description:
                        "A glorious Savannah attraction to behold, the Cathedral of St. John the Baptist is an architectural masterpiece and the seat of the diocese of Savannah.",
                    },
                  ]}
                />
              </motion.div>
            ) : category === 1 ? (
              <motion.div key="restaurants" {...animationParent}>
                <Slide
                  attractions={[
                    {
                      link: "https://www.tripadvisor.com/Restaurant_Review-g60814-d6916004-Reviews-The_Collins_Quarter-Savannah_Georgia.html",
                      name: "The Collins Quarter",
                      imgUrl:
                        "https://media-cdn.tripadvisor.com/media/photo-s/13/1a/f3/cc/exterior-of-the-collins.jpg",
                      description:
                        "Styled after Melbourne's historic Collins Street, we deliver a unique café experience by pairing specialty coffee with innovative cuisine – all served in relaxed and casual environment.",
                    },
                    {
                      link: "https://www.tripadvisor.com/Restaurant_Review-g60814-d636805-Reviews-Leopold_s_Ice_Cream-Savannah_Georgia.html",
                      name: "Leopold's Ice Cream",
                      imgUrl:
                        "https://media-cdn.tripadvisor.com/media/photo-s/0e/75/f6/8b/leopold-s-ice-cream.jpg",
                      description:
                        "No trip to Savannah is complete without a visit to Leopold's Ice Cream! Named One of the Top 10 Ice Cream Parlors in the World.",
                    },
                    {
                      link: "https://www.tripadvisor.com/Restaurant_Review-g60814-d7339809-Reviews-The_Grey-Savannah_Georgia.html",
                      name: "The Grey",
                      imgUrl:
                        "https://media-cdn.tripadvisor.com/media/photo-s/07/57/d5/96/the-grey.jpg",
                      description:
                        "Occupying a 1938 art deco Greyhound Bus Terminal that they painstakingly restored to its original luster, The Grey offers a food, wine and service experience that is simultaneously familiar and elevated.",
                    },
                  ]}
                />
              </motion.div>
            ) : category === 2 ? (
              <motion.div key="tours" {...animationParent}>
                <Slide
                  attractions={[
                    {
                      link: "https://www.tripadvisor.com/AttractionProductReview-g60814-d11450495-Savannah_Hop_On_Hop_Off_Trolley_Tour-Savannah_Georgia.html",
                      name: "Savannah Hop-On Hop-Off Trolley Tour",
                      imgUrl:
                        "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0b/19/a0/65.jpg",
                      description:
                        "Discover Savannah on the Old Town Trolley City Tour. This hop-on hop off tour includes over 100 points of interest and includes…",
                    },
                    {
                      link: "https://www.tripadvisor.com/Attraction_Review-g60814-d628022-Reviews-Hearse_Ghost_Tours-Savannah_Georgia.html",
                      name: "Hearse Ghost Tours",
                      imgUrl:
                        "https://media-cdn.tripadvisor.com/media/photo-s/01/9a/67/ea/hearse-ghost-tours.jpg",
                      description:
                        "This is a fun goofy tour not a serious tour. Take a ride in a real Hearse and see the beautiful historic homes. We tell you stories about Savannah's Ghost's while showing you our remarkable Historic District. ",
                    },
                    {
                      link: "https://www.tripadvisor.com/Attraction_Review-g60814-d2540475-Reviews-Savannah_Pedicab-Savannah_Georgia.html",
                      name: "Savannah Pedicab",
                      imgUrl: "/pedicab.jpg",
                      description:
                        "Savannah's Ambassadors in BLUE offer eco-friendly & fun transportation throughout the historic district. Cover more ground & see everything along the way.",
                    },
                  ]}
                />
              </motion.div>
            ) : (
              <></>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});

export default AttractionsSection;
