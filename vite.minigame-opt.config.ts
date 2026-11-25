import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 优化版（quick 改动）微信小游戏构建：核心来自 minigame-opt/core.js
export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  build: {
    outDir: "minigame-opt/dist",
    emptyOutDir: true,
    target: "es2017",
    lib: {
      entry: path.resolve(__dirname, "minigame-opt/main-optimized.ts"),
      formats: ["iife"],
      name: "DuckOpsOptimized",
      fileName: () => "game.js",
    },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
