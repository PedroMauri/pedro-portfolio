/**
 * Confere se TODOS os clips do roteiro completo (lição+vocab+gramática)
 * existem no manifest e no disco (src/assets).
 *
 * Usage: node scripts/verify-french-audio.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

// Carrega week via transpile on the fly com tipagem apagada pelo Node (v22+)
async function loadWeek() {
  try {
    const mod = await import(pathToFileURL(join(root, "src/content/frenchCourse/week01.ts")).href);
    return mod.week01;
  } catch {
    // fallback: não disponível — sai com instrução
    return null;
  }
}

function normalizeKey(text) {
  return text
    .normalize("NFC")
    .replace(/[\u2019\u2018\u0060\u00B4']/g, "'")
    .replace(/\u2026/g, "...")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function chunkText(text, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return [clean];
  const parts = [];
  let rest = clean;
  while (rest.length > max) {
    let cut = rest.lastIndexOf(" ", max);
    if (cut < 40) cut = max;
    parts.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) parts.push(rest);
  return parts;
}

function vocabFrenchForms(fr) {
  return fr
    .split(" / ")
    .map((part) => part.replace(/…/g, "").replace(/\.\.\./g, "").trim())
    .filter(Boolean);
}

function buildFullDayAudio(day) {
  const lines = [...day.lessonAudio];
  if (day.vocab.length) {
    lines.push({ lang: "pt", text: "Agora vamos recapitular o que aprendemos." });
    for (const item of day.vocab) {
      for (const form of vocabFrenchForms(item.fr)) {
        lines.push({ lang: "fr", text: form });
      }
      lines.push({ lang: "pt", text: item.pt });
    }
    lines.push({ lang: "pt", text: "Fim da recapitulação do vocabulário." });
  }
  if (day.grammar?.title && day.grammar.points.length) {
    lines.push({ lang: "pt", text: "Agora a gramática do dia." });
    lines.push({ lang: "pt", text: `Gramática. ${day.grammar.title}.` });
    for (const point of day.grammar.points) {
      lines.push({ lang: "pt", text: point });
    }
    lines.push({ lang: "pt", text: "Fim da gramática de hoje. Bom treino." });
  }
  return lines;
}

const week = await loadWeek();
if (!week) {
  console.error("Não foi possível importar week01.ts. Rode com Node recente ou confira o ficheiro.");
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(join(root, "src/content/frenchCourse/audioManifest.json"), "utf8"));
const assetsDir = join(root, "src/assets/french-audio/week01");

let ok = 0;
let miss = 0;
const missing = [];
const perDay = [];

for (const day of week.days) {
  const script = buildFullDayAudio(day);
  let dayOk = 0;
  let dayMiss = 0;
  let dayBytes = 0;
  for (const line of script) {
    for (const chunk of chunkText(line.text)) {
      const key = `${line.lang}::${normalizeKey(chunk)}`;
      const path = manifest[key];
      if (!path) {
        miss += 1;
        dayMiss += 1;
        if (missing.length < 40) missing.push(`[${day.id}] missing key: ${key}`);
        continue;
      }
      const fileName = path.split("/").pop();
      const disk = join(assetsDir, fileName);
      if (!existsSync(disk) || readFileSync(disk).length < 500) {
        miss += 1;
        dayMiss += 1;
        if (missing.length < 40) missing.push(`[${day.id}] bad file: ${fileName}`);
        continue;
      }
      const size = readFileSync(disk).length;
      dayBytes += size;
      ok += 1;
      dayOk += 1;
    }
  }
  perDay.push({ id: day.id, label: day.label, lines: script.length, clips: dayOk, miss: dayMiss, kb: Math.round(dayBytes / 1024) });
  const mark = dayMiss === 0 ? "✓" : "✗";
  console.log(`${mark} ${day.label}: ${script.length} linhas · ${dayOk} clips · ${Math.round(dayBytes / 1024)} KB${dayMiss ? ` · ${dayMiss} falhas` : ""}`);
}

console.log(JSON.stringify({ ok, miss, days: week.days.length }, null, 2));
if (missing.length) {
  console.log("Falhas:");
  missing.forEach((m) => console.log(" -", m));
  process.exit(1);
}
console.log("Todos os áudios do roteiro existem no manifest e no disco.");
