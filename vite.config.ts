import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    dts({
      include: ["src/unscene/*.ts"],
    }),
  ],
  build: {
    copyPublicDir: false,
    minify: false,
    lib: {
      name: "unscene",
      entry: "src/unscene/index.ts",
      formats: ["es", "cjs"],
    },
  },
})
