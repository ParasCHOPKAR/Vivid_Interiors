"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LetterRoll, MenuLetterRoll } from "@/components/SharedUI";
import ThemeToggle from "@/components/ThemeToggle";
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsAppIcon } from "@/components/SocialIcons";

const ConsultationModal = dynamic(() => import("@/components/ConsultationModal"), { ssr: false });

const navLinks = [
  { label: "Home", href: "/", num: "01", preview: "/images/hero_img_01.png" },
  { label: "About", href: "/about", num: "02", preview: "/images/about_studio.jpg" },
  { label: "Projects", href: "/projects", num: "03", preview: "/images/project_villa.jpg" },
  { label: "Services", href: "/services", num: "04", preview: "/images/service_kitchen.jpg" },
  { label: "How It Works", href: "/how-it-work", num: "05", preview: "/images/vivid_process_chart.jpg" },
  { label: "Locations", href: "/locations", num: "06", preview: "/images/locations_studio.jpg" },
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

  // Global listener for "Request a Call" buttons across any page
  useEffect(() => {
    const handleOpenConsultation = () => setModalOpen(true);
    window.addEventListener("open-consultation", handleOpenConsultation);
    return () => window.removeEventListener("open-consultation", handleOpenConsultation);
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
          background: scrolled ? "var(--header-scrolled-bg, rgba(13, 13, 13, 0.9))" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--header-scrolled-border, rgba(255,255,255,0.08))" : "1px solid transparent",
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
              background: "var(--nav-btn-bg, rgba(15,15,15,0.6))",
              borderColor: "var(--nav-btn-border, rgba(255,255,255,0.18))",
              color: "var(--header-text, #fff)",
            }}
          >
            <span className="hamburger-label" style={{ fontWeight: 500, letterSpacing: "2.5px" }}>
              <LetterRoll text={menuOpen ? "CLOSE" : "MENU"} />
            </span>
            <div className="hamburger-icon" style={{ marginLeft: "0.5rem" }}>
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.43, 0.195, 0.02, 1] }}
                style={{ background: "var(--hamburger-line, #fff)" }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{ background: "var(--hamburger-line, #fff)" }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.43, 0.195, 0.02, 1] }}
                style={{ background: "var(--hamburger-line, #fff)" }}
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
              className="site-logo"
              style={{ objectFit: "contain", display: "block" }}
            />
          </Link>

          {/* RIGHT ACTIONS: THEME TOGGLE & REQUEST A CALL */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.4rem, 2vw, 0.85rem)" }}>
            <ThemeToggle variant="icon" />
            <button
              className="forge-shimmer-btn header-cta-btn"
              onClick={() => setModalOpen(true)}
              style={{ padding: "0.6rem 1.4rem", fontSize: "0.72rem" }}
            >
              <span className="header-cta-text">
                <LetterRoll text="REQUEST A CALL" />
              </span>
              <span style={{ fontSize: "0.85rem", marginLeft: "2px" }}>↗</span>
            </button>
          </div>
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
                <p><a href="mailto:design@vividinteriorspune.com" style={{ color: "inherit" }}>design@vividinteriorspune.com</a></p>
                <p style={{ marginTop: "0.2rem" }}><a href="tel:+919970180947" style={{ color: "inherit" }}>+91 99701 80947</a></p>
                <p style={{ marginTop: "0.1rem" }}><a href="tel:+918999923438" style={{ color: "inherit" }}>+91 89999 23438</a></p>
                <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", marginTop: "0.4rem" }}>Erandwane, Pune</p>
                <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
                  <a href="https://www.instagram.com/vivid_interiors_developers/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", padding: "4px" }} title="Instagram">
                    <InstagramIcon size={16} />
                  </a>
                  <a href="https://www.facebook.com/vividinteriorspune/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", padding: "4px" }} title="Facebook">
                    <FacebookIcon size={16} />
                  </a>
                  <a href="https://www.youtube.com/channel/UCeGNUunmmJuyLsbioeN31-g" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", padding: "4px" }} title="YouTube">
                    <YoutubeIcon size={16} />
                  </a>
                  <a href="https://wa.me/919970180947" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", padding: "4px" }} title="WhatsApp">
                    <WhatsAppIcon size={16} />
                  </a>
                </div>
                <div style={{ marginTop: "1.2rem" }}>
                  <ThemeToggle variant="sidebar" />
                </div>
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
                      className={`menu-link ${isActive ? "active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.3 : 1,
                        color: isActive ? "#e8651c" : "#fff",
                      }}
                    >
                      <span className="menu-link-num" style={{ color: isActive ? "#e8651c" : undefined }}>
                        {link.num}
                      </span>
                      <span className="menu-link-text">
                        <MenuLetterRoll text={link.label} />
                      </span>
                      {isActive && (
                        <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "2px", color: "#e8651c", marginLeft: "0.8rem", padding: "0.2rem 0.6rem", background: "rgba(232,101,28,0.12)", borderRadius: "999px" }}>
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
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
