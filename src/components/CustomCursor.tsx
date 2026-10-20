"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const dotConfig = { damping: 40, stiffness: 450, mass: 0.1 };
  const dotX = useSpring(-100, dotConfig);
  const dotY = useSpring(-100, dotConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest(".menu-link") ||
          target.closest(".filter-pill") ||
          target.closest("[data-cursor='pointer']"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Outer ambient follower ring */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          borderRadius: "50%",
          border: isHovered
            ? "1px solid rgba(232, 101, 28, 0.7)"
            : "1px solid rgba(255, 255, 255, 0.35)",
          background: isHovered
            ? "radial-gradient(circle, rgba(232, 101, 28, 0.18) 0%, transparent 70%)"
            : "transparent",
          width: isHovered ? "56px" : "32px",
          height: isHovered ? "56px" : "32px",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease",
          boxShadow: isHovered ? "0 0 20px rgba(232, 101, 28, 0.25)" : "none",
        }}
      />
      {/* Inner precise dot */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          width: isHovered ? "6px" : "4px",
          height: isHovered ? "6px" : "4px",
          borderRadius: "50%",
          backgroundColor: isHovered ? "#e8651c" : "#fff",
          transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease",
        }}
      />
    </>
  );
}
