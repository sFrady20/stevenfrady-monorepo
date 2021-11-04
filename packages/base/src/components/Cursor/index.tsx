import React, { ReactNode, useEffect, useRef } from "react";
import { Vector2 } from "three";
import { useContextSelector, createContext } from "use-context-selector";
import { MotionValue, useSpring, useMotionValue } from "framer-motion";

type CursorContextType = {
  cursorX: MotionValue<any>;
  cursorY: MotionValue<any>;
  cursorRef: Vector2;
};
const defaultCursorContext: CursorContextType = {
  cursorX: undefined as any,
  cursorY: undefined as any,
  cursorRef: undefined as any,
};
const CursorContext = createContext(defaultCursorContext);

const CursorProvider = (props: { children?: ReactNode }) => {
  const { children } = props;

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef(new Vector2()).current;

  //ref listeners
  useEffect(() => {
    cursorX.onChange((x) => cursorRef.setX(x));
    cursorY.onChange((y) => cursorRef.setY(y));
  }, []);

  //listen for mousemoves
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const x = e.pageX;
      const y = e.pageY;

      cursorX.set(x);
      cursorY.set(y);
    };
    document.addEventListener("mousemove", listener);
    return () => {
      document.removeEventListener("mousemove", listener);
    };
  }, []);

  return (
    <CursorContext.Provider
      value={{
        cursorX,
        cursorY,
        cursorRef,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

const useCursor = () =>
  useContextSelector(CursorContext, (c) => ({ x: c.cursorX, y: c.cursorY }));
const useCursorRef = () =>
  useContextSelector(CursorContext, (c) => c.cursorRef);
const useCursorSpring = (springOptions?: Parameters<typeof useSpring>[1]) => {
  const cursor = useCursor();
  const x = useSpring(cursor.x, springOptions);
  const y = useSpring(cursor.y, springOptions);
  return { x, y };
};
const useCursorSpringRef = (
  springOptions?: Parameters<typeof useSpring>[1]
) => {
  const cursor = useCursorSpring(springOptions);
  const ref = useRef<Vector2>(new Vector2()).current;

  useEffect(() => {
    cursor.x.onChange((x) => ref.setX(x));
    cursor.y.onChange((y) => ref.setY(y));
  }, [cursor.x, cursor.y]);

  return ref;
};

export type { CursorContextType };
export {
  CursorContext,
  useCursor,
  useCursorRef,
  useCursorSpring,
  useCursorSpringRef,
  CursorProvider,
};
