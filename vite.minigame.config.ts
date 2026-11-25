import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Builds a single self-contained game.js for the WeChat Mini Game runtime.
export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  build: {
    outDir: "minigame",
    emptyOutDir: false,
    target: "es2017",
    lib: {
      entry: path.resolve(__dirname, "src/minigame/main.ts"),
      formats: ["iife"],
      name: "DuckOpsMiniGame",
      fileName: () => "game.js",
    },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
