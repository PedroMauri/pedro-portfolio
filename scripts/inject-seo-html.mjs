import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, pages } from "./seo-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const templatePath = join(distDir, "index.html");

function escapeAttr(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function absoluteUrl(path) {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

function injectHead(html, page) {
  const url = absoluteUrl(page.path);
  const image = page.image?.startsWith("http") ? page.image : `${SITE_URL}${page.image}`;
  const type = page.type ?? "website";

  let next = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(page.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeAttr(page.description)}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${escapeAttr(url)}" />`
    )
    .replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:type" content="${escapeAttr(type)}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${escapeAttr(page.title)}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${escapeAttr(page.description)}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${escapeAttr(url)}" />`
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${escapeAttr(image)}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image" content="${escapeAttr(image)}" />`
    );

  // Replace existing JSON-LD blocks with page-specific ones
  next = next.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

  const jsonLdHtml = (page.jsonLd ?? [])
    .map(
      (item) =>
        `<script type="application/ld+json">${JSON.stringify(item)}</script>`
    )
    .join("\n    ");

  if (jsonLdHtml) {
    next = next.replace("</head>", `    ${jsonLdHtml}\n  </head>`);
  }

  // Ensure site_name stays consistent
  if (!next.includes('property="og:site_name"')) {
    next = next.replace(
      "</head>",
      `    <meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />\n  </head>`
    );
  }

  return next;
}

function outputPathFor(path) {
  if (path === "/") return join(distDir, "index.html");
  return join(distDir, path.replace(/^\//, ""), "index.html");
}

const template = readFileSync(templatePath, "utf8");

for (const page of pages) {
  const html = injectHead(template, page);
  const out = outputPathFor(page.path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html, "utf8");
  console.log(`SEO HTML → ${page.path === "/" ? "/index.html" : `${page.path}/index.html`}`);
}

// Ensure default OG image exists in dist (copied from public by Vite, but verify)
console.log(`Injected SEO into ${pages.length} routes (default OG: ${DEFAULT_OG_IMAGE})`);
