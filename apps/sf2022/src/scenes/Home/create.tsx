import { Scroll } from "@react-three/drei";
import { PeekingDiv, PeekingText } from "./peeking";

const Project = () => {
  return (
    <div className="py-10 grid grid-cols-4">
      <div className="col-span-1">01/</div>
      <div className="col-span-2">WanderSeat</div>
      <div className="col-span-1 text-right">+</div>
    </div>
  );
};

const CreateSection = () => {
  return (
    <section className="p-10">
      <div className="grid grid-cols-8 items-start">
        <div className="col-span-4 pt-100px grid grid-cols-4">
          <PeekingText
            ranges={[0.12, 0.12, 0.42, 0.43]}
            spring={{ tension: 200 }}
            className="text-96px col-span-4"
          >
            I CREATE
          </PeekingText>
          <PeekingDiv
            ranges={[0.12, 0.12, 0.42, 0.43]}
            className="mt-100px col-span-2"
          >
            <p className="raleway text-22px text-justify leading-2em tracking-0.2em">
              I AM A DEVELOPER WITH OVER 7 YEARS OF EXPERIENCE CREATING
              WEBSITES, APPS, AND GAMES FOR SMALL BUSINESSES AND LARGE
              ENTERPRISES
            </p>
          </PeekingDiv>
        </div>
        <div className="col-span-4 mt-110px divide-y-1 border-t-1 border-b-1">
          <Project />
          <Project />
          <Project />
        </div>
      </div>
      <div className="grid grid-cols-8 mt-120px">
        <div className="col-span-2 h-213px border-1 flex justify-center items-center">
          LinkedIn
        </div>
        <div className="col-span-2 col-start-4 h-213px border-1 flex justify-center items-center">
          LinkedIn
        </div>
        <div className="col-span-2 col-start-7 h-213px border-1 flex justify-center items-center">
          LinkedIn
        </div>
      </div>
    </section>
  );
};

export default CreateSection;
