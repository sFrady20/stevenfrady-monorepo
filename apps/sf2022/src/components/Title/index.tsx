import { useEffect, useRef } from "react";

const Title = () => {
  return (
    <>
      <svg
        style={{
          position: "absolute",
          top: -99999,
        }}
      >
        <filter id="outliner" filterUnits="objectBoundingBox">
          <feMorphology operator="dilate" radius="3" in="SourceGraphic" />
          <feComposite operator="out" in2="SourceGraphic" result="composite" />
        </filter>
      </svg>

      <h1
        className="text-size-9rem text-gray-50 font-extrabold relative"
        style={{ filter: "url(#outliner)" }}
      >
        CREATIVE
        <br />
        DEVELOPER
      </h1>
    </>
  );
};

export default Title;
