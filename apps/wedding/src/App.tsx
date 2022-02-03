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
import backgroundFrag from "~/shaders/background.frag.glsl?raw";
import foregroundFrag from "~/shaders/foreground.frag.glsl?raw";
import Router from "./components/Router";

const App = () => {
  return (
    <ScrollProvider>
      <CursorProvider>
        <UniformsProvider>
          <ScrollOutlet>
            <div className="fixed inset-0 z-0">
              <ShaderCanvas frag={backgroundFrag} vert="" />
            </div>
          </ScrollOutlet>
          <div className="relative z-20">
            <Router />
          </div>
          <ScrollOutlet>
            <div className="fixed inset-0 z-40 pointer-events-none">
              <ShaderCanvas frag={foregroundFrag} vert="" />
            </div>
          </ScrollOutlet>
        </UniformsProvider>
      </CursorProvider>
    </ScrollProvider>
  );
};

export default App;
