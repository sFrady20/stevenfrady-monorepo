import { motion, useSpring } from "base";
import React, { memo, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

const AboutCard = memo(() => {
  const [isExpanded, setExpanded] = useState(false);
  const heightRef = useRef<HTMLDivElement>(null);
  const expansion = useSpring(650);

  useEffect(() => {
    if (isExpanded) {
      const rect = heightRef.current?.getBoundingClientRect();
      expansion.set((rect?.height || 650) + 275);
    } else {
      expansion.set(650);
    }
  }, [isExpanded]);

  return (
    <motion.div
      className={`${styles.about} ${isExpanded ? styles.expanded : ""}`}
      style={{ height: expansion }}
    >
      <h2 className="text-size-50px">Our Story</h2>
      <div className="text-size-xl leading-loose" ref={heightRef}>
        <p>
          Steven and Ariana met in Williamsburg, VA at the Brick House
          Tavern—the only place you can dance in Williamsburg. Steven was
          working in Williamsburg as a web developer and Ariana was visiting for
          William & Mary’s Homecoming. Ariana was dancing with friends when
          Steven approached her to say, “Hi, I’m Steven.” He looked just like
          Obama, so Ariana was smitten, and they danced into the night. The two
          exchanged information and, the next day, Steven asked Ariana to have
          dinner (their first date). Being together felt like home, although
          they were practically strangers. Ariana had to leave Williamsburg (as
          she was only visiting), but Steven and Ariana continued conversing
          over the next several months.
        </p>
        <p>
          After a few months of talking and texting with Steven, Ariana visited
          Williamsburg, again, and Steven asked her to be his girlfriend. From
          that point on, Steven and Ariana had a long-distance relationship
          (first, between Williamsburg and Fredericksburg and then between
          Atlanta and Fredericksburg). After three years of being apart, they
          came to live together in Northern Virginia in 2018; adopted a
          beautiful, loving pup named Domino; and bought a house.
        </p>
        <p>
          They’ve now been together about seven years and can’t wait to make
          things truly official!
        </p>
      </div>
      <button
        className="border border-solid border-black px-12 py-4 text-lg transform transition-all hover:bg-gray-200 hover:-translate-y-2px"
        onClick={() => {
          setExpanded((e) => !e);
        }}
      >
        Read More
      </button>
    </motion.div>
  );
});

export default AboutCard;
