import { useFrame } from "@react-three/fiber";
import { useScroll, ScrollControlsState } from "@react-three/drei";
import { HTMLAttributes, useMemo } from "react";
import { animated, useTrail, SpringConfig, useSpring } from "react-spring";

type Ranges = [number, number, number, number];
export const calcRangePresence = (
  scroll: ScrollControlsState,
  ranges: Ranges
) => {
  const ignoreStartRange = !ranges[0] && !ranges[1];
  const ignoreEndRange = !ranges[2] && !ranges[3];

  return (
    (ignoreStartRange ? 1 : scroll.range(ranges[0], ranges[1])) *
    (ignoreEndRange ? 1 : 1 - scroll.range(ranges[2], ranges[3]))
  );
};

export const PeekingText = (
  props: {
    children: string;
    spring?: SpringConfig;
    ranges: [number, number, number, number];
  } & HTMLAttributes<HTMLSpanElement>
) => {
  const { children, spring, ranges, className, ...rest } = props;

  const scroll = useScroll();
  const chars = useMemo(() => children.split(""), [children]);

  const [trail, trailApi] = useTrail(chars.length, () => ({
    presence: 0,
    config: spring,
  }));

  useFrame(() => {
    const rangePresence = calcRangePresence(scroll, ranges);
    trailApi.start({
      presence: rangePresence,
      config: spring,
    });
  });

  return (
    <span
      {...rest}
      className={`${className} overflow-hidden inline-block h-1em`}
    >
      {chars.map((c, i) => (
        <animated.span
          key={i}
          className="inline-block whitespace-pre"
          style={{
            translateY: trail[i]?.presence.to(
              (x) => `${Math.round((100 - x * 100) * 100) / 100}%`
            ),
          }}
        >
          {c}
        </animated.span>
      ))}
    </span>
  );
};

export const PeekingImage = (
  props: {
    src: string;
    ranges: Ranges;
    spring?: SpringConfig;
  } & HTMLAttributes<HTMLDivElement>
) => {
  const { src, spring, ranges, className, style, ...rest } = props;

  const scroll = useScroll();

  const [trail, trailApi] = useTrail(2, () => ({
    presence: 0,
  }));

  useFrame(() => {
    const rangePresence = calcRangePresence(scroll, ranges);
    trailApi.start({ presence: rangePresence, config: spring });
  });

  return (
    <animated.div
      {...rest}
      className={`${className} overflow-hidden`}
      style={{
        ...style,
        translateY: trail[0].presence.to([0, 1], [`-50%`, `0%`]),
        height: trail[0].presence.to([0, 1], [`0%`, style?.height as string]),
      }}
    >
      <animated.img
        className="absolute w-full h-full object-cover"
        src={src}
        style={{ scale: trail[1].presence.to([0, 1], [1.3, 1]) }}
      />
    </animated.div>
  );
};

export const PeekingDiv = (
  props: {
    ranges: Ranges;
    spring?: SpringConfig;
  } & HTMLAttributes<HTMLDivElement>
) => {
  const { spring, ranges, style, children, ...rest } = props;

  const scroll = useScroll();

  const [spr, springApi] = useSpring(() => ({
    presence: 0,
  }));

  useFrame(() => {
    const rangePresence = calcRangePresence(scroll, ranges);
    springApi.start({ presence: rangePresence, config: spring });
  });

  return (
    <animated.div
      {...rest}
      style={{
        ...style,
        translateY: spr.presence.to([0, 1], [`-50%`, `0%`]),
        opacity: spr.presence.to([0, 1], [0, 1]),
      }}
    >
      {children}
    </animated.div>
  );
};
