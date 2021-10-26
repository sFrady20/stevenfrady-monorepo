### How to add this to a local vite.config.json

```
...
import { resolve } from "path";

export default defineConfig({
  ...
  optimizeDeps: {
    entries: ["shaders"],
  },
  resolve: {
    alias: {
      shaders: resolve(__dirname, "../../packages/shaders/src"),
    },
  },
  ...
});
```
