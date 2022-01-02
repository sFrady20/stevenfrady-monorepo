import { ScrollOutlet, ShaderCanvas } from "base";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useAsync } from "react-async-hook";
import { Link } from "react-router-dom";

const getShaderForDay = async (day?: string) =>
  (await import(/* @vite-ignore */ `./${day}.frag.glsl`)).default;

const GenuaryPage = () => {
  const { day: dayStr } = useParams();

  const [day, setDay] = useState(parseInt(dayStr || ""));

  const shaderLoader = useAsync(getShaderForDay, [`${day}`]);

  return (
    <ScrollOutlet>
      <div className="absolute inset-0">
        {shaderLoader.loading ? (
          <div className="absolute inset-0 flex justify-center items-center">
            "Loading..."
          </div>
        ) : shaderLoader.error ? (
          <div className="absolute inset-0 flex justify-center items-center text-red-500">
            {shaderLoader.error.message}
          </div>
        ) : (
          <div className="absolute inset-0">
            <ShaderCanvas frag={shaderLoader.result} />
          </div>
        )}
      </div>
      <div className="absolute right-4 bottom-40px flex flex-row space-x-3">
        <Link
          to={`/genuary/${day - 1}`}
          className="rounded-full bg-black w-32px h-32px flex justify-center items-center cursor-pointer opacity-50 hover:opacity-100"
        >
          {"<"}
        </Link>
        <Link
          to={`/genuary/${day + 1}`}
          className="rounded-full bg-black w-32px h-32px flex justify-center items-center cursor-pointer opacity-50 hover:opacity-100"
        >
          {">"}
        </Link>
      </div>
    </ScrollOutlet>
  );
};

export default GenuaryPage;
