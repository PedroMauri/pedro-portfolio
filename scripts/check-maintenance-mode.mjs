import assert from "node:assert/strict";
import {
  isEdgePassthrough,
  isMaintenanceDisabled,
  isMaintenanceExemptRoute,
  MAINTENANCE_HTML,
  MAINTENANCE_ROBOTS,
  normalizePathname,
} from "../src/lib/maintenance-mode.mjs";

const exemptRoutes = [
  "/admin",
  "/admin/",
  "/admin/private-portfolio",
  "/study/french",
  "/immigration",
  "/immigration/documents",
  "/immigration/documents/ielts-english",
  "/immigration/documents/education/wes",
  "/immigration/documents/work-history",
  "/immigration/documents/person/pedro",
  "/immigration/aaip",
  "/immigration/express-entry",
  "/documents",
  "/documents/ielts-english",
  "/share/kanopi",
];

const edgeFiles = [
  "/cases/yethos/hifi-web.png",
  "/cases/buildclock/active-workers.png",
  "/share/kanopi/01-goal-workflow.png",
  "/documents/people/pedro/passport.pdf",
  "/assets/index-abc.js",
  "/french-audio/week01/fr-58c185a735ce.mp3",
  "/_vercel/insights/view",
  "/favicon.png",
  "/robots.txt",
  "/sitemap.xml",
  "/index.html",
];

const blocked = [
  "/",
  "/about",
  "/projects",
  "/projects/yethos-community-discovery",
  "/resume",
  "/privacy",
  "/contact",
  "/case-studies",
  "/case-studies/yethos",
  "/work",
  "/work/leaf",
  "/pedro-mauri-resume.pdf",
  "/og-image.jpg",
  "/pedro-mauri.jpg",
  "/administrator",
  "/shared",
  "/study-notes",
  "/immigration-notes",
];

for (const path of exemptRoutes) {
  assert.equal(isMaintenanceExemptRoute(path), true, `route should stay up: ${path}`);
  assert.equal(isEdgePassthrough(path), true, `edge should pass: ${path}`);
}

for (const path of edgeFiles) {
  assert.equal(isEdgePassthrough(path), true, `file should pass: ${path}`);
}

for (const path of blocked) {
  assert.equal(isMaintenanceExemptRoute(path), false, `route should be maintenance: ${path}`);
  assert.equal(isEdgePassthrough(path), false, `edge should block: ${path}`);
}

assert.equal(isEdgePassthrough("/src/main.tsx"), false);
assert.equal(isEdgePassthrough("/src/main.tsx", { devServer: true }), true);
assert.equal(isEdgePassthrough("/@vite/client", { devServer: true }), true);
assert.equal(normalizePathname("/admin/../about"), "/about");
assert.equal(isEdgePassthrough("/admin/../about"), false);
assert.equal(isEdgePassthrough("/admin/%2e%2e/about"), false);

for (const value of ["0", "false", "off", "no", " FALSE ", "Off"]) {
  assert.equal(isMaintenanceDisabled(value), true, `should disable: ${value}`);
}
for (const value of [undefined, null, "", "1", "true", "yes", "on"]) {
  assert.equal(isMaintenanceDisabled(value), false, `should stay on: ${String(value)}`);
}

assert.match(MAINTENANCE_HTML, /noindex, nofollow/);
assert.match(MAINTENANCE_HTML, /Site temporariamente indisponível/);
assert.match(MAINTENANCE_HTML, /Em breve/);
assert.equal(MAINTENANCE_ROBOTS, "noindex, nofollow");

console.log("maintenance allowlist ok");
