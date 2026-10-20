"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, X, MapPin, Maximize2, Calendar, Layers, Check } from "lucide-react";
import {
  PageHero,
  Reveal,
  ParallaxImg,
  AnimatedNumber,
  MarqueeTicker,
  ForgeButton,
  LetterRoll,
} from "@/components/SharedUI";

interface Project {
  id: string;
  title: string;
  location: string;
  category: "Residential" | "Penthouse" | "Commercial" | "Villa";
  area: string;
  year: string;
  img: string;
  tagline: string;
  desc: string;
  materials: string[];
  scope: string[];
}

const allProjects: Project[] = [
  {
    id: "villa-aurelia",
    title: "Villa Aurelia",
    location: "Bandra West, Mumbai",
    category: "Villa",
    area: "450 m² (4,850 sq ft)",
    year: "2025",
    img: "/images/project_villa.jpg",
    tagline: "Double-height coastal sanctuary with bookmatched marble & timber louvers.",
    desc: "A bespoke private residence designed for an art collector family. The architecture maximizes natural daylight through floor-to-ceiling double-glazed apertures while maintaining complete acoustic serenity in the heart of Mumbai.",
    materials: ["Italian Calacatta Viola", "Smoked Walnut Slats", "Patinated Brass", "Hand-cast Terrazzo"],
    scope: ["Complete Architectural Remodel", "Turnkey Interior Fit-out", "Bespoke Millwork & Joinery", "Smart Home Automation"],
  },
  {
    id: "sky-penthouse",
    title: "The Sky Penthouse",
    location: "Indiranagar, Bengaluru",
    category: "Penthouse",
    area: "520 m² (5,600 sq ft)",
    year: "2024",
    img: "/images/project_penthouse.jpg",
    tagline: "Panoramic 360° skyline vistas with minimalist Italian living aesthetics.",
    desc: "Perched on the 34th floor, this penthouse balances dramatic twilight views with warm, tactile materiality. Custom acoustic walnut paneling conceals home theater audio while sculptural cove lighting accentuates the soaring ceiling volume.",
    materials: ["Smoked Oak Flooring", "Nero Marquina Marble", "Hand-brushed Bronze", "Italian Bouclé Upholstery"],
    scope: ["Spatial Re-planning", "3D VR Pre-visualization", "Acoustic Engineering", "Custom Modular Wardrobes"],
  },
  {
    id: "obsidian-lounge",
    title: "The Obsidian Executive Suite",
    location: "DLF Phase 5, Gurgaon",
    category: "Commercial",
    area: "280 m² (3,000 sq ft)",
    year: "2025",
    img: "/images/service_commercial.jpg",
    tagline: "Ultra-luxury corporate headquarters with acoustic timber & smoked glass.",
    desc: "An executive office and private salon designed for a private equity firm. The space reflects quiet authority through precision timber fluting, brass linear illumination, and acoustic sound dampening wall systems.",
    materials: ["Fluted Teak Paneling", "Acoustic Smoked Glass", "Saddle Leather", "Statuary Marble Accents"],
    scope: ["Workplace Interior Architecture", "Executive Boardroom Fit-out", "Turnkey MEP & HVAC", "Architectural Lighting"],
  },
  {
    id: "culinary-sanctuary",
    title: "The Minimalist Culinary Atelier",
    location: "Koregaon Park, Pune",
    category: "Residential",
    area: "190 m² (2,050 sq ft)",
    year: "2024",
    img: "/images/service_kitchen.jpg",
    tagline: "German-engineered matte black kitchen with quartzite cantilever island.",
    desc: "A statement open-concept culinary living suite. Features handleless soft-touch cabinetry, integrated Miele appliances concealed behind pocket doors, and a dramatic waterfall quartzite island that doubles as a dining bar.",
    materials: ["Matte Charcoal Fenix", "Belgian Dark Quartzite", "Solid Fluted Oak", "Integrated Brass Fixtures"],
    scope: ["Kitchen Architecture", "Bespoke Island Engineering", "Concealed Appliance Joinery", "Ambient Cove Lighting"],
  },
  {
    id: "japandi-courtyard",
    title: "Japandi Courtyard Residence",
    location: "Jubilee Hills, Hyderabad",
    category: "Villa",
    area: "380 m² (4,100 sq ft)",
    year: "2025",
    img: "/images/design_ideas.jpg",
    tagline: "Tranquil biophilic sanctuary combining Scandinavian warmth with Zen minimalism.",
    desc: "Designed around a private bonsai courtyard garden, this residence uses light oak battens, linen sheer drapery, and low-profile seating to establish a restorative, meditative rhythm.",
    materials: ["White Nordic Oak", "Woven Hemp & Jute", "Micro-cement Flooring", "Hand-thrown Clay Ceramics"],
    scope: ["Biophilic Space Planning", "Courtyard Landscaping Integration", "Custom Low Furniture", "Daylight Optimization"],
  },
  {
    id: "sovereign-suite",
    title: "The Sovereign Master Suite",
    location: "Worli Sea Face, Mumbai",
    category: "Penthouse",
    area: "310 m² (3,350 sq ft)",
    year: "2025",
    img: "/images/service_bedroom.jpg",
    tagline: "Terracotta fluted headboard sanctuary with walk-in smoked glass dressing suite.",
    desc: "An opulent master retreat overlooking the Arabian Sea. A full-height upholstered velvet wall acts as both acoustic dampener and architectural anchor, accompanied by custom walk-in wardrobe modules with automated sensor lighting.",
    materials: ["Rust Terracotta Velvet", "Smoked Glass Wardrobe Profiles", "Herringbone Walnut Flooring", "Antiqued Brass Sconces"],
    scope: ["Master Suite Architecture", "Walk-in Dressing Room Build", "Custom Bed Architecture", "Motorized Blackout Controls"],
  },
];

const categories = ["All", "Residential", "Penthouse", "Commercial", "Villa"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <main style={{ overflowX: "hidden" }}>
      {/* ═══════════════ PAGE HERO ═══════════════ */}
      <PageHero
        tag="[ Selected Works & Portfolio ]"
        title={
          <>
            Curated Spaces of <span style={{ fontStyle: "italic", color: "#e8651c" }}>Distinction</span>
          </>
        }
        subtitle="Explore our portfolio of bespoke private residences, sky penthouses, and refined commercial architecture across India's premier addresses."
        bgImage="/images/project_villa.jpg"
        primaryCta={{ label: "BOOK A CONSULTATION", href: "/contact" }}
        secondaryCta={{ label: "EXPLORE SERVICES", href: "/services" }}
      />

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <MarqueeTicker text="Bespoke Architecture ✦ Luxury Residences ✦ Executive Suites ✦ Sky Penthouses ✦ Turnkey Quality ✦" />

      {/* ═══════════════ FILTER TABS & PROJECTS ═══════════════ */}
      <section style={{ padding: "7rem 8%", background: "#faf9f6" }}>
        {/* Header and Filter Pills */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4rem", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.5rem" }}>
              [ Architectural Catalog ]
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)", fontWeight: 400 }}>
              Featured Works ({filteredProjects.length})
            </h2>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3rem" }}
        >
          <AnimatePresence>
            {filteredProjects.map((p, idx) => (
              <motion.div
                layout
                key={p.id}
                className="forge-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedProject(p)}
                style={{ cursor: "pointer", background: "#fff", borderColor: "rgba(0,0,0,0.08)", padding: "1.2rem", borderRadius: "4px" }}
              >
                <div style={{ position: "relative", height: "420px", overflow: "hidden", marginBottom: "1.5rem", borderRadius: "3px" }}>
                  <div className="forge-card-img" style={{ width: "100%", height: "100%", position: "relative" }}>
                    <ParallaxImg src={p.img} alt={p.title} speed={0.06} />
                  </div>
                  <span style={{ position: "absolute", top: "1.2rem", left: "1.2rem", background: "#e8651c", color: "#fff", fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", padding: "0.4rem 1rem", zIndex: 3 }}>
                    {p.category}
                  </span>
                  <div style={{ position: "absolute", bottom: "1.2rem", right: "1.2rem", background: "rgba(13,13,13,0.85)", color: "#fff", padding: "0.5rem 1rem", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", zIndex: 3, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span>VIEW DETAILS</span> <Maximize2 size={13} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 className="serif" style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: "0.3rem" }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "#888", letterSpacing: "0.8px" }}>
                      {p.location} &nbsp;·&nbsp; {p.area}
                    </p>
                    <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "0.75rem", lineHeight: 1.6, maxWidth: "380px" }}>
                      {p.tagline}
                    </p>
                  </div>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8651c" }}>
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section style={{ padding: "6.5rem 8%", background: "#111", color: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", textAlign: "center" }}>
          {[
            { num: 450, suffix: "+", label: "Completed Projects" },
            { num: 15, suffix: "", label: "Metropolitan Hubs" },
            { num: 98, suffix: "%", label: "Client Referral Rate" },
            { num: 100, suffix: "%", label: "Fixed-Fee Transparency" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="serif" style={{ fontSize: "4.5rem", fontWeight: 400, lineHeight: 1, color: "#e8651c" }}>
                <AnimatedNumber target={s.num} />{s.suffix}
              </div>
              <p style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "2px", color: "#888", marginTop: "1rem" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ CLIENT QUOTE ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#fff", textAlign: "center" }}>
        <Reveal>
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1.5rem" }}>
            [ Client Spotlight ]
          </span>
          <p className="serif" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", maxWidth: "860px", margin: "0 auto 2.5rem", lineHeight: 1.4, color: "#111" }}>
            "Vivid Interiors transformed our Bandra duplex into an architectural masterpiece. The level of joinery detail and the lighting composition exceeds the finest luxury hotels we have visited."
          </p>
          <span style={{ fontSize: "0.85rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#555", fontWeight: 600 }}>
            Rajesh & Malini Singhania &nbsp;·&nbsp; Villa Aurelia, Mumbai
          </span>
          <div style={{ marginTop: "3rem" }}>
            <Link href="/testimonials" className="btn-dark">
              READ MORE CLIENT STORIES <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════ PROJECT DETAILS MODAL ═══════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              style={{ maxWidth: "900px", maxHeight: "90vh", overflowY: "auto", background: "#0d0d0d", color: "#fff" }}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal"
                style={{ color: "#fff", background: "rgba(0,0,0,0.5)", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
                onClick={() => setSelectedProject(null)}
              >
                <X size={20} />
              </button>

              <div style={{ position: "relative", height: "400px", width: "100%" }}>
                <Image src={selectedProject.img} alt={selectedProject.title} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0d0d0d 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "2rem", left: "2.5rem" }}>
                  <span style={{ background: "#e8651c", color: "#fff", fontSize: "0.68rem", letterSpacing: "2px", textTransform: "uppercase", padding: "0.4rem 1rem", display: "inline-block", marginBottom: "0.8rem" }}>
                    {selectedProject.category}
                  </span>
                  <h2 className="serif" style={{ fontSize: "2.5rem", fontWeight: 400 }}>{selectedProject.title}</h2>
                  <p style={{ color: "#aaa", fontSize: "0.9rem" }}>{selectedProject.location} · Completed {selectedProject.year}</p>
                </div>
              </div>

              <div style={{ padding: "2.5rem 3rem" }}>
                <p style={{ fontSize: "1.08rem", lineHeight: 1.8, color: "#ccc", marginBottom: "2.5rem" }}>
                  {selectedProject.desc}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", marginBottom: "2.5rem" }}>
                  <div>
                    <h4 style={{ fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", marginBottom: "1rem" }}>
                      Curated Material Palette
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {selectedProject.materials.map((m, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#bbb", fontSize: "0.9rem" }}>
                          <Check size={14} color="#e8651c" /> {m}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", marginBottom: "1rem" }}>
                      Scope of Execution
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {selectedProject.scope.map((s, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#bbb", fontSize: "0.9rem" }}>
                          <Check size={14} color="#e8651c" /> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "#888", letterSpacing: "1.5px", textTransform: "uppercase", display: "block" }}>Area Handled</span>
                    <strong style={{ color: "#fff", fontSize: "1.1rem" }}>{selectedProject.area}</strong>
                  </div>
                  <ForgeButton href="/contact" variant="shimmer" onClick={() => setSelectedProject(null)}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                      <LetterRoll text="INQUIRE ABOUT THIS STYLE" />
                      <ArrowRight size={15} />
                    </span>
                  </ForgeButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
