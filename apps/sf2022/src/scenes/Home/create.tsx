import { ReactNode, HTMLAttributes } from "react";
import { PeekingDiv, PeekingText } from "./peeking";
import { ReactComponent as GithubLogo } from "./icons/github.svg";
import { ReactComponent as LinkedInLogo } from "./icons/linkedin.svg";

const Project = (props: { id: string; name: string }) => {
  const { id, name } = props;

  return (
    <div className="py-10 grid grid-cols-4">
      <div className="col-span-1">{id}/</div>
      <div className="col-span-2">{name}</div>
      <div className="col-span-1 text-right">+</div>
    </div>
  );
};

const SocialButton = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, children } = props;

  return (
    <div
      className={`${className} col-span-2 h-213px border-1 flex justify-center items-center raleway font-bold text-32px flex space-x-5`}
    >
      {children}
    </div>
  );
};

const CreateSection = () => {
  return (
    <section className="p-10">
      <div className="grid grid-cols-8 items-start">
        <div className="col-span-4 pt-100px grid grid-cols-4">
          <PeekingText
            spring={{ tension: 200 }}
            className="text-96px col-span-4"
          >
            I CREATE
          </PeekingText>
          <PeekingDiv className="mt-100px col-span-2">
            <p className="raleway text-22px text-justify leading-2em tracking-0.2em">
              I AM A DEVELOPER WITH OVER 7 YEARS OF EXPERIENCE CREATING
              WEBSITES, APPS, AND GAMES FOR SMALL BUSINESSES AND LARGE
              ENTERPRISES
            </p>
          </PeekingDiv>
        </div>
        <div className="col-span-4 mt-110px divide-y-1 border-t-1 border-b-1">
          <Project id="001" name="WanderSeat" />
          <Project id="002" name="WanderSeat" />
          <Project id="003" name="WanderSeat" />
        </div>
      </div>
      <div className="grid grid-cols-8 mt-120px">
        <SocialButton>
          <GithubLogo width={32} height={32} />
          <span>LinkedIn</span>
        </SocialButton>
        <SocialButton className="col-start-4">
          <LinkedInLogo width={32} height={32} />
          <span>GitHub</span>
        </SocialButton>
        <SocialButton className="col-start-7">
          <span>Resume</span>
        </SocialButton>
      </div>
    </section>
  );
};

export default CreateSection;
