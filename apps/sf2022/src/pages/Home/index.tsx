import { Link } from "react-router-dom";
import Title from "../../components/Title";

const HomePage = () => {
  return (
    <div className="text-center w-full min-h-screen flex flex-col justify-center">
      <Title />
      <div className="text-size-12px flex justify-center items-center space-x-5 pt-10">
        <h1>Steven Frady</h1>
        <span className="h-1 w-1 bg-white rounded-full" />
        <div>Under Construction</div>
        <span className="h-1 w-1 bg-white rounded-full" />
        <a href="mailto:sfrady20@gmail.com">sfrady20@gmail.com</a>
        <span className="h-1 w-1 bg-white rounded-full" />
        <a href="https://www.linkedin.com/in/stevenfrady/" target="_blank">
          LinkedIn
        </a>
        <span className="h-1 w-1 bg-white rounded-full" />
        <a href="https://github.com/sFrady20" target="_blank">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default HomePage;
