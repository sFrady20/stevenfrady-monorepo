import { PeekingDiv, PeekingText } from "./peeking";

const Initiative = () => {
  return (
    <div className="py-4 grid grid-cols-4">
      <div className="col-span-1">01/</div>
      <div className="col-span-2">WanderSeat</div>
      <div className="col-span-1 text-right">+</div>
    </div>
  );
};

const Shader = () => {
  return (
    <div className="border-1 text-center leading-2em raleway font-semibold">
      /001
    </div>
  );
};

const ExploreSection = () => {
  return (
    <section className="p-10">
      <div className="grid grid-cols-8 items-start">
        <div className="col-span-4 grid mt-210px">
          <div className="col-span-4 grid grid-cols-4 border-t-1 pt-10">
            <div className="col-span-1">
              <div>SHADER STUDIES</div>
              <div className="grid grid-cols-3 gap-3 mt-10">
                <Shader />
                <Shader />
                <Shader />
                <Shader />
                <Shader />
                <Shader />
                <Shader />
              </div>
            </div>
            <div className="col-span-2 col-start-3 h-333px border-1"></div>
          </div>
          <div className="col-span-4 grid grid-cols-4 mt-148px">
            <div className="col-span-3 col-start-2 divide-y-1 border-t-1  border-b-1">
              <Initiative />
              <Initiative />
              <Initiative />
            </div>
          </div>
        </div>
        <div className="col-span-3 col-start-6 pt-100px grid grid-cols-3">
          <PeekingText
            spring={{ tension: 200 }}
            className="text-96px col-span-3"
          >
            I EXPLORE
          </PeekingText>
          <PeekingDiv className="mt-100px col-span-2">
            <p className="raleway text-22px text-justify leading-2em tracking-0.2em uppercase">
              My hobbies include soccer, guitar, basketball, video games,
              Goofing off, buying hi, selling low, and surfing the web 🏄‍♂️
            </p>
          </PeekingDiv>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
