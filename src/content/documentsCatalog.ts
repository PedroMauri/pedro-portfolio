export type DocumentFile = {
  label: string;
  href: string;
  note?: string;
};

export type DocumentCategory = {
  path: string;
  label: string;
  description: string;
  files: DocumentFile[];
};

export type DocumentIndexLink = {
  to: string;
  label: string;
  description: string;
};

export const IDENTITY_PATH = "/immigration/documents/identity";
export const FAMILY_PATH = "/immigration/documents/family";
export const WORK_HISTORY_PATH = "/immigration/documents/work-history";
export const EDUCATION_PATH = "/immigration/documents/education";
export const IELTS_ENGLISH_PATH = "/immigration/documents/ielts-english";
export const WES_PATH = "/immigration/documents/wes";

/** Index cards on Documents (specialized pages first, then packs). */
export const DOCUMENT_INDEX_LINKS: DocumentIndexLink[] = [
  {
    to: IELTS_ENGLISH_PATH,
    label: "IELTS (English)",
    description: "Current TRF, scores, IDP account — plus previous test as reference",
  },
  {
    to: WES_PATH,
    label: "WES",
    description: "ECA report and account — 5-year IRCC validity",
  },
  {
    to: WORK_HISTORY_PATH,
    label: "Work history",
    description: "Schedule A table, employers, and reference letters",
  },
  {
    to: IDENTITY_PATH,
    label: "Identity",
    description: "Passport",
  },
  {
    to: FAMILY_PATH,
    label: "Family",
    description: "Marriage and birth certificates",
  },
  {
    to: EDUCATION_PATH,
    label: "Education",
    description: "High school diploma (see also WES for ECA)",
  },
];

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  {
    path: IDENTITY_PATH,
    label: "Identity",
    description: "Identity documents used across immigration processes.",
    files: [
      {
        label: "Passport — Pedro",
        href: "/documents/identity/pedro-passport.pdf",
      },
    ],
  },
  {
    path: FAMILY_PATH,
    label: "Family",
    description: "Civil status and children’s identity documents.",
    files: [
      {
        label: "Marriage certificate",
        href: "/documents/family/marriage-certificate.pdf",
      },
      {
        label: "Birth certificate — Pedro",
        href: "/documents/family/birth-certificate-pedro.pdf",
      },
      {
        label: "Birth certificate — Caroline",
        href: "/documents/family/birth-certificate-caroline.pdf",
      },
      {
        label: "Birth certificate — Davi",
        href: "/documents/family/birth-certificate-davi.pdf",
      },
      {
        label: "Birth certificate — Henry",
        href: "/documents/family/birth-certificate-henry.pdf",
      },
    ],
  },
  {
    path: EDUCATION_PATH,
    label: "Education",
    description: "School credentials. For Canadian equivalency, see WES.",
    files: [
      {
        label: "High school diploma",
        href: "/documents/education/high-school.pdf",
      },
    ],
  },
];
