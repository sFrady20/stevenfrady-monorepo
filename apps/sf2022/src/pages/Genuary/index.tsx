import { ScrollOutlet, ShaderCanvas } from "base";
import React, { useMemo } from "react";
import { useParams } from "react-router";
import { useAsync } from "react-async-hook";
import { Link } from "react-router-dom";
import prompts from "./prompts";
import { TextureLoader } from "three";
import pipeImg from "./images/pipe.jpg";

const loader = new TextureLoader();

const getShaderForDay = async (day?: string) =>
  (await import(/* @vite-ignore */ `./shaders/${day}.frag.glsl`)).default;

const loadTexture = async (url?: string) => {
  if (!url) return undefined;
  return loader.load(url);
};

const GenuaryPage = () => {
  const { day: dayStr } = useParams();

  const day = useMemo(() => parseInt(dayStr || ""), [dayStr]);
  const todaysPrompt = useMemo(() => prompts[day], []);
  const shaderLoader = useAsync(getShaderForDay, [`${day}`]);
  const pipeImage = useMemo(() => loader.load(pipeImg), [pipeImg]);

  return (
    <ScrollOutlet>
      <div className="absolute inset-0">
        {shaderLoader.loading ? (
          <div className="absolute inset-0 flex justify-center items-center">
            "Loading..."
          </div>
        ) : shaderLoader.error ? (
          <div className="absolute inset-0 flex justify-center items-center text-red-500">
            {process.env.NODE_ENV === "production"
              ? "Error"
              : shaderLoader.error.message}
          </div>
        ) : (
          <div className="absolute inset-0">
            <ShaderCanvas
              frag={shaderLoader.result}
              uniforms={{ image: { value: pipeImage } }}
            />
          </div>
        )}
      </div>
      {todaysPrompt && (
        <>
          <div className="absolute left-4 top-4 uppercase flex flex-col items-start">
            <div className="bg-black">{`Day ${day}: ${todaysPrompt.prompt}`}</div>
            <div className="text-size-10px bg-black">
              prompt credited to:{" "}
              <Link to={todaysPrompt.ceditLink}>{todaysPrompt.credit}</Link>
            </div>
          </div>
        </>
      )}
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
