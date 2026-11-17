/** Shared by the Vercel middleware, the Vite dev/preview gate, and the React app. */

export const MAINTENANCE_EYEBROW = "Em breve";
export const MAINTENANCE_TITLE = "Site temporariamente indisponível";
export const MAINTENANCE_ROBOTS = "noindex, nofollow";

const OFF_VALUES = new Set(["0", "false", "off", "no"]);

/** Routes that keep rendering the real app while maintenance is on. */
const APP_PREFIXES = ["/admin", "/study", "/immigration", "/share", "/documents"];

/**
 * Paths the edge must not replace with the maintenance page.
 * Includes the app routes above plus files those screens load.
 */
const EDGE_PREFIXES = [
  ...APP_PREFIXES,
  "/cases",
  "/assets",
  "/french-audio",
  "/_vercel",
];

const EDGE_FILES = new Set([
  "/favicon.png",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/index.html",
]);

const DEV_SERVER_PREFIXES = ["/@", "/src", "/node_modules", "/.vite"];

export const MAINTENANCE_HTML = `<!doctype html>
<html lang="pt">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="${MAINTENANCE_ROBOTS}" />
    <meta name="googlebot" content="${MAINTENANCE_ROBOTS}" />
    <title>${MAINTENANCE_TITLE}</title>
    <link rel="icon" type="image/png" href="/favicon.png" />
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #f4f9fa;
        color: #0b0b0b;
        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      }
      main { max-width: 36rem; padding: 2rem; text-align: center; }
      p {
        margin: 0;
        color: #076269;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0.75rem 0 0;
        font-size: clamp(1.75rem, 4vw, 2.5rem);
        font-weight: 500;
        letter-spacing: -0.03em;
        line-height: 1.15;
      }
    </style>
  </head>
  <body>
    <main>
      <p>${MAINTENANCE_EYEBROW}</p>
      <h1>${MAINTENANCE_TITLE}</h1>
    </main>
  </body>
</html>
`;

export function isMaintenanceDisabled(value) {
  if (typeof value !== "string") return false;
  return OFF_VALUES.has(value.trim().toLowerCase());
}

export function normalizePathname(input) {
  const withoutQuery = String(input ?? "/").split("?")[0]?.split("#")[0] || "/";
  let decoded = withoutQuery;
  for (let i = 0; i < 2; i += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }
  decoded = decoded.replaceAll("\\", "/").replaceAll("\0", "");
  if (!decoded.startsWith("/")) decoded = `/${decoded}`;

  const stack = [];
  for (const segment of decoded.split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") {
      stack.pop();
      continue;
    }
    stack.push(segment);
  }
  return `/${stack.join("/")}`;
}

function matchesPrefix(path, prefix) {
  return path === prefix || path.startsWith(`${prefix}/`);
}

export function isMaintenanceExemptRoute(input) {
  const path = normalizePathname(input);
  return APP_PREFIXES.some((prefix) => matchesPrefix(path, prefix));
}

export function isEdgePassthrough(input, options = {}) {
  const path = normalizePathname(input);
  if (EDGE_FILES.has(path)) return true;
  if (EDGE_PREFIXES.some((prefix) => matchesPrefix(path, prefix))) return true;
  if (options.devServer && DEV_SERVER_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    return true;
  }
  return false;
}
