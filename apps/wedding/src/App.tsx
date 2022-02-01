import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "virtual:windi.css";
import {
  ShaderCanvas,
  ScrollProvider,
  CursorProvider,
  UniformsProvider,
  ScrollOutlet,
} from "base";
import frag from "~/shaders/background.frag.glsl?raw";
import Router from "./components/Router";

const App = () => {
  return (
    <ScrollProvider>
      <CursorProvider>
        <UniformsProvider>
          <ScrollOutlet>
            <div className="fixed inset-0 z-0">
              <ShaderCanvas uniforms={{}} frag={frag} vert="" />
            </div>
          </ScrollOutlet>
          <div className="relative z-20">
            <Router />
          </div>
        </UniformsProvider>
      </CursorProvider>
    </ScrollProvider>
  );
};

export default App;
