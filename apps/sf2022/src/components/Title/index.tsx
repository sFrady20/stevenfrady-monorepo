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

      <h2
        className="text-size-9rem text-gray-50 font-extrabold relative cursor-default"
        style={{ filter: "url(#outliner)" }}
      >
        CREATIVE
        <br />
        DEVELOPER
      </h2>
    </>
  );
};

export default Title;
