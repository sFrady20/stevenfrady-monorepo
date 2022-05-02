import { useThree } from "@react-three/fiber";
import meImg from "./me.png";
import Scroller from "./scroller";
import { PeekingDiv, PeekingImage, PeekingText } from "./peeking";

const LandingSection = () => {
  const size = useThree((x) => x.size);

  return (
    <section
      className={`grid grid-cols-8 grid-rows-max items-start p-10 h-screen min-h-969px children:(relative row-start-1)`}
      style={{ width: size.width, height: size.height }}
    >
      <PeekingDiv
        ranges={[0, 0, 0.07, 0.08]}
        className="col-start-5 col-end-7 flex space-x-5 items-center"
        style={{ top: "66%" }}
        spring={{ mass: 8 }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0L15.7942 13.5L0.205771 13.5L8 0Z" fill="currentColor" />
        </svg>
        <h1 className="uppercase raleway font-bold tracking-0.2em text-20px leading-1.5em">
          Steven Frady
        </h1>
      </PeekingDiv>
      <h2
        className="col-start-3 col-end-8 text-128px leading-tight"
        style={{ top: "15%" }}
      >
        <PeekingText ranges={[0, 0, 0.04, 0.06]} spring={{ tension: 200 }}>
          CREATIVE
        </PeekingText>
        <br />
        <PeekingText ranges={[0, 0, 0.08, 0.1]} spring={{ tension: 200 }}>
          DEVELOPER
        </PeekingText>
      </h2>
      <PeekingDiv
        ranges={[0, 0, 0.06, 0.07]}
        style={{ top: "66%" }}
        className="col-start-7 col-end-9 raleway text-sm tracking-0.2em font-bold leading-2em"
        spring={{ mass: 8 }}
      >
        <h4>
          BASED IN
          <br />
          VIRGINIA, USA
        </h4>
      </PeekingDiv>
      <div
        className="col-start-7 col-end-9 bg-opacity-5 bg-black corners"
        style={{ top: "10%", height: "45%" }}
      />
      <Scroller />
      <PeekingImage
        className="col-start-1 col-end-2"
        style={{
          top: "62%",
          height: "34%",
        }}
        spring={{ tension: 50 }}
        src={meImg}
        ranges={[0, 0, 0.1, 0.15]}
      />
    </section>
  );
};

export default LandingSection;
