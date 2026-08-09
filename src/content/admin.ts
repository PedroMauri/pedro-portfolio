export const ADMIN_STORAGE_KEY = "admin-hub-unlocked";

/** Client-side gate only (obscurity). Set VITE_ADMIN_PASSWORD in Vercel to override. */
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD?.trim() || "pedrodm123";

export const ADMIN_PATH = "/admin";
export const PRIVATE_PORTFOLIO_PATH = "/admin/private-portfolio";
export const FRENCH_STUDY_PATH = "/study/french";
export const IMMIGRATION_PATH = "/immigration";
export const EXPRESS_ENTRY_PATH = "/immigration/express-entry";
export const AAIP_PATH = "/immigration/aaip";

export type AdminLink = {
  to: string;
  label: string;
  description: string;
  external?: boolean;
  comingSoon?: boolean;
};

/** Company-specific private shares (application materials). */
export const PRIVATE_PORTFOLIO_SHARES: AdminLink[] = [
  {
    to: "/share/kanopi",
    label: "Kanopi",
    description: "Contract Senior UX/UI Designer — written responses and process",
  },
];

/** Immigration program folders. */
export const IMMIGRATION_FOLDERS: AdminLink[] = [
  {
    to: EXPRESS_ENTRY_PATH,
    label: "Express Entry",
    description: "Federal Express Entry notes and materials",
  },
  {
    to: AAIP_PATH,
    label: "AAIP",
    description: "Alberta Advantage Immigration Program notes and materials",
  },
];

export const ADMIN_LINKS: AdminLink[] = [
  {
    to: "/",
    label: "Portfolio",
    description: "Public product design portfolio",
  },
  {
    to: PRIVATE_PORTFOLIO_PATH,
    label: "Private portfolio",
    description: "Company-specific application shares",
  },
  {
    to: FRENCH_STUDY_PATH,
    label: "French",
    description: "Private IELTS French study space",
  },
  {
    to: IMMIGRATION_PATH,
    label: "Immigration",
    description: "Private immigration notes and materials",
  },
];
