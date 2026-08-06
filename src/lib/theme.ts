export type Theme = "light" | "dark";

/** Scoped to the Kanopi share page only. */
export const THEME_STORAGE_KEY = "kanopi-share-theme";

export function readStoredTheme(): Theme | null {
  const value = localStorage.getItem(THEME_STORAGE_KEY);
  return value === "light" || value === "dark" ? value : null;
}

export function resolveTheme(stored: Theme | null = readStoredTheme()): Theme {
  return stored ?? "dark";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  root.dataset.theme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#0f1414" : "#00959f");
  }
}
