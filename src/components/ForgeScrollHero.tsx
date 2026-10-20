"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ForgeButton, LetterRoll } from "@/components/SharedUI";

export default function ForgeScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position through the tall pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Buttery-smooth spring interpolation (Forge-style physics)
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
    restDelta: 0.0005,
  });

  // ═══════════════ PHASE 1: HERO TRIO & INITIAL TITLE ═══════════════
  // Hero headline & subtitle fades out and slides up as scroll begins
  const heroTextOpacity = useTransform(smooth, [0, 0.12, 0.22], [1, 0.8, 0]);
  const heroTextY = useTransform(smooth, [0, 0.22], [0, -70]);
  const heroTextScale = useTransform(smooth, [0, 0.22], [1, 0.94]);

  // Red/amber vertical accent bars (matching Forge's signature red pillars)
  const accentBarsOpacity = useTransform(smooth, [0, 0.14, 0.26], [0.85, 0.5, 0]);
  const accentBarsScaleY = useTransform(smooth, [0, 0.26], [1, 1.35]);

  // Left & right images slide outward and fade away
  const leftImageX = useTransform(smooth, [0, 0.12, 0.32], ["0%", "-10%", "-40%"]);
  const leftImageOpacity = useTransform(smooth, [0, 0.14, 0.28], [0.85, 0.6, 0]);

  const rightImageX = useTransform(smooth, [0, 0.12, 0.32], ["0%", "10%", "40%"]);
  const rightImageOpacity = useTransform(smooth, [0, 0.14, 0.28], [0.85, 0.6, 0]);

  // ═══════════════ PHASE 2: CENTER IMAGE ZOOMS IN ═══════════════
  // Center image scales up dramatically (from 1x to 2.75x cockpit/detail zoom)
  const centerScale = useTransform(smooth, [0, 0.12, 0.38, 0.52], [1, 1.2, 2.75, 2.9]);
  const centerDarkness = useTransform(smooth, [0.18, 0.36, 0.55], [0, 0.65, 0.88]);

  // ═══════════════ PHASE 3: MANIFESTO HEADLINE REVEAL ═══════════════
  // "We Don't Just Design Spaces / We Sculpt Them For You"
  const manifestoOpacity = useTransform(smooth, [0.32, 0.42, 0.54, 0.66], [0, 1, 1, 0]);
  const manifestoY = useTransform(smooth, [0.32, 0.42, 0.54, 0.66], [40, 0, 0, -35]);
  const manifestoBlur = useTransform(
    smooth,
    [0.32, 0.42, 0.54, 0.66],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );
  const manifestoScale = useTransform(smooth, [0.32, 0.42, 0.54, 0.66], [0.96, 1, 1, 1.05]);

  // ═══════════════ PHASE 4 & 5: CRAFT MACRO APERTURE & EXPANSION ═══════════════
  // Macro craftsmanship image reveals in center aperture, then expands
  const apertureOpacity = useTransform(smooth, [0.52, 0.60, 0.72], [0, 1, 1]);
  const apertureWidth = useTransform(smooth, [0.54, 0.66, 0.86], ["18vw", "36vw", "82vw"]);
  const apertureHeight = useTransform(smooth, [0.54, 0.66, 0.86], ["14vh", "28vh", "60vh"]);
  const apertureScale = useTransform(smooth, [0.54, 0.64, 0.86], [0.85, 1, 1]);
  const apertureBorder = useTransform(
    smooth,
    [0.54, 0.66, 0.86],
    ["rgba(232, 101, 28, 0.8)", "rgba(232, 101, 28, 0.4)", "rgba(255, 255, 255, 0.12)"]
  );

  // ═══════════════ PHASE 5: ATELIER APPROACH CONTENT ═══════════════
  // Approach headline, accolades, copy, and Forge shimmer CTA
  const approachOpacity = useTransform(smooth, [0.72, 0.84, 1], [0, 1, 1]);
  const approachY = useTransform(smooth, [0.72, 0.84, 1], [40, 0, 0]);

  // Scroll cue helper (fades out right as user starts scrolling)
  const scrollCueOpacity = useTransform(smooth, [0, 0.08], [1, 0]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "480vh", // Runway for the 5 cinematic scroll stages
        background: "#070707",
      }}
    >
      {/* ═══════════════ PINNED VIEWPORT CONTAINER ═══════════════ */}
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#070707",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        {/* Subtle noise grain & ambient radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(232, 101, 28, 0.07) 0%, rgba(7, 7, 7, 0.95) 75%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* ────────────────── TOP ATELIER SUB-BAR ────────────────── */}
        <div
          style={{
            position: "absolute",
            top: "5.5rem",
            left: 0,
            right: 0,
            padding: "0 5%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 30,
            pointerEvents: "auto",
          }}
        >
          {/* Social connections */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "rgba(255,255,255,0.6)",
                display: "inline-flex",
                alignItems: "center",
                transition: "color 0.2s ease",
              }}
              aria-label="LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "rgba(255,255,255,0.6)",
                display: "inline-flex",
                alignItems: "center",
                transition: "color 0.2s ease",
              }}
              aria-label="Instagram"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <span
              style={{
                fontSize: "0.68rem",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginLeft: "0.5rem",
              }}
            >
              ATELIER ARCHIVE
            </span>
          </div>

          {/* Center monogram indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "0.68rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#e8651c",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#e8651c",
                boxShadow: "0 0 10px #e8651c",
              }}
            />
            VIVID INTERIORS ATELIER
          </div>

          {/* Right status */}
          <div
            style={{
              fontSize: "0.68rem",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            MUMBAI · BENGALURU · NCR
          </div>
        </div>

        {/* ────────────────── VERTICAL ARCHITECTURAL ACCENT BARS ────────────────── */}
        {/* Matching Forge's iconic deep red/amber geometric accent bars */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(30px, 8vw, 120px)",
            opacity: accentBarsOpacity,
            scaleY: accentBarsScaleY,
            pointerEvents: "none",
            zIndex: 4,
          }}
        >
          <div
            style={{
              width: "16px",
              height: "44vh",
              background: "linear-gradient(180deg, rgba(232, 101, 28, 0.4), rgba(120, 30, 5, 0.7))",
              filter: "blur(1px)",
              transform: "translateY(-40px)",
            }}
          />
          <div
            style={{
              width: "20px",
              height: "56vh",
              background: "linear-gradient(180deg, rgba(232, 101, 28, 0.45), rgba(160, 40, 10, 0.8))",
              filter: "blur(0.5px)",
              transform: "translateY(20px)",
            }}
          />
          <div
            style={{
              width: "18px",
              height: "50vh",
              background: "linear-gradient(180deg, rgba(232, 101, 28, 0.4), rgba(130, 35, 8, 0.75))",
              filter: "blur(1px)",
              transform: "translateY(-20px)",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "40vh",
              background: "linear-gradient(180deg, rgba(232, 101, 28, 0.35), rgba(110, 25, 5, 0.65))",
              filter: "blur(1.5px)",
              transform: "translateY(35px)",
            }}
          />
        </motion.div>

        {/* ────────────────── TRIO BACKGROUND SHOWCASE ────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          {/* LEFT SUBJECT (Monochrome/Darkened Penthouse) */}
          <motion.div
            style={{
              position: "absolute",
              left: "4%",
              width: "clamp(260px, 28vw, 440px)",
              height: "clamp(240px, 44vh, 480px)",
              opacity: leftImageOpacity,
              x: leftImageX,
              borderRadius: "4px",
              overflow: "hidden",
              filter: "brightness(0.6) contrast(1.15) grayscale(40%)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
            }}
          >
            <Image
              src="/images/project_penthouse.jpg"
              alt="Luxury Penthouse Architecture"
              fill
              sizes="33vw"
              priority
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(7,7,7,0.85) 0%, transparent 60%)",
              }}
            />
          </motion.div>

          {/* CENTER SUBJECT (The Main Architectural Sanctuary - ZOOMS IN) */}
          <motion.div
            style={{
              position: "relative",
              width: "clamp(320px, 46vw, 720px)",
              height: "clamp(280px, 58vh, 600px)",
              scale: centerScale,
              transformOrigin: "center center",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.95)",
              zIndex: 3,
            }}
          >
            <Image
              src="/images/project_villa.jpg"
              alt="Curated Villa Pavilion"
              fill
              sizes="80vw"
              priority
              style={{ objectFit: "cover" }}
            />

            {/* Dark vignette overlay for stage 2 & 3 text readability */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at center, rgba(7,7,7,0.3) 0%, rgba(7,7,7,0.92) 100%)",
                opacity: centerDarkness,
              }}
            />

            {/* Subtle red/orange edge glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: "inset 0 0 100px rgba(0,0,0,0.85)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* RIGHT SUBJECT (Master Suite / Bespoke Kitchen) */}
          <motion.div
            style={{
              position: "absolute",
              right: "4%",
              width: "clamp(260px, 28vw, 440px)",
              height: "clamp(240px, 44vh, 480px)",
              opacity: rightImageOpacity,
              x: rightImageX,
              borderRadius: "4px",
              overflow: "hidden",
              filter: "brightness(0.6) contrast(1.15) grayscale(40%)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
            }}
          >
            <Image
              src="/images/service_bedroom.jpg"
              alt="Bespoke Master Suite"
              fill
              sizes="33vw"
              priority
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(7,7,7,0.85) 0%, transparent 60%)",
              }}
            />
          </motion.div>
        </div>

        {/* ────────────────── PHASE 1: INITIAL HERO HEADLINE ────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            zIndex: 10,
            textAlign: "center",
            opacity: heroTextOpacity,
            y: heroTextY,
            scale: heroTextScale,
            padding: "0 2rem",
            maxWidth: "960px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#e8651c",
              marginBottom: "1rem",
              fontWeight: 500,
            }}
          >
            [ THE BESPOKE ATELIER ]
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.8rem, 6.2vw, 5.8rem)",
              lineHeight: 1.05,
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "#ffffff",
              textShadow: "0 4px 30px rgba(0,0,0,0.9)",
              marginBottom: "2rem",
            }}
          >
            For Those Who
            <br />
            <span style={{ fontStyle: "italic", color: "#faf9f6" }}>Refuse Ordinary</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(0.9rem, 1.25vw, 1.15rem)",
              lineHeight: 1.7,
              color: "rgba(255, 255, 255, 0.78)",
              maxWidth: "600px",
              margin: "0 auto",
              letterSpacing: "0.2px",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            A luxury architectural atelier for bespoke spatial styling, noble materiality, and turnkey engineering.
          </p>
        </motion.div>

        {/* ────────────────── PHASE 3: MANIFESTO HEADLINE REVEAL ────────────────── */}
        {/* Exactly matching Screenshot 3: "We Don't Modify Vehicles / We Build Them For You" */}
        <motion.div
          style={{
            position: "absolute",
            zIndex: 15,
            textAlign: "center",
            opacity: manifestoOpacity,
            y: manifestoY,
            filter: manifestoBlur,
            scale: manifestoScale,
            padding: "0 2rem",
            maxWidth: "1000px",
            pointerEvents: "none",
          }}
        >
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.6rem, 5.8vw, 5.4rem)",
              lineHeight: 1.12,
              fontWeight: 400,
              letterSpacing: "0.01em",
              color: "rgba(255, 255, 255, 0.94)",
              textShadow: "0 0 40px rgba(255, 255, 255, 0.2), 0 10px 40px rgba(0,0,0,0.9)",
            }}
          >
            We Don’t Just Design Spaces
            <br />
            <span style={{ fontStyle: "italic", color: "#e8651c" }}>We Sculpt Them For You</span>
          </h2>
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.88rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            TURNKEY ARCHITECTURAL CRAFTSMANSHIP
          </p>
        </motion.div>

        {/* ────────────────── PHASE 4 & 5: CRAFT DETAIL APERTURE ────────────────── */}
        {/* Matching Screenshot 4 (small center aperture) expanding into Screenshot 5 (full framed focal presentation) */}
        <motion.div
          style={{
            position: "absolute",
            zIndex: 20,
            width: apertureWidth,
            height: apertureHeight,
            opacity: apertureOpacity,
            scale: apertureScale,
            borderRadius: "6px",
            overflow: "hidden",
            border: "1px solid",
            borderColor: apertureBorder,
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(232, 101, 28, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Second Image: Hand-stitched saddle leather, fluted walnut, brass inlay & marble */}
          <Image
            src="/images/craft_macro_detail.jpg"
            alt="Hand-stitched leather and noble materiality detail"
            fill
            sizes="90vw"
            priority
            style={{ objectFit: "cover" }}
          />

          {/* Vignette overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, transparent 40%, rgba(0,0,0,0.75) 100%)",
            }}
          />

          {/* ────────────────── PHASE 5: OVERLAID APPROACH PRESENTATION ────────────────── */}
          {/* Matching Screenshot 5: "Our Approach To Every Build", brand accolades, narrative & CTA */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              padding: "clamp(2rem, 5vw, 4rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: approachOpacity,
              y: approachY,
              zIndex: 5,
            }}
          >
            {/* Top row: Section tag & Architectural guild badges */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#e8651c",
                    display: "block",
                    marginBottom: "0.4rem",
                    fontWeight: 600,
                  }}
                >
                  [ ATELIER METHODOLOGY ]
                </span>
                <h3
                  className="serif"
                  style={{
                    fontSize: "clamp(2rem, 3.8vw, 3.6rem)",
                    lineHeight: 1.1,
                    fontWeight: 400,
                    color: "#ffffff",
                    letterSpacing: "-0.01em",
                    textShadow: "0 2px 20px rgba(0,0,0,0.9)",
                  }}
                >
                  Our Approach To
                  <br />
                  <span style={{ fontStyle: "italic", color: "#e8651c" }}>Every Space</span>
                </h3>
              </div>

              {/* Architectural Guild & Material Certification Marks */}
              <div
                style={{
                  display: "flex",
                  gap: "1.8rem",
                  alignItems: "center",
                  background: "rgba(10, 10, 10, 0.7)",
                  backdropFilter: "blur(12px)",
                  padding: "0.8rem 1.6rem",
                  borderRadius: "4px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1.5px", color: "#faf9f6" }}>
                    IIID
                  </div>
                  <div style={{ fontSize: "0.6rem", color: "#888", letterSpacing: "1px" }}>FELLOW</div>
                </div>
                <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1.5px", color: "#faf9f6" }}>
                    AA LONDON
                  </div>
                  <div style={{ fontSize: "0.6rem", color: "#888", letterSpacing: "1px" }}>ALUMNI</div>
                </div>
                <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1.5px", color: "#faf9f6" }}>
                    ITALIAN STONE
                  </div>
                  <div style={{ fontSize: "0.6rem", color: "#888", letterSpacing: "1px" }}>VERIFIED</div>
                </div>
              </div>
            </div>

            {/* Bottom row: Narrative copy & Forge shimmer CTA button */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "2rem",
                background: "linear-gradient(to top, rgba(7,7,7,0.85) 0%, transparent 100%)",
                paddingTop: "2rem",
              }}
            >
              <p
                style={{
                  maxWidth: "520px",
                  fontSize: "clamp(0.88rem, 1.1vw, 1.05rem)",
                  lineHeight: 1.7,
                  color: "rgba(255, 255, 255, 0.85)",
                  textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                }}
              >
                Every decision is intentional. Every detail has purpose, bespoke to your lifestyle, proportions, and
                architectural legacy.
              </p>

              <div>
                <ForgeButton href="/contact" variant="shimmer">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
                    <LetterRoll text="START YOUR PROJECT" />
                    <ArrowUpRight size={15} />
                  </span>
                </ForgeButton>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ────────────────── BOTTOM PERSISTENT SCROLL PROGRESS BAR ────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "rgba(255, 255, 255, 0.08)",
            zIndex: 35,
          }}
        >
          <motion.div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #e8651c, #ff8c42)",
              scaleX: smooth,
              transformOrigin: "left",
            }}
          />
        </div>

        {/* Bottom subtle scroll helper cue */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            fontSize: "0.68rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.45)",
            zIndex: 30,
            opacity: scrollCueOpacity,
            pointerEvents: "none",
          }}
        >
          <span>SCROLL TO EXPLORE SEQUENCE</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-block", color: "#e8651c" }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
