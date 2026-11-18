"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Calendar,
  Layers,
  Building,
  Hammer,
  ShoppingBag,
  Search,
  Maximize2,
  X,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  FileText,
  Clock,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { PageHero, Reveal, MarqueeTicker, ForgeButton, LetterRoll } from "@/components/SharedUI";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";

interface ProcessStepItem {
  step: string;
  num: number;
  phase: "Planning & Design" | "Civil & Services" | "Joinery & Carpentry" | "Finishes & Lighting" | "Handover & Styling";
  phaseColor: string;
  office: string;
  onSite: string;
  market: string;
  summary: string;
}

const stepsData: ProcessStepItem[] = [
  {
    step: "STEP - 01",
    num: 1,
    phase: "Planning & Design",
    phaseColor: "#3b82f6",
    office: "WHATSAPP GROUP CREATION",
    onSite: "Client onboarding & team allocation",
    market: "Initial aesthetic references exchange",
    summary: "Dedicated WhatsApp group formed immediately upon registration with Lead Architect, Project Manager, and client for transparent daily communication.",
  },
  {
    step: "STEP - 02",
    num: 2,
    phase: "Planning & Design",
    phaseColor: "#3b82f6",
    office: "Floor plan data assimilation & CAD boundary setup",
    onSite: "SITE MEASUREMENTS",
    market: "Property layout feasibility study",
    summary: "Senior site engineers take milimetric on-site measurements, photographic scans, and verify structural columns/beams.",
  },
  {
    step: "STEP - 03",
    num: 3,
    phase: "Planning & Design",
    phaseColor: "#3b82f6",
    office: "CIVIL LAYOUT",
    onSite: "Civil markings & spatial zoning",
    market: "Space optimization review",
    summary: "Preparation of architectural space plans, wall alignments, door openings, and flow optimizations.",
  },
  {
    step: "STEP - 04",
    num: 4,
    phase: "Planning & Design",
    phaseColor: "#3b82f6",
    office: "LAYOUT & THEME FINALIZATION",
    onSite: "DESIGN PRESENTATION (On-Site Review)",
    market: "Preliminary mood board & finish review",
    summary: "Presentation of design theme, spatial flow, and preliminary 3D perspectives for client sign-off.",
  },
  {
    step: "STEP - 05",
    num: 5,
    phase: "Civil & Services",
    phaseColor: "#10b981",
    office: "FALSE CEILING LAYOUT",
    onSite: "Ceiling level datum marking",
    market: "FLOORING / KITCHEN / TOILET DADO SELECTION",
    summary: "Reflected ceiling plans drafted. Client accompanies our designers to trusted showrooms for tile and marble curation.",
  },
  {
    step: "STEP - 06",
    num: 6,
    phase: "Civil & Services",
    phaseColor: "#10b981",
    office: "FALSE CEILING DESIGN APPROVAL",
    onSite: "Laser grid elevation survey",
    market: "PANEL LIGHT SELECTION",
  summary: "Finalizing cove profiles, architectural drops, curtain pockets, and color temperatures (3000K Warm / 4000K Natural).",
  },
  {
    step: "STEP - 07",
    num: 7,
    phase: "Civil & Services",
    phaseColor: "#10b981",
    office: "DETAILED FALSE CEILING LAYOUT",
    onSite: "FALSE CEILING FRAMING",
    market: "LAMINATE / OTHER FINISHES SELECTION",
    summary: "Heavy-duty GI perimeter channels installed on-site while master laminate and veneer swatches are selected.",
  },
  {
    step: "STEP - 08",
    num: 8,
    phase: "Civil & Services",
    phaseColor: "#10b981",
    office: "Electrical circuiting & conduit routing drawings",
    onSite: "CEILING ELECTRICAL WIRING",
    market: "Fire-retardant wiring & breaker specifications",
    summary: "Complete ceiling conduits, speaker cables, and sensor lines drawn through framing prior to boarding.",
  },
  {
    step: "STEP - 09",
    num: 9,
    phase: "Civil & Services",
    phaseColor: "#10b981",
    office: "TOILET DESIGN",
    onSite: "Plumbing shaft & slope verification",
    market: "Concealed diverters & cistern selection",
    summary: "Wet/dry area zoning, shower niches, vanity counter details, and waterproofing specifications drafted.",
  },
  {
    step: "STEP - 10",
    num: 10,
    phase: "Civil & Services",
    phaseColor: "#10b981",
    office: "TOILET DESIGN APPROVAL",
    onSite: "Civil core-cutting & drainage line alignment",
    market: "Sanitaryware brand selection (Kohler, Grohe, Jaquar)",
    summary: "Client approves 3D bathroom renders, vanity ergonomics, and tile layout elevation sheets.",
  },
  {
    step: "STEP - 11",
    num: 11,
    phase: "Civil & Services",
    phaseColor: "#10b981",
    office: "DETAILED TOILET LAYOUT",
    onSite: "TOILET PLUMBING & ELECTRICAL WIRING",
    market: "Pressure testing & CPVC piping validation",
    summary: "Plumbing concealed lines pressurized at 10 bar to guarantee zero leakage before tile closing.",
  },
  {
    step: "STEP - 12",
    num: 12,
    phase: "Civil & Services",
    phaseColor: "#10b981",
    office: "Tile setting drawings & grout joint plans",
    onSite: "FLOORING & DADO WORK",
    market: "Epoxy grouts & anti-stain sealers",
    summary: "Laying of Italian marble, large-format vitrified slabs, and bathroom wall tiles with laser leveling.",
  },
  {
    step: "STEP - 13",
    num: 13,
    phase: "Civil & Services",
    phaseColor: "#10b981",
    office: "Boarding cutouts & access trap schedules",
    onSite: "GYPSUM SHEET FIXING",
    market: "FURNITURE TYPE SELECTION",
    summary: "Saint-Gobain gypsum boards screw-fixed, mesh taped, and compound flushed. Loose vs built-in furniture finalized.",
  },
  {
    step: "STEP - 14",
    num: 14,
    phase: "Joinery & Carpentry",
    phaseColor: "#f59e0b",
    office: "FURNITURE LAYOUT",
    onSite: "PAINTING BASE COAT",
    market: "Internal cabinet organizer selections",
    summary: "First putty coats applied to walls while internal wardrobe carcass elevations and kitchen modular plans are finalized.",
  },
  {
    step: "STEP - 15",
    num: 15,
    phase: "Joinery & Carpentry",
    phaseColor: "#f59e0b",
    office: "FURNITURE DESIGN APPROVAL",
    onSite: "Carpentry staging & tool mobilization",
    market: "Edge banding & internal laminate matching",
    summary: "Detailed approval of wardrobe shutters (fluted glass/acrylic/veneer), bed storage, TV media consoles, and kitchen modules.",
  },
  {
    step: "STEP - 16",
    num: 16,
    phase: "Joinery & Carpentry",
    phaseColor: "#f59e0b",
    office: "DETAILED FURNITURE LAYOUT",
    onSite: "FURNITURE WORK STARTS",
    market: "LAMINATE, HARDWARE FITTINGS SELECTION",
    summary: "On-site and factory precision carcass assembly starts. Soft-close channels and hinges from Blum and Hettich procured.",
  },
  {
    step: "STEP - 17",
    num: 17,
    phase: "Joinery & Carpentry",
    phaseColor: "#f59e0b",
    office: "PAINT SELECTION ON DRAWINGS / ON-SITE",
    onSite: "FURNITURE WORK COMPLETION",
    market: "PU lacquer & natural wood veneer polish swatches",
    summary: "Carpentry framing completes; paint and polish swatches applied directly on walls for natural daylight assessment.",
  },
  {
    step: "STEP - 18",
    num: 18,
    phase: "Finishes & Lighting",
    phaseColor: "#8b5cf6",
    office: "Color palette sign-off sheet",
    onSite: "PAINTING FIRST COAT",
    market: "Asian Paints Royale / PU finishes delivery",
    summary: "First premium emulsion coat applied across all ceiling and wall surfaces with milimetric surface sanding.",
  },
  {
    step: "STEP - 19",
    num: 19,
    phase: "Finishes & Lighting",
    phaseColor: "#8b5cf6",
    office: "Lighting lumen calculations & beam angle charts",
    onSite: "PANEL LIGHT FITTING",
    market: "WALLPAPER, CURTAIN, SOFA, BEDSHEETS AND CUSHIONS SELECTION",
    summary: "Spotlights, magnetic tracks, and LED strips fitted. Showroom session for luxury curtains, acoustic drapes, and sofa fabrics.",
  },
  {
    step: "STEP - 20",
    num: 20,
    phase: "Finishes & Lighting",
    phaseColor: "#8b5cf6",
    office: "Electrical load audit & test certificates",
    onSite: "ELECTRIFICATION COMPLETE",
    market: "DINING SELECTION",
    summary: "All switchplates, MCBs, internet ports, and home automation nodes activated and tested. Dining table curated.",
  },
  {
    step: "STEP - 21",
    num: 21,
    phase: "Finishes & Lighting",
    phaseColor: "#8b5cf6",
    office: "Quality assurance milestone review",
    onSite: "PAINTING SECOND COAT",
    market: "DECORATION LIGHT SELECTION",
    summary: "Final velvet-smooth topcoat applied. Selection of signature dining chandelier and accent pendants.",
  },
  {
    step: "STEP - 22",
    num: 22,
    phase: "Finishes & Lighting",
    phaseColor: "#8b5cf6",
    office: "Ceiling load validation for pendant fixtures",
    onSite: "DECORATIVE LIGHT FITTING",
    market: "Dimmer switches & ambiance tuning",
    summary: "Installation of signature chandeliers, bedside hanging lamps, and wall sconces with synchronized warm dimming.",
  },
  {
    step: "STEP - 23",
    num: 23,
    phase: "Handover & Styling",
    phaseColor: "#e8651c",
    office: "Drapery drop inspection & fabric care cards",
    onSite: "WALLPAPER & CURTAIN INSTALLATION",
    market: "Custom motorized curtain tracking",
    summary: "European textured wallpapers hung with seamless joints; tailored sheer and blackout motorized drapes mounted.",
  },
  {
    step: "STEP - 24",
    num: 24,
    phase: "Handover & Styling",
    phaseColor: "#e8651c",
    office: "Fixture warranty packet collation",
    onSite: "SANITARY & TOILET ACCESSORIES",
    market: "Towel warmers, mirrors & vanity accessories",
    summary: "Mounting of backlit defogger mirrors, rain showers, diverters, health faucets, and robe hooks with zero scratches.",
  },
  {
    step: "STEP - 25",
    num: 25,
    phase: "Handover & Styling",
    phaseColor: "#e8651c",
    office: "Art placement & visual focal point guide",
    onSite: "ARTIFACTS INSTALLATION",
    market: "ARTIFACTS SELECTION",
    summary: "Sculptures, framed canvases, planters, rugs, and decorative ceramic vessels curated and precision-styled.",
  },
  {
    step: "STEP - 26",
    num: 26,
    phase: "Handover & Styling",
    phaseColor: "#e8651c",
    office: "Final BOQ reconciliation, warranty & keys handover",
    onSite: "SITE COMPLETION",
    market: "Deep commercial cleaning & celebration",
    summary: "Deep industrial steam cleaning, final snag-list clearance, 10-year warranty document handover, and housewarming key ceremony!",
  },
];

const phases = [
  "All Phases",
  "Planning & Design",
  "Civil & Services",
  "Joinery & Carpentry",
  "Finishes & Lighting",
  "Handover & Styling",
] as const;

export default function HowItWorkPage() {
  const [activePhase, setActivePhase] = useState<string>("All Phases");
  const [searchQuery, setSearchQuery] = useState("");
  const [chartModalOpen, setChartModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<ProcessStepItem | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredSteps = stepsData.filter((item) => {
    const matchesPhase = activePhase === "All Phases" || item.phase === activePhase;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.step.toLowerCase().includes(q) ||
      item.office.toLowerCase().includes(q) ||
      item.onSite.toLowerCase().includes(q) ||
      item.market.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.phase.toLowerCase().includes(q);
    return matchesPhase && matchesSearch;
  });

  return (
    <main style={{ overflowX: "hidden" }}>
      {/* ═══════════════ PAGE HERO ═══════════════ */}
      <PageHero
        tag="[ End-To-End Methodology ]"
        title={
          <>
            Our Process After Registration / <span style={{ fontStyle: "italic", color: "#e8651c" }}>How It Works</span>
          </>
        }
        subtitle="GET TO KNOW OUR END-TO-END PROCESS — In a typical project timeline, we begin with an initial consultation to understand your requirements, vision, preferences, and budget. Followed by a synchronized 26-step execution journey uniting Studio Architecture, On-Site Engineering, and Vendor Sourcing."
        bgImage="/images/locations_studio.jpg"
        primaryCta={{ label: "EXPLORE 26-STEP SCHEDULE", href: "#process-table" }}
        secondaryCta={{ label: "VIEW PROCESS CHART", href: "#process-chart" }}
      />

      {/* ═══════════════ TICKER ═══════════════ */}
      <MarqueeTicker text="26 Transparent Milestones ✦ Dedicated WhatsApp Group ✦ Laser Measurement Survey ✦ Zero Vendor Kickbacks ✦ 100% On-Time Delivery ✦ Pune Since 2018 ✦" />

      {/* ═══════════════ 3 HARMONIZED TRACKS EXPLAINED ═══════════════ */}
      <section style={{ padding: "7.5rem 8%", background: "var(--bg-page, #faf9f6)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 4.5rem" }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", fontWeight: 600 }}>
                [ Synchronized Workflow ]
              </span>
              <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", color: "var(--text-primary, #111)", fontWeight: 400, lineHeight: 1.15, marginBottom: "1.2rem" }}>
                Three Synchronized Tracks Under One Roof
              </h2>
              <p style={{ color: "var(--text-secondary, #666)", fontSize: "1.02rem", lineHeight: 1.8 }}>
                Unlike fragmented contractors where the architect draws, the carpenter guesses, and you run around stores alone — Vivid Interiors coordinates every milestone across three interlocked tracks.
              </p>
            </div>
          </Reveal>

          <div className="responsive-cards-grid">
            {/* Track 1: Office */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: "var(--bg-card, #fff)",
                border: "1px solid var(--border-subtle, rgba(0,0,0,0.08))",
                borderRadius: "8px",
                padding: "3rem 2.5rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                position: "relative",
              }}
            >
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "rgba(59, 130, 246, 0.12)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.8rem" }}>
                <Building size={24} />
              </div>
              <span style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#3b82f6", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                Track 01
              </span>
              <h3 className="serif" style={{ fontSize: "1.8rem", color: "var(--text-primary, #111)", marginBottom: "1rem", fontWeight: 400 }}>
                Vivid Interiors Office
              </h3>
              <p style={{ color: "var(--text-secondary, #666)", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "1.8rem" }}>
                Our studio architects handle spatial planning, 3D photorealistic visualization, reflected false ceiling plans, electrical load distribution, toilet elevations, and detailed millwork shop drawings.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["Dedicated WhatsApp Group for daily reports", "Milestone-by-milestone drawing approvals", "Comprehensive BOQ & transparent cost locking"].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-muted, #555)", fontSize: "0.85rem" }}>
                    <CheckCircle2 size={14} color="#3b82f6" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Track 2: On-Site */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                background: "var(--bg-card, #fff)",
                border: "1px solid var(--border-subtle, rgba(0,0,0,0.08))",
                borderRadius: "8px",
                padding: "3rem 2.5rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                position: "relative",
              }}
            >
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "rgba(232, 101, 28, 0.12)", color: "#e8651c", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.8rem" }}>
                <Hammer size={24} />
              </div>
              <span style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                Track 02
              </span>
              <h3 className="serif" style={{ fontSize: "1.8rem", color: "var(--text-primary, #111)", marginBottom: "1rem", fontWeight: 400 }}>
                On-Site Execution
              </h3>
              <p style={{ color: "var(--text-secondary, #666)", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "1.8rem" }}>
                Dedicated site supervisors and master craftsmen manage laser site surveys, plumbing pressure tests, electrical wiring, gypsum framing, precision joinery, luxury painting, and deep industrial handover cleaning.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["Laser-guided framing & level checks", "In-house site engineers & quality audits", "10-Year Studio Structural Warranty"].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-muted, #555)", fontSize: "0.85rem" }}>
                    <CheckCircle2 size={14} color="#e8651c" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Track 3: Market Selection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                background: "var(--bg-card, #fff)",
                border: "1px solid var(--border-subtle, rgba(0,0,0,0.08))",
                borderRadius: "8px",
                padding: "3rem 2.5rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                position: "relative",
              }}
            >
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.12)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.8rem" }}>
                <ShoppingBag size={24} />
              </div>
              <span style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#10b981", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                Track 03
              </span>
              <h3 className="serif" style={{ fontSize: "1.8rem", color: "var(--text-primary, #111)", marginBottom: "1rem", fontWeight: 400 }}>
                Market Selection
              </h3>
              <p style={{ color: "var(--text-secondary, #666)", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "1.8rem" }}>
                Our architects accompany you to curated stone yards, veneer galleries, and lighting studios. We operate with absolute zero vendor kickbacks, ensuring honest wholesale rates directly to you.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["Zero kickback policy with all suppliers", "Personal architect showroom accompaniment", "Curated tactile material samples & swatches"].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-muted, #555)", fontSize: "0.85rem" }}>
                    <CheckCircle2 size={14} color="#10b981" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ ORIGINAL PROCESS CHART DISPLAY ═══════════════ */}
      <section id="process-chart" style={{ padding: "7rem 8%", background: "var(--bg-page-alt, #0f0f0f)", color: "#fff" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
            <div>
              <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.8rem", fontWeight: 600 }}>
                [ Official Workflow Chart ]
              </span>
              <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)", fontWeight: 400, color: "#fff", lineHeight: 1.15, marginBottom: "0.8rem" }}>
                The Vivid Execution Master Chart
              </h2>
              <p style={{ color: "#aaa", fontSize: "0.98rem", maxWidth: "600px", lineHeight: 1.7 }}>
                This is the exact milestone framework created by Vivid Interiors Pune to guarantee complete synchronization between our studio, on-site civil teams, and showroom selections.
              </p>
            </div>

            <button
              onClick={() => setChartModalOpen(true)}
              className="forge-shimmer-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.9rem 1.8rem",
                fontSize: "0.76rem",
                letterSpacing: "1.5px",
                cursor: "pointer",
              }}
            >
              <Maximize2 size={15} />
              <LetterRoll text="EXPAND FULL-SCREEN CHART" />
            </button>
          </div>

          {/* Interactive Chart Container */}
          <div
            onClick={() => setChartModalOpen(true)}
            style={{
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              background: "#181818",
              cursor: "zoom-in",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "auto", minHeight: "460px", maxHeight: "640px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image
                src="/images/vivid_process_chart.jpg"
                alt="Vivid Interiors Pune 26-Step Process Chart"
                width={1200}
                height={780}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  filter: "contrast(1.05) brightness(1.02)",
                  display: "block",
                }}
                priority
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle, transparent 70%, rgba(0,0,0,0.4) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            <div
              style={{
                padding: "1.2rem 2rem",
                background: "rgba(20,20,20,0.95)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <span style={{ fontSize: "0.78rem", color: "#ccc", letterSpacing: "1px" }}>
                Click to view full-resolution 26-Step Master Blueprint
              </span>
              <span style={{ fontSize: "0.72rem", color: "#e8651c", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600 }}>
                ✦ STEP 01 TO STEP 26
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FULL-SCREEN MODAL FOR CHART ═══════════════ */}
      <AnimatePresence>
        {chartModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setChartModalOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "1280px",
                width: "100%",
                maxHeight: "92vh",
                overflow: "auto",
                background: "#fff",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
              }}
            >
              <button
                onClick={() => setChartModalOpen(false)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <Image
                src="/images/vivid_process_chart.jpg"
                alt="Vivid Interiors Process Chart Full"
                width={1600}
                height={1040}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ INTERACTIVE 26-STEP MATRIX TABLE ═══════════════ */}
      <section id="process-table" style={{ padding: "7.5rem 8%", background: "var(--bg-page, #faf9f6)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          {/* Section Heading */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.8rem", fontWeight: 600 }}>
              [ Detailed Breakdown ]
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", color: "var(--text-primary, #111)", fontWeight: 400, lineHeight: 1.15, marginBottom: "1rem" }}>
              26-Step Master Execution Schedule
            </h2>
            <p style={{ color: "var(--text-secondary, #666)", fontSize: "1rem", maxWidth: "680px", margin: "0 auto", lineHeight: 1.7 }}>
              Browse each individual milestone below to see how our office deliverables, on-site activities, and material selection schedules synchronize with zero friction.
            </p>
          </div>

          {/* Filter Bar & Search */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.2rem",
              marginBottom: "2.5rem",
              padding: "1.2rem 1.8rem",
              background: "var(--bg-card, #fff)",
              borderRadius: "8px",
              border: "1px solid var(--border-subtle, rgba(0,0,0,0.08))",
              boxShadow: "0 6px 20px rgba(0,0,0,0.03)",
            }}
          >
            {/* Phase Filters */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              {phases.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePhase(p)}
                  style={{
                    padding: "0.55rem 1.1rem",
                    borderRadius: "4px",
                    border: activePhase === p ? "1px solid #e8651c" : "1px solid var(--border-subtle, rgba(0,0,0,0.1))",
                    background: activePhase === p ? "#e8651c" : "transparent",
                    color: activePhase === p ? "#fff" : "var(--text-primary, #444)",
                    fontSize: "0.74rem",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontWeight: activePhase === p ? 600 : 500,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: "relative", minWidth: "260px" }}>
              <Search size={15} color="#888" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search steps (e.g. false ceiling, tiles, paint)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 1rem 0.6rem 2.4rem",
                  borderRadius: "4px",
                  border: "1px solid var(--border-subtle, rgba(0,0,0,0.15))",
                  background: "var(--bg-surface, #faf9f6)",
                  color: "var(--text-primary, #111)",
                  fontSize: "0.82rem",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Master Table */}
          <div
            style={{
              background: "var(--bg-card, #fff)",
              borderRadius: "8px",
              border: "1px solid var(--border-subtle, rgba(0,0,0,0.08))",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "110px 1.1fr 1.1fr 1fr",
                padding: "1.4rem 2rem",
                background: "var(--bg-page-alt, #0f0f0f)",
                color: "#fff",
                fontSize: "0.72rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 600,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
              className="process-table-grid"
            >
              <div>Step</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Building size={14} color="#3b82f6" />
                <span>Vivid Interiors Office</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Hammer size={14} color="#e8651c" />
                <span>On-Site Work</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShoppingBag size={14} color="#10b981" />
                <span>Market Selection</span>
              </div>
            </div>

            {/* Table Rows */}
            {filteredSteps.length === 0 ? (
              <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--text-muted, #888)" }}>
                No steps found matching &ldquo;{searchQuery}&rdquo;. Try another search term or reset filters.
              </div>
            ) : (
              filteredSteps.map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (idx % 8) * 0.04 }}
                  onClick={() => setSelectedStep(selectedStep?.step === item.step ? null : item)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "110px 1.1fr 1.1fr 1fr",
                    padding: "1.4rem 2rem",
                    borderBottom: "1px solid var(--border-subtle, rgba(0,0,0,0.06))",
                    background: idx % 2 === 0 ? "var(--bg-card, #fff)" : "var(--bg-surface, #faf8f5)",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                  className="process-table-grid process-table-row"
                >
                  {/* Step Badging */}
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.3rem 0.65rem",
                        borderRadius: "4px",
                        background: "rgba(232, 101, 28, 0.12)",
                        color: "#e8651c",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "1px",
                      }}
                    >
                      {item.step}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.65rem",
                        color: item.phaseColor,
                        marginTop: "0.35rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.phase}
                    </span>
                  </div>

                  {/* Office Track */}
                  <div style={{ paddingRight: "1.5rem" }}>
                    <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: item.office ? 600 : 400, color: item.office ? "var(--text-primary, #111)" : "var(--text-muted, #999)", lineHeight: 1.5 }}>
                      {item.office || "—"}
                    </p>
                  </div>

                  {/* On-Site Track */}
                  <div style={{ paddingRight: "1.5rem" }}>
                    <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: item.onSite ? 600 : 400, color: item.onSite ? "var(--text-primary, #111)" : "var(--text-muted, #999)", lineHeight: 1.5 }}>
                      {item.onSite || "—"}
                    </p>
                  </div>

                  {/* Market Track */}
                  <div>
                    <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: item.market ? 600 : 400, color: item.market ? "#15803d" : "var(--text-muted, #999)", lineHeight: 1.5 }}>
                      {item.market || "—"}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT MAKES OUR PROCESS SUPERIOR ═══════════════ */}
      <section className="responsive-section" style={{ background: "var(--bg-page-alt, #0d0d0d)", color: "#fff" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div className="responsive-equal-two-col site-max-width">
            <div>
              <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", fontWeight: 600 }}>
                [ The Vivid Standard ]
              </span>
              <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: "1.8rem" }}>
                Why Pune Homeowners Trust This 26-Step Workflow
              </h2>
              <p style={{ color: "#aaa", fontSize: "1.02rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Most interior nightmares happen because carpenters start hammering before designs are frozen, or contractors buy substandard fittings to pocket secret dealer commissions. Our 26-step sequential pipeline completely eliminates these risks.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                {[
                  {
                    title: "No Execution Without Prior Drawing Approval",
                    desc: "Step 07 false ceiling framing and Step 16 furniture carpentry only start after you have physically reviewed and signed off on 3D renderings and working layouts.",
                  },
                  {
                    title: "Absolute Zero Vendor Commissions",
                    desc: "During Step 05 (Flooring), Step 16 (Hardware), and Step 19 (Soft Furnishings), you pay directly to suppliers at honest negotiated prices. We take zero kickbacks.",
                  },
                  {
                    title: "Pressure & Load Quality Checkpoints",
                    desc: "Step 11 plumbing pressure tests and Step 20 electrification breaker audits ensure zero hidden leaks or short circuits before tiles and boards are sealed.",
                  },
                  {
                    title: "Dedicated WhatsApp Concierge From Day One",
                    desc: "Step 01 starts with an active group including our Lead Architect and Project Director for daily progress photos and instant query resolution.",
                  },
                ].map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(232, 101, 28, 0.15)", color: "#e8651c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff", marginBottom: "0.3rem" }}>
                        {point.title}
                      </h4>
                      <p style={{ fontSize: "0.88rem", color: "#888", lineHeight: 1.6, margin: 0 }}>
                        {point.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ position: "relative", height: "620px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
                <Image
                  src="/images/craft_macro_detail.jpg"
                  alt="Precision Joinery & Craftsmanship"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "30px", left: "30px", right: "30px", padding: "1.6rem", background: "rgba(20,20,20,0.88)", backdropFilter: "blur(10px)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.3rem", fontWeight: 600 }}>
                    Precision Execution Guarantee
                  </span>
                  <p style={{ fontSize: "0.92rem", color: "#eee", margin: 0, lineHeight: 1.6 }}>
                    Every milestone verified with laser level meters, 10-bar hydraulic plumbing tests, and certified Blum &amp; Hettich hardware.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FREQUENTLY ASKED QUESTIONS ═══════════════ */}
      <section style={{ padding: "7.5rem 8%", background: "var(--bg-page, #faf9f6)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.8rem", fontWeight: 600 }}>
              [ Workflow FAQ ]
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)", fontWeight: 400, color: "var(--text-primary, #111)", lineHeight: 1.15 }}>
              Questions About Our Process
            </h2>
          </div>

          <div>
            {[
              {
                q: "Why do you follow a strict 26-step sequential pipeline?",
                a: "Over 8 years in Pune, we found that overlapping civil work with delicate finishes creates scratches, rework, and delayed handovers. Our sequential 26-step schedule ensures framing, electrical conduit wiring, plumbing, gypsum fixing, carpentry carcass fabrication, and painting happen in perfect mathematical harmony.",
              },
              {
                q: "What is the role of the Step 01 WhatsApp group?",
                a: "Immediately upon registration, a dedicated WhatsApp group is created consisting of you, your Senior Design Architect, the Site Project Manager, and Studio Leadership. Every Friday, weekly video reports and photos are uploaded so you are always 100% informed even without visiting site daily.",
              },
              {
                q: "How do Market Selections work in Steps 05, 16, 19, and 25?",
                a: "You never have to navigate crowded markets alone. Our designers personally accompany you to our verified partner showrooms for Italian marbles, large-format tiles, veneers, laminates, architectural lighting, and soft fabrics. You receive wholesale pricing directly with zero markups or kickbacks.",
              },
              {
                q: "Can changes be made after design approval in Step 04?",
                a: "Minor tweaks can be accommodated before detailed layouts in Step 07 and Step 16 are issued to the site. Because our 3D visualization is milimetrically accurate, clients rarely need major modifications once execution begins.",
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                style={{ borderBottom: "1px solid var(--border-subtle, rgba(0,0,0,0.1))" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.6rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span className="serif" style={{ fontSize: "1.22rem", fontWeight: 400, color: "var(--text-primary, #111)" }}>
                    {faq.q}
                  </span>
                  <motion.div animate={{ rotate: openFaq === idx ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} color="#e8651c" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{ overflow: "hidden", color: "var(--text-secondary, #666)", fontSize: "0.95rem", lineHeight: 1.8, paddingBottom: "1.5rem" }}
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PUNE STUDIO MAP ═══════════════ */}
      <GoogleMapEmbed
        title="Meet Our Architects & Review the 26-Step Plan"
        subtitle="Visit our Pune Flagship Atelier at Nal Stop Chowk, Karve Road, Erandwane to review physical material samples and discuss your timeline."
      />
    </main>
  );
}
