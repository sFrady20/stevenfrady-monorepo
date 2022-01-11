import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import WindiCSS from "vite-plugin-windicss";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCSS(), glsl()],
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
