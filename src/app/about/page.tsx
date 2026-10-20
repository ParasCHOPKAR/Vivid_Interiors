"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   HELPER: Word that blurs & fades OUT in reverse on scroll
   (Used for Stage 1: "For Those Who Refuse Ordinary")
   ───────────────────────────────────────────────────────────── */
function BlurOutWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [1, 0]);
  const blurVal = useTransform(progress, range, [0, 16]);
  const y = useTransform(progress, range, [0, -8]);
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <motion.span
      style={{
        opacity,
        filter,
        y,
        display: "inline-block",
        marginRight: "0.28em",
        willChange: "transform, opacity, filter",
      }}
    >
      {word}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────────
   HELPER: Word that unblurs & fades IN sequentially on scroll
   (Used for Stage 2: "We Don't Modify ... We Build Them For You")
   ───────────────────────────────────────────────────────────── */
function BlurInWord({
  word,
  progress,
  inRange,
}: {
  word: string;
  progress: MotionValue<number>;
  inRange: [number, number];
}) {
  const opacity = useTransform(progress, inRange, [0, 1]);
  const blurVal = useTransform(progress, inRange, [16, 0]);
  const y = useTransform(progress, inRange, [12, 0]);
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <motion.span
      style={{
        opacity,
        filter,
        y,
        display: "inline-block",
        marginRight: "0.28em",
        willChange: "transform, opacity, filter",
      }}
    >
      {word}
    </motion.span>
  );
}

export interface ForgeScrollHeroProps {
  /** Stage 1 subtitle at bottom center */
  subtitle?: string;
  /** Stage 2 words (Line 1 & Line 2) */
  stage2Line1?: string[];
  stage2Line2?: string[];
  /** Stage 1 three images (left, center zoom subject, right) */
  leftImage?: string;
  centerImage?: string;
  rightImage?: string;
  /** Stage 2 dark interior image (after zooming through center subject) */
  interiorImage?: string;
  /** Stage 3 & 4 macro craftsmanship image inside expanding portal */
  portalImage?: string;
  /** Partner / Atelier names in the Stage 4 bottom-left marquee */
  marqueeBrands?: string[];
  /** CTA destination */
  ctaHref?: string;
  ctaText?: string;
}

export default function ForgeScrollHero({
  subtitle = "A luxury architectural atelier for bespoke styling, spatial performance and craftsmanship.",
  stage2Line1 = ["We", "Don’t", "Modify", "Spaces"],
  stage2Line2 = ["We", "Build", "Them", "For", "You"],
  leftImage = "/images/about_studio.jpg",
  centerImage = "/images/project_villa.jpg",
  rightImage = "/images/service_commercial.jpg",
  interiorImage = "/images/design_ideas.jpg",
  portalImage = "/images/locations_studio.jpg",
  marqueeBrands = [
    "MINOTTI",
    "POLIFORM",
    "BOFFI",
    "FLOS",
    "BAXTER",
    "RIMADESIO",
    "GAGGENAU",
  ],
  ctaHref = "/contact",
  ctaText = "START YOUR PROJECT",
}: ForgeScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring scrub so wheel/trackpad scrolling feels cinematic
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });

  /* ═══════════════════════════════════════════════════════════
     STAGE 1: THREE SUBJECTS + REVERSE WORD BLUR (0.00 -> 0.38)
     ═══════════════════════════════════════════════════════════ */
  // Left subject pushes out to the left & scales up
  const leftX = useTransform(smoothProgress, [0, 0.28], ["0%", "-145%"]);
  const leftScale = useTransform(smoothProgress, [0, 0.28], [1, 1.45]);
  const leftOpacity = useTransform(smoothProgress, [0, 0.22, 0.3], [1, 1, 0]);

  // Right subject pushes out to the right & scales up
  const rightX = useTransform(smoothProgress, [0, 0.28], ["0%", "145%"]);
  const rightScale = useTransform(smoothProgress, [0, 0.28], [1, 1.45]);
  const rightOpacity = useTransform(smoothProgress, [0, 0.22, 0.3], [1, 1, 0]);

  // Center subject scales massively so camera zooms through its window/frame
  const centerScale = useTransform(
    smoothProgress,
    [0, 0.2, 0.38, 0.46],
    [1, 1.65, 3.8, 5.2]
  );
  const centerY = useTransform(
    smoothProgress,
    [0, 0.2, 0.42],
    ["0%", "6%", "18%"]
  );
  const centerOpacity = useTransform(
    smoothProgress,
    [0, 0.34, 0.44],
    [1, 1, 0]
  );

  // Stage 1 Subtitle at the bottom fades & gets covered by the zooming center image
  const subtitleOpacity = useTransform(smoothProgress, [0, 0.14], [1, 0]);
  const subtitleY = useTransform(smoothProgress, [0, 0.14], [0, 20]);
  const subtitleBlur = useTransform(smoothProgress, [0, 0.14], [0, 8]);
  const subtitleFilter = useTransform(subtitleBlur, (v) => `blur(${v}px)`);

  // Studio floor glow fades out as we enter the interior
  const floorOpacity = useTransform(smoothProgress, [0, 0.25, 0.38], [1, 0.6, 0]);

  /* ═══════════════════════════════════════════════════════════
     STAGE 2: INTERIOR + WORD-BY-WORD BLUR REVEAL (0.32 -> 0.68)
     ═══════════════════════════════════════════════════════════ */
  const interiorOpacity = useTransform(
    smoothProgress,
    [0.28, 0.4, 0.56, 0.68],
    [0, 0.85, 0.55, 0.18]
  );
  const interiorScale = useTransform(
    smoothProgress,
    [0.28, 0.65],
    [1.18, 1.0]
  );

  // Entire Stage 2 text block blurs into the background as the Stage 3 portal opens
  const stage2ContainerOpacity = useTransform(
    smoothProgress,
    [0.32, 0.36, 0.6, 0.78, 0.86],
    [0, 1, 1, 0.38, 0]
  );
  const stage2ContainerBlur = useTransform(
    smoothProgress,
    [0.56, 0.68, 0.82],
    [0, 8, 16]
  );
  const stage2ContainerFilter = useTransform(
    stage2ContainerBlur,
    (v) => `blur(${v}px)`
  );
  const stage2ContainerScale = useTransform(
    smoothProgress,
    [0.56, 0.82],
    [1, 0.95]
  );

  /* ═══════════════════════════════════════════════════════════
     STAGE 3 & 4: EXPANDING CENTER PORTAL (0.58 -> 1.00)
     ═══════════════════════════════════════════════════════════ */
  // Portal visibility
  const portalOpacity = useTransform(smoothProgress, [0.57, 0.61], [0, 1]);

  // Clip-path inset values: starts as a tiny center rectangle, expands to full frame
  const clipInsetY = useTransform(
    smoothProgress,
    [0.58, 0.65, 0.84],
    [46, 34, 0]
  );
  const clipInsetX = useTransform(
    smoothProgress,
    [0.58, 0.65, 0.84],
    [42, 34, 0]
  );
  const portalClipPath = useTransform(
    [clipInsetY, clipInsetX],
    ([y, x]) => `inset(${y}% ${x}% ${y}% ${x}% round 2px)`
  );

  // Inner portal background image subtle zoom out
  const portalImgScale = useTransform(
    smoothProgress,
    [0.58, 0.95],
    [1.22, 1.0]
  );

  // Inner portal content subtle entrance
  const portalDetailsOpacity = useTransform(
    smoothProgress,
    [0.72, 0.86],
    [0, 1]
  );
  const portalDetailsY = useTransform(smoothProgress, [0.72, 0.86], [18, 0]);

  // Bottom progress bar width
  const progressBarScaleX = useTransform(smoothProgress, [0, 1], [0.02, 1]);

  // Total words in Stage 2 for staggered unblur calculation
  const totalStage2Words = stage2Line1.length + stage2Line2.length;
  const getStage2WordRange = (index: number): [number, number] => {
    const startBase = 0.35;
    const endBase = 0.54;
    const span = endBase - startBase;
    const step = span / totalStage2Words;
    const start = startBase + index * step * 0.85;
    const end = Math.min(endBase, start + step * 1.6);
    return [start, end];
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        height: "520vh",
        background: "#050505",
        color: "#fff",
        userSelect: "none",
      }}
    >
      {/* ═══════════════ STICKY VIEWPORT ═══════════════ */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#050505",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Subtle dark architectural carbon/linen texture background (visible in Stages 2-4) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 0), radial-gradient(rgba(255,255,255,0.02) 1px, transparent 0)",
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />

        {/* ─────────────────────────────────────────────────────────
           STAGE 1: STUDIO FLOOR + HEADLINE 1 + THREE SUBJECTS
           ───────────────────────────────────────────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            opacity: floorOpacity,
            background:
              "radial-gradient(ellipse 85% 32% at 50% 88%, rgba(255,255,255,0.09) 0%, rgba(20,20,20,0.4) 45%, rgba(5,5,5,1) 80%)",
            pointerEvents: "none",
          }}
        />

        {/* Stage 1 Headline: "For Those Who / Refuse Ordinary" */}
        <div
          style={{
            position: "absolute",
            top: "14%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 10,
            width: "90%",
            maxWidth: "900px",
            pointerEvents: "none",
          }}
        >
          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.8rem, 5.6vw, 5.4rem)",
              fontWeight: 400,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: 0,
            }}
          >
            {/* Line 1: "For Those Who" (fades out after Line 2) */}
            <span style={{ display: "block" }}>
              <BlurOutWord
                word="For"
                progress={smoothProgress}
                range={[0.18, 0.28]}
              />
              <BlurOutWord
                word="Those"
                progress={smoothProgress}
                range={[0.15, 0.25]}
              />
              <BlurOutWord
                word="Who"
                progress={smoothProgress}
                range={[0.11, 0.22]}
              />
            </span>
            {/* Line 2: "Refuse Ordinary" ("Ordinary" blurs first, then "Refuse") */}
            <span style={{ display: "block" }}>
              <BlurOutWord
                word="Refuse"
                progress={smoothProgress}
                range={[0.07, 0.18]}
              />
              <BlurOutWord
                word="Ordinary"
                progress={smoothProgress}
                range={[0.02, 0.13]}
              />
            </span>
          </h1>
        </div>

        {/* Stage 1 Three-Subject Lineup */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1440px",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "0 4% 8%",
            zIndex: 15,
            pointerEvents: "none",
          }}
        >
          {/* LEFT SUBJECT */}
          <motion.div
            style={{
              x: leftX,
              scale: leftScale,
              opacity: leftOpacity,
              width: "28%",
              aspectRatio: "4 / 3",
              position: "relative",
              marginRight: "3%",
              marginBottom: "1%",
              borderRadius: "3px",
              overflow: "hidden",
              boxShadow: "0 30px 70px rgba(0,0,0,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
              transformOrigin: "right center",
            }}
          >
            <Image
              src={leftImage}
              alt="Left Architectural Showcase"
              fill
              priority
              style={{ objectFit: "cover", filter: "contrast(1.08) brightness(0.85)" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
              }}
            />
          </motion.div>

          {/* CENTER SUBJECT (Zooms into the camera) */}
          <motion.div
            style={{
              scale: centerScale,
              y: centerY,
              opacity: centerOpacity,
              width: "34%",
              aspectRatio: "16 / 10",
              position: "relative",
              zIndex: 25,
              borderRadius: "3px",
              overflow: "hidden",
              boxShadow: "0 35px 90px rgba(0,0,0,0.95)",
              border: "1px solid rgba(232,101,28,0.28)",
              transformOrigin: "center 42%",
            }}
          >
            <Image
              src={centerImage}
              alt="Center Flagship Residence"
              fill
              priority
              style={{ objectFit: "cover", filter: "contrast(1.1)" }}
            />
            {/* Dark interior window vignette at center so zooming in transitions seamlessly */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 42%, rgba(10,10,10,0.25) 0%, rgba(0,0,0,0.65) 100%)",
              }}
            />
          </motion.div>

          {/* RIGHT SUBJECT */}
          <motion.div
            style={{
              x: rightX,
              scale: rightScale,
              opacity: rightOpacity,
              width: "28%",
              aspectRatio: "4 / 3",
              position: "relative",
              marginLeft: "3%",
              marginBottom: "1%",
              borderRadius: "3px",
              overflow: "hidden",
              boxShadow: "0 30px 70px rgba(0,0,0,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
              transformOrigin: "left center",
            }}
          >
            <Image
              src={rightImage}
              alt="Right Architectural Showcase"
              fill
              priority
              style={{ objectFit: "cover", filter: "contrast(1.08) brightness(0.85)" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
              }}
            />
          </motion.div>
        </div>

        {/* Stage 1 Bottom Center Subtitle */}
        <motion.p
          style={{
            opacity: subtitleOpacity,
            y: subtitleY,
            filter: subtitleFilter,
            position: "absolute",
            bottom: "5.5%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            maxWidth: "420px",
            fontSize: "0.92rem",
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.85)",
            zIndex: 12,
            margin: 0,
            pointerEvents: "none",
          }}
        >
          {subtitle}
        </motion.p>

        {/* ─────────────────────────────────────────────────────────
           STAGE 2: DARK INTERIOR SANCTUARY + WORD-BY-WORD UNBLUR
           ───────────────────────────────────────────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            opacity: interiorOpacity,
            scale: interiorScale,
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <Image
            src={interiorImage}
            alt="Interior Sanctuary Atmosphere"
            fill
            style={{
              objectFit: "cover",
              filter: "brightness(0.38) contrast(1.15) saturate(0.85)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 50%, transparent 20%, #050505 95%)",
            }}
          />
        </motion.div>

        {/* Stage 2 Center Typography ("We Don't Modify Spaces / We Build Them For You") */}
        <motion.div
          style={{
            opacity: stage2ContainerOpacity,
            filter: stage2ContainerFilter,
            scale: stage2ContainerScale,
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: 28,
            padding: "0 5%",
            pointerEvents: "none",
          }}
        >
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.5rem, 5.2vw, 5rem)",
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: 0,
            }}
          >
            {/* Line 1 */}
            <span style={{ display: "block" }}>
              {stage2Line1.map((word, idx) => (
                <BlurInWord
                  key={`l1-${idx}`}
                  word={word}
                  progress={smoothProgress}
                  inRange={getStage2WordRange(idx)}
                />
              ))}
            </span>
            {/* Line 2 */}
            <span style={{ display: "block" }}>
              {stage2Line2.map((word, idx) => (
                <BlurInWord
                  key={`l2-${idx}`}
                  word={word}
                  progress={smoothProgress}
                  inRange={getStage2WordRange(stage2Line1.length + idx)}
                />
              ))}
            </span>
          </h2>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────
           STAGE 3 & 4: EXPANDING CENTER PORTAL SHOWCASE
           ───────────────────────────────────────────────────────── */}
        <motion.div
          style={{
            opacity: portalOpacity,
            clipPath: portalClipPath,
            position: "relative",
            width: "74vw",
            height: "72vh",
            maxWidth: "1280px",
            zIndex: 35,
            overflow: "hidden",
            background: "#0c0c0c",
            boxShadow: "0 40px 100px rgba(0,0,0,0.9)",
          }}
        >
          {/* Macro Craftsmanship Image inside the portal */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              scale: portalImgScale,
            }}
          >
            <Image
              src={portalImage}
              alt="Bespoke Material Craftsmanship"
              fill
              style={{
                objectFit: "cover",
                filter: "brightness(0.68) contrast(1.12)",
              }}
            />
            {/* Multi-stop gradient overlay matching Screenshots 7 & 8 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.78) 100%)",
              }}
            />
          </motion.div>

          {/* TOP-LEFT PORTAL HEADLINE: "Our Approach / To Every Build" */}
          <div
            style={{
              position: "absolute",
              top: "6%",
              left: "-1.2%",
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            <h2
              className="serif"
              style={{
                fontSize: "clamp(2.6rem, 5.2vw, 5.1rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#fff",
                margin: 0,
              }}
            >
              <span style={{ display: "block" }}>Our Approach</span>
              <span style={{ display: "block" }}>To Every Build</span>
            </h2>
          </div>

          {/* BOTTOM-LEFT INFINITE BRAND / PARTNER MARQUEE */}
          <motion.div
            style={{
              opacity: portalDetailsOpacity,
              position: "absolute",
              bottom: "13%",
              left: 0,
              width: "62%",
              overflow: "hidden",
              zIndex: 5,
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 14%, black 82%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 14%, black 82%, transparent 100%)",
            }}
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 22,
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4rem",
                width: "max-content",
              }}
            >
              {[...marqueeBrands, ...marqueeBrands].map((brand, i) => (
                <div
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.4rem 1rem",
                    border: "1px solid rgba(255,255,255,0.22)",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.85)",
                    whiteSpace: "nowrap",
                    background: "rgba(0,0,0,0.25)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {brand}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* BOTTOM-RIGHT INTENTIONALITY COPY + GLOWING BORDER CTA */}
          <motion.div
            style={{
              opacity: portalDetailsOpacity,
              y: portalDetailsY,
              position: "absolute",
              bottom: "8%",
              right: "4%",
              maxWidth: "290px",
              zIndex: 6,
            }}
          >
            <p
              style={{
                fontSize: "0.88rem",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.82)",
                marginBottom: "1.4rem",
              }}
            >
              Every decision is intentional, every detail has purpose based on
              you, your lifestyle, and your standards.
            </p>

            <Link
              href={ctaHref}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "1rem 1.8rem",
                background: "rgba(10, 10, 10, 0.72)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                color: "#fff",
                fontSize: "0.7rem",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                textDecoration: "none",
                overflow: "hidden",
                transition: "border-color 0.3s ease, background 0.3s ease",
              }}
            >
              <span>{ctaText}</span>
              {/* Subtle bottom center specular glow matching Screenshots 7 & 8 */}
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "20%",
                  right: "20%",
                  height: "1px",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 100%)",
                }}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────
           BOTTOM SCROLL PROGRESS INDICATOR LINE
           ───────────────────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: "18px",
            left: "2%",
            right: "2%",
            height: "1px",
            background: "rgba(255,255,255,0.12)",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              width: "100%",
              background: "#fff",
              transformOrigin: "left center",
              scaleX: progressBarScaleX,
            }}
          />
        </div>
      </div>
    </section>
  );
}