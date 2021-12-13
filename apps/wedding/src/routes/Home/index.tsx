import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-size-200px">Ariana & Steven</h1>
          <div className="flex space-x-12 text-size-24px">
            <h3>September 16th, 2022</h3>
            <span>•</span>
            <h3>Savannah, Georgia</h3>
          </div>
        </div>
      </div>
      {/* <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
      <div className="p-40px bg-white shadow-dark-700">
        
      </div>
    </div> */}
    </>
  );
};

export default HomePage;
