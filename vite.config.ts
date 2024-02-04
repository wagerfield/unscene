import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    dts({
      include: ["src/lib/**/*.ts"],
      exclude: ["src/lib/**/*.spec.ts"],
    }),
  ],
  build: {
    copyPublicDir: false,
    minify: false,
    lib: {
      name: "unscene",
      entry: "src/lib/index.ts",
      formats: ["es", "cjs"],
    },
  },
})
