/**
 * Gera MP3s FR + PT do curso de francês.
 *
 * Usage: pnpm french-audio
 *
 * === NÃO REPETIR ESTES BUGS ===
 * 1) Saída OBRIGATÓRIA: src/assets/french-audio/weekXX (não public/).
 *    Vite no Windows às vezes serve HTML da SPA para ficheiros novos em public/.
 * 2) Depois de gerar: reiniciar `pnpm dev` + hard refresh.
 * 3) Player usa import.meta.glob (audioClips.ts) — manter ficheiros nesse pasta.
 * 4) Sempre incluir: lessonAudio, vocabulário, gramática (title+points) e frases de recap.
 * 5) Um play por dia = lessonAudio + vocab + gramática (buildFullDayAudio).
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const weekFile = join(root, "src/content/frenchCourse/week01.ts");
const outDir = join(root, "src/assets/french-audio/week01");
const manifestPath = join(root, "src/content/frenchCourse/audioManifest.json");

const RECAP_INTRO = "Agora vamos recapitular o que aprendemos.";
const RECAP_OUTRO = "Fim da recapitulação do vocabulário.";
const GRAMMAR_INTRO_PREFIX = "Agora a gramática do dia.";
const GRAMMAR_OUTRO = "Fim da gramática de hoje. Bom treino.";

function normalizeKey(text) {
  return text
    .normalize("NFC")
    .replace(/[’‘`´']/g, "'")
    .replace(/…/g, "...")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function hashKey(lang, text) {
  return createHash("sha1").update(`${lang}::${normalizeKey(text)}`).digest("hex").slice(0, 12);
}

function pushLine(lines, lang, text) {
  const raw = text
    .replace(/\\n/g, " ")
    .replace(/\\"/g, '"')
    .replace(/…/g, "...")
    .trim();
  if (!raw) return;
  lines.push({ lang, text: raw });
}

function extractLessonLines(source) {
  /** @type {{ lang: string, text: string }[]} */
  const lines = [];
  const re = /\b(pt|fr)\(\s*"((?:\\.|[^"\\])*)"\s*\)/g;
  let match;
  while ((match = re.exec(source))) {
    const lang = match[1];
    const raw = match[2];
    if (lang === "fr" && raw.includes(" / ")) {
      raw.split(" / ").forEach((part) => pushLine(lines, "fr", part));
    } else {
      pushLine(lines, lang, raw);
    }
  }
  return lines;
}

function extractVocabLines(source) {
  /** @type {{ lang: string, text: string }[]} */
  const lines = [];
  const re = /\{\s*fr:\s*"((?:\\.|[^"\\])*)"\s*,\s*pt:\s*"((?:\\.|[^"\\])*)"\s*\}/g;
  let match;
  while ((match = re.exec(source))) {
    const frRaw = match[1].replace(/\\"/g, '"');
    const ptRaw = match[2].replace(/\\"/g, '"');
    const frForms = frRaw
      .split(" / ")
      .map((p) => p.replace(/…/g, "").replace(/\.\.\./g, "").trim())
      .filter(Boolean);
    for (const form of frForms) pushLine(lines, "fr", form);
    pushLine(lines, "pt", ptRaw);
  }
  return lines;
}

function extractGrammarLines(source) {
  /** @type {{ lang: string, text: string }[]} */
  const lines = [];
  const blockRe = /grammar:\s*\{\s*title:\s*"((?:\\.|[^"\\])*)"\s*,\s*points:\s*\[([\s\S]*?)\]\s*,?\s*\}/g;
  let block;
  while ((block = blockRe.exec(source))) {
    const title = block[1].replace(/\\"/g, '"');
    pushLine(lines, "pt", `Gramática. ${title}.`);
    const pointRe = /"((?:\\.|[^"\\])*)"/g;
    let point;
    while ((point = pointRe.exec(block[2]))) {
      pushLine(lines, "pt", point[1].replace(/\\"/g, '"'));
    }
  }
  return lines;
}

function extractLines(source) {
  const lines = [
    ...extractLessonLines(source),
    ...extractVocabLines(source),
    ...extractGrammarLines(source),
    { lang: "pt", text: RECAP_INTRO },
    { lang: "pt", text: RECAP_OUTRO },
    { lang: "pt", text: GRAMMAR_INTRO_PREFIX },
    { lang: "pt", text: GRAMMAR_OUTRO },
    { lang: "pt", text: "Teste de áudio. A seguir, uma frase em francês." },
    { lang: "fr", text: "Bonjour. Je m'appelle Pedro. Ça va bien, merci." },
  ];
  return lines;
}

function downloadMp3(lang, text, filePath) {
  if (existsSync(filePath) && readFileSync(filePath).length > 500) {
    return "skip";
  }
  const tl = lang === "pt" ? "pt" : "fr";
  const chunk = text.slice(0, 180);
  const url =
    `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=` +
    encodeURIComponent(chunk);
  execFileSync(
    "curl.exe",
    ["-sL", "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "-o", filePath, url],
    { stdio: "pipe" },
  );
  const size = existsSync(filePath) ? readFileSync(filePath).length : 0;
  if (size < 500) {
    throw new Error(`Download ruim (${lang}): "${text.slice(0, 50)}" (${size} bytes)`);
  }
  return "ok";
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

mkdirSync(outDir, { recursive: true });
const source = readFileSync(weekFile, "utf8");
const lines = extractLines(source);

/** Merge with existing manifest so we don't drop clips if extract misses something */
const previous = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : {};

const unique = new Map();
for (const line of lines) {
  for (const chunk of chunkText(line.text)) {
    const key = `${line.lang}::${normalizeKey(chunk)}`;
    if (!unique.has(key)) unique.set(key, { lang: line.lang, text: chunk });
  }
}

const manifest = { ...previous };
const items = [...unique.values()];
console.log(`Gerando/atualizando ${items.length} clips (FR + PT) em ${outDir}…`);

for (const item of items) {
  const id = hashKey(item.lang, item.text);
  const fileName = `${item.lang}-${id}.mp3`;
  const filePath = join(outDir, fileName);
  const status = downloadMp3(item.lang, item.text, filePath);
  const manifestKey = `${item.lang}::${normalizeKey(item.text)}`;
  manifest[manifestKey] = `/french-audio/week01/${fileName}`;
  console.log(`${status === "skip" ? "·" : "✓"} [${item.lang}] ${item.text.slice(0, 70)}`);
  if (status !== "skip") {
    execFileSync("powershell.exe", ["-Command", "Start-Sleep -Milliseconds 300"], {
      stdio: "ignore",
    });
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(`Manifest: ${manifestPath} (${Object.keys(manifest).length} entradas)`);
console.log("Lembrete: reinicie pnpm dev após gerar áudio novo.");
