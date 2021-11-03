import { motion, MotionValue, useSpring } from "framer-motion";
import { merge } from "lodash";
import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { Vector2 } from "three";
import { createContext, useContextSelector } from "use-context-selector";

type ScrollContextType = {
  scrollX: MotionValue<any>;
  scrollY: MotionValue<any>;
  scrollRef: Vector2;
};
const defaultScrollContext: ScrollContextType = {
  scrollX: undefined as any,
  scrollY: undefined as any,
  scrollRef: undefined as any,
};
const ScrollContext = createContext(defaultScrollContext);

const ScrollProvider = (props: {
  children?: ReactNode;
  springOptions?: Parameters<typeof useSpring>[1];
}) => {
  const { children, springOptions } = props;

  const opts = useMemo(
    () =>
      merge<typeof springOptions, typeof springOptions>(
        {
          stiffness: 200,
          damping: 50,
        },
        springOptions
      ),
    []
  );

  const scrollX = useSpring(window.scrollX, opts);
  const scrollY = useSpring(window.scrollY, opts);
  const scrollRef = useRef(new Vector2(0, 0)).current;

  useEffect(() => {
    scrollX.onChange((x) => scrollRef.setX(x));
    scrollY.onChange((y) => scrollRef.setY(y));
  }, []);

  const root = useMemo(
    () => document.querySelector<HTMLDivElement>("#root"),
    []
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const adjust = () => {
    root.style.height = `${containerRef.current.clientHeight - 1}px`;
  };

  //body height
  useEffect(() => {
    adjust();
    const observer = new ResizeObserver(() => {
      adjust();
    });
    const listener = (e: Event) => {
      adjust();
    };
    observer.observe(containerRef.current);
    window.addEventListener("resize", listener);
    return () => {
      observer.unobserve(containerRef.current);
      window.removeEventListener("resize", listener);
    };
  }, []);

  //scrolling
  useEffect(() => {
    const listener = (e: Event) => {
      scrollX.set(window.scrollX);
      scrollY.set(window.scrollY);
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        scrollX,
        scrollY,
        scrollRef,
      }}
    >
      <motion.div
        ref={containerRef}
        transformTemplate={({ x, y }) => `translateX(-${x}) translateY(-${y})`}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          x: scrollX,
          y: scrollY,
        }}
      >
        {children}
      </motion.div>
    </ScrollContext.Provider>
  );
};

const useScroll = () =>
  useContextSelector(ScrollContext, (s) => ({ x: s.scrollX, y: s.scrollY }));
const useScrollRef = () =>
  useContextSelector(ScrollContext, (s) => s.scrollRef);

const ScrollOutlet = (props: { children?: ReactNode }) => {
  const { children } = props;
  const root = useMemo(() => document.querySelector("#root"), []);
  return createPortal(children, root);
};

export {
  ScrollContextType,
  ScrollContext,
  ScrollProvider,
  ScrollOutlet,
  useScroll,
  useScrollRef,
};
