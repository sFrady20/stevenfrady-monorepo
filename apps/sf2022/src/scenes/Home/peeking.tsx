import { HTMLAttributes, useMemo } from "react";
import { animated, useTrail, SpringConfig } from "react-spring";
import { useSceneVisibility } from "~/components/Scene";

export const PeekingText = (
  props: {
    children: string;
    spring?: SpringConfig;
  } & HTMLAttributes<HTMLSpanElement>
) => {
  const { children, spring, className, ...rest } = props;

  const chars = useMemo(() => children.split(""), [children]);

  const [ref, visibility] = useSceneVisibility();

  const [trail] = useTrail(chars.length, () => ({
    presence: visibility,
    config: spring,
  }));

  return (
    <span
      {...rest}
      ref={ref}
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
    spring?: SpringConfig;
  } & HTMLAttributes<HTMLDivElement>
) => {
  const { src, spring, className, style, ...rest } = props;

  const [ref, visibility] = useSceneVisibility();

  const [trail] = useTrail(2, () => ({
    presence: visibility,
    config: spring,
  }));

  return (
    <animated.div
      {...rest}
      className={`${className} overflow-hidden`}
      ref={ref}
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

export const PeekingDiv = (props: {} & HTMLAttributes<HTMLDivElement>) => {
  const { style, children, ...rest } = props;

  const [ref, visibility] = useSceneVisibility();

  return (
    <animated.div
      {...rest}
      ref={ref}
      style={{
        ...style,
        translateY: visibility?.to([0, 1], [`-50%`, `0%`]),
        opacity: visibility?.to([0, 1], [0, 1]),
      }}
    >
      {children}
    </animated.div>
  );
};
