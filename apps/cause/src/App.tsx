import "./App.css";
import "virtual:windi.css";
import {
  ShaderCanvas,
  ScrollProvider,
  CursorProvider,
  UniformsProvider,
} from "base";
import frag from "~/shaders/background.frag.glsl?raw";
import Router from "./components/router";

const App = () => {
  return (
    <ScrollProvider>
      <CursorProvider>
        <UniformsProvider>
          <div className="fixed inset-0 z-0">
            <ShaderCanvas uniforms={{}} frag={frag} vert="" />
          </div>
          <div className="relative z-20">
            <Router />
          </div>
        </UniformsProvider>
      </CursorProvider>
    </ScrollProvider>
  );
};

export default App;
