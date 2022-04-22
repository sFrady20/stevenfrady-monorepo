import { ScrollOutlet } from "base";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <ScrollOutlet>
      <div className="fixed top-0 left-0 w-full flex items-center text-size-10px space-x-4 z-50">
        <Link to="/">
          <h1 className="text-sm">STEVEN FRADY</h1>
        </Link>
      </div>
    </ScrollOutlet>
  );
};

export default TopBar;
