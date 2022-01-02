import { ScrollOutlet, ShaderCanvas } from "base";
import React from "react";
import { useParams } from "react-router";
import { useAsync } from "react-async-hook";

import Day1 from "./1.frag.glsl";

const getShaderForDay = async (day?: string) => "";

const GenuaryPage = () => {
  const { day } = useParams();

  const shaderLoader = useAsync(getShaderForDay, [day]);

  return (
    <ScrollOutlet>
      <div className="absolute inset-0">
        {shaderLoader.loading ? (
          "Loading..."
        ) : shaderLoader.error ? (
          "Error"
        ) : (
          <div className="absolute inset-0">
            <ShaderCanvas frag={Day1} />
          </div>
        )}
      </div>
    </ScrollOutlet>
  );
};

export default GenuaryPage;
