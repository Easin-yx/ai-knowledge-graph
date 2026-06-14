import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base 必须与 GitHub 仓库名一致，否则 GitHub Pages 资源路径会 404
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/ai-knowledge-graph/",
});
