/** AAIP profile snapshot — reference for the next Worker EOI. No portal password stored here. */

export const aaipPortal = {
  url: "https://aaip.labour.alberta.ca/",
  username: "pedromauri",
  password: "Pedrodm123",
} as const;

export type AaipApplicationStatus = "expired" | "active" | "draft";

export const aaipProfile = {
  status: "expired" as AaipApplicationStatus,
  statusLabel: "Expired",
  statusSummary:
    "This AAIP application has expired. The fields below are a reference snapshot for building the next Worker EOI.",

  pathway: "Express Entry Stream — Priority Sectors",

  noc: {
    code: "75110",
    title: "Construction trades helpers and labourers",
  },

  workPermit: {
    type: "LMIA",
    expiryDate: "2026-11-17",
    expiryDisplay: "Nov 17, 2026",
  },

  expressEntry: {
    profileNumber: "E004558943",
    crsScore: 414,
  },

  education: {
    highestLevel: "Diploma / certificate",
    ecaCompleted: true,
  },

  englishProficiency: "6 or higher",

  totalWorkExperience: "Less than 6 months",

  jobOffer: "Full-time employment job offer in Alberta",
} as const;
