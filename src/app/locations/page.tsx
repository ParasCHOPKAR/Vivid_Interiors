"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, ArrowUpRight, Compass, Sparkles, Monitor, Coffee } from "lucide-react";
import { PageHero, Reveal, ParallaxImg, MarqueeTicker, ForgeButton, LetterRoll } from "@/components/SharedUI";

interface Studio {
  id: string;
  city: string;
  neighborhood: string;
  address: string;
  studioHead: string;
  phone: string;
  email: string;
  hours: string;
  img: string;
  amenities: string[];
  area: string;
}

const studios: Studio[] = [
  {
    id: "mumbai",
    city: "Mumbai",
    neighborhood: "Bandra West (Flagship)",
    address: "Level 4, Vivid Atelier, Bandra West, Mumbai 400050",
    studioHead: "Ananya Mehta (Principal Architect)",
    phone: "+91 98765 43210",
    email: "mumbai@vividinteriors.in",
    hours: "Mon – Sat: 10:00 AM – 7:30 PM",
    img: "/images/locations_studio.jpg",
    amenities: ["6,000 sq ft Material Atelier", "Full VR 3D Walkthrough Pod", "Italian Marble Gallery", "Private Tasting & Coffee Bar"],
    area: "Flagship 6,000 sq ft",
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    neighborhood: "Indiranagar",
    address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038",
    studioHead: "Rohan Verghese (Studio Director)",
    phone: "+91 98765 43211",
    email: "blr@vividinteriors.in",
    hours: "Mon – Sat: 10:00 AM – 7:30 PM",
    img: "/images/about_studio.jpg",
    amenities: ["Biophilic Living Showcase", "Smart Home Automation Lab", "Bespoke Lighting Simulator", "Outdoor Pavilion Mockup"],
    area: "4,500 sq ft Atelier",
  },
  {
    id: "delhi-ncr",
    city: "Delhi NCR",
    neighborhood: "Golf Course Road, Gurgaon",
    address: "Two Horizon Centre, Golf Course Road, DLF Phase 5, Gurgaon 122002",
    studioHead: "Priya Kashyap (Senior Architect)",
    phone: "+91 98765 43212",
    email: "ncr@vividinteriors.in",
    hours: "Mon – Sat: 10:00 AM – 8:00 PM",
    img: "/images/service_commercial.jpg",
    amenities: ["Executive Boardroom Lounge", "Penthouse Living Suite", "Acoustic Fluting Displays", "Luxury German Kitchen Bar"],
    area: "5,200 sq ft Suite",
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    neighborhood: "Jubilee Hills",
    address: "Road No. 36, Jubilee Hills, Hyderabad 500033",
    studioHead: "Vikramaditya Raju (Lead Architect)",
    phone: "+91 98765 43213",
    email: "hyd@vividinteriors.in",
    hours: "Mon – Sat: 10:00 AM – 7:30 PM",
    img: "/images/project_villa.jpg",
    amenities: ["Grand Villa Scale Mockups", "Hand-carved Stone Library", "Architectural Hardware Display", "Client Design Lounge"],
    area: "4,800 sq ft Atelier",
  },
  {
    id: "pune",
    city: "Pune",
    neighborhood: "Koregaon Park",
    address: "North Main Road, Koregaon Park, Pune 411001",
    studioHead: "Tanvi Deshmukh (Design Director)",
    phone: "+91 98765 43214",
    email: "pune@vividinteriors.in",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM",
    img: "/images/design_ideas.jpg",
    amenities: ["Japandi & Minimalist Mockups", "Modular Wardrobe Systems", "European Veneer Curations", "Private Consultation Pod"],
    area: "3,600 sq ft Atelier",
  },
];

export default function LocationsPage() {
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const activeStudio = studios.find((s) => s.id === selectedCity) || studios[0];

  return (
    <main style={{ overflowX: "hidden" }}>
      {/* ═══════════════ PAGE HERO ═══════════════ */}
      <PageHero
        tag="[ Studios & Experience Centers ]"
        title={
          <>
            Nationwide Presence / <span style={{ fontStyle: "italic", color: "#e8651c" }}>Ateliers</span> Across India
          </>
        }
        subtitle="Visit our architectural design ateliers in Mumbai, Bengaluru, Delhi NCR, Hyderabad, and Pune to touch the finishes and experience spaces in real scale."
        bgImage="/images/locations_studio.jpg"
        primaryCta={{ label: "BOOK A STUDIO VISIT", href: "/contact" }}
        secondaryCta={{ label: "VIEW OUR WORK", href: "/projects" }}
      />

      {/* ═══════════════ TICKER ═══════════════ */}
      <MarqueeTicker text="Mumbai Flagship ✦ Bengaluru Atelier ✦ Delhi NCR Center ✦ Hyderabad Studio ✦ Pune Experience Center ✦" />

      {/* ═══════════════ INTERACTIVE STUDIO EXPERIENCE ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#faf9f6" }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 4rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem" }}>
              [ Touch, Feel & Experience ]
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", color: "#111", fontWeight: 400, marginBottom: "1.2rem" }}>
              Our Design Ateliers
            </h2>
            <p style={{ color: "#666", fontSize: "1.02rem", lineHeight: 1.8 }}>
              Each Vivid Atelier is carefully curated with full-scale living mockups, imported stone slabs, tactile fabric galleries, and virtual reality walkthrough rooms.
            </p>
          </div>
        </Reveal>

        {/* City Filter Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.8rem", flexWrap: "wrap", marginBottom: "4rem" }}>
          {studios.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedCity(s.id)}
              className={`filter-pill ${selectedCity === s.id ? "active" : ""}`}
              style={{ padding: "0.8rem 1.8rem", fontSize: "0.78rem" }}
            >
              {s.city}
            </button>
          ))}
        </div>

        {/* Featured Active Studio Spotlight Card */}
        <motion.div
          key={activeStudio.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "4rem",
            padding: "3.5rem",
            boxShadow: "0 25px 60px -20px rgba(0,0,0,0.08)",
            borderRadius: "4px",
            alignItems: "center",
            marginBottom: "6rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <span style={{ background: "#e8651c", color: "#fff", fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", padding: "0.35rem 0.9rem" }}>
                {activeStudio.area}
              </span>
              <span style={{ fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888" }}>
                {activeStudio.neighborhood}
              </span>
            </div>

            <h3 className="serif" style={{ fontSize: "2.6rem", fontWeight: 400, marginBottom: "0.5rem" }}>
              {activeStudio.city} Atelier
            </h3>
            <p style={{ color: "#e8651c", fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2rem" }}>
              Studio Lead: {activeStudio.studioHead}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", color: "#444", fontSize: "0.95rem" }}>
                <MapPin size={18} color="#e8651c" style={{ flexShrink: 0, marginTop: "4px" }} />
                <span>{activeStudio.address}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#444", fontSize: "0.95rem" }}>
                <Phone size={18} color="#e8651c" style={{ flexShrink: 0 }} />
                <a href={`tel:${activeStudio.phone}`} style={{ color: "#111", fontWeight: 500 }}>{activeStudio.phone}</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#444", fontSize: "0.95rem" }}>
                <Mail size={18} color="#e8651c" style={{ flexShrink: 0 }} />
                <a href={`mailto:${activeStudio.email}`} style={{ color: "#111" }}>{activeStudio.email}</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#444", fontSize: "0.95rem" }}>
                <Clock size={18} color="#e8651c" style={{ flexShrink: 0 }} />
                <span>{activeStudio.hours}</span>
              </div>
            </div>

            <div style={{ marginBottom: "2.5rem" }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "#111", fontWeight: 600, display: "block", marginBottom: "1rem" }}>
                Atelier Amenities:
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
                {activeStudio.amenities.map((am, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#666", fontSize: "0.88rem" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e8651c" }} />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
              <ForgeButton href="/contact" variant="shimmer">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <LetterRoll text={`BOOK VISIT AT ${activeStudio.city.toUpperCase()}`} />
                  <ArrowRight size={15} />
                </span>
              </ForgeButton>
              <a href={`tel:${activeStudio.phone}`} className="btn-ghost" style={{ borderColor: "#111", color: "#111" }}>
                <LetterRoll text="CALL DIRECTLY" />
              </a>
            </div>
          </div>

          <div style={{ position: "relative", height: "480px", borderRadius: "4px", overflow: "hidden" }}>
            <Image src={activeStudio.img} alt={activeStudio.city} fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", color: "#fff" }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase" }}>Vivid Experience Center</span>
              <h4 className="serif" style={{ fontSize: "1.4rem" }}>{activeStudio.city} Atelier</h4>
            </div>
          </div>
        </motion.div>

        {/* All Locations Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
          {studios.map((s, idx) => (
            <motion.div
              key={s.id}
              className="forge-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              style={{
                background: "#fff",
                borderColor: "rgba(0,0,0,0.08)",
                padding: "2.5rem",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.5rem" }}>
                  {s.neighborhood}
                </span>
                <h3 className="serif" style={{ fontSize: "1.8rem", marginBottom: "1rem", fontWeight: 400 }}>
                  {s.city} Studio
                </h3>
                <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {s.address}
                </p>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "1.2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <p style={{ fontSize: "0.82rem", color: "#555" }}><strong>Phone:</strong> {s.phone}</p>
                  <p style={{ fontSize: "0.82rem", color: "#555" }}><strong>Email:</strong> {s.email}</p>
                </div>
              </div>

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  onClick={() => setSelectedCity(s.id)}
                  style={{ background: "none", border: "none", color: "#e8651c", fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}
                >
                  VIEW ATELIER DETAILS <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ NRI & REMOTE DESIGN SECTION ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#111", color: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <div>
            <Reveal direction="left">
              <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1.2rem" }}>
                [ Global Architectural Service ]
              </span>
              <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", lineHeight: 1.15, marginBottom: "2rem", fontWeight: 400 }}>
                NRI & International<br /><em>Remote Design Suite</em>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p style={{ lineHeight: 1.9, color: "#ccc", marginBottom: "1.5rem", fontSize: "1.05rem" }}>
                Over 35% of our private residences are commissioned by clients living in Dubai, London, Singapore, New York, and the Bay Area who are building their dream homes in India.
              </p>
              <p style={{ lineHeight: 1.9, color: "#888", marginBottom: "2.5rem" }}>
                We provide complete remote transparency: live 4K site cameras, weekly high-resolution video walkthroughs, digital milestone sign-offs, and VR headset presentations shipped directly to your overseas residence.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
                {[
                  { title: "Timezone Harmony", desc: "Consultations scheduled to match your local timezone seamlessly." },
                  { title: "Weekly Video Audits", desc: "4K detailed video progress reports every Friday." },
                  { title: "Digital Escrow Security", desc: "Transparent milestone releases tied to verified completion." },
                  { title: "Zero Travel Needed", desc: "From drawings to key handover without you stepping on site." },
                ].map((item, idx) => (
                  <div key={idx} style={{ borderLeft: "2px solid #e8651c", paddingLeft: "1rem" }}>
                    <strong style={{ color: "#fff", fontSize: "0.9rem", display: "block", marginBottom: "0.3rem" }}>{item.title}</strong>
                    <span style={{ color: "#777", fontSize: "0.82rem", lineHeight: 1.5, display: "block" }}>{item.desc}</span>
                  </div>
                ))}
              </div>
              <ForgeButton href="/contact" variant="shimmer">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <LetterRoll text="SCHEDULE GLOBAL VIDEO CALL" />
                  <ArrowRight size={15} />
                </span>
              </ForgeButton>
            </Reveal>
          </div>

          <Reveal direction="right">
            <div style={{ position: "relative", height: "560px", borderRadius: "4px", overflow: "hidden" }}>
              <ParallaxImg src="/images/project_penthouse.jpg" alt="Remote architectural consultation" speed={0.1} />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
