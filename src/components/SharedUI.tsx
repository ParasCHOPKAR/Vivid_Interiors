"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

/* ─── Forge Letter Roll Component ─── */
export function LetterRoll({ text }: { text: string }) {
  return (
    <span className="letter-roll-wrapper">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="letter-roll-char"
          style={{
            transitionDelay: `${i * 0.02}s`,
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

/* ─── Forge Shimmer Button ─── */
export function ForgeButton({
  href,
  onClick,
  children,
  className = "",
  style = {},
  variant = "shimmer",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "shimmer" | "orange" | "dark" | "ghost";
}) {
  const baseClass =
    variant === "shimmer"
      ? "forge-shimmer-btn"
      : variant === "orange"
      ? "btn-orange"
      : variant === "ghost"
      ? "btn-ghost"
      : "btn-dark";

  const content = typeof children === "string" ? <LetterRoll text={children} /> : children;

  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${className}`} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClass} ${className}`} style={style}>
      {content}
    </button>
  );
}

/* ─── Forge Text Mask Line Reveal ─── */
export function ForgeTextReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className="forge-mask-line">
      <motion.div
        initial={{ y: "110%", skewY: 3, opacity: 0 }}
        whileInView={{ y: "0%", skewY: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.95,
          delay,
          ease: [0.8, 0, 0, 1] as any,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Scroll Reveal Wrapper ─── */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const from =
    direction === "up"
      ? { y: 45 }
      : direction === "left"
      ? { x: -45 }
      : { x: 45 };

  return (
    <motion.div
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.43, 0.195, 0.02, 1] as any }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax Image with Smooth Scroll Scrub ─── */
export function ParallaxImg({
  src,
  alt,
  speed = 0.15,
  borderRadius = "0px",
}: {
  src: string;
  alt: string;
  speed?: number;
  borderRadius?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.05, 1.0]);
  const y = useSpring(rawY, { stiffness: 90, damping: 24 });
  const scale = useSpring(rawScale, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} style={{ overflow: "hidden", width: "100%", height: "100%", position: "relative", borderRadius }}>
      <motion.div style={{ y, scale, width: "100%", height: "125%", top: "-12%", position: "relative" }}>
        <Image src={src} alt={alt} fill priority style={{ objectFit: "cover" }} />
      </motion.div>
    </div>
  );
}

/* ─── Animated Number Counter ─── */
export function AnimatedNumber({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          setVal(start);
          if (start >= target) clearInterval(timer);
        }, 20);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val}</span>;
}

/* ─── Forge Edge-Faded Marquee Ticker ─── */
export function MarqueeTicker({
  text = "Residential Design ✦ Commercial Interiors ✦ Turnkey Projects ✦ 3D Visualization ✦",
  speed = 28,
  bgColor = "#e8651c",
  textColor = "#fff",
}: {
  text?: string;
  speed?: number;
  bgColor?: string;
  textColor?: string;
}) {
  return (
    <div style={{ background: bgColor, padding: "0.95rem 0", overflow: "hidden" }}>
      <div className="forge-marquee-mask">
        <motion.div
          style={{ display: "flex", gap: "3.5rem", whiteSpace: "nowrap" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        >
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.78rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: textColor,
                flexShrink: 0,
                fontWeight: 500,
              }}
            >
              {text} &nbsp;
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Forge Unified Signature Page Hero ─── */
interface PageHeroProps {
  tag: string;
  title: React.ReactNode;
  subtitle: string;
  bgImage: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  height?: string;
}

export function PageHero({
  tag,
  title,
  subtitle,
  bgImage,
  primaryCta,
  secondaryCta,
  height = "85vh",
}: PageHeroProps) {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "75%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="hero"
      style={{
        height,
        minHeight: "580px",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "8%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background with cinematic scale scrub */}
      <motion.div className="hero-bg" style={{ y: heroBgY, scale: heroScale }}>
        <Image src={bgImage} alt="Vivid Interiors" fill priority style={{ objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0.25) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #0a0a0a 0%, transparent 45%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{
          y: heroTextY,
          opacity: heroOpacity,
          position: "relative",
          zIndex: 2,
          maxWidth: "740px",
          paddingTop: "5rem",
        }}
      >
        <ForgeTextReveal delay={0.1}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "36px", height: "2px", background: "#e8651c" }} />
            <span style={{ fontSize: "0.74rem", letterSpacing: "3.5px", textTransform: "uppercase", color: "#e8651c", fontWeight: 600 }}>
              {tag}
            </span>
          </div>
        </ForgeTextReveal>

        <ForgeTextReveal delay={0.25}>
          <h1
            className="serif"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.4rem)", lineHeight: 1.08, marginBottom: "1.6rem", fontWeight: 400, color: "#fff" }}
          >
            {title}
          </h1>
        </ForgeTextReveal>

        <ForgeTextReveal delay={0.4}>
          <p
            style={{ fontSize: "1.08rem", lineHeight: 1.85, marginBottom: "2.8rem", color: "#bbb", maxWidth: "560px" }}
          >
            {subtitle}
          </p>
        </ForgeTextReveal>

        {(primaryCta || secondaryCta) && (
          <ForgeTextReveal delay={0.55}>
            <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
              {primaryCta && (
                <ForgeButton href={primaryCta.href} variant="shimmer">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <LetterRoll text={primaryCta.label} />
                    <ArrowRight size={15} />
                  </span>
                </ForgeButton>
              )}
              {secondaryCta && (
                <ForgeButton href={secondaryCta.href} variant="ghost">
                  <LetterRoll text={secondaryCta.label} />
                </ForgeButton>
              )}
            </div>
          </ForgeTextReveal>
        )}
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ position: "absolute", bottom: "35px", left: "8%", display: "flex", alignItems: "flex-end", gap: "0.75rem", zIndex: 3 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div style={{ width: "1px", height: "46px", background: "rgba(255,255,255,0.35)", marginBottom: "4px" }} />
          <ArrowDown size={13} color="rgba(255,255,255,0.6)" />
        </motion.div>
        <span style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", paddingBottom: "12px" }}>
          Scroll Down
        </span>
      </motion.div>
    </section>
  );
}
