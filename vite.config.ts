import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      // PDFs/images under public lock often on Windows (OneDrive) and crash the watcher
      ignored: [
        "**/.tmp-*/**",
        "**/.tmp-*",
        "**/public/documents/**",
        "**/public/**/*.pdf",
        "**/public/**/*.PDF",
        "**/public/**/*.png",
        "**/public/**/*.jpg",
        "**/public/**/*.jpeg",
        "**/public/**/*.mp3",
        "**/public/french-audio/**",
        "**/src/assets/french-audio/**",
        "**/src/assets/**/*.mp3",
      ],
    },
  },
});
