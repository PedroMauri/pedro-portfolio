/** In-page French course — áudio contínuo do dia (PT explica + FR ensina). */

export type CourseDayId =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun";

export type ScriptLine = {
  /** pt = explicação em português do Brasil; fr = francês para ouvir/repetir */
  lang: "pt" | "fr";
  text: string;
};

export type VocabItem = {
  fr: string;
  pt: string;
};

export type QuizItem = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explain?: string;
};

export type CourseDay = {
  id: CourseDayId;
  label: string;
  title: string;
  focus: string;
  minutes: string;
  /** Um único áudio do dia — play toca tudo em sequência */
  lessonAudio: ScriptLine[];
  vocab: VocabItem[];
  grammar: {
    title: string;
    points: string[];
  };
  writing: {
    title: string;
    prompt: string;
    example?: string;
  };
  quiz: QuizItem[];
};

export type CourseWeek = {
  week: number;
  phase: string;
  level: string;
  title: string;
  theme: string;
  goals: string[];
  checkpoint: string;
  days: CourseDay[];
  published: boolean;
};

export type WeekMeta = {
  week: number;
  title: string;
  theme: string;
  level: string;
  published: boolean;
};
