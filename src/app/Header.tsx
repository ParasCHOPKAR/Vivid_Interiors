"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LetterRoll } from "@/components/SharedUI";

const navLinks = [
  { label: "Home", href: "/", num: "01", preview: "/images/hero_img_01.png" },
  { label: "About", href: "/about", num: "02", preview: "/images/about_studio.jpg" },
  { label: "Projects", href: "/projects", num: "03", preview: "/images/project_villa.jpg" },
  { label: "Services", href: "/services", num: "04", preview: "/images/service_kitchen.jpg" },
  { label: "Locations", href: "/locations", num: "05", preview: "/images/locations_studio.jpg" },
  { label: "Testimonials", href: "/testimonials", num: "06", preview: "/images/project_penthouse.jpg" },
  { label: "Reach Us", href: "/contact", num: "07", preview: "/images/locations_studio.jpg" },
  { label: "Design Ideas", href: "/design-ideas", num: "08", preview: "/images/design_ideas.jpg" },
];

const menuOverlay = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as any, delay: 0.15 },
  },
};

const staggerLinks = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const linkItem = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as any } },
  exit: { y: -30, opacity: 0, transition: { duration: 0.25 } },
};

const sideInfo = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.45 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("30 min");
  const [selectedSlot, setSelectedSlot] = useState("11:30 AM");
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const activePreviewImage =
    hoveredIndex !== null
      ? navLinks[hoveredIndex].preview
      : (navLinks.find((l) => l.href === pathname)?.preview ?? "/images/hero_img_01.png");

  return (
    <>
      <header
        className={`header ${scrolled ? "header-scrolled" : ""}`}
        style={{
          transition: "all 0.35s ease",
          background: scrolled ? "rgba(13, 13, 13, 0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          padding: scrolled ? "1rem 0" : "1.6rem 0",
        }}
      >
        <div className="container-fluid flex-between" style={{ alignItems: "center" }}>
          {/* HAMBURGER BUTTON */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              padding: "0.6rem 1.3rem",
              borderRadius: "2px",
              background: "rgba(15,15,15,0.6)",
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            <span className="hamburger-label" style={{ fontWeight: 500, letterSpacing: "2.5px" }}>
              <LetterRoll text={menuOpen ? "CLOSE" : "MENU"} />
            </span>
            <div className="hamburger-icon" style={{ marginLeft: "0.5rem" }}>
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.43, 0.195, 0.02, 1] }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.43, 0.195, 0.02, 1] }}
              />
            </div>
          </button>

          {/* CENTER LOGO */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{ width: "140px", display: "inline-block", cursor: "pointer" }}
          >
            <Image
              src="/images/logo.png"
              alt="Vivid Interiors Logo"
              width={140}
              height={60}
              priority
              style={{ objectFit: "contain", display: "block" }}
            />
          </Link>

          {/* REQUEST A CALL WITH FORGE SHIMMER ROTATING BORDER */}
          <button
            className="forge-shimmer-btn"
            onClick={() => { setModalOpen(true); setConsultSubmitted(false); }}
            style={{ padding: "0.6rem 1.4rem", fontSize: "0.72rem" }}
          >
            <LetterRoll text="REQUEST A CALL" />
            <span style={{ fontSize: "0.85rem", marginLeft: "2px" }}>↗</span>
          </button>
        </div>
      </header>

      {/* FULL-SCREEN MENU OVERLAY */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            className="fullscreen-menu"
            variants={menuOverlay}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Left decorative column */}
            <motion.div className="menu-sidebar" variants={sideInfo} initial="hidden" animate="show" exit="exit">
              <div className="menu-sidebar-text">
                <p style={{ color: "#e8651c", fontWeight: 600 }}>Architecture</p>
                <p>Design</p>
                <p>Execution</p>
                <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.15)", margin: "1.5rem 0" }} />
                <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", textTransform: "none" }}>
                  Mumbai · Bengaluru · Delhi NCR · Hyderabad · Pune
                </p>
              </div>
              <div className="menu-sidebar-contact">
                <p style={{ color: "#fff", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Get in touch</p>
                <p>hello@vividinteriors.in</p>
                <p>+91 98765 43210</p>
              </div>
            </motion.div>

            {/* Nav Links */}
            <motion.nav
              className="menu-nav"
              variants={staggerLinks}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.label}
                    className="menu-link-wrapper"
                    variants={linkItem}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Link
                      href={link.href}
                      className="menu-link"
                      onClick={() => setMenuOpen(false)}
                      style={{
                        opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.25 : 1,
                        color: isActive ? "#e8651c" : "#fff",
                      }}
                    >
                      <span className="menu-link-num" style={{ color: isActive ? "#e8651c" : undefined }}>
                        {link.num}
                      </span>
                      <span className="menu-link-text">
                        <LetterRoll text={link.label} />
                      </span>
                      {isActive && (
                        <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "2px", color: "#e8651c", marginLeft: "1rem" }}>
                          ✦ CURRENT
                        </span>
                      )}
                      <span className="menu-link-arrow">↗</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Right preview image */}
            <motion.div
              className="menu-preview"
              variants={sideInfo}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePreviewImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ width: "100%", height: "100%", position: "relative" }}
                >
                  <Image
                    src={activePreviewImage}
                    alt="Preview"
                    fill
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 60%)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1.5rem"
                  }}>
                    <span style={{ color: "#fff", fontSize: "0.78rem", letterSpacing: "2px", textTransform: "uppercase" }}>
                      Vivid Studio Design
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REQUEST A CALL MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setModalOpen(false)}>✕</button>
              
              {consultSubmitted ? (
                <div style={{ padding: "4rem 3rem", textAlign: "center", background: "#0d0d0d", color: "#fff" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#e8651c", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "2rem" }}>
                    ✓
                  </div>
                  <h3 className="serif" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Consultation Requested</h3>
                  <p style={{ color: "#aaa", fontSize: "0.95rem", maxWidth: "420px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
                    Thank you! Our principal design team will call you on <strong>October 7, 2026</strong> at <strong>{selectedSlot}</strong> for a <strong>{selectedDuration}</strong> deep-dive session.
                  </p>
                  <button className="btn-orange" onClick={() => setModalOpen(false)}>
                    DONE
                  </button>
                </div>
              ) : (
                <div className="modal-inner">
                  <div className="modal-left" style={{ background: "#111", color: "#fff" }}>
                    <div className="avatar" style={{ background: "#e8651c", color: "#fff" }}>V</div>
                    <h3 className="serif" style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>Book a Consultation</h3>
                    <p style={{ fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#aaa", marginBottom: "1.5rem" }}>
                      Direct with Senior Architect
                    </p>
                    <div style={{ fontSize: "0.8rem", color: "#e8651c", marginBottom: "1rem" }}>October 2026</div>
                    <div className="calendar-grid">
                      <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                      <span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                      <span>6</span><span className="active-day" style={{ background: "#e8651c", color: "#fff" }}>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
                      <span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span>
                    </div>
                  </div>
                  <div className="modal-right" style={{ background: "#faf9f6" }}>
                    <h4 style={{ fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.75rem", color: "#222" }}>
                      How long do you need?
                    </h4>
                    <div className="duration-btns">
                      {["15 min", "30 min", "1 hour"].map((dur) => (
                        <button
                          key={dur}
                          className={selectedDuration === dur ? "active" : ""}
                          style={{
                            borderColor: selectedDuration === dur ? "#e8651c" : "#ddd",
                            background: selectedDuration === dur ? "#e8651c" : "#fff",
                            color: selectedDuration === dur ? "#fff" : "#333",
                          }}
                          onClick={() => setSelectedDuration(dur)}
                        >
                          {dur}
                        </button>
                      ))}
                    </div>

                    <h4 style={{ fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem", color: "#222" }}>
                      Select a Time Slot
                    </h4>
                    <p style={{ fontSize: "0.75rem", color: "#777", marginBottom: "1rem" }}>Wednesday, 7 October 2026 (IST)</p>
                    <div className="time-slots" style={{ maxHeight: "180px", overflowY: "auto", paddingRight: "4px" }}>
                      {["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          style={{
                            borderColor: selectedSlot === slot ? "#e8651c" : "#ddd",
                            background: selectedSlot === slot ? "rgba(232, 101, 28, 0.1)" : "#fff",
                            color: selectedSlot === slot ? "#e8651c" : "#333",
                            fontWeight: selectedSlot === slot ? "bold" : "normal",
                          }}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    <button
                      className="btn-orange"
                      style={{ width: "100%", marginTop: "1.5rem", justifyContent: "center" }}
                      onClick={() => setConsultSubmitted(true)}
                    >
                      CONFIRM APPOINTMENT &nbsp;→
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
