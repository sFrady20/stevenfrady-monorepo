import { ReactNode, useEffect, useRef } from "react";
import { Vector2 } from "three";
import { useContextSelector, createContext } from "use-context-selector";
import { MotionValue, useSpring, useMotionValue } from "framer-motion";

type CursorContextType = {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  cursorDown: MotionValue<number>;
  cursorRef: Vector2;
};
const defaultCursorContext: CursorContextType = {
  cursorX: undefined as any,
  cursorY: undefined as any,
  cursorDown: undefined as any,
  cursorRef: undefined as any,
};
const CursorContext = createContext(defaultCursorContext);

const CursorProvider = (props: { children?: ReactNode }) => {
  const { children } = props;

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorDown = useMotionValue(0);
  const cursorRef = useRef(new Vector2()).current;

  //ref listeners
  //todo: make hook for automatically ref-ing motionvalues / vec2s of motionvalues
  useEffect(() => {
    cursorX.onChange((x) => cursorRef.setX(x));
    cursorY.onChange((y) => cursorRef.setY(y));
  }, []);

  //add movement listeners
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      cursorX.set(x);
      cursorY.set(y);
    };
    document.addEventListener("mousemove", listener);
    return () => {
      document.removeEventListener("mousemove", listener);
    };
  }, []);

  //add mousedown listeners
  useEffect(() => {
    const downListener = (e: MouseEvent) => {
      cursorDown.set(1);
    };
    const upListener = (e: MouseEvent) => {
      cursorDown.set(0);
    };
    document.addEventListener("mousedown", downListener);
    document.addEventListener("mouseup", upListener);
    document.addEventListener("mouseout", upListener);
    return () => {
      document.removeEventListener("mousedown", downListener);
      document.removeEventListener("mouseup", upListener);
      document.removeEventListener("mouseout", upListener);
    };
  }, []);

  return (
    <CursorContext.Provider
      value={{
        cursorX,
        cursorY,
        cursorDown,
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
const useCursorDown = () =>
  useContextSelector(CursorContext, (c) => c.cursorDown);
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
  useCursorDown,
  useCursorRef,
  useCursorSpring,
  useCursorSpringRef,
  CursorProvider,
};
