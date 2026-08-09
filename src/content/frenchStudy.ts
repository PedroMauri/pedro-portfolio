/** Personal French study plan: A0 → NCLC 7 (TEF Canada) for Express Entry. */

export const frenchStudyGoal = {
  exam: "TEF Canada",
  examAlt: "TCF Canada (also IRCC-accepted)",
  target: "NCLC 7 in all four skills",
  timelineMonths: 12,
  weeklyHours: "10–14 h/week (3–5 h seated + 7–10 h audio on the go)",
  whyNotIelts:
    "IELTS does not test French for IRCC. Canadian immigration French is measured with TEF Canada or TCF Canada (NCLC scale).",
  crsBonus:
    "NCLC 7+ in all four French skills plus English CLB 5+ (your current IELTS) unlocks +50 CRS bilingual bonus and French-category Express Entry draws.",
} as const;

/** Minimum TEF Canada scores for NCLC 7 (current IRCC conversion tables). */
export const tefNclc7Scores = [
  { skill: "Listening (compréhension orale)", min: 249, max: 360, nclcBand: "249–279" },
  { skill: "Reading (compréhension écrite)", min: 207, max: 300, nclcBand: "207–232" },
  { skill: "Writing (expression écrite)", min: 310, max: 450, nclcBand: "310–348" },
  { skill: "Speaking (expression orale)", min: 310, max: 450, nclcBand: "310–348" },
] as const;

export type FrenchPhaseId = "setup" | "phase1" | "phase2" | "phase3" | "phase4";

export type FrenchPhase = {
  id: FrenchPhaseId;
  title: string;
  months: string;
  level: string;
  goal: string;
  checkpoint: string;
  blocks: { label: string; time: string; content: string }[];
};

export const frenchPhases: FrenchPhase[] = [
  {
    id: "setup",
    title: "Setup",
    months: "Week 0",
    level: "A0",
    goal: "Tools ready: Anki, commute playlist, Alliance Française / TEF dates bookmarked.",
    checkpoint: "Accounts created; first Coffee Break episode queued; study streak starts Monday.",
    blocks: [
      {
        label: "Admin",
        time: "1–2 h once",
        content: "Anki + core FR deck; Spotify/YouTube FR commute playlist; note TEF centres in Calgary.",
      },
      {
        label: "Baseline",
        time: "30 min",
        content: "Self-assess A0; optional free Alliance Française placement if useful later.",
      },
    ],
  },
  {
    id: "phase1",
    title: "Hear & survive",
    months: "Months 1–3",
    level: "A0 → A2",
    goal: "~1000 active words; follow Coffee Break without constant pause; basic daily phrases.",
    checkpoint:
      "Understand ~70% of a Coffee Break S2 episode; speak 3 minutes about your day without English.",
    blocks: [
      {
        label: "Audio (gym / car / work)",
        time: "45–90 min/day",
        content: "Coffee Break French Season 1 daily; replay the same episode twice when short.",
      },
      {
        label: "Seated",
        time: "25–35 min/day",
        content: "Anki ~20 cards; Assimil or a structured A1–A2 lesson.",
      },
      {
        label: "Speaking",
        time: "2×30 min/week",
        content: "iTalki: greetings, routine, work, family.",
      },
      {
        label: "Writing",
        time: "2×/week",
        content: "5–8 sentences corrected by tutor or LangCorrect.",
      },
    ],
  },
  {
    id: "phase2",
    title: "Massive input",
    months: "Months 4–7",
    level: "A2 → B1",
    goal: "Simple narrative; RFI facile; 15-minute conversations.",
    checkpoint:
      "Follow early InnerFrench at ~50–60% comprehension; informal listening practice without a timer.",
    blocks: [
      {
        label: "Audio",
        time: "60–120 min/day",
        content: "News in Slow French / RFI Journal en français facile; easier InnerFrench episodes.",
      },
      {
        label: "Seated",
        time: "30–40 min/day",
        content: "B1 grammar; graded readers.",
      },
      {
        label: "Speaking",
        time: "2×45 min/week",
        content: "Opinions, immigration, working in Calgary (TEF themes).",
      },
      {
        label: "Writing",
        time: "1×/week",
        content: "Email / paragraph 120–150 words.",
      },
    ],
  },
  {
    id: "phase3",
    title: "Exam level",
    months: "Months 8–10",
    level: "B1 → B2",
    goal: "Functional B2; Québec ear; writing 200+ words.",
    checkpoint:
      "Mini TEF listening/reading mock; if listening score ≈ under 220, extend this phase 4–6 weeks.",
    blocks: [
      {
        label: "Audio",
        time: "60–90 min/day",
        content: "Full InnerFrench; 15–20 min ICI Radio-Canada.",
      },
      {
        label: "Seated",
        time: "40–50 min/day",
        content: "TV5Monde articles; B2 grammar.",
      },
      {
        label: "Speaking",
        time: "2–3×/week",
        content: "Argue, compare, hypothesize (TEF oral task shapes).",
      },
      {
        label: "Writing",
        time: "2×/week",
        content: "TEF typologies: short letter + short essay.",
      },
    ],
  },
  {
    id: "phase4",
    title: "TEF only",
    months: "Months 11–12",
    level: "B2 → NCLC 7",
    goal: "Floor NCLC 7 in all four skills on exam day.",
    checkpoint: "Book TEF Canada; 3–4 full mocks with a week between each; Québec audio daily last 3 weeks.",
    blocks: [
      {
        label: "Mocks",
        time: "3–4 full tests",
        content: "PrepMyFuture / official samples; one-play listening only.",
      },
      {
        label: "Daily drills",
        time: "60–90 min",
        content: "Timed listening + reading; record speaking tasks; writing checklist.",
      },
      {
        label: "Québec accent",
        time: "20 min/day (last 3 weeks)",
        content: "Radio-Canada OHdio — TEF includes Canadian audio.",
      },
    ],
  },
];

export type AudioResource = {
  name: string;
  phase: string;
  href: string;
  note: string;
};

export const frenchAudioPlaylists: AudioResource[] = [
  {
    name: "Coffee Break French",
    phase: "Months 1–4",
    href: "https://coffeebreaklanguages.com/coffeebreakfrench/",
    note: "Beginner seasons — primary gym/car feed at the start.",
  },
  {
    name: "RFI — Journal en français facile",
    phase: "Months 3–8",
    href: "https://www.rfi.fr/fr/podcasts/journal-en-fran%C3%A7ais-facile/",
    note: "Daily ~10 min slow news + transcript.",
  },
  {
    name: "News in Slow French",
    phase: "Months 3–8",
    href: "https://www.newsinslowfrench.com/",
    note: "Current affairs at learner speed.",
  },
  {
    name: "InnerFrench",
    phase: "Months 5–12",
    href: "https://innerfrench.com/",
    note: "Clear B1–B2 comprehensible input; main intermediate podcast.",
  },
  {
    name: "ICI Radio-Canada (OHdio)",
    phase: "Months 8–12",
    href: "https://ici.radio-canada.ca/ohdio",
    note: "Canadian French accents for TEF Canada listening.",
  },
  {
    name: "TV5Monde — Apprendre le français",
    phase: "Months 4–10",
    href: "https://apprendre.tv5monde.com/",
    note: "Levelled video + exercises (seated or phone).",
  },
];

export const frenchWeeklyTemplate = {
  goldRule: "Tired days = audio only. Never zero the streak.",
  weekdays: [
    "Gym / car / site: 45–90 min podcast (no pause; replay short episodes).",
    "Evening seated: 30 min Anki + grammar/reading.",
    "Two evenings: 20 min record speaking from a hub prompt.",
  ],
  saturday: ["60–90 min active block (reading + writing).", "45 min iTalki."],
  sunday: ["Weak-skill review + 30 min Radio-Canada.", "Partial rest to avoid burnout."],
} as const;

export const frenchTefChecklist = [
  "NCLC 7 floor: Listening ≥249, Reading ≥207, Writing ≥310, Speaking ≥310",
  "All four skills must hit NCLC 7 — one skill at 6 fails the bilingual bonus and French draws",
  "Book TEF Canada at Alliance Française / approved centre (~months 11–12)",
  "Complete 3–4 full timed mocks before exam day",
  "Listening practice: audio plays once only (exam rules)",
  "Last 3 weeks: daily Québec / Radio-Canada audio",
  "Results valid 2 years — update Express Entry profile when scores arrive",
  "Retake buffer: 6–8 weeks if one skill misses NCLC 7",
] as const;

export type FrenchResource = {
  name: string;
  href: string;
  note: string;
};

export const frenchResources: FrenchResource[] = [
  {
    name: "PrepMyFuture — TEF",
    href: "https://www.prepmyfuture.com/",
    note: "Exam-format practice for months 10–12.",
  },
  {
    name: "Le Français des Affaires — TEF",
    href: "https://www.lefrancaisdesaffaires.fr/",
    note: "Official TEF Canada information and samples.",
  },
  {
    name: "Alliance Française Calgary",
    href: "https://afcalgary.ca/",
    note: "Local classes and often TEF test sittings.",
  },
  {
    name: "iTalki",
    href: "https://www.italki.com/",
    note: "Search tutors tagged French + exam/TEF; 2×/week from month 2.",
  },
  {
    name: "Assimil / Grammaire Progressive",
    href: "https://www.assimil.com/",
    note: "Short seated structure alongside audio.",
  },
];
