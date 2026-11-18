"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  variant?: "icon" | "pill" | "sidebar";
  className?: string;
  style?: React.CSSProperties;
}

export default function ThemeToggle({
  variant = "icon",
  className = "",
  style = {},
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by rendering a static placeholder shell
    return (
      <div
        className={`theme-toggle-placeholder ${className}`}
        style={{
          width: variant === "icon" ? "38px" : "120px",
          height: "38px",
          borderRadius: "2px",
          border: "1px solid var(--border-subtle, rgba(255,255,255,0.15))",
          background: "transparent",
          ...style,
        }}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  if (variant === "sidebar") {
    return (
      <div
        className={`theme-toggle-sidebar ${className}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1rem",
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
          borderRadius: "2px",
          ...style,
        }}
      >
        <span
          style={{
            fontSize: "0.68rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
            fontWeight: 500,
          }}
        >
          Theme: <span style={{ color: "#e8651c" }}>{isDark ? "DARK" : "LIGHT"}</span>
        </span>
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            color: isDark ? "#fff" : "#111",
            padding: "0.2rem 0.5rem",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={resolvedTheme}
              initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center" }}
            >
              {isDark ? <Sun size={16} color="#e8651c" /> : <Moon size={16} color="#111" />}
            </motion.div>
          </AnimatePresence>
          <span style={{ fontSize: "0.68rem", letterSpacing: "1px", textTransform: "uppercase" }}>
            {isDark ? "Switch Light" : "Switch Dark"}
          </span>
        </button>
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <button
        onClick={toggleTheme}
        className={`theme-toggle-pill ${className}`}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0.5rem 1.1rem",
          borderRadius: "999px",
          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
          color: isDark ? "#fff" : "#111",
          cursor: "pointer",
          fontSize: "0.72rem",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          transition: "all 0.3s ease",
          ...style,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={resolvedTheme}
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            style={{ display: "flex", alignItems: "center" }}
          >
            {isDark ? <Sun size={15} color="#e8651c" /> : <Moon size={15} color="#111" />}
          </motion.div>
        </AnimatePresence>
        <span>{isDark ? "LIGHT" : "DARK"}</span>
      </button>
    );
  }

  // Default compact icon variant for Header
  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`theme-toggle-btn ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "38px",
        height: "38px",
        borderRadius: "2px",
        border: "1px solid var(--theme-toggle-border, rgba(255,255,255,0.2))",
        background: "var(--theme-toggle-bg, rgba(15,15,15,0.5))",
        color: "var(--theme-toggle-color, #ffffff)",
        cursor: "pointer",
        backdropFilter: "blur(6px)",
        transition: "border-color 0.3s, background-color 0.3s, color 0.3s",
        ...style,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {isDark ? (
            <Sun size={17} style={{ color: "#e8651c" }} />
          ) : (
            <Moon size={17} style={{ color: "var(--theme-icon-color, #111)" }} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

