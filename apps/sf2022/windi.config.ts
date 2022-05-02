import { defineConfig } from "windicss/helpers";

export default defineConfig({
  theme: {
    extend: {
      backgroundColor: { DEFAULT: "var(--sf-background-color)" },
      textColor: { DEFAULT: "var(--sf-text-color)" },
      borderColor: { DEFAULT: "var(--sf-divider-color)" },
    },
  },
});
