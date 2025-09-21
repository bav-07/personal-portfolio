"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

type Theme = "dark" | "light";

type ThemeToggleProps = {
  className?: string;
};

function resolvePreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(() => resolvePreferredTheme());

  useEffect(() => {
    const preferred = resolvePreferredTheme();
    setTheme(preferred);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== "light" && stored !== "dark") {
        setTheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Fallback for older browsers
    if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }

    return undefined;
  }, []);

  const label = useMemo(
    () => (theme === "dark" ? "Switch to light mode" : "Switch to dark mode"),
    [theme],
  );

  return (
    <button
      type="button"
      onClick={() =>
        setTheme((current) => (current === "dark" ? "light" : "dark"))
      }
      className={["site-header__toggle", className].filter(Boolean).join(" ")}
      aria-label={label}
      role="switch"
      aria-checked={theme === "light"}
    >
      <span aria-hidden className="site-header__toggle-icon">
        {theme === "dark" ? "🌙" : "🌞"}
      </span>
      <span className="site-header__toggle-label">
        {theme === "dark" ? "Dark" : "Light"} mode
      </span>
    </button>
  );
}
