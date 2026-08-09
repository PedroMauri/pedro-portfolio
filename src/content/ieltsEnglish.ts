/** IELTS English TRF and IDP account — personal reference. */

export const ieltsEnglishPortal = {
  url: "https://account.ielts.idp.com/login",
  username: "pedro-mauri@hotmail.com",
  password: "rcfdiYDgLSf$$U6",
} as const;

/** Test date from ETRF filename (DD-MM-YYYY). Results are valid for 2 years. */
export const ieltsEnglishTrf = {
  candidateNumber: "CA75924501361",
  testDateIso: "2024-10-06",
  testDateDisplay: "6 October 2024",
  expiresIso: "2026-10-06",
  expiresDisplay: "6 October 2026",
  pdfPath: "/documents/ielts/ca75924501361-etrf.pdf",
  pdfLabel: "Electronic Test Report Form (ETRF)",
} as const;

export function getIeltsValidity(now = new Date()) {
  const expiry = new Date(`${ieltsEnglishTrf.expiresIso}T23:59:59`);
  const valid = now.getTime() <= expiry.getTime();
  return {
    valid,
    statusLabel: valid ? "Valid" : "Expired",
    summary: valid
      ? `IELTS results are valid for 2 years. This TRF expires on ${ieltsEnglishTrf.expiresDisplay}.`
      : `IELTS results expired on ${ieltsEnglishTrf.expiresDisplay} (2 years after the test date of ${ieltsEnglishTrf.testDateDisplay}).`,
  };
}
