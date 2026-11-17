import path from "path";
import type { Connect, Plugin, PreviewServer, ViteDevServer } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import {
  isEdgePassthrough,
  isMaintenanceDisabled,
  MAINTENANCE_HTML,
  MAINTENANCE_ROBOTS,
} from "./src/lib/maintenance-mode.mjs";

function maintenanceGate(devServer: boolean): Connect.NextHandleFunction {
  return (req, res, next) => {
    const method = req.method ?? "GET";
    if (method !== "GET" && method !== "HEAD") {
      next();
      return;
    }

    const url = req.url ?? "/";
    if (isEdgePassthrough(url, { devServer })) {
      next();
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", MAINTENANCE_ROBOTS);
    res.end(method === "HEAD" ? undefined : MAINTENANCE_HTML);
  };
}

/** Mirrors middleware.ts so local dev and preview block public URLs before the SPA shell. */
function maintenancePlugin(): Plugin {
  const attach = (server: ViteDevServer | PreviewServer, devServer: boolean) => {
    server.middlewares.use(maintenanceGate(devServer));
  };

  return {
    name: "maintenance-mode",
    configureServer(server) {
      attach(server, true);
    },
    configurePreviewServer(server) {
      attach(server, false);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const maintenanceEnabled = !isMaintenanceDisabled(env.VITE_MAINTENANCE_MODE);

  return {
    plugins: [react(), tailwindcss(), ...(maintenanceEnabled ? [maintenancePlugin()] : [])],
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
  };
});
