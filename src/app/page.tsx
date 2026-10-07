"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowDown, ChevronDown, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";

/* ─── Reusable scroll-reveal wrapper ─── */
function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" }) {
  const from = direction === "up" ? { y: 60 } : direction === "left" ? { x: -60 } : { x: 60 };
  return (
    <motion.div
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax image wrapper ─── */
function ParallaxImg({ src, alt, speed = 0.15 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const y = useSpring(raw, { stiffness: 80, damping: 20 });
  return (
    <div ref={ref} style={{ overflow: "hidden", width: "100%", height: "100%" }}>
      <motion.div style={{ y, width: "100%", height: "120%", top: "-10%", position: "relative" }}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} />
      </motion.div>
    </div>
  );
}

/* ─── Animated counter ─── */
function AnimatedNumber({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        setVal(start);
        if (start >= target) clearInterval(timer);
      }, 20);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{val}</span>;
}

const projects = [
  { title: "Villa Aurelia", location: "Mumbai, India", area: "320 m²", tag: "Residential", img: "/images/hero_img_01.png" },
  { title: "The Amber Suite", location: "Delhi, India", area: "180 m²", tag: "Commercial", img: "/images/hero_img_01.png" },
  { title: "Sky Penthouse", location: "Bangalore, India", area: "450 m²", tag: "Luxury", img: "/images/hero_img_01.png" },
];

const services = [
  { num: "01", title: "Residential Design", desc: "Bespoke living spaces tailored to your personality — from intimate apartments to sprawling villas." },
  { num: "02", title: "Commercial Spaces", desc: "Brand-driven environments that inspire teams and impress clients from the moment they walk in." },
  { num: "03", title: "Turnkey Execution", desc: "We handle every detail, from procurement to installation, delivering a finished home on schedule." },
  { num: "04", title: "3D Visualization", desc: "Photorealistic renders that let you experience your space before a single wall is painted." },
];

const faqs = [
  { q: "Do you manage the renovation end to end?", a: "Yes. We handle everything from initial concept and 3D visualization through procurement, contractor management, and final styling. You get one point of contact for the whole journey." },
  { q: "What is included in a design project?", a: "Every project includes space planning, material & furniture selections, 3D renders, working drawings, and a complete specification sheet for contractors." },
  { q: "How is the project cost determined?", a: "Pricing depends on scope, area, and material tier. We offer transparent fixed-fee packages so there are no surprises mid-project." },
  { q: "How long does a typical project take?", a: "A full residential design + execution project typically runs 90–180 days depending on the scope and area." },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "35%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "120%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <main style={{ overflowX: "hidden" }}>

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="hero" style={{ justifyContent: "flex-start", alignItems: "center", paddingLeft: "8%" }}>
        <motion.div className="hero-bg" style={{ y: heroBgY }}>
          <Image src="/images/hero_img_01.png" alt="Vivid Interiors" fill priority style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />
        </motion.div>

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity, position: "relative", zIndex: 2, maxWidth: "680px" }}
          variants={stagger} initial="hidden" animate="show"
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "32px", height: "2px", background: "#e8651c" }} />
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#ccc" }}>
              Architecture &nbsp;|&nbsp; Design &nbsp;|&nbsp; Execution
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="serif" style={{ fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: 1.05, marginBottom: "1.5rem", fontWeight: 400, color: "#fff" }}>
            Spaces that<br /><span style={{ fontStyle: "italic", color: "#e8651c" }}>Inspire</span> Living
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: "1rem", lineHeight: 1.8, marginBottom: "3rem", color: "#ddd", maxWidth: "460px" }}>
            Thoughtfully crafted interiors that blend aesthetics, function and lifestyle — from concept to completion.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
            <a href="#portfolio" className="btn-orange">EXPLORE OUR WORK <ArrowRight size={15} /></a>
            <a href="#contact" className="btn-ghost">GET A QUOTE</a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          style={{ position: "absolute", bottom: "40px", left: "8%", display: "flex", alignItems: "flex-end", gap: "0.75rem" }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "1px", height: "48px", background: "rgba(255,255,255,0.4)", marginBottom: "4px" }} />
            <ArrowDown size={13} color="rgba(255,255,255,0.6)" />
          </motion.div>
          <span style={{ fontSize: "0.62rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", paddingBottom: "14px" }}>Scroll Down</span>
        </motion.div>
      </section>

      {/* ═══════════════ MARQUEE TICKER ═══════════════ */}
      <div style={{ background: "#e8651c", padding: "0.9rem 0", overflow: "hidden" }}>
        <motion.div
          style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} style={{ fontSize: "0.78rem", letterSpacing: "2px", textTransform: "uppercase", color: "#fff", flexShrink: 0 }}>
              Residential Design &nbsp;✦&nbsp; Commercial Interiors &nbsp;✦&nbsp; Turnkey Projects &nbsp;✦&nbsp; 3D Visualization &nbsp;✦&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

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
              <a href="#contact" className="btn-dark">Schedule a Consultation <ArrowUpRight size={15} /></a>
            </Reveal>
          </div>
          <Reveal direction="right">
            <div style={{ position: "relative", height: "600px", borderRadius: "4px", overflow: "hidden" }}>
              <ParallaxImg src="/images/hero_img_01.png" alt="Interior design philosophy" speed={0.12} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#111" }} id="services">
        <Reveal>
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", textAlign: "center" }}>[ What We Do ]</span>
          <h2 className="serif" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "#fff", textAlign: "center", marginBottom: "5rem", fontWeight: 400 }}>Our Services</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5px", background: "rgba(255,255,255,0.07)" }}>
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ background: "#1a1a1a" }}
              style={{ padding: "3rem 2.5rem", background: "#111", cursor: "default", transition: "background 0.3s" }}
            >
              <span style={{ fontSize: "0.7rem", letterSpacing: "2px", color: "#e8651c", display: "block", marginBottom: "2rem" }}>{s.num}</span>
              <h3 className="serif" style={{ fontSize: "1.8rem", color: "#fff", marginBottom: "1.2rem", fontWeight: 400 }}>{s.title}</h3>
              <p style={{ color: "#777", lineHeight: 1.8, fontSize: "0.9rem" }}>{s.desc}</p>
              <div style={{ marginTop: "2.5rem", width: "30px", height: "1px", background: "#e8651c" }} />
            </motion.div>
          ))}
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
            <a href="https://makemyinteriors.in/interior-design-projects/" className="btn-dark" style={{ alignSelf: "flex-end" }}>View All Projects <ArrowUpRight size={14} /></a>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ cursor: "pointer" }}
            >
              <div style={{ position: "relative", height: i === 1 ? "500px" : "400px", overflow: "hidden", marginBottom: "1.5rem" }}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }} style={{ height: "100%" }}>
                  <ParallaxImg src={p.img} alt={p.title} speed={0.08} />
                </motion.div>
                <span style={{ position: "absolute", top: "1.5rem", left: "1.5rem", background: "#e8651c", color: "#fff", fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", padding: "0.4rem 1rem" }}>{p.tag}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 className="serif" style={{ fontSize: "1.5rem", fontWeight: 400, marginBottom: "0.4rem" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "1px" }}>{p.location} · {p.area}</p>
                </div>
                <ArrowUpRight size={20} style={{ color: "#e8651c", marginTop: "0.3rem" }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section style={{ padding: "7rem 8%", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3rem", textAlign: "center" }}>
          {[
            { num: 10, suffix: "+", label: "Years Experience" },
            { num: 320, suffix: "+", label: "Projects Delivered" },
            { num: 98, suffix: "%", label: "Client Satisfaction" },
            { num: 15, suffix: "", label: "Design Awards" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="serif" style={{ fontSize: "5rem", fontWeight: 400, lineHeight: 1, color: "#e8651c" }}>
                <AnimatedNumber target={s.num} />{s.suffix}
              </div>
              <p style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "2px", color: "#888", marginTop: "1rem" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FULL-WIDTH PARALLAX BANNER ═══════════════ */}
      <section style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
        <ParallaxImg src="/images/hero_img_01.png" alt="Interior banner" speed={0.2} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "2rem" }}>
          <Reveal>
            <p className="serif" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", color: "#fff", fontStyle: "italic", maxWidth: "700px", lineHeight: 1.2, marginBottom: "2rem", fontWeight: 400 }}>
              "Good design feels inevitable — nothing extra, nothing missing."
            </p>
            <a href="https://makemyinteriors.in/contact/" className="btn-orange">Start Your Project <ArrowRight size={15} /></a>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ OUR PROCESS ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#fff" }}>
        <Reveal>
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", textAlign: "center" }}>[ How We Work ]</span>
          <h2 className="serif" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "#111", textAlign: "center", marginBottom: "5rem", fontWeight: 400 }}>Our Process</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "3rem" }}>
          {[
            { step: "01", title: "Discovery & Concept", desc: "We begin with a deep dive into your lifestyle and preferences, creating initial mood boards and spatial layouts." },
            { step: "02", title: "Design Development", desc: "Transforming concepts into detailed 3D visualizations and selecting materials, finishes, and furnishings." },
            { step: "03", title: "Technical Detailing", desc: "Producing comprehensive working drawings and specifications for seamless execution by contractors." },
            { step: "04", title: "Execution & Styling", desc: "Overseeing the build process and adding the final layers of styling for a perfectly composed home." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              style={{ padding: "2rem", border: "1px solid rgba(0,0,0,0.05)", background: "#faf9f6" }}
            >
              <span className="serif" style={{ fontSize: "3rem", color: "#e8651c", opacity: 0.3, display: "block", marginBottom: "1rem", lineHeight: 1 }}>{item.step}</span>
              <h3 className="serif" style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#111", fontWeight: 400 }}>{item.title}</h3>
              <p style={{ color: "#666", lineHeight: 1.7, fontSize: "0.95rem" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section style={{ padding: "8rem 8%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          <Reveal direction="left">
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem" }}>[ FAQ ]</span>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "2rem" }}>Questions<br />clients ask</h2>
            <p style={{ color: "#777", lineHeight: 1.8, marginBottom: "2.5rem" }}>Every project starts with understanding. Here are some of the most common questions before we begin.</p>
            <a href="https://makemyinteriors.in/contact/" className="btn-dark">Talk to Us <ArrowUpRight size={14} /></a>
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
                      style={{ overflow: "hidden", color: "#666", fontSize: "0.9rem", lineHeight: 1.8, paddingBottom: "1.5rem" }}
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

      {/* ═══════════════ ANIMATED FOOTER CTA ═══════════════ */}
      <section style={{ background: "#0d0d0d", padding: "7rem 8%", textAlign: "center", overflow: "hidden" }}>
        <Reveal>
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1.5rem" }}>[ Let's Create Together ]</span>
        </Reveal>
        <div style={{ overflow: "hidden" }}>
          <motion.h2
            className="serif"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)", color: "#fff", fontStyle: "italic", fontWeight: 400, lineHeight: 1, marginBottom: "3rem" }}
          >
            Ready to Transform<br />Your Space?
          </motion.h2>
        </div>
        <Reveal delay={0.2}>
          <a href="https://makemyinteriors.in/contact/" className="btn-orange" style={{ fontSize: "0.9rem", padding: "1.2rem 3rem" }}>
            Start a Conversation <ArrowRight size={16} />
          </a>
        </Reveal>
      </section>

      {/* ═══════════════ ANIMATED FOOTER ═══════════════ */}
      <footer style={{ background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "5rem 8% 3rem" }}>
        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "4rem", marginBottom: "5rem" }}>
          {/* Brand col */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ width: "160px", marginBottom: "2rem" }}>
              <Image src="/images/logo.png" alt="Logo" width={160} height={60} style={{ objectFit: "contain" }} />
            </div>
            <p style={{ color: "#555", fontSize: "0.88rem", lineHeight: 1.9, maxWidth: "280px", marginBottom: "2rem" }}>
              Transforming spaces into timeless experiences. Architecture, design, and execution — under one roof.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              {["IN", "BE", "LN", "FB"].map((s, i) => (
                <motion.a key={i} href="#" whileHover={{ y: -3, color: "#e8651c" }} transition={{ duration: 0.2 }}
                  style={{ width: "36px", height: "36px", border: "1px solid rgba(255,255,255,0.12)", color: "#555", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", letterSpacing: "0.5px", transition: "border-color 0.3s" }}>
                  {s}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav links */}
          {[
            { heading: "Navigation", links: ["Home", "About Us", "Projects", "Services", "Design Ideas"] },
            { heading: "Services", links: ["Residential Design", "Commercial Spaces", "Turnkey Projects", "3D Visualization", "Consultation"] },
            { heading: "Contact", links: [] },
          ].map((col, ci) => (
            <motion.div key={ci}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (ci + 1) * 0.1 }}
            >
              <h4 style={{ fontSize: "0.72rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#fff", marginBottom: "2rem" }}>{col.heading}</h4>
              {col.links.map((l, li) => (
                <motion.a key={li} href="#" whileHover={{ x: 4, color: "#e8651c" }} transition={{ duration: 0.2 }}
                  style={{ display: "block", color: "#555", fontSize: "0.88rem", marginBottom: "0.9rem", letterSpacing: "0.3px" }}>
                  {l}
                </motion.a>
              ))}
              {ci === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[{ icon: <Phone size={13} />, text: "+91 98765 43210" }, { icon: <Mail size={13} />, text: "hello@vividinteriors.in" }, { icon: <MapPin size={13} />, text: "Mumbai, India" }].map((item, ii) => (
                    <div key={ii} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#555", fontSize: "0.85rem" }}>
                      <span style={{ color: "#e8651c" }}>{item.icon}</span> {item.text}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Animated marquee divider */}
        <div style={{ overflow: "hidden", margin: "0 -8% 3rem", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "1rem 0" }}>
          <motion.div
            style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} style={{ fontSize: "0.7rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.08)", flexShrink: 0 }}>
                Vivid Interiors &nbsp;✦&nbsp; Architecture &nbsp;✦&nbsp; Design &nbsp;✦&nbsp; Execution &nbsp;✦&nbsp;
              </span>
            ))}
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}
        >
          <p style={{ color: "#333", fontSize: "0.78rem", letterSpacing: "0.5px" }}>© 2026 Vivid Interiors. All rights reserved.</p>
          <div style={{ display: "flex", gap: "2.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((l, i) => (
              <motion.a key={i} href="#" whileHover={{ color: "#e8651c" }} transition={{ duration: 0.2 }}
                style={{ color: "#333", fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                {l}
              </motion.a>
            ))}
          </div>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -3 }}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#555", padding: "0.5rem 1.2rem", fontSize: "0.68rem", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            BACK TO TOP ↑
          </motion.button>
        </motion.div>
      </footer>

    </main>
  );
}
