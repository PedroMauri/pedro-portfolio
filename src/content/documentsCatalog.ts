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

export const IDENTITY_FAMILY_PATH = "/immigration/documents/identity-family";
export const WORK_HISTORY_PATH = "/immigration/documents/work-history";
export const EDUCATION_PATH = "/immigration/documents/education";
export const IELTS_ENGLISH_PATH = "/immigration/documents/ielts-english";
export const WES_PATH = "/immigration/documents/education/wes";

/** Index cards on Documents. */
export const DOCUMENT_INDEX_LINKS: DocumentIndexLink[] = [
  {
    to: IELTS_ENGLISH_PATH,
    label: "IELTS (English)",
    description: "Current TRF, scores, IDP account — plus previous test as reference",
  },
  {
    to: EDUCATION_PATH,
    label: "Education",
    description: "High school diploma and WES ECA",
  },
  {
    to: WORK_HISTORY_PATH,
    label: "Work history",
    description: "Schedule A table, employers, and reference letters",
  },
  {
    to: IDENTITY_FAMILY_PATH,
    label: "Identity & family",
    description: "Passport, marriage, and birth certificates",
  },
];

/** Generic file-list categories (Education and WES have dedicated pages). */
export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  {
    path: IDENTITY_FAMILY_PATH,
    label: "Identity & family",
    description: "Passport and civil-status documents for you and your family.",
    files: [
      {
        label: "Passport — Pedro",
        href: "/documents/identity/pedro-passport.pdf",
      },
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
];
