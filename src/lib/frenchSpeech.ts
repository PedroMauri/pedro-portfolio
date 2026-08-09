import audioManifest from "@/content/frenchCourse/audioManifest.json";
import { resolveCourseAudioUrl } from "@/content/frenchCourse/audioClips";
import type { ScriptLine } from "@/content/frenchCourse";

/**
 * Player contínuo (mobile + desktop).
 *
 * Regras (manter nas próximas semanas):
 * - UM HTMLAudioElement para a lição inteira (nunca new Audio() por clip).
 * - Após trocar src: esperar canplay/loadeddata e só então play().
 * - Nunca prefetch com outro `new Audio()` — no mobile isso derruba a sessão
 *   e a sequência para (ex.: depois de “…forma educada”).
 * - Sem delays longos entre clips.
 * - Falha de um clip: tenta de novo 1×; se falhar, segue para o próximo.
 */

type SpeakOptions = { rate?: number };

export type SpeechState = {
  speaking: boolean;
  error: string | null;
  engine: string | null;
  lineIndex: number;
};

type Listener = (state: SpeechState) => void;

type QueueItem = {
  url: string;
  rate: number;
  lineIndex: number;
  label?: string;
};

const listeners = new Set<Listener>();
let speaking = false;
let lastError: string | null = null;
let engine: string | null = null;
let lineIndex = -1;
let stopRequested = false;
let playGeneration = 0;
let settleActiveClip: (() => void) | null = null;
let sharedAudio: HTMLAudioElement | null = null;
let cachedState: SpeechState = {
  speaking: false,
  error: null,
  engine: null,
  lineIndex: -1,
};

const manifest = audioManifest as Record<string, string>;

function getState(): SpeechState {
  return cachedState;
}

function emit() {
  cachedState = { speaking, error: lastError, engine, lineIndex };
  listeners.forEach((fn) => fn(cachedState));
}

function setSpeaking(next: boolean) {
  speaking = next;
  emit();
}

function setError(message: string | null) {
  lastError = message;
  emit();
}

function setEngine(next: string | null) {
  engine = next;
  emit();
}

function setLineIndex(next: number) {
  lineIndex = next;
  emit();
}

export function normalizeSpeechKey(text: string) {
  return text
    .normalize("NFC")
    .replace(/[\u2019\u2018\u201B\u0060\u00B4']/g, "'")
    .replace(/\u2026/g, "...")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function lookupClip(lang: "pt" | "fr", text: string): string | null {
  const key = `${lang}::${normalizeSpeechKey(text)}`;
  const manifestPath = manifest[key];
  if (!manifestPath) return null;
  return resolveCourseAudioUrl(manifestPath);
}

function chunkText(text: string, max = 160): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return [clean];
  const parts: string[] = [];
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

function getSharedAudio(): HTMLAudioElement {
  if (!sharedAudio) {
    const audio = new Audio();
    audio.preload = "auto";
    audio.playsInline = true;
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");
    sharedAudio = audio;
  }
  return sharedAudio;
}

function haltCurrentAudio() {
  if (settleActiveClip) {
    const settle = settleActiveClip;
    settleActiveClip = null;
    settle();
  }
  if (sharedAudio) {
    try {
      sharedAudio.onended = null;
      sharedAudio.onerror = null;
      sharedAudio.oncanplay = null;
      sharedAudio.onloadeddata = null;
      sharedAudio.pause();
    } catch {
      /* ignore */
    }
  }
}

function buildQueue(lines: ScriptLine[], playbackRate: number): QueueItem[] {
  const queue: QueueItem[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    // Keep rate at 1 on short FR clips for mobile stability; slight nudge only for PT
    const rate = line.lang === "pt" ? Math.min(1.02, playbackRate) : 1;
    for (const chunk of chunkText(line.text)) {
      const url = lookupClip(line.lang, chunk);
      if (!url) {
        setError(`Sem áudio (${line.lang}): “${chunk.slice(0, 52)}…”`);
        continue;
      }
      queue.push({ url, rate, lineIndex: i, label: chunk.slice(0, 40) });
    }
  }
  return queue;
}

function waitForCanPlay(audio: HTMLAudioElement, generation: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (stopRequested || generation !== playGeneration) {
      resolve();
      return;
    }
    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      resolve();
      return;
    }

    const timer = window.setTimeout(() => {
      cleanup();
      // Proceed anyway — some mobile browsers never fire canplay reliably
      resolve();
    }, 8000);

    const onReady = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("Falha ao carregar áudio"));
    };
    const cleanup = () => {
      window.clearTimeout(timer);
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("loadeddata", onReady);
      audio.removeEventListener("error", onError);
    };

    audio.addEventListener("canplay", onReady);
    audio.addEventListener("loadeddata", onReady);
    audio.addEventListener("error", onError);
  });
}

async function playClipOnShared(item: QueueItem, generation: number, attempt = 1): Promise<void> {
  if (stopRequested || generation !== playGeneration) return;

  const audio = getSharedAudio();

  await new Promise<void>((resolve, reject) => {
    let settled = false;

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      if (settleActiveClip === finishOk) settleActiveClip = null;
      audio.onended = null;
      audio.onerror = null;
      fn();
    };
    const finishOk = () => finish(resolve);
    const finishErr = (err: Error) => finish(() => reject(err));

    settleActiveClip = finishOk;
    setLineIndex(item.lineIndex);

    void (async () => {
      try {
        audio.onended = null;
        audio.onerror = null;
        audio.pause();

        audio.playbackRate = item.rate;
        audio.volume = 1;
        audio.muted = false;
        audio.src = item.url;
        audio.load();

        await waitForCanPlay(audio, generation);
        if (stopRequested || generation !== playGeneration) {
          finishOk();
          return;
        }

        audio.onended = () => finishOk();
        audio.onerror = () => finishErr(new Error("Falha ao tocar áudio"));

        try {
          await audio.play();
        } catch (err) {
          const name = err instanceof DOMException ? err.name : "";
          // AbortError is common when src changes mid-load on mobile — retry once
          if ((name === "AbortError" || name === "NotAllowedError") && attempt < 2) {
            finish(() => {
              void playClipOnShared(item, generation, attempt + 1).then(resolve, reject);
            });
            return;
          }
          const message =
            name === "NotAllowedError"
              ? "O celular bloqueou a sequência. Toque Play de novo e deixe tocar até o fim."
              : err instanceof Error
                ? err.message
                : String(err);
          finishErr(new Error(message));
        }
      } catch (err) {
        finishErr(err instanceof Error ? err : new Error(String(err)));
      }
    })();
  });
}

/** Warm HTTP cache without creating a competing Audio element (mobile-safe). */
function prefetchUrl(url: string) {
  try {
    void fetch(url, { mode: "cors", credentials: "omit", cache: "force-cache" }).catch(() => undefined);
  } catch {
    /* ignore */
  }
}

async function playScript(lines: ScriptLine[], options: SpeakOptions = {}) {
  if (!lines.length) {
    setError("Lição sem roteiro de áudio.");
    return;
  }

  playGeneration += 1;
  const generation = playGeneration;
  stopRequested = true;
  haltCurrentAudio();
  stopRequested = false;

  getSharedAudio();

  setError(null);
  setEngine("local-mp3");
  setSpeaking(true);
  setLineIndex(0);

  const playbackRate = (options.rate ?? 1) <= 0.85 ? 0.9 : 1;
  const queue = buildQueue(lines, playbackRate);

  if (queue.length === 0) {
    setError("Nenhum MP3 na fila. Recarregue ou rode pnpm french-audio.");
    setSpeaking(false);
    setLineIndex(-1);
    return;
  }

  // Prefetch first few via fetch only (not Audio)
  queue.slice(0, 4).forEach((item) => prefetchUrl(item.url));

  let played = 0;
  try {
    for (let i = 0; i < queue.length; i += 1) {
      if (stopRequested || generation !== playGeneration) return;
      if (i + 1 < queue.length) prefetchUrl(queue[i + 1].url);

      try {
        await playClipOnShared(queue[i], generation);
        played += 1;
      } catch (err) {
        // Don't kill the whole day on one bad clip — continue
        const detail = err instanceof Error ? err.message : "erro";
        setError(`Clip pulado (${queue[i].label ?? i}): ${detail}`);
        if (attemptShouldStop(detail)) return;
      }
    }
    if (played > 0) setError(null);
  } finally {
    if (generation === playGeneration) {
      setSpeaking(false);
      setLineIndex(-1);
    }
  }
}

function attemptShouldStop(detail: string) {
  return detail.includes("bloqueou a sequência");
}

export const frenchSpeech = {
  getState,
  isSpeaking() {
    return speaking;
  },
  isSupported() {
    return typeof window !== "undefined" && typeof Audio !== "undefined";
  },
  lookupClip,
  testScript(): ScriptLine[] {
    return [
      { lang: "pt", text: "Teste de áudio. A seguir, uma frase em francês." },
      { lang: "fr", text: "Bonjour. Je m'appelle Pedro. Ça va bien, merci." },
    ];
  },
  testClipUrl() {
    return (
      lookupClip("fr", "Bonjour.") ??
      lookupClip("fr", "Bonjour. Je m'appelle Pedro. Ça va bien, merci.") ??
      "/french-audio/week01/fr-58c185a735ce.mp3"
    );
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    listener(getState());
    return () => {
      listeners.delete(listener);
    };
  },
  async playDay(lines: ScriptLine[], options?: SpeakOptions) {
    await playScript(lines, options);
  },
  toggleDay(lines: ScriptLine[]) {
    if (speaking) {
      frenchSpeech.stop();
      return;
    }
    void frenchSpeech.playDay(lines);
  },
  stop() {
    stopRequested = true;
    playGeneration += 1;
    haltCurrentAudio();
    setSpeaking(false);
    setLineIndex(-1);
  },
  async warmUp() {
    if (typeof window !== "undefined") {
      getSharedAudio();
    }
  },
};
