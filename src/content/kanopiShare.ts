export const KANOPI_SHARE_STORAGE_KEY = "kanopi-share-unlocked";

/** Client-side gate only (obscurity). Set VITE_KANOPI_SHARE_PASSWORD in Vercel to override. */
export const KANOPI_SHARE_PASSWORD =
  import.meta.env.VITE_KANOPI_SHARE_PASSWORD?.trim() || "KanopiYethos";

export const KANOPI_SHARE_PATH = "/share/kanopi";
