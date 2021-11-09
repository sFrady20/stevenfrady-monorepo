import { useCursor, useCursorSpring, motion, useCursorDown } from "base";

const Pointer = () => {
  const cursor = useCursor();
  const cursorDown = useCursorDown();
  const cursorSpring = useCursorSpring({ stiffness: 700, damping: 45 });

  return (
    <>
      <motion.div
        className={
          "w-1 h-1 absolute rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-exclusion z-100"
        }
        style={{ left: cursor.x, top: cursor.y }}
      />
      <motion.div
        className={
          "w-7 h-7 absolute rounded-full border-width-2px border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-exclusion z-100"
        }
        style={{ left: cursorSpring.x, top: cursorSpring.y }}
      />
    </>
  );
};

export default Pointer;
