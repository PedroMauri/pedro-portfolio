/**
 * Resolve course MP3s through Vite's asset pipeline (hashed URLs).
 *
 * IMPORTANTE: ficheiros em src/assets/french-audio — nunca depender só de public/.
 * (Bug: Vite no Windows servia HTML da SPA como se fosse MP3.)
 */
const week01Modules = import.meta.glob("../../assets/french-audio/week01/*.mp3", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const urlByFileName = new Map<string, string>();

for (const [modulePath, url] of Object.entries(week01Modules)) {
  const normalized = modulePath.replace(/\\/g, "/");
  const fileName = normalized.slice(normalized.lastIndexOf("/") + 1);
  urlByFileName.set(fileName, url);
}

export function resolveCourseAudioUrl(manifestPathOrFile: string): string | null {
  const fileName = manifestPathOrFile.replace(/\\/g, "/").split("/").pop();
  if (!fileName) return null;
  return urlByFileName.get(fileName) ?? null;
}

export function courseAudioFileCount() {
  return urlByFileName.size;
}
