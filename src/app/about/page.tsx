"use client";

import Image from "next/image";
import Link from "next/link";
import ForgeScrollHero from "@/components/ForgeScrollHero";
import { LetterRoll } from "@/components/SharedUI";

/* ═════════════════════════════════════════════════════════════════════════
   VIVID INTERIORS — ABOUT US PAGE
   Content & Photos sourced directly from vividinteriorspune.com/about/
   Architectural, Interior & Turnkey Contracting | Located in Pune since 2018
   ═════════════════════════════════════════════════════════════════════════ */

const CLIENTS = [
  { name: "POSCO", logo: "/images/client_posco.webp", category: "Global Enterprise" },
  { name: "Symbiosis", logo: "/images/client_symbiosis.webp", category: "Educational Institution" },
  { name: "Ami Polymer", logo: "/images/client_ami_polymer.webp", category: "Industrial Solutions" },
  { name: "Bookavibe", logo: "/images/client_bookavibe.webp", category: "Commercial Hospitality" },
  { name: "Public School", logo: "/images/client_public_school.webp", category: "Campus Infrastructure" },
  { name: "Tots Preschool", logo: "/images/client_tots.webp", category: "Childcare Architecture" },
];

const WHY_CHOOSE_US = [
  {
    num: "01",
    title: "Conceptual Development & Space Planning",
    desc: "Bespoke spatial layouts and 3D architectural models tailored to optimize natural lighting, ventilation, and daily functional flow.",
  },
  {
    num: "02",
    title: "Selection of Noble Materials",
    desc: "Rigorous curation of authentic veneers, Italian marble, certified marine ply, German hardware, and tactile acoustic textiles.",
  },
  {
    num: "03",
    title: "Multi-Stage Site Inspections",
    desc: "Uncompromising on-site supervision by licensed architects and engineers, guaranteeing millimeter precision at every milestone.",
  },
  {
    num: "04",
    title: "End-to-End Construction Management",
    desc: "Turnkey execution with vetted master craftsmen, specialized subcontractors, transparent bill of quantities, and strict handover dates.",
  },
  {
    num: "05",
    title: "AEC Engineering & IT Integration",
    desc: "Utilizing modern Information Technology, comprehensive CAD/MEP schematics, and structural coordination for flawless execution.",
  },
  {
    num: "06",
    title: "Post-Handover Support & 10-Yr Warranty",
    desc: "Experience the difference with dedicated customer care, proactive maintenance schedules, and unwavering responsiveness.",
  },
];

const GALLERY_SHOWCASE = [
  {
    title: "Luxury Living Room & Spatial Architecture",
    category: "Residential Architecture",
    image: "/images/vivid_about_dsc07460.webp",
  },
  {
    title: "Bespoke Master Suite & Fluted Wall Joinery",
    category: "Master Bedroom",
    image: "/images/vivid_about_dsc07453.webp",
  },
  {
    title: "Architectural Ceiling & Ambient Luminaire",
    category: "Dining & Social Suite",
    image: "/images/vivid_about_dsc07433.webp",
  },
  {
    title: "Factory-Crafted Millwork & Precision Joinery",
    category: "Modular Craftsmanship",
    image: "/images/vivid_about_dsc07443.webp",
  },
  {
    title: "Biophilic Vertical Living Wall Architecture",
    category: "Landscape & Interior Greenery",
    image: "/images/vivid_vertical_green_wall.webp",
  },
  {
    title: "Custom Wardrobes & Bronze Accent Finishes",
    category: "Storage Architecture",
    image: "/images/vivid_about_dsc07477.webp",
  },
];

export default function AboutPage() {
  const handleOpenConsultation = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-consultation"));
    }
  };

  return (
    <div style={{ background: "var(--bg-page, #faf9f6)", color: "var(--text-primary, #111)" }}>
      {/* ─────────────────────────────────────────────────────────────
          1. 3-STAGE CINEMATIC SCROLL HERO (PUNE CRAFTSMANSHIP)
          Retaining 100% of exact animations & layout from ForgeScrollHero
          Using real high-res Vivid Interiors photos & official tagline
          ───────────────────────────────────────────────────────────── */}
      <ForgeScrollHero
        subtitle="Where Imagination Meets Interiors — Architectural, Interior, and Contracting company in Pune since 2018."
        stage2Line1={["Where", "Imagination"]}
        stage2Line2={["Meets", "Interiors"]}
        leftImage="/images/vivid_about_dsc07443.webp"
        centerImage="/images/vivid_about_dsc07460.webp"
        rightImage="/images/vivid_about_dsc07477.webp"
        interiorImage="/images/vivid_about_dsc07453.webp"
        portalImage="/images/vivid_about_dsc07376.webp"
        marqueeBrands={[
          "POSCO",
          "SYMBIOSIS",
          "AMI POLYMER",
          "BOOKAVIBE",
          "TOTS PRESCHOOL",
          "PUNE RESIDENCES",
          "VIVID INTERIORS",
        ]}
        ctaHref="/contact"
        ctaText="REQUEST A CALL"
      />

      {/* ─────────────────────────────────────────────────────────────
          2. PHILOSOPHY & STORY SECTION
          Exact content from vividinteriorspune.com/about/
          ───────────────────────────────────────────────────────────── */}
      <section className="responsive-section" style={{ background: "var(--bg-page, #faf9f6)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="responsive-two-col site-max-width">
            <div>
              <span
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#e8651c",
                  display: "block",
                  marginBottom: "1.2rem",
                  fontWeight: 600,
                }}
              >
                [ Where Imagination Meets Interiors ]
              </span>
              <h2
                className="serif"
                style={{
                  fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
                  lineHeight: 1.12,
                  marginBottom: "2rem",
                  fontWeight: 400,
                  color: "var(--text-primary, #111)",
                }}
              >
                Curating Spatial Ideas<br />
                <em>In Pune Since 2018</em>
              </h2>

              <p style={{ lineHeight: 1.9, color: "var(--text-secondary, #333)", marginBottom: "1.4rem", fontSize: "1.05rem" }}>
                <strong>VIVID INTERIORS</strong> is an Architectural, Interior, and Contracting company located in <strong>Pune since 2018</strong>. We have committed to steadily curating spatial ideas that meet the demands of the ever-evolving AEC industry with design deliverables that are not only aesthetically pleasing but also satisfy client requirements.
              </p>

              <p style={{ lineHeight: 1.9, color: "var(--text-muted, #555)", marginBottom: "1.4rem", fontSize: "0.98rem" }}>
                We at Vivid Interiors are driven by the ethos of <em>Design Excellence, Service Efficiency, Responsiveness,</em> and a strong commitment towards all projects and scales undertaken by us. Our goal is always to create designs tailored to our clients&apos; unique personal styles and practical needs. We optimize available resources to design buildings and interiors that are driven not only by the beauty of form but value in function.
              </p>

              <div
                style={{
                  padding: "1.4rem 1.8rem",
                  background: "rgba(232, 101, 28, 0.06)",
                  borderLeft: "3px solid #e8651c",
                  marginBottom: "2rem",
                  borderRadius: "0 6px 6px 0",
                }}
              >
                <p
                  className="serif"
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    color: "var(--text-primary, #111)",
                    lineHeight: 1.6,
                  }}
                >
                  &ldquo;To understand the customer&apos;s needs and exceed expectations.&rdquo;
                </p>
                <span style={{ fontSize: "0.78rem", color: "#e8651c", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginTop: "0.5rem", fontWeight: 600 }}>
                  — Vivid Interiors Core Creed
                </span>
              </div>

              <p style={{ lineHeight: 1.9, color: "var(--text-muted, #555)", marginBottom: "2.8rem", fontSize: "0.95rem" }}>
                We have a strong network amongst local craftsmen and subcontractors to ensure that every project is completed to the highest standards. We strike the right balance between efficient engineering and thoughtful development by applying the latest aesthetics and technology, delivering drawings and documents as committed. This dedication to quality and professionalism together with a high level of customer service are the key to our expanding nationwide clientele.
              </p>

              {/* Core Pillars */}
              <div className="responsive-pillars-grid" style={{ marginBottom: "3rem" }}>
                <div style={{ borderLeft: "2px solid #e8651c", paddingLeft: "1.2rem" }}>
                  <h4 style={{ fontSize: "1.02rem", fontWeight: 600, color: "var(--text-primary, #111)", marginBottom: "0.3rem" }}>
                    Design Excellence
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #777)", lineHeight: 1.6, margin: 0 }}>
                    Aesthetic purity and functional rigor combined with noble materials.
                  </p>
                </div>
                <div style={{ borderLeft: "2px solid #e8651c", paddingLeft: "1.2rem" }}>
                  <h4 style={{ fontSize: "1.02rem", fontWeight: 600, color: "var(--text-primary, #111)", marginBottom: "0.3rem" }}>
                    Service Efficiency
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #777)", lineHeight: 1.6, margin: 0 }}>
                    Factory-made precision joinery, milestone tracking, and strict timelines.
                  </p>
                </div>
                <div style={{ borderLeft: "2px solid #e8651c", paddingLeft: "1.2rem" }}>
                  <h4 style={{ fontSize: "1.02rem", fontWeight: 600, color: "var(--text-primary, #111)", marginBottom: "0.3rem" }}>
                    Responsiveness
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #777)", lineHeight: 1.6, margin: 0 }}>
                    Direct communication with architects and guaranteed 24-hr query resolution.
                  </p>
                </div>
                <div style={{ borderLeft: "2px solid #e8651c", paddingLeft: "1.2rem" }}>
                  <h4 style={{ fontSize: "1.02rem", fontWeight: 600, color: "var(--text-primary, #111)", marginBottom: "0.3rem" }}>
                    Strong Commitment
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #777)", lineHeight: 1.6, margin: 0 }}>
                    Transparent BOQ, verified materials, and zero compromise on execution.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={handleOpenConsultation}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "1rem 2.2rem",
                    background: "#e8651c",
                    color: "#fff",
                    border: "none",
                    fontSize: "0.75rem",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 25px -5px rgba(232, 101, 28, 0.4)",
                  }}
                >
                  <span>REQUEST A CALL</span>
                  <span>→</span>
                </button>
                <Link
                  href="/projects"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "1rem 2.2rem",
                    border: "1px solid var(--border-subtle, rgba(0,0,0,0.2))",
                    color: "var(--text-primary, #111)",
                    fontSize: "0.75rem",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  VIEW COMPLETED WORK
                </Link>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div
                className="site-studio-img"
                style={{
                  position: "relative",
                  height: "640px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 25px 50px -15px rgba(0,0,0,0.18)",
                }}
              >
                <Image
                  src="/images/vivid_about_dsc07460.webp"
                  alt="Vivid Interiors Living Architecture in Pune"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>

              {/* Floating Pune Atelier Badge */}
              <div
                className="site-studio-badge"
                style={{
                  position: "absolute",
                  bottom: "-25px",
                  left: "-25px",
                  background: "#0d0d0d",
                  color: "#fff",
                  padding: "1.5rem 2rem",
                  borderRadius: "6px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  borderLeft: "3px solid #e8651c",
                }}
              >
                <span style={{ fontSize: "0.68rem", letterSpacing: "2px", color: "#e8651c", textTransform: "uppercase", display: "block" }}>
                  ESTABLISHED 2018
                </span>
                <span className="serif" style={{ fontSize: "1.3rem", display: "block", marginTop: "0.2rem" }}>
                  Erandwane, Pune
                </span>
                <span style={{ fontSize: "0.78rem", color: "#888", display: "block" }}>
                  Maharashtra, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. NEW SECTION: WHY CHOOSE US
          Directly from vividinteriorspune.com/about/ "WHY Choose US"
          ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: "7rem 8%", background: "var(--bg-card, #f4f2ee)", borderTop: "1px solid var(--border-subtle, rgba(0,0,0,0.06))", borderBottom: "1px solid var(--border-subtle, rgba(0,0,0,0.06))" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 4.5rem" }}>
            <span
              style={{
                fontSize: "0.72rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#e8651c",
                display: "block",
                marginBottom: "1rem",
                fontWeight: 600,
              }}
            >
              [ Why Choose Us ]
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)",
                lineHeight: 1.15,
                fontWeight: 400,
                color: "var(--text-primary, #111)",
                marginBottom: "1.4rem",
              }}
            >
              Comprehensive Guidance from Concept to Key Handover
            </h2>
            <p style={{ color: "var(--text-muted, #666)", fontSize: "1rem", lineHeight: 1.8 }}>
              Our interior design services cater to individuals and companies seeking expert guidance in creating beautiful and functional spaces. We offer a comprehensive range of turnkey architectural and interior solutions.
            </p>
          </div>

          <div className="responsive-cards-grid">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-page, #ffffff)",
                  padding: "2.5rem 2.2rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-subtle, rgba(0,0,0,0.08))",
                  position: "relative",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#e8651c",
                      display: "block",
                      marginBottom: "1rem",
                      letterSpacing: "1px",
                    }}
                  >
                    {item.num}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.18rem",
                      fontWeight: 600,
                      color: "var(--text-primary, #111)",
                      marginBottom: "0.8rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-muted, #666)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
                <div
                  style={{
                    height: "2px",
                    width: "36px",
                    background: "rgba(232, 101, 28, 0.4)",
                    marginTop: "2rem",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. NEW SECTION: OUR CLIENTS
          Directly from vividinteriorspune.com/about/ "Our Clients"
          "Experience the difference with our customer service."
          ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: "6.5rem 8%", background: "#0a0a0a", color: "#fff" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3.8rem" }}>
            <span
              style={{
                fontSize: "0.72rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#e8651c",
                display: "block",
                marginBottom: "1rem",
                fontWeight: 600,
              }}
            >
              [ Our Clients ]
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)",
                lineHeight: 1.15,
                fontWeight: 400,
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              Experience The Difference With Our Customer Service
            </h2>
            <p style={{ color: "#999", fontSize: "0.98rem", lineHeight: 1.8 }}>
              From prestigious international corporations to educational academies and premier residences across Pune and Maharashtra.
            </p>
          </div>

          <div className="responsive-logo-grid">
            {CLIENTS.map((client, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "8px",
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "160px",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ position: "relative", width: "120px", height: "55px", marginBottom: "1rem", filter: "brightness(0) invert(1)", opacity: 0.85 }}>
                  <Image
                    src={client.logo}
                    alt={`${client.name} - Vivid Interiors Client`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff", display: "block" }}>
                  {client.name}
                </span>
                <span style={{ fontSize: "0.72rem", color: "#e8651c", display: "block", marginTop: "0.2rem" }}>
                  {client.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. REAL PROJECT PHOTOGRAPHY SHOWCASE
          High-res real photography from vividinteriorspune.com/about/
          ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: "7.5rem 8%", background: "var(--bg-page, #faf9f6)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginBottom: "3.5rem" }}>
            <div>
              <span
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#e8651c",
                  display: "block",
                  marginBottom: "0.8rem",
                  fontWeight: 600,
                }}
              >
                [ Realized Transformations ]
              </span>
              <h2
                className="serif"
                style={{
                  fontSize: "clamp(2.2rem, 3.6vw, 3.2rem)",
                  lineHeight: 1.15,
                  fontWeight: 400,
                  color: "var(--text-primary, #111)",
                  margin: 0,
                }}
              >
                Crafted Spaces, Authentic Standards
              </h2>
            </div>
            <Link
              href="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#e8651c",
                fontSize: "0.82rem",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <span>EXPLORE ALL PROJECTS</span>
              <span>→</span>
            </Link>
          </div>

          <div className="responsive-cards-grid">
            {GALLERY_SHOWCASE.map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "var(--bg-card, #f4f2ee)",
                  border: "1px solid var(--border-subtle, rgba(0,0,0,0.08))",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div style={{ position: "relative", height: "270px", width: "100%", overflow: "hidden" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      background: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(4px)",
                      color: "#fff",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "3px",
                      fontSize: "0.68rem",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.category}
                  </div>
                </div>
                <div style={{ padding: "1.4rem 1.6rem" }}>
                  <h4
                    style={{
                      fontSize: "1.02rem",
                      fontWeight: 600,
                      color: "var(--text-primary, #111)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.title}
                  </h4>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted, #777)" }}>
                    Executed by Vivid Interiors Pune
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. STUDIO LOCATION & CONTACT DETAILS (FROM VIVID SITE)
          ───────────────────────────────────────────────────────────── */}
      <section className="responsive-section" style={{ background: "var(--bg-card, #f4f2ee)", borderTop: "1px solid var(--border-subtle, rgba(0,0,0,0.06))" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="responsive-compact-grid">
            <div style={{ borderLeft: "3px solid #e8651c", paddingLeft: "1.5rem" }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                Studio Address
              </span>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-primary, #111)" }}>
                B8, New Meenal Society, Nal Stop Chowk, Karve Road, Erandwane, Pune, Maharashtra 411004.
              </p>
            </div>

            <div style={{ borderLeft: "3px solid #e8651c", paddingLeft: "1.5rem" }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                Direct Contact
              </span>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-primary, #111)" }}>
                <a href="tel:+919970180947" style={{ color: "inherit", textDecoration: "none" }}>+91 99701 80947</a><br />
                <a href="tel:+918999923438" style={{ color: "inherit", textDecoration: "none" }}>+91 89999 23438</a>
              </p>
            </div>

            <div style={{ borderLeft: "3px solid #e8651c", paddingLeft: "1.5rem" }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                Design Inquiries
              </span>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-primary, #111)" }}>
                <a href="mailto:design@vividinteriorspune.com" style={{ color: "inherit", textDecoration: "none" }}>
                  design@vividinteriorspune.com
                </a>
              </p>
            </div>

            <div style={{ borderLeft: "3px solid #e8651c", paddingLeft: "1.5rem" }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                Office Hours
              </span>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-primary, #111)" }}>
                Monday – Saturday: 10:00 AM – 7:30 PM<br />
                Sunday: By Prior Appointment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. VERCEL FINAL CTA SECTION
          Matching layout & aesthetics, updated with Request a Call & Contact
          ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0d0d0d",
          padding: "7.5rem 8%",
          textAlign: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "550px",
            height: "550px",
            background:
              "radial-gradient(circle, rgba(232,101,28,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <span
            style={{
              fontSize: "0.72rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#e8651c",
              display: "block",
              marginBottom: "1.5rem",
              fontWeight: 600,
            }}
          >
            [ Building Relationships, One Conversation at a Time ]
          </span>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 6.2rem)",
              color: "#fff",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.08,
              marginBottom: "2.2rem",
            }}
          >
            Have a Project in Mind?<br />Let&apos;s Talk.
          </h2>
          <p
            style={{
              color: "#aaa",
              fontSize: "1.05rem",
              maxWidth: "580px",
              margin: "0 auto 2.8rem",
              lineHeight: 1.8,
            }}
          >
            Do not hesitate to say Hello. Whether an expansive 4 BHK apartment, luxury villa, or commercial workplace — our team is ready to curate your vision.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.2rem",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={handleOpenConsultation}
              className="forge-shimmer-btn"
              style={{
                padding: "1.1rem 2.8rem",
                cursor: "pointer",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <LetterRoll text="REQUEST A CALL" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
            <Link
              className="btn-ghost"
              style={{ padding: "1.1rem 2.8rem" }}
              href="/contact"
            >
              <LetterRoll text="CONTACT US DIRECTLY" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
