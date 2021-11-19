const BottomBar = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-40px flex items-center px-5 text-size-10px bg-gradient-to-t from-dark-900 to-transparent space-x-4">
      <h1>Steven Frady</h1>
      <span className="h-1 w-1 bg-white rounded-full" />
      <div>Under Construction</div>
      <span className="h-1 w-1 bg-white rounded-full" />
      <a
        className="opacity-50 hover:opacity-100 hover:underline transition"
        href="mailto:sfrady20@gmail.com"
      >
        sfrady20@gmail.com
      </a>
      <span className="h-1 w-1 bg-white rounded-full" />
      <a
        className="opacity-50 hover:opacity-100 hover:underline transition"
        href="https://www.linkedin.com/in/stevenfrady/"
        target="_blank"
      >
        LinkedIn
      </a>
      <span className="h-1 w-1 bg-white rounded-full" />
      <a
        className="opacity-50 hover:opacity-100 hover:underline transition"
        href="https://github.com/sFrady20"
        target="_blank"
      >
        GitHub
      </a>
      {/* 
      <>Case Studies</>
      <>Experiments</>
      */}
    </div>
  );
};

export default BottomBar;
