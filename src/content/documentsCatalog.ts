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

export const IDENTITY_FAMILY_PATH = "/immigration/documents/identity-family";
export const WORK_HISTORY_PATH = "/immigration/documents/work-history";
export const EDUCATION_PATH = "/immigration/documents/education";
export const IELTS_ENGLISH_PATH = "/immigration/documents/ielts-english";
export const WES_PATH = "/immigration/documents/education/wes";
export const STATUS_PERMITS_PATH = "/immigration/documents/status-permits";

/** Generic file-list categories (used by DocumentCategoryPage). */
export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  {
    path: STATUS_PERMITS_PATH,
    label: "Status & permits",
    description:
      "IRCC letters from Nov 2025. Approvals for Pedro (WP), Davi and Henry (SP) are valid to 2026-11-17 and currently linked to Pedro’s work permit. Caroline’s SOWP was refused (spouse TEER 5 / NOC 75110); she later received a visitor visa. All family status currently expires November 2026.",
    files: [
      {
        label: "Approval letter — Pedro (work permit extension)",
        href: "/documents/status-permits/approval-pedro.pdf",
        note: "Nov 18, 2025 · WP-EXT U517896290 · valid to 2026-11-17 · eTA J533964534 to 2030-11-17 · UCI 9667-3943 · App W310323454",
      },
      {
        label: "Approval letter — Henry (study permit extension)",
        href: "/documents/status-permits/approval-henry.pdf",
        note: "Nov 18, 2025 · SP-EXT F315630274 · valid to 2026-11-17 · App S307607474",
      },
      {
        label: "Approval letter — Davi (study permit extension)",
        href: "/documents/status-permits/approval-davi.pdf",
        note: "Nov 18, 2025 · SP-EXT F315630286 · valid to 2026-11-17 · App S307607472",
      },
      {
        label: "Refusal letter — Caroline (Spousal Open Work Permit)",
        href: "/documents/status-permits/refusal-caroline.pdf",
        note: "Nov 17, 2025 · App W310323452 · UCI 9667-3841 · refused: spouse not in TEER 0–1 / select TEER 2–3 · TR status noted as expired same day",
      },
      {
        label: "Officer decision notes — Caroline SOWP refusal",
        href: "/documents/status-permits/officers-notes-refusal-caroline.pdf",
        note: "Nov 17, 2025 · Spouse LMIA WP Construction Labourer NOC 75110 (TEER 5) · not eligible for C41 SOWP under rules as of 2025-01-21 · R205(c)(ii)",
      },
    ],
  },
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
