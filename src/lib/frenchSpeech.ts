import audioManifest from "@/content/frenchCourse/audioManifest.json";
import { resolveCourseAudioUrl } from "@/content/frenchCourse/audioClips";
import type { ScriptLine } from "@/content/frenchCourse";

type SpeakOptions = { rate?: number };

export type SpeechState = {
  speaking: boolean;
  error: string | null;
  engine: string | null;
  lineIndex: number;
};

type Listener = (state: SpeechState) => void;

const listeners = new Set<Listener>();
let speaking = false;
let lastError: string | null = null;
let engine: string | null = null;
let lineIndex = -1;
let activeAudio: HTMLAudioElement | null = null;
let stopRequested = false;
let playGeneration = 0;
/** Resolves the in-flight playClip when halted mid-play (prevents hung promises). */
let settleActiveClip: (() => void) | null = null;
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
  const snapshot = cachedState;
  listeners.forEach((fn) => fn(snapshot));
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

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
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

function haltCurrentAudio() {
  if (settleActiveClip) {
    const settle = settleActiveClip;
    settleActiveClip = null;
    settle();
  }
  if (activeAudio) {
    const audio = activeAudio;
    activeAudio = null;
    try {
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    } catch {
      /* ignore */
    }
  }
}

function playClip(url: string, rate: number, generation: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (stopRequested || generation !== playGeneration) {
      resolve();
      return;
    }

    const audio = new Audio(url);
    activeAudio = audio;
    audio.preload = "auto";
    audio.volume = 1;
    audio.muted = false;
    audio.playbackRate = Math.min(1.15, Math.max(0.75, rate));

    let settled = false;
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      if (settleActiveClip === finishOk) settleActiveClip = null;
      if (activeAudio === audio) activeAudio = null;
      fn();
    };
    const finishOk = () => finish(resolve);
    const finishErr = (err: Error) => finish(() => reject(err));

    settleActiveClip = finishOk;

    audio.onended = () => finishOk();
    audio.onerror = () => finishErr(new Error(`Falha ao carregar ${url}`));

    const p = audio.play();
    if (p) {
      p.catch((err: unknown) => {
        const message =
          err instanceof DOMException && err.name === "NotAllowedError"
            ? "Chrome bloqueou o áudio — clique de novo no Play."
            : err instanceof Error
              ? err.message
              : String(err);
        finishErr(new Error(message));
      });
    }
  });
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

  setError(null);
  setEngine("local-mp3");
  setSpeaking(true);
  setLineIndex(0);

  const playbackRate = (options.rate ?? 0.92) <= 0.8 ? 0.82 : 0.95;
  let played = 0;

  try {
    for (let i = 0; i < lines.length; i += 1) {
      if (stopRequested || generation !== playGeneration) return;
      setLineIndex(i);
      const line = lines[i];
      const chunks = chunkText(line.text);

      for (const chunk of chunks) {
        if (stopRequested || generation !== playGeneration) return;
        const url = lookupClip(line.lang, chunk);
        if (!url) {
          setError(`Sem áudio (${line.lang}): “${chunk.slice(0, 52)}…”`);
          continue;
        }
        const rate = line.lang === "pt" ? Math.min(1.05, playbackRate + 0.05) : playbackRate;
        await playClip(url, rate, generation);
        played += 1;
        if (stopRequested || generation !== playGeneration) return;
        await delay(line.lang === "pt" ? 200 : 260);
      }
    }
    if (played === 0) {
      setError("Nenhum MP3 tocou. Recarregue a página (Ctrl+Shift+R) ou rode pnpm french-audio.");
    }
  } catch (err) {
    if (!stopRequested && generation === playGeneration) {
      const detail = err instanceof Error ? err.message : "erro";
      setError(`Áudio falhou: ${detail}`);
    }
  } finally {
    if (generation === playGeneration) {
      setSpeaking(false);
      setLineIndex(-1);
    }
  }
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
    const url = frenchSpeech.testClipUrl();
    if (!url) return;
    try {
      const audio = new Audio(url);
      audio.preload = "auto";
    } catch {
      /* ignore */
    }
  },
};
