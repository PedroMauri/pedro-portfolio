import { useEffect, useState } from "react";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  readStoredTheme,
  resolveTheme,
  type Theme,
} from "@/lib/theme";

/** Dark mode for the Kanopi share page only — resets to light when the page unmounts. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === "undefined" ? "light" : resolveTheme()
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readStoredTheme()) return;
      setThemeState(resolveTheme(null));
    };
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      applyTheme("light");
    };
  }, []);

  function setTheme(next: Theme) {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setThemeState(next);
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return { theme, setTheme, toggleTheme, isDark: theme === "dark" };
}
