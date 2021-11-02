import { useCursorPosition } from "base";
import "./index.css";

const Pointer = () => {
  const cursorPosition = useCursorPosition();

  return (
    <div
      className={
        "w-1 h-1 absolute rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      }
      style={{ left: cursorPosition[0], top: cursorPosition[1] }}
    />
  );
};

export default Pointer;
