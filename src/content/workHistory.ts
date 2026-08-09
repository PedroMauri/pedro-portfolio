/** Work history from Schedule A (IMM5708) — reference for Express Entry profile. */

export type WorkHistoryEntry = {
  id: string;
  from: string;
  to: string;
  toLabel: string;
  activity: string;
  location: string;
  employer: string;
};

export const WORK_HISTORY_PATH = "/immigration/documents/work-history";

export const workHistorySource = {
  form: "Schedule A to IMM 5708",
  href: "/documents/work-history/schedule-a-imm5708.docx",
  note: "Source for Express Entry work history. Table below is corrected: state public service until Mattali start (2023-07). Update the Schedule A Word file before IRCC submission if it still shows the old unemployed gap.",
} as const;

/** Schedule A timeline (corrected): public servant until Mattali start — no unemployed gap. */
export const workHistoryEntries: WorkHistoryEntry[] = [
  {
    id: "mattali",
    from: "2023-07",
    to: "present",
    toLabel: "Present",
    activity: "Marketing Coordinator",
    location: "Calgary, Alberta",
    employer: "Mattali Drywall Inc.",
  },
  {
    id: "yethos",
    from: "2021-07",
    to: "2023-02",
    toLabel: "2023-02",
    activity: "Marketing Consultant (Remote Position)",
    location: "California, United States of America",
    employer: "Yethos Inc.",
  },
  {
    id: "upsigns",
    from: "2019-04",
    to: "2021-09",
    toLabel: "2021-09",
    activity: "Commercial & Account Director",
    location: "Vila Velha, ES – Brazil",
    employer: "Upsigns Comunicação Digital Ltda.",
  },
  {
    id: "alpha",
    from: "2021-01",
    to: "2021-08",
    toLabel: "2021-08",
    activity: "Marketing Consultant",
    location: "Cariacica, Brazil",
    employer: "Alpha Central Educacional",
  },
  {
    id: "government-es",
    from: "2015-07",
    to: "2023-07",
    toLabel: "2023-07",
    activity: "State public servant.",
    location: "Espírito Santo – Brazil",
    employer: "Government of the state of Espírito Santo",
  },
];

export const workHistoryLetters = [
  {
    label: "Reference letter — Felipe (Yethos / Leaf)",
    href: "/documents/work-history/reference-felipe.pdf",
    covers: "Yethos Inc. · Jul 2021 – Feb 2023",
  },
  {
    label: "Reference letter — Upsigns",
    href: "/documents/work-history/reference-upsigns.pdf",
    covers: "Upsigns · Apr 22, 2019 – Sep 23, 2021",
  },
  {
    label: "Reference letter — Alpha",
    href: "/documents/work-history/reference-alpha.pdf",
    covers: "Alpha client work while at Upsigns · Jan–Aug 2021 on Schedule A",
  },
  {
    label: "Reference letter — Ozeias",
    href: "/documents/work-history/reference-ozeias.pdf",
    covers: "Client/project work while at Upsigns · not government service",
  },
] as const;
