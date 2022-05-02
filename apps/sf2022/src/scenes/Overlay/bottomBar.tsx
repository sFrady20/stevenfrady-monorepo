const BottomBar = () => {
  return (
    <div className="w-full h-40px flex items-center px-5 text-size-10px space-x-4 z-50">
      <a href="/">
        <h1>SF22</h1>
      </a>
      <span className="h-1 w-1 bg-black rounded-full <md:hidden" />
      <a
        className="opacity-50 hover:opacity-100 hover:underline transition <md:hidden"
        href="mailto:sfrady20@gmail.com"
      >
        sfrady20@gmail.com
      </a>
      <span className="h-1 w-1 bg-black rounded-full <md:hidden" />
      <a
        className="opacity-50 hover:opacity-100 hover:underline transition <md:hidden"
        href="https://www.linkedin.com/in/stevenfrady/"
        target="_blank"
      >
        LI
      </a>
      <span className="h-1 w-1 bg-black rounded-full <md:hidden" />
      <a
        className="opacity-50 hover:opacity-100 hover:underline transition <md:hidden"
        href="https://github.com/sFrady20"
        target="_blank"
      >
        GH
      </a>
      <span className="h-1 w-1 bg-black rounded-full <md:hidden" />
      <a
        className="opacity-50 hover:opacity-100 hover:underline transition <md:hidden"
        href="https://twitter.com/slowjamsteve"
        target="_blank"
      >
        TW
      </a>
    </div>
  );
};

export default BottomBar;
