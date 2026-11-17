import { next } from "@vercel/functions";
import {
  isEdgePassthrough,
  isMaintenanceDisabled,
  MAINTENANCE_HTML,
  MAINTENANCE_ROBOTS,
} from "./src/lib/maintenance-mode.mjs";

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!assets/).*)"],
};

function maintenanceResponse(): Response {
  return new Response(MAINTENANCE_HTML, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": MAINTENANCE_ROBOTS,
    },
  });
}

/**
 * Public URLs get the maintenance document.
 * Admin, private areas, and the files they load continue to the existing app.
 * Unexpected errors fail open so a bug here cannot lock /admin.
 */
export default function middleware(request: Request): Response {
  try {
    if (isMaintenanceDisabled(process.env.VITE_MAINTENANCE_MODE)) {
      return next();
    }

    const { pathname } = new URL(request.url);
    if (isEdgePassthrough(pathname)) {
      return next();
    }

    return maintenanceResponse();
  } catch {
    return next();
  }
}
