import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useMemo } from "react";
import { animated, useTrail } from "react-spring";

const ScrollContent = (props: { index: number; distance?: number }) => {
  const { index, distance = 9 } = props;

  const chars = useMemo(() => "SCROLL".split(""), []);

  const scroll = useScroll();

  const [trail, trailApi] = useTrail(1 + chars.length, () => ({
    scroll: 0 + index,
    loop: true,
  }));

  useFrame(() => {
    trailApi.start({
      scroll: scroll.offset * distance + index,
      config: {
        tension: 1200,
        friction: 55,
      },
    });
  });

  return (
    <div className="flex items-center justify-center space-x-8 text-20px absolute left-0 w-full">
      <div className="transform-gpu" style={{ transform: "scaleX(-1)" }}>
        {chars.map((c, i) => (
          <animated.span
            className="inline-block"
            style={{
              translateY: trail[1 + i].scroll.to(
                (x) => `${((x * 100 + 300) % 300) - 100}px`
              ),
            }}
          >
            {c}
          </animated.span>
        ))}
      </div>
      <animated.div
        className="w-15 h-15 flex items-center justify-center"
        style={{
          translateY: trail[0].scroll.to(
            (x) => `${((x * 100 + 300) % 300) - 100}px`
          ),
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 52 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50.9659 36.5052L28.4966 58.9663C27.1178 60.3446 24.8822 60.3446 23.5034 58.9663L1.03412 36.5052C-0.344707 35.1269 -0.344708 32.8922 1.03412 31.5139C2.41295 30.1356 4.64846 30.1356 6.02729 31.5139L22.4693 47.9498L22.4693 1.29083e-06L29.5307 9.82164e-07L29.5307 47.9498L45.9727 31.5139C47.3515 30.1356 49.5871 30.1356 50.9659 31.5139C52.3447 32.8922 52.3447 35.1269 50.9659 36.5052Z"
            fill="currentColor"
          />
        </svg>
      </animated.div>
      <div>
        {chars.map((c, i) => (
          <animated.span
            className="inline-block"
            style={{
              translateY: trail[1 + i].scroll.to(
                (x) => `${((x * 100 + 300) % 300) - 100}px`
              ),
            }}
          >
            {c}
          </animated.span>
        ))}
      </div>
    </div>
  );
};

const Scroller = () => {
  const size = useThree((x) => x.size);

  return (
    <div
      className="col-start-3 col-end-7 border-black border-l-1 border-r-1 h-10 flex justify-center items-end overflow-hidden"
      style={{ height: 100, top: size.height - 80 - 130 }}
    >
      <ScrollContent index={-1} />
      <ScrollContent index={0} />
      <ScrollContent index={1} />
    </div>
  );
};

export default Scroller;
