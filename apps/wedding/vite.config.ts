import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "vite-plugin-react-svg";
import WindiCSS from "vite-plugin-windicss";
import svgLoader from "vite-plugin-react-svg";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactRefresh(),
    WindiCSS(),
    svgLoader({ defaultExport: "component" }),
    glsl(),
  ],
  optimizeDeps: {
    entries: ["base"],
  },
  resolve: {
    alias: {
      "~": resolve(process.cwd(), "./src"),
      base: resolve(process.cwd(), "../../packages/base/src"),
    },
  },
});
