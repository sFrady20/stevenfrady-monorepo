import { useCursor, useCursorSpring, useCursorDown, ScrollOutlet } from "base";
import { motion, useSpring, useTransform } from "base";

const Pointer = () => {
  const cursor = useCursor();
  const cursorDown = useCursorDown();
  const cursorSpring = useCursorSpring({ stiffness: 700, damping: 45 });

  const cursorDownSpring = useSpring(cursorDown, {
    stiffness: 600,
    damping: 20,
  });
  const scaleValue = useTransform(cursorDownSpring, [0, 1], [1, 0.7]);

  return (
    <ScrollOutlet>
      <motion.div
        className={
          "w-1 h-1 fixed rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-exclusion z-100"
        }
        style={{
          left: cursor.x,
          top: cursor.y,
        }}
      />
      <motion.div
        className={
          "w-7 h-7 fixed rounded-full border-width-2px border-white transform pointer-events-none mix-blend-exclusion z-100"
        }
        style={{
          left: cursorSpring.x,
          top: cursorSpring.y,
          scale: scaleValue,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </ScrollOutlet>
  );
};

export default Pointer;
