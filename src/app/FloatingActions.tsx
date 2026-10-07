"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";

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
    <div style={{
      position: "fixed",
      bottom: "30px",
      right: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      zIndex: 2000
    }}>
      <AnimatePresence>
        {isVisible && (
          <motion.button
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

      {/* Call Button */}
      <motion.a
        href="tel:+910000000000"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#111" }}
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
          textDecoration: "none",
          transition: "background-color 0.3s ease, color 0.3s ease"
        }}
        aria-label="Call Us"
        title="Call +91 000 000 0000"
      >
        <Phone size={24} />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/910000000000"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, backgroundColor: "#25D366" }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#e8651c", // Brand orange
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(232, 101, 28, 0.3)",
          textDecoration: "none",
          transition: "background-color 0.3s ease"
        }}
        aria-label="Chat on WhatsApp"
        title="WhatsApp +91 000 000 0000"
      >
        <MessageCircle size={28} />
      </motion.a>
    </div>
  );
}
