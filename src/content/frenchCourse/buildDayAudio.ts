import type { CourseDay, ScriptLine, VocabItem } from "./types";

/**
 * Regras anti-bug do áudio (não repetir nas próximas semanas):
 * 1) MP3s em src/assets/french-audio + import.meta.glob — NUNCA só public/
 * 2) Player singleton com Promise resolvida no halt
 * 3) useSyncExternalStore com snapshot cacheado
 * 4) Um play por dia = lessonAudio + vocab recap + gramática
 * 5) Após editar textos: pnpm french-audio && reiniciar pnpm dev
 * 6) MOBILE: Web Audio API (AudioContext + BufferSource). Não usar HTMLAudioElement
 *    trocando src — no iOS o unlock do toque morre e a lição para após a 1ª frase longa.
 * 7) Entre clips: resume() + keep-alive + prefetch — senão dias sem cache (ter–dom) param
 *    no meio quando o AudioContext suspende durante o fetch.
 */

const RECAP_INTRO = "Agora vamos recapitular o que aprendemos.";
const RECAP_OUTRO = "Fim da recapitulação do vocabulário.";
const GRAMMAR_INTRO_PREFIX = "Agora a gramática do dia.";
const GRAMMAR_OUTRO = "Fim da gramática de hoje. Bom treino.";

/** Limpa entradas tipo "je m'appelle…" ou "enchanté / enchantée". */
export function vocabFrenchForms(fr: string): string[] {
  return fr
    .split(" / ")
    .map((part) => part.replace(/…/g, "").replace(/\.\.\./g, "").trim())
    .filter(Boolean);
}

export function buildVocabRecapAudio(vocab: VocabItem[]): ScriptLine[] {
  if (vocab.length === 0) return [];

  const lines: ScriptLine[] = [{ lang: "pt", text: RECAP_INTRO }];

  for (const item of vocab) {
    const forms = vocabFrenchForms(item.fr);
    for (const form of forms) {
      lines.push({ lang: "fr", text: form });
    }
    lines.push({ lang: "pt", text: item.pt });
  }

  lines.push({ lang: "pt", text: RECAP_OUTRO });
  return lines;
}

export function buildGrammarAudio(grammar: CourseDay["grammar"]): ScriptLine[] {
  if (!grammar?.title || grammar.points.length === 0) return [];

  const lines: ScriptLine[] = [
    { lang: "pt", text: GRAMMAR_INTRO_PREFIX },
    { lang: "pt", text: `Gramática. ${grammar.title}.` },
  ];

  for (const point of grammar.points) {
    lines.push({ lang: "pt", text: point });
  }

  lines.push({ lang: "pt", text: GRAMMAR_OUTRO });
  return lines;
}

/** Roteiro completo: lição + vocabulário + gramática. */
export function buildFullDayAudio(day: CourseDay): ScriptLine[] {
  return [
    ...day.lessonAudio,
    ...buildVocabRecapAudio(day.vocab),
    ...buildGrammarAudio(day.grammar),
  ];
}

export const dayAudioRecapPhrases = {
  intro: RECAP_INTRO,
  outro: RECAP_OUTRO,
  grammarIntroPrefix: GRAMMAR_INTRO_PREFIX,
  grammarOutro: GRAMMAR_OUTRO,
} as const;
