"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, ArrowDown, ChevronDown, ArrowUpRight, Compass, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import {
  ForgeButton,
  ForgeTextReveal,
  LetterRoll,
  MarqueeTicker,
  Reveal,
  ParallaxImg,
  AnimatedNumber,
} from "@/components/SharedUI";
import HeroVideoPlayer from "@/components/HeroVideoPlayer";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import LiveSiteTestimonials from "@/components/LiveSiteTestimonials";
import InstagramFeed from "@/components/InstagramFeed";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";

const projects = [
  { title: "Villa Aurelia", location: "Bandra West, Mumbai", area: "450 m²", tag: "Residential", img: "/images/project_villa.jpg" },
  { title: "The Obsidian Lounge", location: "Gurgaon, NCR", area: "280 m²", tag: "Commercial", img: "/images/service_commercial.jpg" },
  { title: "The Heritage Bungalow", location: "Karve Road, Pune", area: "520 m²", tag: "Luxury Bungalow", img: "/images/project_penthouse.jpg" },
];

const liveServices = [
  {
    num: "01",
    title: "Consultation",
    desc: "Design consultants suggest ideas that integrate form, functionality, and aesthetics, tailoring space plans to your practical needs and lifestyle.",
  },
  {
    num: "02",
    title: "Design & Build",
    desc: "Unified flow of work from initial concept through completion — includes architectural design, material procurement, site execution, and supervision.",
  },
  {
    num: "03",
    title: "Furniture Selection & Procurement",
    desc: "Taking into consideration design ideology, themes, and concepts, high-grade furniture, fittings, and fixtures are curated and procured.",
  },
  {
    num: "04",
    title: "Architectural Services",
    desc: "Comprehensive architectural design, preparation of construction documents, working drawings, civil supervision, and site administration.",
  },
  {
    num: "05",
    title: "Landscape Design",
    desc: "Planning, designing, and managing open and green spaces to create serene environments balancing composition, proportion, and natural light.",
  },
  {
    num: "06",
    title: "3D Visualization",
    desc: "Collaborating project data to produce photorealistic 3D perspectives and virtual walkthroughs before civil construction commences.",
  },
];

const liveProcessSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    desc: "We begin by conducting an initial consultation to understand your requirements, vision, preferences, lifestyle cadence, and budget.",
  },
  {
    step: "02",
    title: "Project Assessment & Space Analysis",
    desc: "The design team conducts a thorough on-site assessment, taking milimetric measurements, photographs, and analyzing structural drawings.",
  },
  {
    step: "03",
    title: "Design Concept Development",
    desc: "Based on your preferences, we develop customized concept schemes, color palettes, materials selection, and cohesive design layouts.",
  },
  {
    step: "04",
    title: "Design Presentation & Approval",
    desc: "We present photorealistic 3D renderings, sketches, theme layouts, and physical material samples with transparent BOQ approvals.",
  },
  {
    step: "05",
    title: "Project Timeline & Execution",
    desc: "We manage turnkey procurement and factory-precision joinery, coordinating vendors and contractors to ensure seamless on-schedule delivery.",
  },
];

const homeFaqs = [
  {
    q: "Do you manage the entire renovation turnkey under one roof?",
    a: "Yes. VIVID INTERIORS is an Architectural, Interior, and Contracting company. We handle everything from concept design, working drawings, and 3D visualization through civil demolition, masonry, electrical, plumbing, factory joinery, procurement, and final styling.",
  },
  {
    q: "What is your pricing policy and billing transparency?",
    a: "We believe in absolute transparency. Unlike conventional market practices, our studio operates on a zero-kickback policy with vendors, and provides itemized BOQs (Bill of Quantities) with clearly outlined milestones so there are zero surprise escalations.",
  },
  {
    q: "Where is your studio located and can we visit completed sites?",
    a: "Our studio is located at Nal Stop Chowk, Karve Road, Erandwane, Pune. Before signing, we welcome prospective clients to visit our completed site handovers across Pune to inspect our carpentry, veneer polishing, and marble bookmatching firsthand.",
  },
  {
    q: "How long does a typical residential project take?",
    a: "Depending on scope, a typical 3BHK or luxury bungalow renovation spans 90 to 140 working days from drawing sign-off to handover.",
  },
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
      {/* ═══════════════ HERO (DUAL VIDEO PLAYER) ═══════════════ */}
      <section ref={heroRef} className="hero" style={{ justifyContent: "flex-start", alignItems: "center", paddingLeft: "8%" }}>
        <motion.div className="hero-bg" style={{ y: heroBgY, scale: heroScale }}>
          <HeroVideoPlayer poster="/images/hero_img_01.png" />
        </motion.div>

        <motion.div
          style={{
            y: heroTextY,
            opacity: heroOpacity,
            position: "relative",
            zIndex: 5,
            maxWidth: "760px",
            paddingTop: "5rem",
            filter: "drop-shadow(0 2px 14px rgba(0,0,0,0.7))",
          }}
        >
          <ForgeTextReveal delay={0.1}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "36px", height: "2px", background: "#e8651c" }} />
              <span style={{ fontSize: "0.74rem", letterSpacing: "3.5px", textTransform: "uppercase", color: "#e8651c", fontWeight: 600 }}>
                Architecture &nbsp;|&nbsp; Interior &nbsp;|&nbsp; Contracting
              </span>
            </div>
          </ForgeTextReveal>

          <ForgeTextReveal delay={0.25}>
            <h1 className="serif" style={{ fontSize: "clamp(3rem, 6.5vw, 6.2rem)", lineHeight: 1.05, marginBottom: "1.6rem", fontWeight: 400, color: "#fff" }}>
              Your Space,<br /><span style={{ fontStyle: "italic", color: "#e8651c" }}>Your Signature</span> Style
            </h1>
          </ForgeTextReveal>

          <ForgeTextReveal delay={0.4}>
            <p style={{ fontSize: "1.08rem", lineHeight: 1.85, marginBottom: "3rem", color: "#eee", maxWidth: "560px" }}>
              Located in Pune since 2018. We curate spatial ideas driven by design excellence, service efficiency, responsiveness, and turnkey execution.
            </p>
          </ForgeTextReveal>

          <ForgeTextReveal delay={0.55}>
            <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-consultation"));
                  }
                }}
                className="forge-shimmer-btn"
                style={{ padding: "1rem 2rem", fontSize: "0.8rem", cursor: "pointer" }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <LetterRoll text="REQUEST A CALL" />
                  <ArrowRight size={15} />
                </span>
              </button>
              <ForgeButton href="/projects" variant="dark">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <LetterRoll text="EXPLORE OUR WORK" />
                  <ArrowUpRight size={14} />
                </span>
              </ForgeButton>
              <ForgeButton href="/contact" variant="ghost">
                <LetterRoll text="GET QUOTATION" />
              </ForgeButton>
            </div>
          </ForgeTextReveal>
        </motion.div>

        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{ position: "absolute", bottom: "40px", left: "8%", display: "flex", alignItems: "flex-end", gap: "0.75rem", zIndex: 5 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "1px", height: "48px", background: "rgba(255,255,255,0.4)", marginBottom: "4px" }} />
            <ArrowDown size={13} color="rgba(255,255,255,0.6)" />
          </motion.div>
          <span style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", paddingBottom: "14px" }}>Scroll Down</span>
        </motion.div>
      </section>

      {/* ═══════════════ MARQUEE TICKER ═══════════════ */}
      <MarqueeTicker text="Architectural Services ✦ Turnkey Contracting ✦ Residential Interiors ✦ Commercial Workplaces ✦ 3D Visualization ✦ Pune Since 2018 ✦" />

      {/* ═══════════════ PHILOSOPHY SECTION (LIVE SITE CONTENT) ═══════════════ */}
      <section className="responsive-section" style={{ background: "var(--bg-page, #faf9f6)" }}>
        <div className="responsive-two-col site-max-width">
          <div>
            <Reveal direction="left">
              <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1.2rem", fontWeight: 600 }}>
                [ About Our Design Philosophy ]
              </span>
              <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", lineHeight: 1.1, marginBottom: "2rem", fontWeight: 400, color: "var(--text-primary, #111)" }}>
                Your Dream, Our Vision<br /><em>&amp; Expertise</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ lineHeight: 1.9, color: "var(--text-secondary, #444)", marginBottom: "1.4rem", fontSize: "1.05rem" }}>
                <strong>VIVID INTERIORS</strong> is an Architectural, Interior, and Contracting company located in <strong>Pune since 2018</strong>. We are committed to steadily curating spatial ideas that meet the demands of the ever-evolving AEC industry with design deliverables that are not only aesthetically pleasing, but also satisfy client requirements.
              </p>
              <p style={{ lineHeight: 1.9, color: "var(--text-muted, #666)", marginBottom: "1.4rem", fontSize: "0.98rem" }}>
                We at Vivid Interiors are driven by the ethos of <em>Design Excellence, Service Efficiency, Responsiveness,</em> and a strong commitment towards all projects and scales undertaken by us. Our goal is always to create designs tailored to our clients&apos; unique personal styles and practical needs.
              </p>
              <p style={{ lineHeight: 1.9, color: "var(--text-muted, #666)", marginBottom: "2.8rem", fontSize: "0.95rem" }}>
                We optimize available resources to design buildings and interiors that are driven not only by beauty of form but value in function — specializing in residential, commercial, and industrial turnkey execution across Pune and Maharashtra.
              </p>
              <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
                <ForgeButton href="/about" variant="dark">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <LetterRoll text="DISCOVER OUR STORY" />
                    <ArrowUpRight size={15} />
                  </span>
                </ForgeButton>
                <ForgeButton href="/contact" variant="ghost">
                  <LetterRoll text="GET QUOTATION" />
                </ForgeButton>
              </div>
            </Reveal>
          </div>
          <Reveal direction="right">
            <div style={{ position: "relative", height: "620px", borderRadius: "8px", overflow: "hidden", boxShadow: "0 25px 50px -15px rgba(0,0,0,0.15)" }}>
              <ParallaxImg src="/images/about_studio.jpg" alt="Vivid Interiors Design Philosophy" speed={0.12} />
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "24px",
                  right: "24px",
                  padding: "1.4rem 1.8rem",
                  background: "rgba(15,15,15,0.88)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                  <Sparkles size={14} color="#e8651c" />
                  <span style={{ fontSize: "0.68rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", fontWeight: 600 }}>
                    Pune Flagship Studio
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", margin: 0, color: "#ccc", lineHeight: 1.6 }}>
                  Serving Kothrud, Erandwane, Model Colony, Baner, Wakad, and Greater Pune with direct architect oversight and zero vendor commissions.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ ELEVATE YOUR INTERIORS (SERVICES) ═══════════════ */}
      <section className="responsive-section" style={{ background: "#0d0d0d" }} id="services">
        <Reveal>
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", textAlign: "center", fontWeight: 600 }}>
            [ Elevate Your Interiors ]
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "#fff", textAlign: "center", marginBottom: "1.2rem", fontWeight: 400 }}>
            Designing Interiors That Leave a Lasting Impression
          </h2>
          <p style={{ color: "#888", textAlign: "center", maxWidth: "620px", margin: "0 auto 5rem", fontSize: "1rem", lineHeight: 1.7 }}>
            Comprehensive architectural and interior capabilities delivered with uncompromising precision and high-spec materials.
          </p>
        </Reveal>
        <div className="responsive-cards-grid">
          {liveServices.map((s, i) => (
            <motion.div
              key={i}
              className="forge-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.43, 0.195, 0.02, 1] as any }}
              style={{ padding: "3rem 2.5rem", borderRadius: "6px" }}
            >
              <span style={{ fontSize: "0.72rem", letterSpacing: "2.5px", color: "#e8651c", display: "block", marginBottom: "1.8rem", fontWeight: 600 }}>
                {s.num}
              </span>
              <h3 className="serif" style={{ fontSize: "1.7rem", color: "#fff", marginBottom: "1rem", fontWeight: 400 }}>
                {s.title}
              </h3>
              <p style={{ color: "#888", lineHeight: 1.8, fontSize: "0.92rem" }}>
                {s.desc}
              </p>
              <div style={{ marginTop: "2.5rem", width: "32px", height: "1px", background: "#e8651c" }} />
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "4.5rem" }}>
          <ForgeButton href="/services" variant="shimmer">
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <LetterRoll text="EXPLORE ALL SERVICES &amp; PRICING" />
              <ArrowRight size={15} />
            </span>
          </ForgeButton>
        </div>
      </section>

      {/* ═══════════════ BEFORE & AFTER TRANSFORMATIONS (B&W TO COLOUR HOVER) ═══════════════ */}
      <BeforeAfterSection />

      {/* ═══════════════ FEATURED PROJECTS ═══════════════ */}
      <section className="responsive-section" style={{ background: "var(--bg-primary, #f5f4ef)" }} id="portfolio">
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.8rem", fontWeight: 600 }}>
                [ Selected Portfolio ]
              </span>
              <h2 className="serif" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 400, lineHeight: 1.1, color: "var(--text-primary, #111)" }}>
                Designing the Extraordinary, Project by Project
              </h2>
            </div>
            <ForgeButton href="/projects" variant="dark" style={{ alignSelf: "flex-end" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <LetterRoll text="VIEW ALL PROJECTS" />
                <ArrowUpRight size={14} />
              </span>
            </ForgeButton>
          </div>
        </Reveal>
        <div className="responsive-cards-grid">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              className="forge-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.12, ease: [0.43, 0.195, 0.02, 1] as any }}
              style={{ borderRadius: "6px", padding: "1.2rem", background: "var(--bg-card, #fff)", borderColor: "var(--border-subtle, rgba(0,0,0,0.08))" }}
            >
              <Link href="/projects" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ position: "relative", height: i === 1 ? "460px" : "400px", overflow: "hidden", marginBottom: "1.5rem", borderRadius: "4px" }}>
                  <div className="forge-card-img" style={{ width: "100%", height: "100%", position: "relative" }}>
                    <ParallaxImg src={p.img} alt={p.title} speed={0.08} />
                  </div>
                  <span style={{ position: "absolute", top: "1.2rem", left: "1.2rem", background: "#e8651c", color: "#fff", fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", padding: "0.4rem 1rem", zIndex: 3, fontWeight: 600 }}>
                    {p.tag}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0 0.5rem 0.5rem" }}>
                  <div>
                    <h3 className="serif" style={{ fontSize: "1.5rem", fontWeight: 400, marginBottom: "0.3rem", color: "var(--text-primary, inherit)" }}>{p.title}</h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-muted, #888)", letterSpacing: "1px" }}>{p.location} · {p.area}</p>
                  </div>
                  <ArrowUpRight size={20} style={{ color: "#e8651c", marginTop: "0.3rem" }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ LIVE SITE COUNTERS & STATS ═══════════════ */}
      <section className="responsive-section" style={{ background: "var(--bg-page, #faf9f6)", borderTop: "1px solid var(--border-subtle, rgba(0,0,0,0.06))", borderBottom: "1px solid var(--border-subtle, rgba(0,0,0,0.06))" }}>
        <div className="responsive-compact-grid" style={{ textAlign: "center" }}>
          {[
            { num: 165, suffix: "+", label: "Trusted by Clients" },
            { num: 190, suffix: "+", label: "Projects Completed" },
            { num: 480, suffix: "k+", label: "Square Feet Delivered" },
            { num: 2018, suffix: "", label: "Founded in Pune" },
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
              <p style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "2.5px", color: "var(--text-muted, #888)", marginTop: "1rem", fontWeight: 600 }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FULL-WIDTH PARALLAX BANNER ═══════════════ */}
      <section style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
        <ParallaxImg src="/images/service_kitchen.jpg" alt="Interior craftsmanship" speed={0.2} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.72)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "2rem" }}>
          <Reveal>
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1.2rem", fontWeight: 600 }}>
              [ Architectural Commitment ]
            </span>
            <p className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)", color: "#fff", fontStyle: "italic", maxWidth: "760px", lineHeight: 1.25, marginBottom: "2.2rem", fontWeight: 400 }}>
              &ldquo;Good design feels inevitable — driven not only by beauty of form, but value in function.&rdquo;
            </p>
            <ForgeButton href="/contact" variant="shimmer">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <LetterRoll text="START YOUR PROJECT IN PUNE" />
                <ArrowRight size={15} />
              </span>
            </ForgeButton>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ OUR 5-STEP PROCESS (FROM LIVE SITE) ═══════════════ */}
      <section className="responsive-section" style={{ background: "var(--bg-page-alt, #fff)" }}>
        <Reveal>
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", textAlign: "center", fontWeight: 600 }}>
            [ How We Work ]
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "var(--text-primary, #111)", textAlign: "center", marginBottom: "1.2rem", fontWeight: 400 }}>
            Our 5-Step Execution Process
          </h2>
          <p style={{ color: "var(--text-secondary, #666)", textAlign: "center", maxWidth: "660px", margin: "0 auto 5rem", fontSize: "1rem", lineHeight: 1.8 }}>
            In a typical project timeline, we start with understanding your lifestyle requirements and manage every milestone through procurement, precision fabrication, and final handover.
          </p>
        </Reveal>
        <div className="responsive-compact-grid">
          {liveProcessSteps.map((item, idx) => (
            <motion.div
              key={idx}
              className="forge-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              style={{ padding: "2.5rem 1.8rem", background: "var(--bg-surface, #faf9f6)", borderRadius: "6px", borderColor: "var(--border-subtle, rgba(0,0,0,0.06))" }}
            >
              <span className="serif" style={{ fontSize: "2.8rem", color: "#e8651c", opacity: 0.45, display: "block", marginBottom: "1rem", lineHeight: 1, fontWeight: 300 }}>
                {item.step}
              </span>
              <h3 className="serif" style={{ fontSize: "1.35rem", marginBottom: "0.85rem", color: "var(--text-primary, #111)", fontWeight: 400, lineHeight: 1.3 }}>
                {item.title}
              </h3>
              <p style={{ color: "var(--text-secondary, #666)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "4.5rem", display: "flex", justifyContent: "center", gap: "1.2rem", flexWrap: "wrap" }}>
          <ForgeButton href="/how-it-work" variant="shimmer">
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <LetterRoll text="EXPLORE 26-STEP EXECUTION SCHEDULE" />
              <ArrowRight size={15} />
            </span>
          </ForgeButton>
          <ForgeButton href="/contact" variant="ghost">
            <LetterRoll text="REGISTER YOUR PROJECT" />
          </ForgeButton>
        </div>
      </section>

      {/* ═══════════════ VERIFIED GOOGLE CLIENT REVIEWS (FROM LIVE SITE) ═══════════════ */}
      <LiveSiteTestimonials />

      {/* ═══════════════ FOLLOW US ON INSTAGRAM (FROM LIVE SITE) ═══════════════ */}
      <InstagramFeed />

      {/* ═══════════════ GOOGLE MAP EMBED (FROM LIVE SITE) ═══════════════ */}
      <GoogleMapEmbed
        title="Visit Vivid Interiors Pune Atelier"
        subtitle="Conveniently situated at Nal Stop Chowk, Karve Road, Erandwane — experience our full-scale living mockups, stone slabs, and veneer libraries in person."
      />

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="responsive-section" style={{ background: "var(--bg-page, #faf9f6)" }}>
        <div className="responsive-equal-two-col site-max-width">
          <Reveal direction="left">
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", fontWeight: 600 }}>
              [ Frequently Asked Questions ]
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "2rem", color: "var(--text-primary, #111)" }}>
              Have Questions?<br />We Are Here to Guide You.
            </h2>
            <p style={{ color: "var(--text-muted, #777)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Every successful interior journey begins with clarity and confidence. Read through our common inquiries or talk directly to our senior architect.
            </p>
            <ForgeButton href="/contact" variant="dark">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <LetterRoll text="TALK TO SENIOR ARCHITECT" />
                <ArrowUpRight size={14} />
              </span>
            </ForgeButton>
          </Reveal>
          <div>
            {homeFaqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                style={{ borderBottom: "1px solid var(--border-subtle, rgba(0,0,0,0.1))" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span className="serif" style={{ fontSize: "1.2rem", fontWeight: 400, color: "var(--text-primary, #111)" }}>
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
                      transition={{ duration: 0.4 }}
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
    </main>
  );
}
