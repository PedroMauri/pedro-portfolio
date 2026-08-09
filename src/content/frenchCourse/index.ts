import type { CourseWeek, WeekMeta } from "./types";
import { week01 } from "./week01";

export type {
  CourseDay,
  CourseWeek,
  ScriptLine,
  VocabItem,
  QuizItem,
  WeekMeta,
} from "./types";

export { buildFullDayAudio, buildVocabRecapAudio, buildGrammarAudio, dayAudioRecapPhrases } from "./buildDayAudio";

export const frenchCourseWeeks: CourseWeek[] = [week01];

export const frenchCourseRoadmap: WeekMeta[] = [
  { week: 1, title: "Bonjour — primeiro contato", theme: "Seg–sáb lições · Dom prova da semana", level: "A0", published: true },
  { week: 2, title: "Ma journée", theme: "Dias da semana e rotina", level: "A0", published: false },
  { week: 3, title: "Chez moi", theme: "Casa e família", level: "A0–A1", published: false },
  { week: 4, title: "Au travail", theme: "Trabalho em Calgary", level: "A1", published: false },
  { week: 5, title: "Le temps", theme: "Horas e tempo", level: "A1", published: false },
  { week: 6, title: "Nourriture", theme: "Comida e preferências", level: "A1", published: false },
  { week: 7, title: "Questions", theme: "Qui, quoi, où, quand, pourquoi", level: "A1", published: false },
  { week: 8, title: "Récap mês 1", theme: "Checkpoint A1", level: "A1", published: false },
];

export const FRENCH_COURSE_PROGRESS_KEY = "french-course-progress-v2";

export type DayProgress = {
  audioDone?: boolean;
  writingDone?: boolean;
  quizDone?: boolean;
  quizScore?: number;
  quizTotal?: number;
  writingText?: string;
};

export type WeekProgress = {
  days: Partial<Record<string, DayProgress>>;
  weekComplete?: boolean;
};

export type CourseProgress = {
  currentWeek: number;
  weeks: Record<string, WeekProgress>;
};

export function loadCourseProgress(): CourseProgress {
  try {
    const raw = localStorage.getItem(FRENCH_COURSE_PROGRESS_KEY);
    if (!raw) return { currentWeek: 1, weeks: {} };
    const parsed = JSON.parse(raw) as CourseProgress;
    return {
      currentWeek: parsed.currentWeek || 1,
      weeks: parsed.weeks || {},
    };
  } catch {
    return { currentWeek: 1, weeks: {} };
  }
}

export function saveCourseProgress(progress: CourseProgress) {
  localStorage.setItem(FRENCH_COURSE_PROGRESS_KEY, JSON.stringify(progress));
}

export function getWeek(weekNumber: number): CourseWeek | undefined {
  return frenchCourseWeeks.find((w) => w.week === weekNumber);
}

export function isDayComplete(day: DayProgress | undefined): boolean {
  if (!day) return false;
  return Boolean(day.audioDone && day.writingDone && day.quizDone);
}

export function weekCompletionPercent(week: CourseWeek, progress: WeekProgress | undefined): number {
  const total = week.days.length;
  if (!progress || total === 0) return 0;
  const done = week.days.filter((d) => isDayComplete(progress.days[d.id])).length;
  return Math.round((done / total) * 100);
}
