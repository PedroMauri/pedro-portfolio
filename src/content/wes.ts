/** WES ECA for Canadian immigration — personal reference. */

export const wesPortal = {
  url: "https://applications.wes.org/login?ec=302&startURL=%2Fcreateaccount%2Flogin%2Flogin%2F",
  username: "pedro-mauri@hotmail.com",
  password: "x8zq!77.NDcKWmR",
} as const;

/**
 * IRCC rule: an ECA must be less than 5 years old when you complete an Express Entry
 * profile and when you submit a permanent residence application.
 * Sources: Canada.ca educational credential assessment; WES ECA pages.
 */
export const wesEca = {
  referenceNumber: "6793833IMM",
  issueDateIso: "2024-12-10",
  issueDateDisplay: "10 December 2024",
  expiresIso: "2029-12-10",
  expiresDisplay: "10 December 2029",
  validityYears: 5,
  canadianEquivalency: "Diploma (two years)",
  credential: "Tecnólogo/a (Technologist) — Internet of Things",
  institution: "Universidade Cruzeiro do Sul — UNICSUL",
  credentialYear: "2023",
  country: "Brazil",
  pdfPath: "/documents/wes/wes-6793833.pdf",
  pdfLabel: "WES ECA report (IRCC)",
} as const;

export function getWesValidity(now = new Date()) {
  const expiry = new Date(`${wesEca.expiresIso}T23:59:59`);
  const valid = now.getTime() <= expiry.getTime();
  return {
    valid,
    statusLabel: valid ? "Valid" : "Expired",
    summary: valid
      ? `For Canadian immigration, a WES ECA is valid for ${wesEca.validityYears} years from the issue date. This report expires on ${wesEca.expiresDisplay}.`
      : `This WES ECA expired on ${wesEca.expiresDisplay} (${wesEca.validityYears} years after issue on ${wesEca.issueDateDisplay}). IRCC requires a valid ECA when you create an Express Entry profile and when you apply for PR.`,
  };
}
