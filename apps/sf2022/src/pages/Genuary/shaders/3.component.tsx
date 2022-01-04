import { useCursorSpringRef, useUniforms } from "base";
import React, { memo } from "react";

export default memo(() => {
  const spring = useCursorSpringRef({ stiffness: 150, damping: 200 });

  useUniforms(
    {
      cursorSpring: { value: spring },
    },
    [spring]
  );

  return <></>;
});
