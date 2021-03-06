import { ScrollOutlet } from "base";
import { Link } from "react-router-dom";

const BottomBar = () => {
  return (
    <ScrollOutlet>
      <div className="fixed bottom-0 left-0 w-full h-40px flex items-center px-5 text-size-10px space-x-4 z-50">
        <Link to="/">
          <h1>SF22</h1>
        </Link>
        <span className="h-1 w-1 bg-white rounded-full <md:hidden" />
        <a
          className="opacity-50 hover:opacity-100 hover:underline transition <md:hidden"
          href="mailto:sfrady20@gmail.com"
        >
          sfrady20@gmail.com
        </a>
        <span className="h-1 w-1 bg-white rounded-full <md:hidden" />
        <a
          className="opacity-50 hover:opacity-100 hover:underline transition <md:hidden"
          href="https://www.linkedin.com/in/stevenfrady/"
          target="_blank"
        >
          LinkedIn
        </a>
        <span className="h-1 w-1 bg-white rounded-full <md:hidden" />
        <a
          className="opacity-50 hover:opacity-100 hover:underline transition <md:hidden"
          href="https://github.com/sFrady20"
          target="_blank"
        >
          GitHub
        </a>
        <span className="h-1 w-1 bg-white rounded-full <md:hidden" />
        <a
          className="opacity-50 hover:opacity-100 hover:underline transition <md:hidden"
          href="https://twitter.com/slowjamsteve"
          target="_blank"
        >
          Twitter
        </a>
      </div>
    </ScrollOutlet>
  );
};

export default BottomBar;
