"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, CheckCircle2, ChevronDown, Calculator, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { PageHero, Reveal, ParallaxImg, MarqueeTicker, ForgeButton, LetterRoll } from "@/components/SharedUI";

interface ServiceItem {
  num: string;
  title: string;
  tagline: string;
  img: string;
  desc: string;
  deliverables: string[];
  duration: string;
}

const servicesList: ServiceItem[] = [
  {
    num: "01",
    title: "Bespoke Residential Interiors",
    tagline: "Tailored sanctums for luxury apartments, penthouses, and private estates.",
    img: "/images/project_villa.jpg",
    desc: "We approach each residence as a singular work of art. By understanding the cadence of your daily life, natural daylight cycles, and entertaining habits, we sculpt harmonious spaces with tailored millwork, noble stones, and timeless furnishings.",
    deliverables: [
      "Comprehensive spatial planning & architectural alterations",
      "Curated material boards (marbles, hardwoods, bespoke textiles)",
      "Detailed 3D photorealistic visualization & virtual walkthroughs",
      "Custom furniture fabrication & designer lighting procurement",
      "Complete soft styling, art curation, and accessory dressing",
    ],
    duration: "90 – 140 Days",
  },
  {
    num: "02",
    title: "Corporate & Executive Workplaces",
    tagline: "High-performance office environments that embody brand prestige.",
    img: "/images/service_commercial.jpg",
    desc: "From private equity offices and boutique law chambers to luxury retail flagships, we craft spaces that balance productivity, acoustic privacy, and commanding brand presence.",
    deliverables: [
      "Acoustic engineering & acoustic wall fluting systems",
      "Executive boardroom & private lounge design",
      "Ergonomic workstation procurement & HVAC integration",
      "Smart conference automation & video conferencing acoustics",
      "Compliance with commercial fire, safety, and green building norms",
    ],
    duration: "60 – 120 Days",
  },
  {
    num: "03",
    title: "Full Turnkey General Contracting",
    tagline: "Single-point studio accountability from demolition to final handover.",
    img: "/images/about_studio.jpg",
    desc: "Never juggle ten independent contractors again. Our in-house site engineers, project managers, and quality supervisors manage civil work, plumbing, HVAC, electrical, and carpentry under unified studio oversight.",
    deliverables: [
      "Fixed-fee price guarantee with zero surprise escalations",
      "Real-time digital project tracker with weekly photo updates",
      "Comprehensive MEP (Mechanical, Electrical, Plumbing) drawings",
      "Milimetric quality audits before every stage sign-off",
      "10-Year Studio Warranty on structural and custom millwork",
    ],
    duration: "End-to-End Schedule",
  },
  {
    num: "04",
    title: "Photorealistic 3D VR Visualization",
    tagline: "Step inside your home with hyper-realistic realism before construction starts.",
    img: "/images/project_penthouse.jpg",
    desc: "We eliminate guesswork. Our state-of-the-art 3D studio generates photorealistic renders matching exact sunlight angles, custom furniture proportions, and real stone slabs.",
    deliverables: [
      "Hyper-realistic 4K interior perspectives for every room",
      "Day vs. Night architectural lighting simulations",
      "Interactive 360° VR headset walkthroughs in our studios",
      "Exact material texture and reflective index matching",
      "Comprehensive digital visual twin of your future home",
    ],
    duration: "14 – 21 Days",
  },
  {
    num: "05",
    title: "Modular Kitchens & Bespoke Wardrobes",
    tagline: "Precision German hardware married to handcrafted Italian aesthetics.",
    img: "/images/service_kitchen.jpg",
    desc: "The kitchen is the culinary heart of the home. We build bespoke modular systems featuring quartzite waterfall islands, anti-fingerprint Fenix nano surfaces, and concealed pocket pantries.",
    deliverables: [
      "Custom quartz & quartzite waterfall counter engineering",
      "Integrated Blum & Hettich motorized hardware systems",
      "Smoked glass walk-in wardrobe suites with sensor illumination",
      "Concealed breakfast bars & motorized spice pull-outs",
      "12-Year water-resistant & termite-proof material warranty",
    ],
    duration: "30 – 45 Days Fabrication",
  },
  {
    num: "06",
    title: "Lighting Design & Acoustic Engineering",
    tagline: "Sculpting the invisible: mood lighting scenes and acoustic serenity.",
    img: "/images/service_bedroom.jpg",
    desc: "Lighting can transform a room from cold to sublime. We design multi-layered illumination plans combining architectural cove uplights, magnetic track spotlights, and warm decorative pendants.",
    deliverables: [
      "Custom DALI / KNX architectural lighting automation scenes",
      "Circadian rhythm Kelvin-temperature tuning (2700K - 4000K)",
      "Concealed architectural cove profiles with zero glare",
      "Acoustic paneling behind fluted timber and velvet walls",
      "Home theater Dolby Atmos acoustic isolation design",
    ],
    duration: "Integrated with Project",
  },
];

const serviceFaqs = [
  {
    q: "How does your Turnkey Execution differ from hiring contractors directly?",
    a: "When you hire separate contractors, you face finger-pointing between carpenters, electricians, and painters when issues arise. With Vivid Turnkey, we take 100% legal, financial, and craftsmanship accountability. We provide a guaranteed handover date and transparent fixed pricing.",
  },
  {
    q: "Can I customize the material finishes after 3D approvals?",
    a: "Yes. Before procurement begins, you visit our material atelier to physically touch the physical stone slabs, wood veneer flutes, and fabric swatches that appeared in your 3D renders.",
  },
  {
    q: "Do you offer warranty on executed projects?",
    a: "Yes. Every turnkey residential and commercial project comes with our comprehensive 10-Year Studio Warranty on modular systems and custom millwork, plus 1-year complimentary on-call maintenance.",
  },
  {
    q: "What is the typical payment structure?",
    a: "We work on milestone-based payments tied directly to verifiable site progress (e.g. Design Approval, Civil Completion, Millwork Dispatch, Final Handover). You only pay as your space materializes.",
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Estimator state
  const [propType, setPropType] = useState("3bhk");
  const [tier, setTier] = useState("signature");

  const estimateMap: Record<string, Record<string, { time: string; scope: string }>> = {
    "2bhk": {
      essential: { time: "75–90 Days", scope: "Complete interior overhaul, modular kitchen, 2 wardrobes, false ceiling & ambient lighting." },
      signature: { time: "90–110 Days", scope: "Full architectural renovation, Italian marble accents, bespoke millwork, smart home lighting." },
      bespoke: { time: "110–130 Days", scope: "High-end bespoke finishes, imported quartzite island, walk-in glass wardrobes, custom furniture." },
    },
    "3bhk": {
      essential: { time: "90–110 Days", scope: "Turnkey interiors, modular kitchen with appliances, 3 wardrobe suites, complete electrical redesign." },
      signature: { time: "110–135 Days", scope: "Comprehensive architectural remodel, Calacatta marble, fluted walnut walls, customized designer furniture." },
      bespoke: { time: "135–160 Days", scope: "Ultra-luxury bespoke fit-out, VR design twin, imported European stone, acoustic master suite." },
    },
    "4bhk": {
      essential: { time: "110–130 Days", scope: "Extensive space planning, full turnkey execution, 4 bedroom suites, living dining architecture." },
      signature: { time: "130–160 Days", scope: "Double-height features, designer bar counter, smart lighting scenes, acoustic home theater." },
      bespoke: { time: "160–190 Days", scope: "High-end penthouse standard, German modular kitchen, custom walk-in suites, bespoke brass detailing." },
    },
    villa: {
      essential: { time: "140–170 Days", scope: "Ground + 1 turnkey architectural fit-out, internal staircase redesign, courtyard integration." },
      signature: { time: "170–210 Days", scope: "Sprawling luxury estate, indoor-outdoor flow, luxury pavilion lounge, master wing design." },
      bespoke: { time: "210–260 Days", scope: "Haute couture villa architecture, private elevator claddings, spa bathroom suites, custom landscape lighting." },
    },
  };

  const currentEstimate = estimateMap[propType]?.[tier] || estimateMap["3bhk"]["signature"];

  return (
    <main style={{ overflowX: "hidden" }}>
      {/* ═══════════════ PAGE HERO ═══════════════ */}
      <PageHero
        tag="[ Comprehensive Design Services ]"
        title={
          <>
            Architectural Rigor / <span style={{ fontStyle: "italic", color: "#e8651c" }}>Turnkey</span> Execution
          </>
        }
        subtitle="From spatial discovery and 3D VR simulation to custom millwork fabrication and white-glove handover — experience unmatched perfection."
        bgImage="/images/service_kitchen.jpg"
        primaryCta={{ label: "CALCULATE ESTIMATE", href: "#estimator" }}
        secondaryCta={{ label: "BOOK A CONSULTATION", href: "/contact" }}
      />

      {/* ═══════════════ TICKER ═══════════════ */}
      <MarqueeTicker text="Residential Architecture ✦ Commercial Workplaces ✦ Turnkey Contracting ✦ Custom Millwork ✦ 3D VR Walkthroughs ✦" />

      {/* ═══════════════ SERVICES SHOWCASE ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#faf9f6" }}>
        <Reveal>
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", textAlign: "center" }}>
            [ What We Deliver ]
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", color: "#111", textAlign: "center", marginBottom: "5rem", fontWeight: 400 }}>
            Our Service Offerings
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {servicesList.map((service, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={service.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: isEven ? "1.1fr 1fr" : "1fr 1.1fr",
                  gap: "5rem",
                  alignItems: "center",
                }}
              >
                {/* Text column */}
                <div style={{ order: isEven ? 2 : 1 }}>
                  <Reveal direction={isEven ? "right" : "left"}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
                      <span className="serif" style={{ fontSize: "2.5rem", color: "#e8651c", fontWeight: 400 }}>
                        {service.num}
                      </span>
                      <div style={{ width: "30px", height: "1px", background: "rgba(0,0,0,0.15)" }} />
                      <span style={{ fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888" }}>
                        Timeline: {service.duration}
                      </span>
                    </div>

                    <h3 className="serif" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.15, marginBottom: "1rem", fontWeight: 400 }}>
                      {service.title}
                    </h3>
                    <p style={{ color: "#e8651c", fontSize: "0.95rem", marginBottom: "1.5rem", fontWeight: 500 }}>
                      {service.tagline}
                    </p>
                    <p style={{ color: "#555", lineHeight: 1.85, fontSize: "1.02rem", marginBottom: "2rem" }}>
                      {service.desc}
                    </p>

                    <div style={{ marginBottom: "2.5rem" }}>
                      <span style={{ fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "#111", fontWeight: 600, display: "block", marginBottom: "1rem" }}>
                        Key Deliverables:
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {service.deliverables.map((del, dIdx) => (
                          <div key={dIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", color: "#666", fontSize: "0.92rem", lineHeight: 1.6 }}>
                            <CheckCircle2 size={16} color="#e8651c" style={{ flexShrink: 0, marginTop: "3px" }} />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <ForgeButton href="/contact" variant="dark">
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                        <LetterRoll text={`INQUIRE ABOUT ${service.title.toUpperCase()}`} />
                        <ArrowUpRight size={14} />
                      </span>
                    </ForgeButton>
                  </Reveal>
                </div>

                {/* Image column */}
                <div style={{ order: isEven ? 1 : 2 }}>
                  <Reveal direction={isEven ? "left" : "right"}>
                    <div style={{ position: "relative", height: "520px", borderRadius: "4px", overflow: "hidden", boxShadow: "0 25px 50px -15px rgba(0,0,0,0.12)" }}>
                      <ParallaxImg src={service.img} alt={service.title} speed={0.1} />
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ ESTIMATOR TOOL ═══════════════ */}
      <section id="estimator" style={{ padding: "8rem 8%", background: "#111", color: "#fff" }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 4rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem" }}>
              [ Interactive Planning ]
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 400, marginBottom: "1.2rem" }}>
              Scope & Timeline Estimator
            </h2>
            <p style={{ color: "#aaa", fontSize: "0.98rem", lineHeight: 1.8 }}>
              Select your property configuration and desired craftsmanship level to preview expected turnaround time and comprehensive deliverables.
            </p>
          </div>
        </Reveal>

        <div style={{ maxWidth: "860px", margin: "0 auto", background: "#181818", border: "1px solid rgba(255,255,255,0.1)", padding: "3rem", borderRadius: "4px" }}>
          {/* Step 1: Property Type */}
          <div style={{ marginBottom: "2.5rem" }}>
            <label style={{ fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem" }}>
              1. Select Property Type
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
              {[
                { id: "2bhk", label: "2BHK Residence" },
                { id: "3bhk", label: "3BHK Residence" },
                { id: "4bhk", label: "4BHK / Penthouse" },
                { id: "villa", label: "Independent Villa" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPropType(item.id)}
                  style={{
                    padding: "1rem",
                    border: propType === item.id ? "1px solid #e8651c" : "1px solid rgba(255,255,255,0.12)",
                    background: propType === item.id ? "rgba(232, 101, 28, 0.15)" : "transparent",
                    color: propType === item.id ? "#fff" : "#aaa",
                    cursor: "pointer",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.85rem",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Craftsmanship Tier */}
          <div style={{ marginBottom: "3rem" }}>
            <label style={{ fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem" }}>
              2. Craftsmanship Tier
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {[
                { id: "essential", label: "Essential Luxury", desc: "Premium finishes, sleek modular cabinetry, warm lighting" },
                { id: "signature", label: "Signature Vivid", desc: "Italian marble accents, custom millwork, smart home scenes" },
                { id: "bespoke", label: "Haute Bespoke", desc: "Imported rare stones, VR twin, acoustic engineering, master suites" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTier(item.id)}
                  style={{
                    padding: "1.2rem",
                    textAlign: "left",
                    border: tier === item.id ? "1px solid #e8651c" : "1px solid rgba(255,255,255,0.12)",
                    background: tier === item.id ? "rgba(232, 101, 28, 0.15)" : "transparent",
                    color: tier === item.id ? "#fff" : "#aaa",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <strong style={{ display: "block", color: tier === item.id ? "#e8651c" : "#fff", fontSize: "0.9rem", marginBottom: "0.4rem" }}>
                    {item.label}
                  </strong>
                  <span style={{ fontSize: "0.78rem", color: "#888", lineHeight: 1.5, display: "block" }}>
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Result Output Card */}
          <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <span style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.4rem" }}>
                Estimated Execution Turnaround
              </span>
              <div className="serif" style={{ fontSize: "2.5rem", color: "#fff" }}>
                {currentEstimate.time}
              </div>
              <p style={{ color: "#aaa", fontSize: "0.88rem", maxWidth: "460px", marginTop: "0.5rem", lineHeight: 1.6 }}>
                {currentEstimate.scope}
              </p>
            </div>

            <ForgeButton href="/contact" variant="shimmer">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <LetterRoll text="REQUEST DETAILED BOQ" />
                <ArrowRight size={15} />
              </span>
            </ForgeButton>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS WORKFLOW ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#fff" }}>
        <Reveal>
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", textAlign: "center" }}>
            [ How We Work ]
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", color: "#111", textAlign: "center", marginBottom: "5rem", fontWeight: 400 }}>
            Four Phases of Turnkey Delivery
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2.5rem" }}>
          {[
            { step: "Phase 01", title: "Discovery & Spatial Study", desc: "Detailed on-site laser measurements, lifestyle interview, mood imagery, and preliminary 2D spatial layouts." },
            { step: "Phase 02", title: "3D Visualization & Finishes", desc: "Photorealistic 4K renders, VR walk, physical material sample box review, and itemized transparent BOQ." },
            { step: "Phase 03", title: "Off-Site Joinery & On-Site Civil", desc: "Precision factory millwork cutting while on-site civil, plumbing, electrical, and HVAC progresses seamlessly." },
            { step: "Phase 04", title: "Assembly, Styling & Handover", desc: "White-glove installation of cabinetry, lighting, custom furnishings, deep cleaning, and 10-year warranty delivery." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              style={{ padding: "2.5rem 2rem", background: "#faf9f6", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "4px" }}
            >
              <span style={{ fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem" }}>
                {item.step}
              </span>
              <h3 className="serif" style={{ fontSize: "1.45rem", marginBottom: "1rem", color: "#111", fontWeight: 400 }}>
                {item.title}
              </h3>
              <p style={{ color: "#666", lineHeight: 1.8, fontSize: "0.92rem" }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SERVICE FAQ ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          <Reveal direction="left">
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem" }}>
              [ Clarifications ]
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.2vw, 3.4rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: "1.8rem" }}>
              Questions About<br />Our Process & Build
            </h2>
            <p style={{ color: "#777", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Have questions about contracts, timelines, or our 10-year studio warranty? Connect directly with our Senior Architect.
            </p>
            <ForgeButton href="/contact" variant="dark">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <LetterRoll text="TALK TO OUR TEAM" />
                <ArrowUpRight size={14} />
              </span>
            </ForgeButton>
          </Reveal>

          <div>
            {serviceFaqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.5rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span className="serif" style={{ fontSize: "1.2rem", fontWeight: 400 }}>
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
