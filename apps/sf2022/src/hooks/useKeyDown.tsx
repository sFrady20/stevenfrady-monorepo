import { DependencyList, useEffect } from "react";

const useKeyDown = (
  key: string | string[],
  handler: (e: KeyboardEvent) => void,
  deps?: DependencyList
) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (Array.isArray(key) ? key.includes(e.key) : e.key === key) handler(e);
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [key, ...(deps || [])]);
};

export default useKeyDown;
