"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { ForgeButton, LetterRoll } from "@/components/SharedUI";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | string>("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ═══════════════ ANIMATED FOOTER CTA ═══════════════ */}
      <section style={{ background: "#0d0d0d", padding: "7rem 8%", textAlign: "center", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(232,101,28,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1.5rem" }}>
            [ Let's Create Together ]
          </span>
          <h2
            className="serif"
            style={{ fontSize: "clamp(2.8rem, 6vw, 6.5rem)", color: "#fff", fontStyle: "italic", fontWeight: 400, lineHeight: 1.08, marginBottom: "2.5rem" }}
          >
            Ready to Transform<br />Your Living Space?
          </h2>
          <p style={{ color: "#aaa", fontSize: "1.05rem", maxWidth: "540px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            Whether an expansive villa, luxury penthouse, or boutique commercial space — we bring your dream to life with architectural precision.
          </p>
          <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <ForgeButton href="/contact" variant="shimmer" style={{ padding: "1.1rem 2.8rem" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <LetterRoll text="START A CONVERSATION" />
                <ArrowRight size={16} />
              </span>
            </ForgeButton>
            <ForgeButton href="/projects" variant="ghost" style={{ padding: "1.1rem 2.8rem" }}>
              <LetterRoll text="EXPLORE OUR PORTFOLIO" />
            </ForgeButton>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ MAIN FOOTER ═══════════════ */}
      <footer style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "5rem 8% 3rem" }}>
        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3.5rem", marginBottom: "4.5rem" }}>
          {/* Brand col */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Link href="/" style={{ display: "inline-block", width: "160px", marginBottom: "1.8rem" }}>
              <Image src="/images/logo.png" alt="Vivid Interiors" width={160} height={60} style={{ objectFit: "contain" }} />
            </Link>
            <p style={{ color: "#777", fontSize: "0.88rem", lineHeight: 1.9, maxWidth: "300px", marginBottom: "2rem" }}>
              Transforming spaces into timeless experiences. Architecture, bespoke interiors, and end-to-end turnkey execution under one roof.
            </p>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              {["IN", "BE", "LN", "FB"].map((s, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, borderColor: "#e8651c", color: "#e8651c" }}
                  transition={{ duration: 0.2 }}
                  style={{ width: "36px", height: "36px", border: "1px solid rgba(255,255,255,0.15)", color: "#777", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", letterSpacing: "0.5px", transition: "all 0.3s" }}
                >
                  {s}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#fff", marginBottom: "1.8rem" }}>
              Navigation
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { label: "Home", href: "/" },
                { label: "About Studio", href: "/about" },
                { label: "Selected Projects", href: "/projects" },
                { label: "Design Services", href: "/services" },
                { label: "Our Studios & Locations", href: "/locations" },
                { label: "Client Testimonials", href: "/testimonials" },
                { label: "Design Ideas Journal", href: "/design-ideas" },
                { label: "Reach Us / Consultation", href: "/contact" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  style={{ color: "#777", fontSize: "0.88rem", transition: "color 0.2s, transform 0.2s", display: "inline-block" }}
                  className="footer-nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#fff", marginBottom: "1.8rem" }}>
              Our Services
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                "Bespoke Residential Interiors",
                "Corporate & Executive Offices",
                "Turnkey Design & Build",
                "3D VR Architectural Walkthroughs",
                "Modular Kitchens & Wardrobes",
                "Lighting & Acoustic Design",
              ].map((s, idx) => (
                <Link
                  key={idx}
                  href="/services"
                  style={{ color: "#777", fontSize: "0.88rem", transition: "color 0.2s" }}
                  className="footer-nav-link"
                >
                  {s}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact Col */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#fff", marginBottom: "1.8rem" }}>
              Studio Headquarters
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", color: "#777", fontSize: "0.88rem", lineHeight: 1.6 }}>
                <MapPin size={16} color="#e8651c" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span>Level 4, Vivid Atelier, Bandra West, Mumbai 400050, India</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", color: "#777", fontSize: "0.88rem" }}>
                <Phone size={16} color="#e8651c" style={{ flexShrink: 0 }} />
                <a href="tel:+919876543210" style={{ color: "#aaa" }}>+91 98765 43210</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", color: "#777", fontSize: "0.88rem" }}>
                <Mail size={16} color="#e8651c" style={{ flexShrink: 0 }} />
                <a href="mailto:hello@vividinteriors.in" style={{ color: "#aaa" }}>hello@vividinteriors.in</a>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <span style={{ fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#555", display: "block", marginBottom: "0.5rem" }}>
                  Studio Working Hours
                </span>
                <p style={{ color: "#888", fontSize: "0.82rem" }}>Mon – Sat: 10:00 AM – 7:30 PM</p>
                <p style={{ color: "#666", fontSize: "0.82rem" }}>Sunday: By Appointment</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated marquee divider with Forge edge fade */}
        <div style={{ overflow: "hidden", margin: "0 -8% 3rem", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "1.1rem 0" }}>
          <div className="forge-marquee-mask">
            <motion.div
              style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            >
              {[...Array(12)].map((_, i) => (
                <span key={i} style={{ fontSize: "0.72rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", flexShrink: 0 }}>
                  Vivid Interiors &nbsp;✦&nbsp; Architecture &nbsp;✦&nbsp; Design &nbsp;✦&nbsp; Execution &nbsp;✦&nbsp; Bespoke Living &nbsp;✦&nbsp;
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.2rem" }}
        >
          <p style={{ color: "#555", fontSize: "0.8rem", letterSpacing: "0.5px" }}>
            © {currentYear} Vivid Interiors Studio LLP. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy Policy", "Terms of Service", "Design Guidelines", "Cookie Preferences"].map((l, i) => (
              <a
                key={i}
                href="#"
                style={{ color: "#555", fontSize: "0.78rem", letterSpacing: "0.5px", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e8651c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >
                {l}
              </a>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#aaa",
              padding: "0.55rem 1.3rem",
              fontSize: "0.7rem",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#e8651c";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "#e8651c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "#aaa";
              e.currentTarget.style.background = "none";
            }}
          >
            <LetterRoll text="BACK TO TOP ↑" />
          </button>
        </motion.div>
      </footer>
    </>
  );
}
