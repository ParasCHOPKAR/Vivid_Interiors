"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="floating-actions-container"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        zIndex: 2000
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.button
            className="floating-action-btn"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1, backgroundColor: "#c9530f" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#111",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              transition: "background-color 0.3s ease"
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call / Request Call Button */}
      <motion.button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("open-consultation"));
          }
        }}
        className="floating-action-btn"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, backgroundColor: "#e8651c", color: "#fff" }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#111", 
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.15)",
          transition: "background-color 0.3s ease, color 0.3s ease",
          position: "relative",
        }}
        aria-label="Request a Call"
        title="Request a Call & Consultation"
      >
        <Phone size={22} />
      </motion.button>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/919970180947"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: "56px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          filter: "drop-shadow(0 8px 18px rgba(0, 0, 0, 0.22)) drop-shadow(0 4px 14px rgba(37, 211, 102, 0.45))",
          textDecoration: "none",
          position: "relative",
          borderRadius: "16px",
        }}
        aria-label="Chat on WhatsApp"
        title="WhatsApp +91 99701 80947"
      >
        <Image
          src="/images/whatsapp_floating.png"
          alt="Chat on WhatsApp"
          width={56}
          height={56}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            borderRadius: "16px",
          }}
          priority
        />
      </motion.a>
    </div>
  );
}
