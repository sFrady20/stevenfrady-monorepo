import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Vector2 } from "three";
import { useContextSelector, createContext } from "use-context-selector";
import { useScrollRef } from "..";

type CursorContextType = {
  cursorPosition: [number, number];
  cursorPositionRef: Vector2;
  isContext: boolean;
};
const defaultCursorContext: CursorContextType = {
  cursorPosition: [0, 0],
  cursorPositionRef: new Vector2(0, 0),
  isContext: false,
};
const CursorContext = createContext(defaultCursorContext);

const CursorProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const cursorPositionRef = useRef(new Vector2()).current;

  const [cursorPosition, setCursorPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const scrollRef = useScrollRef();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY + scrollRef.y;

      cursorPositionRef.set(x, y);
      setCursorPosition([x, y]);
    };
    document.addEventListener("mousemove", listener);
    return () => {
      document.removeEventListener("mousemove", listener);
    };
  }, []);

  return (
    <CursorContext.Provider
      value={{ cursorPosition, cursorPositionRef, isContext: true }}
    >
      {children}
    </CursorContext.Provider>
  );
};

const useCursorPosition = () =>
  useContextSelector(CursorContext, (c) => c.cursorPosition);

const useCursorPositionRef = () =>
  useContextSelector(CursorContext, (c) => c.cursorPositionRef);

export {
  CursorContext,
  CursorContextType,
  useCursorPosition,
  useCursorPositionRef,
  CursorProvider,
};
