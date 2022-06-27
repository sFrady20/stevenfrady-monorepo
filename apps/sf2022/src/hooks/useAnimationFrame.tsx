import React, { useCallback, useEffect, useRef } from "react";

const useAnimationFrame = (callback: (time: number) => void) => {
  const handle = useRef(0);
  const startTime = useRef(Date.now()).current;

  const frame = useCallback(() => {
    callback(Date.now() - startTime);
    handle.current = window.requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    handle.current = window.requestAnimationFrame(frame);
    return () => {
      window.cancelAnimationFrame(handle.current);
    };
  }, []);
};

export default useAnimationFrame;
