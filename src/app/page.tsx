"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowDown, ChevronDown, ArrowUpRight } from "lucide-react";
import {
  ForgeButton,
  ForgeTextReveal,
  LetterRoll,
  MarqueeTicker,
  Reveal,
  ParallaxImg,
  AnimatedNumber,
} from "@/components/SharedUI";

const projects = [
  { title: "Villa Aurelia", location: "Bandra West, Mumbai", area: "450 m²", tag: "Residential", img: "/images/project_villa.jpg" },
  { title: "The Obsidian Lounge", location: "Gurgaon, NCR", area: "280 m²", tag: "Commercial", img: "/images/service_commercial.jpg" },
  { title: "Sky Penthouse", location: "Indiranagar, Bangalore", area: "520 m²", tag: "Luxury Penthouse", img: "/images/project_penthouse.jpg" },
];

const services = [
  { num: "01", title: "Residential Design", desc: "Bespoke living spaces tailored to your personality — from intimate apartments to sprawling villas." },
  { num: "02", title: "Commercial Spaces", desc: "Brand-driven environments that inspire teams and impress clients from the moment they walk in." },
  { num: "03", title: "Turnkey Execution", desc: "We handle every detail, from procurement to installation, delivering a finished home on schedule." },
  { num: "04", title: "3D Visualization", desc: "Photorealistic renders that let you experience your space before a single wall is painted." },
];

const faqs = [
  { q: "Do you manage the renovation end to end?", a: "Yes. We handle everything from initial concept and 3D visualization through procurement, contractor management, and final styling. You get one dedicated point of contact for the entire journey." },
  { q: "What is included in a design project?", a: "Every project includes space planning, material & furniture selections, 3D renders, working drawings, MEP layouts, and a complete specification sheet for contractors." },
  { q: "How is the project cost determined?", a: "Pricing depends on scope, area, and material tier. We offer transparent fixed-fee packages and itemized execution estimates with zero surprise escalations." },
  { q: "How long does a typical project take?", a: "A full residential design + execution project typically runs 90–150 days depending on the scope, finishes, and area." },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "75%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main style={{ overflowX: "hidden" }}>

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="hero" style={{ justifyContent: "flex-start", alignItems: "center", paddingLeft: "8%" }}>
        <motion.div className="hero-bg" style={{ y: heroBgY, scale: heroScale }}>
          <Image src="/images/hero_img_01.png" alt="Vivid Interiors" fill priority style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.45) 55%, rgba(10,10,10,0.2) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a 0%, transparent 40%)" }} />
        </motion.div>

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity, position: "relative", zIndex: 2, maxWidth: "720px", paddingTop: "5rem" }}
        >
          <ForgeTextReveal delay={0.1}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "36px", height: "2px", background: "#e8651c" }} />
              <span style={{ fontSize: "0.74rem", letterSpacing: "3.5px", textTransform: "uppercase", color: "#e8651c", fontWeight: 600 }}>
                Architecture &nbsp;|&nbsp; Design &nbsp;|&nbsp; Execution
              </span>
            </div>
          </ForgeTextReveal>

          <ForgeTextReveal delay={0.25}>
            <h1 className="serif" style={{ fontSize: "clamp(3.2rem, 6.5vw, 6.2rem)", lineHeight: 1.05, marginBottom: "1.6rem", fontWeight: 400, color: "#fff" }}>
              Spaces that<br /><span style={{ fontStyle: "italic", color: "#e8651c" }}>Inspire</span> Living
            </h1>
          </ForgeTextReveal>

          <ForgeTextReveal delay={0.4}>
            <p style={{ fontSize: "1.08rem", lineHeight: 1.85, marginBottom: "3rem", color: "#ccc", maxWidth: "520px" }}>
              Thoughtfully crafted interiors that blend architectural rigor, noble materiality, and elevated lifestyle — from concept to turnkey completion.
            </p>
          </ForgeTextReveal>

          <ForgeTextReveal delay={0.55}>
            <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
              <ForgeButton href="/projects" variant="shimmer">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <LetterRoll text="EXPLORE OUR WORK" />
                  <ArrowRight size={15} />
                </span>
              </ForgeButton>
              <ForgeButton href="/contact" variant="ghost">
                <LetterRoll text="GET A QUOTE" />
              </ForgeButton>
            </div>
          </ForgeTextReveal>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          style={{ position: "absolute", bottom: "40px", left: "8%", display: "flex", alignItems: "flex-end", gap: "0.75rem" }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "1px", height: "48px", background: "rgba(255,255,255,0.4)", marginBottom: "4px" }} />
            <ArrowDown size={13} color="rgba(255,255,255,0.6)" />
          </motion.div>
          <span style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", paddingBottom: "14px" }}>Scroll Down</span>
        </motion.div>
      </section>

      {/* ═══════════════ MARQUEE TICKER WITH EDGE FADE ═══════════════ */}
      <MarqueeTicker text="Residential Design ✦ Commercial Interiors ✦ Turnkey Projects ✦ 3D Visualization ✦ Custom Millwork ✦" />

      {/* ═══════════════ PHILOSOPHY ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <div>
            <Reveal direction="left">
              <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1.2rem" }}>[ Our Philosophy ]</span>
              <h2 className="serif" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.1, marginBottom: "2rem", fontWeight: 400 }}>
                The Art of<br /><em>Living Well</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ lineHeight: 1.9, color: "#555", marginBottom: "1.5rem", fontSize: "1.05rem" }}>
                We believe every room has a soul. Our process starts by understanding how you live — how light moves through your home at different hours, how your family flows through a space.
              </p>
              <p style={{ lineHeight: 1.9, color: "#777", marginBottom: "3rem" }}>
                Then we design, refine, and execute — handling every detail from concept drawings to final styling, so you receive a home that is completely yours.
              </p>
              <ForgeButton href="/about" variant="dark">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <LetterRoll text="DISCOVER OUR STUDIO" />
                  <ArrowUpRight size={15} />
                </span>
              </ForgeButton>
            </Reveal>
          </div>
          <Reveal direction="right">
            <div style={{ position: "relative", height: "600px", borderRadius: "4px", overflow: "hidden", boxShadow: "0 25px 50px -15px rgba(0,0,0,0.15)" }}>
              <ParallaxImg src="/images/about_studio.jpg" alt="Interior design philosophy" speed={0.12} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#0d0d0d" }} id="services">
        <Reveal>
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", textAlign: "center" }}>[ What We Do ]</span>
          <h2 className="serif" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "#fff", textAlign: "center", marginBottom: "5rem", fontWeight: 400 }}>Our Services</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="forge-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.43, 0.195, 0.02, 1] as any }}
              style={{ padding: "3rem 2.5rem", borderRadius: "4px" }}
            >
              <span style={{ fontSize: "0.7rem", letterSpacing: "2.5px", color: "#e8651c", display: "block", marginBottom: "2rem", fontWeight: 600 }}>{s.num}</span>
              <h3 className="serif" style={{ fontSize: "1.8rem", color: "#fff", marginBottom: "1.2rem", fontWeight: 400 }}>{s.title}</h3>
              <p style={{ color: "#888", lineHeight: 1.8, fontSize: "0.92rem" }}>{s.desc}</p>
              <div style={{ marginTop: "2.5rem", width: "30px", height: "1px", background: "#e8651c" }} />
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "4.5rem" }}>
          <ForgeButton href="/services" variant="shimmer">
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <LetterRoll text="VIEW ALL SERVICES" />
              <ArrowRight size={15} />
            </span>
          </ForgeButton>
        </div>
      </section>

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <section style={{ padding: "8rem 8%" }} id="portfolio">
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.8rem" }}>[ Our Projects ]</span>
              <h2 className="serif" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 400, lineHeight: 1.1 }}>Featured Work</h2>
            </div>
            <ForgeButton href="/projects" variant="dark" style={{ alignSelf: "flex-end" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <LetterRoll text="VIEW ALL PROJECTS" />
                <ArrowUpRight size={14} />
              </span>
            </ForgeButton>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
          {projects.map((p, i) => (
            <motion.div
              key={i}
              className="forge-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.12, ease: [0.43, 0.195, 0.02, 1] as any }}
              style={{ borderRadius: "4px", padding: "1.2rem", background: "#fff", borderColor: "rgba(0,0,0,0.08)" }}
            >
              <Link href="/projects" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ position: "relative", height: i === 1 ? "460px" : "400px", overflow: "hidden", marginBottom: "1.5rem", borderRadius: "3px" }}>
                  <div className="forge-card-img" style={{ width: "100%", height: "100%", position: "relative" }}>
                    <ParallaxImg src={p.img} alt={p.title} speed={0.08} />
                  </div>
                  <span style={{ position: "absolute", top: "1.2rem", left: "1.2rem", background: "#e8651c", color: "#fff", fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", padding: "0.4rem 1rem", zIndex: 3 }}>
                    {p.tag}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0 0.5rem 0.5rem" }}>
                  <div>
                    <h3 className="serif" style={{ fontSize: "1.5rem", fontWeight: 400, marginBottom: "0.3rem" }}>{p.title}</h3>
                    <p style={{ fontSize: "0.82rem", color: "#888", letterSpacing: "1px" }}>{p.location} · {p.area}</p>
                  </div>
                  <ArrowUpRight size={20} style={{ color: "#e8651c", marginTop: "0.3rem" }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section style={{ padding: "7rem 8%", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", textAlign: "center" }}>
          {[
            { num: 12, suffix: "+", label: "Years Experience" },
            { num: 450, suffix: "+", label: "Projects Delivered" },
            { num: 98, suffix: "%", label: "Client Satisfaction" },
            { num: 28, suffix: "", label: "Design Awards" },
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
              <p style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "2px", color: "#888", marginTop: "1rem" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FULL-WIDTH PARALLAX BANNER ═══════════════ */}
      <section style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
        <ParallaxImg src="/images/service_kitchen.jpg" alt="Interior banner" speed={0.2} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.72)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "2rem" }}>
          <Reveal>
            <p className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)", color: "#fff", fontStyle: "italic", maxWidth: "720px", lineHeight: 1.25, marginBottom: "2rem", fontWeight: 400 }}>
              "Good design feels inevitable — nothing extra, nothing missing."
            </p>
            <ForgeButton href="/contact" variant="shimmer">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <LetterRoll text="START YOUR PROJECT" />
                <ArrowRight size={15} />
              </span>
            </ForgeButton>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ OUR PROCESS ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#fff" }}>
        <Reveal>
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", textAlign: "center" }}>[ How We Work ]</span>
          <h2 className="serif" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "#111", textAlign: "center", marginBottom: "5rem", fontWeight: 400 }}>Our Process</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
          {[
            { step: "01", title: "Discovery & Concept", desc: "We begin with a deep dive into your lifestyle and preferences, creating initial mood boards and spatial layouts." },
            { step: "02", title: "Design Development", desc: "Transforming concepts into detailed 3D visualizations and selecting materials, finishes, and furnishings." },
            { step: "03", title: "Technical Detailing", desc: "Producing comprehensive working drawings and specifications for seamless execution by contractors." },
            { step: "04", title: "Execution & Styling", desc: "Overseeing the build process and adding the final layers of styling for a perfectly composed home." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="forge-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              style={{ padding: "2.5rem 2rem", background: "#faf9f6", borderRadius: "4px", borderColor: "rgba(0,0,0,0.06)" }}
            >
              <span className="serif" style={{ fontSize: "3rem", color: "#e8651c", opacity: 0.35, display: "block", marginBottom: "1rem", lineHeight: 1 }}>{item.step}</span>
              <h3 className="serif" style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#111", fontWeight: 400 }}>{item.title}</h3>
              <p style={{ color: "#666", lineHeight: 1.7, fontSize: "0.95rem" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          <Reveal direction="left">
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem" }}>[ FAQ ]</span>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "2rem" }}>Questions<br />clients ask</h2>
            <p style={{ color: "#777", lineHeight: 1.8, marginBottom: "2.5rem" }}>Every project starts with understanding. Here are some of the most common questions before we begin.</p>
            <ForgeButton href="/contact" variant="dark">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <LetterRoll text="TALK TO OUR TEAM" />
                <ArrowUpRight size={14} />
              </span>
            </ForgeButton>
          </Reveal>
          <div>
            {faqs.map((faq, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
              >
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span className="serif" style={{ fontSize: "1.2rem", fontWeight: 400 }}>{faq.q}</span>
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
                      transition={{ duration: 0.4 }}
                      style={{ overflow: "hidden", color: "#666", fontSize: "0.95rem", lineHeight: 1.8, paddingBottom: "1.5rem" }}
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

    </main>
  );
}
