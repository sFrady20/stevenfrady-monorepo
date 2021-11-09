import { useCursorSpring, useTransform, motion } from "base";
import { ReactNode } from "react";

const PageTilt = (props: { children: ReactNode }) => {
  const { children } = props;

  const cursorSpring = useCursorSpring({ stiffness: 50, damping: 5 });
  const transformX = useTransform(cursorSpring.x, [0, 1080], [0, 5]);
  const transformY = useTransform(cursorSpring.y, [0, 1080], [0, 5]);

  return (
    <motion.div style={{ translateX: transformX, translateY: transformY }}>
      {children}
    </motion.div>
  );
};

export default PageTilt;
