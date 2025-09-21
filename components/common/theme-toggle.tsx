"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

type Theme = "dark" | "light";

type ThemeToggleProps = {
  className?: string;
};

// Extend Window interface to include our global theme variable
declare global {
  interface Window {
    __PORTFOLIO_THEME__?: Theme;
  }
}

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
  // Don't try to guess the theme during SSR - wait for client hydration
  const [theme, setTheme] = useState<Theme | null>(null);
  const [mounted, setMounted] = useState(false);

  // Read theme synchronously on client, set to null for SSR
  useEffect(() => {
    const currentTheme = (typeof window !== 'undefined' && window.__PORTFOLIO_THEME__) ||
                        (document.documentElement.getAttribute('data-theme') as Theme) || 
                        resolvePreferredTheme();
    setTheme(currentTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || theme === null) {
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

  // Don't render interactive content until mounted and theme is determined
  if (!mounted || theme === null) {
    return (
      <button
        type="button"
        className={["site-header__toggle", className].filter(Boolean).join(" ")}
        aria-label="Toggle theme"
        role="switch"
        aria-checked={false}
        disabled
      >
        <span aria-hidden className="">
          {/* Render a neutral placeholder or nothing during SSR/loading */}
          <div className="size-6" />
        </span>
      </button>
    );
  }

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
      <span aria-hidden className="">
        {theme === "dark" ? <MoonIcon className="size-6" /> : <SunIcon className="size-6" />}
      </span>
      {/* <span className="site-header__toggle-label">
        {theme === "dark" ? "Dark" : "Light"} mode
      </span> */}
    </button>
  );
}
