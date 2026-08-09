/** IELTS English TRF and IDP account — personal reference. */

export const ieltsEnglishPortal = {
  url: "https://account.ielts.idp.com/login",
  username: "pedro-mauri@hotmail.com",
  password: "rcfdiYDgLSf$$U6",
} as const;

/** Scores from ETRF CA09724504530 (General Training), test 9 Mar 2025. */
export const ieltsEnglishScores = {
  listening: 7.0,
  reading: 7.0,
  writing: 6.5,
  speaking: 8.0,
  overall: 7.0,
  cefr: "C1",
  module: "General Training",
} as const;

/** Test date from ETRF (9 March 2025). Results are valid for 2 years. */
export const ieltsEnglishTrf = {
  candidateNumber: "CA09724504530",
  testDateIso: "2025-03-09",
  testDateDisplay: "9 March 2025",
  expiresIso: "2027-03-09",
  expiresDisplay: "9 March 2027",
  pdfPath: "/documents/ielts/ca09724504530-etrf.pdf",
  pdfLabel: "Electronic Test Report Form (ETRF)",
} as const;

/** Older IELTS reports kept for reference only (not the current TRF for applications). */
export const ieltsEnglishPreviousReference = {
  pdfPath: "/documents/ielts/ca75924501361-etrf.pdf",
  pdfLabel: "Previous IELTS report (6 Oct 2024)",
  note: "Reference only — do not use for new applications. Use the current ETRF above.",
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

export function formatBand(score: number) {
  return score.toFixed(1);
}
