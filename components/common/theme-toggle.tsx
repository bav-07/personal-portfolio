"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobileDevice } from "@/lib/mobile-utils";

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
  // Theme may be null until hydrated.
  const [theme, setTheme] = useState<Theme | null>(null);
  const [mounted, setMounted] = useState(false);
  // Track whether the user explicitly changed the theme in this session.
  const userInteractedRef = useRef(false);
  // Track if we already persisted an implicit system-derived theme (avoid repeated writes).
  const systemPersistedRef = useRef(false);

  // Read theme synchronously on client, set to null for SSR
  useEffect(() => {
    const currentTheme = (typeof window !== 'undefined' && window.__PORTFOLIO_THEME__) ||
                        (document.documentElement.getAttribute('data-theme') as Theme) || 
                        resolvePreferredTheme();
    setTheme(currentTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || theme === null) return;

    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;

    // Only persist if user explicitly toggled OR we haven't persisted yet AND there was no prior stored value.
    if (userInteractedRef.current) {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } else {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      if (!existing && !systemPersistedRef.current) {
        // Persist the initial system-derived theme once (optional: could skip entirely to always follow system until user acts)
        window.localStorage.setItem(STORAGE_KEY, theme);
        systemPersistedRef.current = true;
      }
    }
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

  const handleToggle = () => {
    userInteractedRef.current = true;
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Check if user is on a mobile device (not just small screen)
    const isMobile = isMobileDevice();
    
    if (isMobile) {
      // For mobile, set theme immediately and force a page reload
      // to avoid rendering glitches with backdrop-filter and complex animations
      document.documentElement.dataset.theme = newTheme;
      document.body.dataset.theme = newTheme;
      window.localStorage.setItem(STORAGE_KEY, newTheme);
      
      // Force page reload after a brief delay to allow the theme change to be visible
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      // For desktop, use the normal smooth transition
      setTheme(newTheme);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={["site-header__toggle", className].filter(Boolean).join(" ")}
      aria-label={label}
      role="switch"
      aria-checked={theme === "light"}
    >
      <span aria-hidden className="">
        {theme === "dark" ? <MoonIcon className="size-6" /> : <SunIcon className="size-6" />}
      </span>
    </button>
  );
}
