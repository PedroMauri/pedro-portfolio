import audioManifest from "@/content/frenchCourse/audioManifest.json";
import { resolveCourseAudioUrl } from "@/content/frenchCourse/audioClips";
import type { ScriptLine } from "@/content/frenchCourse";

/**
 * Player contínuo (mobile + desktop) via Web Audio API.
 *
 * iOS quirks handled here (all days share this path):
 * 1) HTMLAudioElement + trocar src perde o unlock → Web Audio only.
 * 2) AudioContext suspende durante fetch/decode do próximo MP3 (dias sem cache)
 *    → resume() antes de cada clip + keep-alive quase silencioso + watchdog.
 * 3) Prefetch/decode à frente para terça–domingo não “morrerem” no 1º gap de rede.
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

type AudioContextCtor = typeof AudioContext;

const listeners = new Set<Listener>();
let speaking = false;
let lastError: string | null = null;
let engine: string | null = null;
let lineIndex = -1;
let stopRequested = false;
let playGeneration = 0;
let audioCtx: AudioContext | null = null;
let currentSource: AudioBufferSourceNode | null = null;
let keepAliveOsc: OscillatorNode | null = null;
let keepAliveGain: GainNode | null = null;
let unlockStarted = false;
const bufferCache = new Map<string, Promise<AudioBuffer>>();
let cachedState: SpeechState = {
  speaking: false,
  error: null,
  engine: null,
  lineIndex: -1,
};

const manifest = audioManifest as Record<string, string>;
const LOAD_TIMEOUT_MS = 20_000;
const PREFETCH_AHEAD = 6;

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
  if (lineIndex === next) return;
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

function getAudioContextCtor(): AudioContextCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { webkitAudioContext?: AudioContextCtor };
  return window.AudioContext ?? w.webkitAudioContext ?? null;
}

function getAudioContext(): AudioContext {
  const Ctor = getAudioContextCtor();
  if (!Ctor) throw new Error("Web Audio não suportado neste browser.");
  if (!audioCtx || audioCtx.state === "closed") {
    audioCtx = new Ctor();
    unlockStarted = false;
  }
  return audioCtx;
}

/** Tem de correr no gesto do utilizador (pointerdown/click), sem awaits antes. */
function kickUnlock() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
    if (!unlockStarted) {
      unlockStarted = true;
      const silent = ctx.createBuffer(1, 1, ctx.sampleRate || 22050);
      const src = ctx.createBufferSource();
      src.buffer = silent;
      src.connect(ctx.destination);
      src.start(0);
    }
  } catch {
    /* ignore */
  }
}

async function ensureUnlocked() {
  kickUnlock();
  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    await ctx.resume();
  }
}

/** Mantém o grafo ativo no iOS enquanto fetch/decode corre entre clips. */
function startKeepAlive() {
  if (keepAliveOsc) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0.00001;
    osc.frequency.value = 20;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    keepAliveOsc = osc;
    keepAliveGain = gain;
  } catch {
    /* ignore */
  }
}

function stopKeepAlive() {
  if (keepAliveOsc) {
    try {
      keepAliveOsc.stop();
    } catch {
      /* ignore */
    }
    try {
      keepAliveOsc.disconnect();
    } catch {
      /* ignore */
    }
    keepAliveOsc = null;
  }
  if (keepAliveGain) {
    try {
      keepAliveGain.disconnect();
    } catch {
      /* ignore */
    }
    keepAliveGain = null;
  }
}

function haltCurrentSource() {
  if (currentSource) {
    try {
      currentSource.onended = null;
      currentSource.stop(0);
    } catch {
      /* already stopped */
    }
    currentSource = null;
  }
}

function buildQueue(lines: ScriptLine[], playbackRate: number): QueueItem[] {
  const queue: QueueItem[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    for (const chunk of chunkText(line.text)) {
      const url = lookupClip(line.lang, chunk);
      if (!url) {
        setError(`Sem áudio (${line.lang}): “${chunk.slice(0, 52)}…”`);
        continue;
      }
      queue.push({ url, rate: playbackRate, lineIndex: i, label: chunk.slice(0, 40) });
    }
  }
  return queue;
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error(`Timeout ${label}`)), ms);
    promise.then(
      (value) => {
        window.clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        window.clearTimeout(timer);
        reject(err);
      },
    );
  });
}

function loadBuffer(url: string): Promise<AudioBuffer> {
  const existing = bufferCache.get(url);
  if (existing) return existing;

  const promise = (async () => {
    const res = await withTimeout(
      fetch(url, { credentials: "omit", cache: "force-cache" }),
      LOAD_TIMEOUT_MS,
      "fetch",
    );
    if (!res.ok) throw new Error(`HTTP ${res.status} ao carregar áudio`);
    const raw = await withTimeout(res.arrayBuffer(), LOAD_TIMEOUT_MS, "buffer");
    const copy = raw.slice(0);
    const ctx = getAudioContext();
    return await withTimeout(ctx.decodeAudioData(copy), LOAD_TIMEOUT_MS, "decode");
  })();

  bufferCache.set(url, promise);
  promise.catch(() => {
    bufferCache.delete(url);
  });
  return promise;
}

function prefetchAround(queue: QueueItem[], index: number) {
  for (let j = index; j < Math.min(queue.length, index + PREFETCH_AHEAD); j += 1) {
    void loadBuffer(queue[j].url).catch(() => undefined);
  }
}

async function warmInitial(queue: QueueItem[], generation: number, count: number) {
  const slice = queue.slice(0, count);
  await Promise.all(
    slice.map(async (item) => {
      if (stopRequested || generation !== playGeneration) return;
      await loadBuffer(item.url).catch(() => undefined);
    }),
  );
}

async function playBuffer(buffer: AudioBuffer, rate: number, generation: number): Promise<void> {
  if (stopRequested || generation !== playGeneration) return;

  await ensureUnlocked();
  if (stopRequested || generation !== playGeneration) return;

  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(watchdog);
      if (currentSource === source) currentSource = null;
      resolve();
    };

    const safeRate = rate > 0 ? rate : 1;
    const durationMs = Math.max(200, (buffer.duration / safeRate) * 1000 + 500);
    const watchdog = window.setTimeout(finish, durationMs);

    const ctx = getAudioContext();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = safeRate;
    source.connect(ctx.destination);
    source.onended = finish;
    currentSource = source;

    try {
      source.start(0);
    } catch (err) {
      window.clearTimeout(watchdog);
      if (currentSource === source) currentSource = null;
      reject(err instanceof Error ? err : new Error(String(err)));
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
  haltCurrentSource();
  stopKeepAlive();
  stopRequested = false;

  setError(null);
  setEngine("web-audio");
  setSpeaking(true);
  setLineIndex(0);

  try {
    await ensureUnlocked();
  } catch (err) {
    setError(err instanceof Error ? err.message : "Não foi possível iniciar o áudio.");
    setSpeaking(false);
    setLineIndex(-1);
    return;
  }

  const playbackRate = (options.rate ?? 1) <= 0.85 ? 0.92 : 1;
  const queue = buildQueue(lines, playbackRate);

  if (queue.length === 0) {
    setError("Nenhum MP3 na fila. Recarregue ou rode pnpm french-audio.");
    setSpeaking(false);
    setLineIndex(-1);
    return;
  }

  startKeepAlive();
  prefetchAround(queue, 0);

  let played = 0;
  try {
    // Warm first clips so terça–domingo (sem cache) não suspendem no 1º gap
    await warmInitial(queue, generation, Math.min(8, queue.length));
    if (stopRequested || generation !== playGeneration) return;
    await ensureUnlocked();

    for (let i = 0; i < queue.length; i += 1) {
      if (stopRequested || generation !== playGeneration) return;

      setLineIndex(queue[i].lineIndex);
      prefetchAround(queue, i + 1);

      try {
        const buffer = await loadBuffer(queue[i].url);
        if (stopRequested || generation !== playGeneration) return;
        await playBuffer(buffer, queue[i].rate, generation);
        played += 1;
      } catch (err) {
        const detail = err instanceof Error ? err.message : "erro";
        setError(`Clip pulado (${queue[i].label ?? i}): ${detail}`);
        await ensureUnlocked();
      }
    }
    if (played > 0) setError(null);
    if (played === 0) setError("Nenhum clip tocou. Toque Play de novo.");
  } finally {
    if (generation === playGeneration) {
      stopKeepAlive();
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
    return getAudioContextCtor() !== null;
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
  /** Quantos clips o dia vai enfileirar (útil para diagnóstico). */
  countQueue(lines: ScriptLine[]) {
    return buildQueue(lines, 1).length;
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
    kickUnlock();
    if (speaking) {
      frenchSpeech.stop();
      return;
    }
    void frenchSpeech.playDay(lines);
  },
  stop() {
    stopRequested = true;
    playGeneration += 1;
    haltCurrentSource();
    stopKeepAlive();
    setSpeaking(false);
    setLineIndex(-1);
  },
  async warmUp() {
    kickUnlock();
    try {
      await ensureUnlocked();
    } catch {
      /* ignore */
    }
  },
};
