import { useCursor } from "base";
import { motion, MotionValue, animate, AnimationPlaybackControls } from "base";
import { map } from "lodash";
import { useMemo } from "react";

const OUTLINES = "outlines";

const makeSpring = (source: ReturnType<typeof useCursor>, depth: number) => {
  const x = new MotionValue(0);
  let activeXAnimation: AnimationPlaybackControls | undefined = undefined;
  const y = new MotionValue(0);
  let activeYAnimation: AnimationPlaybackControls | undefined = undefined;

  x.attach((v, set) => {
    if (activeXAnimation) activeXAnimation.stop();

    activeXAnimation = animate(x.get(), v, {
      type: "spring",
      velocity: x.getVelocity(),
      stiffness: depth * 150,
      damping: depth * 10,
      onUpdate: set,
    });

    return x.get();
  });
  y.attach((v, set) => {
    if (activeYAnimation) activeYAnimation.stop();

    activeYAnimation = animate(y.get(), v, {
      type: "spring",
      velocity: y.getVelocity(),
      stiffness: depth * 150,
      damping: depth * 10,
      onUpdate: set,
    });

    return y.get();
  });

  source.x.onChange((o) => x.set(-1 * o * 0.015 * (1 - depth)));
  source.y.onChange((o) => y.set(-1 * o * 0.015 * (1 - depth)));

  return { x, y };
};

const Title = () => {
  const cursor = useCursor();

  const springs = useMemo(
    () => [
      makeSpring(cursor, 0.25),
      makeSpring(cursor, 0.5),
      makeSpring(cursor, 0.75),
    ],
    []
  );

  return (
    <>
      <svg
        style={{
          position: "absolute",
          top: -99999,
        }}
      >
        <filter id={OUTLINES} filterUnits="objectBoundingBox">
          <feMorphology operator="dilate" radius="3" in="SourceGraphic" />
          <feComposite operator="out" in2="SourceGraphic" result="composite" />
          {map(springs, (s, i) => (
            <motion.feDropShadow
              key={i}
              dx={s.x}
              dy={s.y}
              stdDeviation={Math.pow(5, 1 - i / springs.length)}
              floodColor={`rgba(255,255,255,${0 + (i / springs.length) * 0.4})`}
            />
          ))}
          <feGaussianBlur stdDeviation={0.5} />
        </filter>
      </svg>

      <motion.h2
        className="text-size-9rem text-gray-50 font-extrabold relative cursor-default m-0"
        style={{
          filter: `url(#${OUTLINES})`,
        }}
      >
        CREATIVE
        <br />
        DEVELOPER
      </motion.h2>
    </>
  );
};

export default Title;
