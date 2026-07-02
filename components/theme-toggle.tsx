"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "nexora-theme";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
    applyTheme(preferredTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/10 bg-[var(--surface)] text-[var(--foreground)] transition hover:bg-[rgba(148,163,184,0.12)] focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
    >
      {theme === "dark" ? "☀︎" : "🌙"}
    </button>
  );
}
