import { useCursor } from "base";
import { motion, MotionValue, animate, AnimationPlaybackControls } from "base";
import { map, uniqueId } from "lodash";
import { RefObject, useMemo, useRef } from "react";

const makeSpring = (
  source: ReturnType<typeof useCursor>,
  depth: number,
  elRef: RefObject<HTMLHeadingElement>
) => {
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

  const update = () => {
    let cx = source.x.get();
    let cy = source.y.get();

    const rect = elRef.current?.getBoundingClientRect();
    if (rect) {
      cx += rect.left - rect.width / 2;
      cy -= rect.bottom - rect.height / 2;
    }

    x.set(-1 * cx * 0.015 * (1 - depth));
    y.set(-1 * cy * 0.015 * (1 - depth));
  };

  source.x.onChange(update);
  source.y.onChange(update);

  return { x, y };
};

const Title = () => {
  const cursor = useCursor();
  const elRef = useRef<HTMLHeadingElement>(null);

  const springs = useMemo(
    () => map([0.25, 0.5, 0.75], (depth) => makeSpring(cursor, depth, elRef)),
    []
  );

  const g: { [s: string]: string } = {};
  const rg = (key: string) => {
    const curId = g[key] || uniqueId("g-");
    g[key] = uniqueId("g-");
    return curId;
  };

  return (
    <>
      <svg
        style={{
          position: "absolute",
          top: -99999,
        }}
      >
        <defs>
          <filter id="ghost">
            <feFlood floodColor="#000" result="bg" />

            {map([springs[2]], (s, i) => (
              <>
                <feFlood flood-color="#fff" />
                <feComposite in2="SourceGraphic" operator="out" />
                <motion.feOffset key={i} dx={s.x} dy={s.y} />
                <feGaussianBlur stdDeviation={10} />
              </>
            ))}

            <feMerge result="merge">
              <feMergeNode in="bg" />
              <feMergeNode />
            </feMerge>

            <feColorMatrix
              type="matrix"
              values="0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0.13 0.13 0.13 0 0"
            />

            <feComposite in2="SourceGraphic" operator="in" result="cut" />

            <feMorphology operator="dilate" radius="3" in="SourceGraphic" />
            <feComposite operator="out" in2="SourceGraphic" result="outlines" />
            <feMerge>
              <feMergeNode in="cut" />
              <feMergeNode />
            </feMerge>

            {map(springs, (s, i) => (
              <motion.feDropShadow
                key={i}
                dx={s.x}
                dy={s.y}
                stdDeviation={Math.pow(10, 1 - i / springs.length)}
                floodColor={`rgba(255,255,255,${
                  0 + (i / springs.length) * 0.4
                })`}
              />
            ))}
            <feGaussianBlur stdDeviation={0.5} />
          </filter>
        </defs>
      </svg>

      <div className="container mx-auto">
        <motion.h2
          ref={elRef}
          className="text-size-9rem text-gray-50 font-extrabold relative cursor-default m-0 select-none"
          style={{
            filter: `url(#ghost)`,
          }}
        >
          CREATIVE
          <br />
          DEVELOPER
        </motion.h2>
      </div>
    </>
  );
};

export default Title;
