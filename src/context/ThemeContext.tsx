"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");
  const [mounted, setMounted] = useState(false);

  // Helper to determine resolved theme from system preference
  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const applyTheme = (themeToApply: ResolvedTheme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // Enable temporary transition class for smooth theme shift
    root.classList.add("theme-transition");
    root.setAttribute("data-theme", themeToApply);
    root.style.colorScheme = themeToApply;

    const timer = setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 400);

    return () => clearTimeout(timer);
  };

  // On mount: initialize from localStorage or system
  useEffect(() => {
    const saved = localStorage.getItem("vivid-theme") as Theme | null;
    const initialTheme: Theme = saved || "dark";
    setThemeState(initialTheme);

    const activeResolved = initialTheme === "system" ? getSystemTheme() : initialTheme;
    setResolvedTheme(activeResolved);
    applyTheme(activeResolved);
    setMounted(true);
  }, []);

  // Listen to system theme changes if theme is set to 'system'
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const newSysTheme = mediaQuery.matches ? "dark" : "light";
      setResolvedTheme(newSysTheme);
      applyTheme(newSysTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("vivid-theme", newTheme);

    const activeResolved = newTheme === "system" ? getSystemTheme() : newTheme;
    setResolvedTheme(activeResolved);
    applyTheme(activeResolved);
  };

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

