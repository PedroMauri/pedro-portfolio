import type { PersonId } from "@/content/people";

/** Coarse folders on person pages — few sections, related docs together. */
export type DocKind =
  | "photo"
  | "identity"
  | "status"
  | "education"
  | "work"
  | "forms";

export type RegistryDoc = {
  id: string;
  person: PersonId;
  label: string;
  href: string;
  kind: DocKind;
  expiresOn?: string;
  note?: string;
  superseded?: boolean;
};

export const DOC_KIND_LABELS: Record<DocKind, string> = {
  photo: "Photo",
  identity: "Identity & family",
  status: "Status & permits",
  education: "Education",
  work: "Work",
  forms: "Forms",
};

/** Kind display order on person pages. */
export const DOC_KIND_ORDER: DocKind[] = [
  "photo",
  "identity",
  "status",
  "education",
  "work",
  "forms",
];

const CURRENT_STATUS_EXPIRY = "2026-11-17";

export function isDocExpired(doc: RegistryDoc, today = new Date()): boolean {
  if (doc.superseded) return true;
  if (!doc.expiresOn) return false;
  const expiry = new Date(`${doc.expiresOn}T23:59:59`);
  return today.getTime() > expiry.getTime();
}

/** Current / valid docs first; expired and superseded last. */
export function sortCurrentFirst(docs: RegistryDoc[], today = new Date()): RegistryDoc[] {
  return [...docs].sort((a, b) => {
    const aExpired = isDocExpired(a, today) ? 1 : 0;
    const bExpired = isDocExpired(b, today) ? 1 : 0;
    if (aExpired !== bExpired) return aExpired - bExpired;
    const aCurrent = /— current$/i.test(a.label) || /\bcurrent\b/i.test(a.label) ? 0 : 1;
    const bCurrent = /— current$/i.test(b.label) || /\bcurrent\b/i.test(b.label) ? 0 : 1;
    return aCurrent - bCurrent;
  });
}

export function searchDocuments(docs: RegistryDoc[], query: string): RegistryDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return sortCurrentFirst(docs);
  return sortCurrentFirst(
    docs.filter((doc) => {
      const haystack = [doc.person, doc.label, doc.kind, doc.note ?? "", DOC_KIND_LABELS[doc.kind]]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    })
  );
}

export function docsForPerson(person: PersonId): RegistryDoc[] {
  return sortCurrentFirst(DOCUMENTS_REGISTRY.filter((doc) => doc.person === person));
}

export function countDocsForPerson(person: PersonId): number {
  return DOCUMENTS_REGISTRY.filter((doc) => doc.person === person).length;
}

export function groupDocsByKind(docs: RegistryDoc[]): { kind: DocKind; label: string; docs: RegistryDoc[] }[] {
  const byKind = new Map<DocKind, RegistryDoc[]>();
  for (const doc of docs) {
    const list = byKind.get(doc.kind) ?? [];
    list.push(doc);
    byKind.set(doc.kind, list);
  }

  const kindRank = new Map(DOC_KIND_ORDER.map((kind, index) => [kind, index]));

  return [...byKind.entries()]
    .map(([kind, kindDocs]) => ({
      kind,
      label: DOC_KIND_LABELS[kind],
      docs: sortCurrentFirst(kindDocs),
    }))
    .sort((a, b) => (kindRank.get(a.kind) ?? 99) - (kindRank.get(b.kind) ?? 99));
}

export const DOCUMENTS_REGISTRY: RegistryDoc[] = [
  // —— Pedro ——
  {
    id: "pedro-photo",
    person: "pedro",
    label: "Digital photo",
    href: "/documents/people/pedro/digital-photo.png",
    kind: "photo",
  },
  {
    id: "pedro-passport",
    person: "pedro",
    label: "Passport",
    href: "/documents/people/pedro/passport.pdf",
    kind: "identity",
  },
  {
    id: "pedro-id-current",
    person: "pedro",
    label: "ID",
    href: "/documents/people/pedro/id-current.pdf",
    kind: "identity",
  },
  {
    id: "pedro-wp-current",
    person: "pedro",
    label: "Work permit — current",
    href: "/documents/people/pedro/work-permit-current.pdf",
    kind: "status",
    expiresOn: CURRENT_STATUS_EXPIRY,
    note: "After Nov 2025 extension",
  },
  {
    id: "pedro-approval-wp",
    person: "pedro",
    label: "Work permit approval letter — current",
    href: "/documents/status-permits/approval-pedro.pdf",
    kind: "status",
    expiresOn: CURRENT_STATUS_EXPIRY,
    note: "WP-EXT U517896290 · issued Nov 18, 2025",
  },
  {
    id: "pedro-trv",
    person: "pedro",
    label: "TRV stamps",
    href: "/documents/people/pedro/trv-stamps.pdf",
    kind: "status",
  },
  {
    id: "pedro-wp-card",
    person: "pedro",
    label: "Work permit — expired",
    href: "/documents/people/pedro/work-permit.pdf",
    kind: "status",
    superseded: true,
    note: "Replaced by Nov 2025 extension",
  },
  {
    id: "pedro-temp-auth",
    person: "pedro",
    label: "Temporary work authorization — expired",
    href: "/documents/people/pedro/temp-work-auth.pdf",
    kind: "status",
    superseded: true,
    note: "Replaced by Nov 2025 extension",
  },
  {
    id: "pedro-imm5476",
    person: "pedro",
    label: "IMM 5476",
    href: "/documents/people/pedro/imm5476.pdf",
    kind: "forms",
  },
  {
    id: "pedro-birth",
    person: "pedro",
    label: "Birth certificate",
    href: "/documents/family/birth-certificate-pedro.pdf",
    kind: "identity",
  },
  {
    id: "pedro-ielts-current",
    person: "pedro",
    label: "IELTS TRF — current",
    href: "/documents/ielts/ca09724504530-etrf.pdf",
    kind: "education",
    expiresOn: "2027-03-09",
    note: "Test 9 Mar 2025 · L7.0 R7.0 W6.5 S8.0 · overall 7.0 (C1)",
  },
  {
    id: "pedro-ielts-oct2024",
    person: "pedro",
    label: "IELTS TRF — expired",
    href: "/documents/ielts/ca75924501361-etrf.pdf",
    kind: "education",
    superseded: true,
    note: "Test 6 Oct 2024 · overall 6.5 — replaced by Mar 2025 TRF",
  },
  {
    id: "pedro-ielts-previous",
    person: "pedro",
    label: "IELTS TRF — expired",
    href: "/documents/ielts/pedro-ielts-previous-reference.pdf",
    kind: "education",
    superseded: true,
    note: "Older reference report",
  },
  {
    id: "pedro-wes",
    person: "pedro",
    label: "WES ECA report — current",
    href: "/documents/wes/wes-6793833.pdf",
    kind: "education",
    expiresOn: "2029-12-10",
    note: "ECA #6793833IMM · issued 10 Dec 2024",
  },
  {
    id: "pedro-high-school",
    person: "pedro",
    label: "High school diploma",
    href: "/documents/education/high-school.pdf",
    kind: "education",
  },
  {
    id: "pedro-ref-upsigns",
    person: "pedro",
    label: "Reference letter — Upsigns",
    href: "/documents/work-history/reference-upsigns.pdf",
    kind: "work",
  },
  {
    id: "pedro-ref-felipe",
    person: "pedro",
    label: "Reference letter — Felipe (Yethos / Leaf)",
    href: "/documents/work-history/reference-felipe.pdf",
    kind: "work",
  },
  {
    id: "pedro-ref-alpha",
    person: "pedro",
    label: "Reference letter — Alpha",
    href: "/documents/work-history/reference-alpha.pdf",
    kind: "work",
  },
  {
    id: "pedro-ref-ozeias",
    person: "pedro",
    label: "Reference letter — Ozeias",
    href: "/documents/work-history/reference-ozeias.pdf",
    kind: "work",
    note: "Upsigns-period client work — not government",
  },
  {
    id: "pedro-schedule-a",
    person: "pedro",
    label: "Schedule A (IMM 5708)",
    href: "/documents/work-history/schedule-a-imm5708.docx",
    kind: "work",
  },
  {
    id: "pedro-marriage",
    person: "pedro",
    label: "Marriage certificate",
    href: "/documents/people/pedro/marriage-certificate.pdf",
    kind: "identity",
  },
  {
    id: "pedro-employment-expired",
    person: "pedro",
    label: "Employment contract — expired",
    href: "/documents/people/pedro/employment-contract-expired.pdf",
    kind: "work",
    superseded: true,
    note: "Previous role — no longer current",
  },

  // —— Caroline ——
  {
    id: "caroline-photo",
    person: "caroline",
    label: "Digital photo",
    href: "/documents/people/caroline/digital-photo.png",
    kind: "photo",
  },
  {
    id: "caroline-passport",
    person: "caroline",
    label: "Passport",
    href: "/documents/people/caroline/passport.pdf",
    kind: "identity",
  },
  {
    id: "caroline-id-current",
    person: "caroline",
    label: "ID",
    href: "/documents/people/caroline/id-current.pdf",
    kind: "identity",
  },
  {
    id: "caroline-vv-current",
    person: "caroline",
    label: "Visitor visa — current",
    href: "/documents/people/caroline/visitor-visa-current.pdf",
    kind: "status",
    expiresOn: CURRENT_STATUS_EXPIRY,
    note: "Linked to family status / WP expiry Nov 2026",
  },
  {
    id: "caroline-trv",
    person: "caroline",
    label: "TRV stamps",
    href: "/documents/people/caroline/trv-stamps.pdf",
    kind: "status",
  },
  {
    id: "caroline-refusal",
    person: "caroline",
    label: "SOWP refusal letter",
    href: "/documents/status-permits/refusal-caroline.pdf",
    kind: "status",
    superseded: true,
    note: "Nov 17, 2025 · App W310323452",
  },
  {
    id: "caroline-odn",
    person: "caroline",
    label: "SOWP officer decision notes",
    href: "/documents/status-permits/officers-notes-refusal-caroline.pdf",
    kind: "status",
    superseded: true,
    note: "Spouse TEER 5 / NOC 75110 — not eligible for C41",
  },
  {
    id: "caroline-wp-card",
    person: "caroline",
    label: "Work permit — expired",
    href: "/documents/people/caroline/work-permit.pdf",
    kind: "status",
    superseded: true,
    note: "SOWP refused Nov 2025; visitor visa approved later",
  },
  {
    id: "caroline-temp-auth",
    person: "caroline",
    label: "Temporary work authorization — expired",
    href: "/documents/people/caroline/temp-work-auth.pdf",
    kind: "status",
    superseded: true,
  },
  {
    id: "caroline-imm5476",
    person: "caroline",
    label: "IMM 5476",
    href: "/documents/people/caroline/imm5476.pdf",
    kind: "forms",
  },
  {
    id: "caroline-birth",
    person: "caroline",
    label: "Birth certificate",
    href: "/documents/family/birth-certificate-caroline.pdf",
    kind: "identity",
  },
  {
    id: "caroline-marriage",
    person: "caroline",
    label: "Marriage certificate",
    href: "/documents/people/caroline/marriage-certificate.pdf",
    kind: "identity",
  },
  {
    id: "caroline-resume",
    person: "caroline",
    label: "Resume",
    href: "/documents/people/caroline/resume.pdf",
    kind: "work",
  },
  {
    id: "caroline-oab",
    person: "caroline",
    label: "Brazilian Bar Association card",
    href: "/documents/people/caroline/brazilian-bar-association-card.pdf",
    kind: "education",
  },
  {
    id: "caroline-law",
    person: "caroline",
    label: "Major in law",
    href: "/documents/people/caroline/major-in-law.pdf",
    kind: "education",
  },
  {
    id: "caroline-postgrad",
    person: "caroline",
    label: "Post-graduation",
    href: "/documents/people/caroline/post-graduation.pdf",
    kind: "education",
  },

  // —— Davi ——
  {
    id: "davi-photo",
    person: "davi",
    label: "Digital photo",
    href: "/documents/people/davi/digital-photo.png",
    kind: "photo",
  },
  {
    id: "davi-passport",
    person: "davi",
    label: "Passport",
    href: "/documents/people/davi/passport.pdf",
    kind: "identity",
  },
  {
    id: "davi-sp-current",
    person: "davi",
    label: "Study permit — current",
    href: "/documents/people/davi/study-permit-current.pdf",
    kind: "status",
    expiresOn: CURRENT_STATUS_EXPIRY,
    note: "After Nov 2025 extension",
  },
  {
    id: "davi-approval-sp",
    person: "davi",
    label: "Study permit approval letter — current",
    href: "/documents/status-permits/approval-davi.pdf",
    kind: "status",
    expiresOn: CURRENT_STATUS_EXPIRY,
    note: "SP-EXT F315630286 · issued Nov 18, 2025",
  },
  {
    id: "davi-trv",
    person: "davi",
    label: "TRV stamps",
    href: "/documents/people/davi/trv-stamps.pdf",
    kind: "status",
  },
  {
    id: "davi-visitor",
    person: "davi",
    label: "Visitor record — expired",
    href: "/documents/people/davi/visitor-record.pdf",
    kind: "status",
    superseded: true,
    note: "Replaced by Nov 2025 study permit extension",
  },
  {
    id: "davi-birth",
    person: "davi",
    label: "Birth certificate",
    href: "/documents/people/davi/birth-certificate.pdf",
    kind: "identity",
  },
  {
    id: "davi-imm5476",
    person: "davi",
    label: "IMM 5476",
    href: "/documents/people/davi/imm5476.pdf",
    kind: "forms",
  },
  {
    id: "davi-learner",
    person: "davi",
    label: "Education forms — Learner Support Plan",
    href: "/documents/people/davi/education-forms-learner-support-plan.pdf",
    kind: "education",
  },
  {
    id: "davi-progress",
    person: "davi",
    label: "Elementary progress report",
    href: "/documents/people/davi/elementary-progress-report.pdf",
    kind: "education",
  },
  {
    id: "davi-speech",
    person: "davi",
    label: "Speech — Language Service Summary",
    href: "/documents/people/davi/speech-language-service-summary.pdf",
    kind: "education",
  },

  // —— Henry ——
  {
    id: "henry-photo",
    person: "henry",
    label: "Digital photo",
    href: "/documents/people/henry/digital-photo.png",
    kind: "photo",
  },
  {
    id: "henry-passport",
    person: "henry",
    label: "Passport",
    href: "/documents/people/henry/passport.pdf",
    kind: "identity",
  },
  {
    id: "henry-sp-current",
    person: "henry",
    label: "Study permit — current",
    href: "/documents/people/henry/study-permit-current.pdf",
    kind: "status",
    expiresOn: CURRENT_STATUS_EXPIRY,
    note: "After Nov 2025 extension",
  },
  {
    id: "henry-approval-sp",
    person: "henry",
    label: "Study permit approval letter — current",
    href: "/documents/status-permits/approval-henry.pdf",
    kind: "status",
    expiresOn: CURRENT_STATUS_EXPIRY,
    note: "SP-EXT F315630274 · issued Nov 18, 2025",
  },
  {
    id: "henry-trv",
    person: "henry",
    label: "TRV stamps",
    href: "/documents/people/henry/trv-stamps.pdf",
    kind: "status",
  },
  {
    id: "henry-visitor",
    person: "henry",
    label: "Visitor record — expired",
    href: "/documents/people/henry/visitor-record.pdf",
    kind: "status",
    superseded: true,
    note: "Replaced by Nov 2025 study permit extension",
  },
  {
    id: "henry-birth",
    person: "henry",
    label: "Birth certificate",
    href: "/documents/people/henry/birth-certificate.pdf",
    kind: "identity",
  },
  {
    id: "henry-imm5476",
    person: "henry",
    label: "IMM 5476",
    href: "/documents/people/henry/imm5476.pdf",
    kind: "forms",
  },
  {
    id: "henry-learner",
    person: "henry",
    label: "Education forms — Learner Support Plan",
    href: "/documents/people/henry/education-forms-learner-support-plan.pdf",
    kind: "education",
  },
  {
    id: "henry-progress",
    person: "henry",
    label: "Elementary progress report",
    href: "/documents/people/henry/elementary-progress-report.pdf",
    kind: "education",
  },
  {
    id: "henry-speech",
    person: "henry",
    label: "Speech — Language Service Summary",
    href: "/documents/people/henry/speech-language-service-summary.pdf",
    kind: "education",
  },
];
