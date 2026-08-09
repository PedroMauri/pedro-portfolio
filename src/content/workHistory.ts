/** Work history from Schedule A (IMM5708) — reference for Express Entry profile. */

export type WorkHistoryEntry = {
  id: string;
  from: string;
  to: string;
  toLabel: string;
  activity: string;
  location: string;
  employer: string;
  reference?: {
    label: string;
    href: string;
    letterDates: string;
    alignment: "match" | "partial" | "missing" | "unverified";
    alignmentNote: string;
  };
};

export const WORK_HISTORY_PATH = "/immigration/documents/work-history";

export const workHistorySource = {
  form: "Schedule A to IMM 5708",
  href: "/documents/work-history/schedule-a-imm5708.docx",
  note: "Source table for Express Entry work history. Cross-check against reference letters before submitting.",
} as const;

/**
 * Date checks vs letters on file:
 * - Upsigns letter: Apr 22, 2019 – Sep 23, 2021 → matches Schedule A 2019-04 – 2021-09
 * - Felipe (Yethos/Leaf): Jul 2021 – Feb 2023 → matches Schedule A 2021-07 – 2023-02
 * - Alpha letter is a scan (no extractable dates); company matches Alpha Central Educacional
 * - Ozeias letter is a scan; treated as government service reference (verify dates visually)
 * - Mattali Drywall: no reference letter in this pack yet
 */
export const workHistoryEntries: WorkHistoryEntry[] = [
  {
    id: "mattali",
    from: "2023-07",
    to: "present",
    toLabel: "Present",
    activity: "Marketing Coordinator",
    location: "Calgary, Alberta",
    employer: "Mattali Drywall Inc.",
    reference: {
      label: "No letter in Documents yet",
      href: "",
      letterDates: "—",
      alignment: "missing",
      alignmentNote: "Add a Mattali reference letter when available.",
    },
  },
  {
    id: "unemployed-2023",
    from: "2023-03",
    to: "2023-07",
    toLabel: "2023-07",
    activity: "Unemployed",
    location: "—",
    employer: "—",
  },
  {
    id: "yethos",
    from: "2021-07",
    to: "2023-02",
    toLabel: "2023-02",
    activity: "Marketing Consultant (Remote Position)",
    location: "California, United States",
    employer: "Yethos Inc.",
    reference: {
      label: "Reference letter — Felipe",
      href: "/documents/work-history/reference-felipe.pdf",
      letterDates: "July 2021 – February 2023",
      alignment: "match",
      alignmentNote: "Matches Schedule A (Yethos / Leaf consultant work).",
    },
  },
  {
    id: "upsigns",
    from: "2019-04",
    to: "2021-09",
    toLabel: "2021-09",
    activity: "Commercial & Account Director",
    location: "Vila Velha, ES, Brazil",
    employer: "Upsigns Comunicação Digital Ltda.",
    reference: {
      label: "Reference letter — Upsigns",
      href: "/documents/work-history/reference-upsigns.pdf",
      letterDates: "April 22, 2019 – September 23, 2021",
      alignment: "match",
      alignmentNote: "Matches Schedule A at month level (letter includes exact days).",
    },
  },
  {
    id: "alpha",
    from: "2021-01",
    to: "2021-08",
    toLabel: "2021-08",
    activity: "Marketing Consultant",
    location: "Cariacica, Brazil",
    employer: "Alpha Central Educacional",
    reference: {
      label: "Reference letter — Alpha",
      href: "/documents/work-history/reference-alpha.pdf",
      letterDates: "Scan — verify dates on PDF",
      alignment: "unverified",
      alignmentNote: "Company matches; letter is image-based — confirm Jan 2021 – Aug 2021 on the PDF.",
    },
  },
  {
    id: "government-es",
    from: "2015-07",
    to: "2023-03",
    toLabel: "2023-03",
    activity: "State public servant",
    location: "Espírito Santo, Brazil",
    employer: "Government of the state of Espírito Santo",
    reference: {
      label: "Reference letter — Ozeias",
      href: "/documents/work-history/reference-ozeias.pdf",
      letterDates: "Scan — verify dates on PDF",
      alignment: "unverified",
      alignmentNote: "Assumed to cover government service; letter is image-based — confirm Jul 2015 – Mar 2023 on the PDF.",
    },
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
    covers: "Alpha Central Educacional · verify dates on scan",
  },
  {
    label: "Reference letter — Ozeias",
    href: "/documents/work-history/reference-ozeias.pdf",
    covers: "Likely government service · verify dates on scan",
  },
] as const;
