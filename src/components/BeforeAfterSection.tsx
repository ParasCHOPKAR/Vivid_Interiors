"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, SlidersHorizontal, Eye, Layers } from "lucide-react";
import { Reveal, LetterRoll } from "./SharedUI";

interface Transformation {
  id: string;
  title: string;
  location: string;
  scope: string;
  duration: string;
  beforeDesc: string;
  afterDesc: string;
  beforeImg: string;
  afterImg: string;
  tags: string[];
}

const transformations: Transformation[] = [
  {
    id: "villa-living",
    title: "Villa Aurelia — Double-Height Living Sanctuary",
    location: "Karve Road / Erandwane, Pune",
    scope: "Full Turnkey Interior & Civil Restructuring",
    duration: "115 Days",
    beforeDesc: "Raw red-brick masonry, exposed conduit routing, unfinished concrete ceiling.",
    afterDesc: "Fluted European oak paneling, 2700K cove illumination, Italian bookmatched marble.",
    beforeImg: "/images/about_studio.jpg",
    afterImg: "/images/project_villa.jpg",
    tags: ["Residential", "Double-Height", "Marble"],
  },
  {
    id: "quartzite-kitchen",
    title: "The Chef's Atelier Quartzite Kitchen",
    location: "Kothrud, Pune",
    scope: "Complete Kitchen Architecture & Civil Realignment",
    duration: "45 Days",
    beforeDesc: "Cramped 90s tiled pantry, compromised ventilation, dark corners.",
    afterDesc: "Waterfall quartzite island, German tandem hardware, integrated cooktop & task lighting.",
    beforeImg: "/images/craft_macro_detail.jpg",
    afterImg: "/images/service_kitchen.jpg",
    tags: ["Kitchen", "German Hardware", "Quartzite"],
  },
  {
    id: "executive-commercial",
    title: "The Obsidian Lounge — Commercial Workplace",
    location: "Baner, Pune",
    scope: "Boutique Workplace Architecture & Turnkey Execution",
    duration: "70 Days",
    beforeDesc: "Industrial bare shell, exposed metal decking, untreated screed.",
    afterDesc: "Acoustic timber slats, concealed linear HVAC diffusers, executive leather suites.",
    beforeImg: "/images/locations_studio.jpg",
    afterImg: "/images/service_commercial.jpg",
    tags: ["Commercial", "Acoustic", "Executive"],
  },
  {
    id: "master-bedroom",
    title: "Minimalist Master Bedroom Suite",
    location: "Wakad, Pune",
    scope: "Full Room Transformation & Bespoke Joinery",
    duration: "55 Days",
    beforeDesc: "Bare columns, rough plaster, uneven lighting levels.",
    afterDesc: "Seamless floor-to-ceiling wardrobe joinery, upholstered fluting, ambient warm channels.",
    beforeImg: "/images/design_ideas.jpg",
    afterImg: "/images/service_bedroom.jpg",
    tags: ["Bedroom", "Bespoke Joinery", "Minimalist"],
  },
];

export default function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState<"hover" | "slider">("hover");
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [activeProject, setActiveProject] = useState(transformations[0]);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section
      style={{
        padding: "8rem 8%",
        background: "var(--bg-primary, #f5f4ef)",
        borderTop: "1px solid var(--border-subtle, rgba(0,0,0,0.06))",
        borderBottom: "1px solid var(--border-subtle, rgba(0,0,0,0.06))",
        position: "relative",
      }}
      id="before-after"
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        {/* Section Header */}
        <Reveal>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "3.5rem",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" }}>
                <Sparkles size={16} color="#e8651c" />
                <span
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#e8651c",
                    fontWeight: 600,
                  }}
                >
                  [ Turnkey Transformations ]
                </span>
              </div>
              <h2
                className="serif"
                style={{
                  fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                  fontWeight: 400,
                  lineHeight: 1.12,
                  color: "var(--text-primary, #111)",
                  marginBottom: "0.8rem",
                }}
              >
                Before &amp; After: Witness the Transformation
              </h2>
              <p
                style={{
                  color: "var(--text-secondary, #666)",
                  fontSize: "1rem",
                  maxWidth: "620px",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                From bare civil demolition and raw structural masonry to finished architectural handovers.
                Hover over each space below to reveal the full living colour.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div
              style={{
                display: "inline-flex",
                background: "var(--bg-surface, #fff)",
                border: "1px solid var(--border-subtle, rgba(0,0,0,0.12))",
                borderRadius: "999px",
                padding: "4px",
                gap: "4px",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("hover")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "999px",
                  border: "none",
                  background: activeTab === "hover" ? "#e8651c" : "transparent",
                  color: activeTab === "hover" ? "#fff" : "var(--text-secondary, #666)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                <Eye size={14} />
                <span>Hover Reveal</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("slider")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "999px",
                  border: "none",
                  background: activeTab === "slider" ? "#e8651c" : "transparent",
                  color: activeTab === "slider" ? "#fff" : "var(--text-secondary, #666)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                <SlidersHorizontal size={14} />
                <span>Interactive Split</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* ═══════════════ MODE 1: HOVER REVEAL GRID (DEFAULT) ═══════════════ */}
        {activeTab === "hover" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.2rem",
            }}
          >
            {transformations.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="before-after-card"
                style={{
                  background: "var(--bg-card, #fff)",
                  borderRadius: "8px",
                  border: "1px solid var(--border-subtle, rgba(0,0,0,0.08))",
                  overflow: "hidden",
                  boxShadow: "0 15px 35px -10px rgba(0,0,0,0.07)",
                }}
              >
                {/* Visual Image Container with Hover B&W -> Colour Transition */}
                <div
                  className="before-after-img-wrap"
                  style={{
                    position: "relative",
                    height: "360px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {/* The Image: Black and White by default, transitions to Full Color on hover */}
                  <Image
                    src={item.afterImg}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="transform-img"
                    style={{
                      objectFit: "cover",
                      filter: "grayscale(100%) contrast(1.15) brightness(0.85)",
                      transition: "filter 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />

                  {/* Dark vignette overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Top Status Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      right: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      zIndex: 3,
                    }}
                  >
                    <span
                      className="state-badge"
                      style={{
                        padding: "0.35rem 0.85rem",
                        borderRadius: "999px",
                        fontSize: "0.68rem",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        background: "rgba(0,0,0,0.72)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        color: "#fff",
                        transition: "all 0.3s ease",
                      }}
                    >
                      B&amp;W Mode · Hover for Colour
                    </span>

                    <span
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "0.68rem",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        background: "rgba(232,101,28,0.9)",
                        color: "#fff",
                      }}
                    >
                      {item.duration}
                    </span>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "20px",
                      right: "20px",
                      zIndex: 3,
                    }}
                  >
                    <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "0.62rem",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.8)",
                            background: "rgba(255,255,255,0.12)",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "2px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="serif" style={{ fontSize: "1.35rem", color: "#fff", margin: 0, fontWeight: 400 }}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Details Below Card */}
                <div style={{ padding: "1.6rem 1.8rem" }}>
                  <p style={{ fontSize: "0.78rem", letterSpacing: "1px", textTransform: "uppercase", color: "#e8651c", marginBottom: "0.6rem", fontWeight: 600 }}>
                    {item.location} · {item.scope}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-subtle, rgba(0,0,0,0.06))" }}>
                    <div>
                      <span style={{ fontSize: "0.68rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted, #888)", display: "block", marginBottom: "0.2rem" }}>
                        Before (Site Condition)
                      </span>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-secondary, #555)", lineHeight: 1.5, margin: 0 }}>
                        {item.beforeDesc}
                      </p>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.68rem", letterSpacing: "1px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.2rem", fontWeight: 600 }}>
                        After (Turnkey Handover)
                      </span>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-primary, #111)", lineHeight: 1.5, margin: 0 }}>
                        {item.afterDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ═══════════════ MODE 2: INTERACTIVE SPLIT SLIDER ═══════════════ */
          <div style={{ background: "var(--bg-card, #fff)", borderRadius: "12px", border: "1px solid var(--border-subtle, rgba(0,0,0,0.08))", overflow: "hidden", padding: "2.5rem" }}>
            {/* Project Picker Pills */}
            <div style={{ display: "flex", gap: "0.8rem", marginBottom: "2rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
              {transformations.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveProject(t)}
                  style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "6px",
                    border: activeProject.id === t.id ? "1px solid #e8651c" : "1px solid var(--border-subtle, #ddd)",
                    background: activeProject.id === t.id ? "rgba(232, 101, 28, 0.12)" : "var(--bg-surface, #fff)",
                    color: activeProject.id === t.id ? "#e8651c" : "var(--text-primary, #444)",
                    fontSize: "0.8rem",
                    fontWeight: activeProject.id === t.id ? 600 : 400,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.title.split("—")[0]}
                </button>
              ))}
            </div>

            {/* Split Comparison Canvas */}
            <div
              style={{
                position: "relative",
                height: "560px",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "ew-resize",
                userSelect: "none",
              }}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                handleSliderMove(e.clientX, rect);
              }}
              onTouchMove={(e) => {
                if (e.touches[0]) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleSliderMove(e.touches[0].clientX, rect);
                }
              }}
            >
              {/* Layer 1: BEFORE (Grayscale, full width) */}
              <div style={{ position: "absolute", inset: 0 }}>
                <Image
                  src={activeProject.beforeImg}
                  alt="Before transformation"
                  fill
                  style={{
                    objectFit: "cover",
                    filter: "grayscale(100%) contrast(1.2) brightness(0.7)",
                  }}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
                <div
                  style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    background: "rgba(0,0,0,0.75)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    padding: "0.5rem 1.2rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  BEFORE · Raw Civil Phase
                </div>
              </div>

              {/* Layer 2: AFTER (Full Colour, clipped by slider position) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                }}
              >
                <Image
                  src={activeProject.afterImg}
                  alt="After transformation"
                  fill
                  style={{
                    objectFit: "cover",
                    filter: "contrast(1.06) brightness(1.0)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "24px",
                    right: `${100 - sliderPosition + 3}%`,
                    background: "#e8651c",
                    color: "#fff",
                    padding: "0.5rem 1.2rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    boxShadow: "0 4px 15px rgba(232,101,28,0.4)",
                    whiteSpace: "nowrap",
                  }}
                >
                  AFTER · Turnkey Handover
                </div>
              </div>

              {/* Draggable Divider Handle */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${sliderPosition}%`,
                  width: "2px",
                  background: "#fff",
                  transform: "translateX(-50%)",
                  boxShadow: "0 0 12px rgba(0,0,0,0.8)",
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "#e8651c",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                    border: "2px solid #fff",
                  }}
                >
                  <SlidersHorizontal size={18} />
                </div>
              </div>
            </div>

            {/* Project Summary Under Slider */}
            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 className="serif" style={{ fontSize: "1.6rem", color: "var(--text-primary, #111)", marginBottom: "0.3rem" }}>
                  {activeProject.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted, #777)", margin: 0 }}>
                  {activeProject.location} &nbsp;|&nbsp; {activeProject.duration} Turnkey Execution
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-consultation"));
                  }
                }}
                className="btn-orange"
                style={{ cursor: "pointer" }}
              >
                REQUEST A CALL FOR YOUR SITE &nbsp;→
              </button>
            </div>
          </div>
        )}

        {/* Global CSS for the Hover Reveal Effect */}
        <style jsx global>{`
          .before-after-img-wrap:hover .transform-img {
            filter: grayscale(0%) contrast(1.05) brightness(1) !important;
            transform: scale(1.04);
          }
          .before-after-img-wrap:hover .state-badge {
            background: #e8651c !important;
            border-color: #e8651c !important;
            color: #fff !important;
            box-shadow: 0 4px 15px rgba(232, 101, 28, 0.4);
          }
          .before-after-img-wrap:hover .state-badge::before {
            content: "✓ AFTER: ";
          }
        `}</style>
      </div>
    </section>
  );
}
