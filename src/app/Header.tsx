"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "https://makemyinteriors.in/", num: "01" },
  { label: "About", href: "https://makemyinteriors.in/about-us/", num: "02" },
  { label: "Projects", href: "https://makemyinteriors.in/interior-design-projects/", num: "03" },
  { label: "Services", href: "https://makemyinteriors.in/our-services/", num: "04" },
  { label: "Locations", href: "https://makemyinteriors.in/locations/", num: "05" },
  { label: "Testimonials", href: "https://makemyinteriors.in/customer-review/", num: "06" },
  { label: "Reach Us", href: "https://makemyinteriors.in/contact/", num: "07" },
  { label: "Design Ideas", href: "https://makemyinteriors.in/interior-design-ideas/", num: "08" },
];

const menuOverlay = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

const staggerLinks = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const linkItem = {
  hidden: { y: 80, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { y: -40, opacity: 0, transition: { duration: 0.3 } },
};

const sideInfo = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.6 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <header className="header">
        <div className="container-fluid flex-between" style={{ alignItems: "center" }}>

          {/* HAMBURGER BUTTON */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-label">{menuOpen ? "CLOSE" : "MENU"}</span>
            <div className="hamburger-icon">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>

          {/* CENTER LOGO */}
          <div style={{ width: "140px" }}>
            <Image
              src="/images/logo.png"
              alt="Vivid Interiors Logo"
              width={140}
              height={60}
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* REQUEST A CALL */}
          <button className="request-call-btn" onClick={() => setModalOpen(true)}>
            REQUEST A CALL &nbsp;↗
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
                <p>Architecture</p>
                <p>Design</p>
                <p>Execution</p>
              </div>
              <div className="menu-sidebar-contact">
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
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  className="menu-link-wrapper"
                  variants={linkItem}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <a
                    href={link.href}
                    className="menu-link"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.25 : 1,
                    }}
                  >
                    <span className="menu-link-num">{link.num}</span>
                    <span className="menu-link-text">{link.label}</span>
                    <span className="menu-link-arrow">↗</span>
                  </a>
                </motion.div>
              ))}
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
                  key={hoveredIndex ?? "default"}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: "100%", height: "100%", position: "relative" }}
                >
                  <Image
                    src="/images/hero_img_01.png"
                    alt="Preview"
                    fill
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
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
              <div className="modal-inner">
                <div className="modal-left">
                  <div className="avatar">V</div>
                  <h3>Book a Consultation</h3>
                  <p>October 2026</p>
                  <div className="calendar-grid">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                    <span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                    <span>6</span><span className="active-day">7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
                  </div>
                </div>
                <div className="modal-right">
                  <h4>How long do you need?</h4>
                  <div className="duration-btns">
                    <button className="active">15 min</button>
                    <button>30 min</button>
                    <button>1 hour</button>
                  </div>
                  <h4>What time works best?</h4>
                  <p style={{ fontSize: "0.75rem", color: "#666", marginBottom: "1rem" }}>7 October 2026</p>
                  <div className="time-slots">
                    <button>10:00 AM</button>
                    <button>11:30 AM</button>
                    <button>2:00 PM</button>
                    <button>4:30 PM</button>
                    <button>6:00 PM</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
