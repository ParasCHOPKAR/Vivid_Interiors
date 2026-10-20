"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, CheckCircle, ArrowRight, ArrowUpRight, Award, Newspaper } from "lucide-react";
import { PageHero, Reveal, ParallaxImg, AnimatedNumber, MarqueeTicker, ForgeButton, LetterRoll } from "@/components/SharedUI";

interface Review {
  id: string;
  name: string;
  role: string;
  project: string;
  location: string;
  category: "Villa" | "Penthouse" | "Apartment" | "Commercial";
  rating: number;
  date: string;
  headline: string;
  body: string;
  img: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Rajesh & Malini Singhania",
    role: "Managing Director, Global Logistics",
    project: "Villa Aurelia",
    location: "Bandra West, Mumbai",
    category: "Villa",
    rating: 5,
    date: "January 2026",
    headline: "An architectural masterpiece executed with clockwork precision.",
    body: "We had heard countless horror stories about interior delays and runaway budgets. Vivid Interiors shattered every stereotype. Ananya and her site engineering team completed our 4,800 sq ft duplex two weeks ahead of schedule. The fluted walnut millwork and the Calacatta Viola bookmatching in our double-height living room is genuinely museum-grade.",
    img: "/images/project_villa.jpg",
  },
  {
    id: "2",
    name: "Devina & Vikram Mehra",
    role: "Tech Founders & Angel Investors",
    project: "The Sky Penthouse",
    location: "Indiranagar, Bengaluru",
    category: "Penthouse",
    rating: 5,
    date: "November 2025",
    headline: "They understood our lifestyle better than we could explain it.",
    body: "Being in tech, we wanted smart automation that was invisible — no tacky glowing switches or complicated iPads. Vivid integrated KNX lighting and automated motorized acoustic sheer blinds so seamlessly that the entire home breathes with the sunrise. The VR walkthrough they gave us before starting was 100% identical to the finished penthouse.",
    img: "/images/project_penthouse.jpg",
  },
  {
    id: "3",
    name: "Aditya Khurana",
    role: "Senior Partner, Private Equity",
    project: "The Obsidian Executive Suite",
    location: "DLF Phase 5, Gurgaon",
    category: "Commercial",
    rating: 5,
    date: "December 2025",
    headline: "Prestige, acoustic tranquility, and commanding design.",
    body: "Our private equity boardroom required supreme acoustic isolation and dignified elegance for international investor delegations. The team executed custom teak fluted claddings with concealed acoustic foam and zero sound bleed. Every client who walks into our suite is visibly struck by the ambiance.",
    img: "/images/service_commercial.jpg",
  },
  {
    id: "4",
    name: "Dr. Aniruddh & Shalini Joshi",
    role: "Spine Surgeon & Contemporary Artist",
    project: "Culinary & Living Sanctuary",
    location: "Koregaon Park, Pune",
    category: "Apartment",
    rating: 5,
    date: "August 2025",
    headline: "The German modular kitchen is the centerpiece of our home.",
    body: "As an avid home cook and host, I spent months researching luxury kitchens. Vivid engineered a cantilevered quartzite island and pocket doors concealing appliances with perfection. Cooking and entertaining here is pure joy. Their turnkey team took care of all permissions and society approvals effortlessly.",
    img: "/images/service_kitchen.jpg",
  },
  {
    id: "5",
    name: "Karan & Tanya Grover",
    role: "NRI Homeowners (Living in London)",
    project: "Japandi Courtyard Residence",
    location: "Jubilee Hills, Hyderabad",
    category: "Villa",
    rating: 5,
    date: "October 2025",
    headline: "Zero travel required from London. Flawless remote execution.",
    body: "We were extremely anxious about managing a 4,100 sq ft villa renovation while based in Mayfair, London. Vivid's weekly 4K video updates and real-time project management dashboard made us feel like we were standing right on site. When we landed in Hyderabad for the handover, the home was immaculate down to scented candles.",
    img: "/images/design_ideas.jpg",
  },
  {
    id: "6",
    name: "Naveen & Sunita Somani",
    role: "Industrialist",
    project: "The Sovereign Master Suite",
    location: "Worli Sea Face, Mumbai",
    category: "Penthouse",
    rating: 5,
    date: "February 2026",
    headline: "Unrivaled tactile luxury and acoustic serenity.",
    body: "The custom velvet fluted headboard and the glass walk-in wardrobe with automated recessed lighting feel like a presidential suite in Milan. The 10-year warranty and the professionalism of their on-site team is something rare in India.",
    img: "/images/service_bedroom.jpg",
  },
];

const categories = ["All", "Villa", "Penthouse", "Apartment", "Commercial"];

export default function TestimonialsPage() {
  const [filter, setFilter] = useState("All");

  const filteredReviews =
    filter === "All" ? reviews : reviews.filter((r) => r.category === filter);

  return (
    <main style={{ overflowX: "hidden" }}>
      {/* ═══════════════ PAGE HERO ═══════════════ */}
      <PageHero
        tag="[ Client Trust & Stories ]"
        title={
          <>
            Voices of Trust / <span style={{ fontStyle: "italic", color: "#e8651c" }}>Delighted</span> Homeowners
          </>
        }
        subtitle="Discover firsthand experiences from homeowners, visionary founders, and art collectors who entrusted their sanctuaries to Vivid Interiors."
        bgImage="/images/project_penthouse.jpg"
        primaryCta={{ label: "START YOUR PROJECT", href: "/contact" }}
        secondaryCta={{ label: "VIEW PORTFOLIO", href: "/projects" }}
      />

      {/* ═══════════════ TICKER ═══════════════ */}
      <MarqueeTicker text="4.9 ★ Rating on Google & Houzz ✦ 98% Referral Rate ✦ 450+ Homes Handed Over ✦ 100% On-Time Turnkey Delivery ✦" />

      {/* ═══════════════ METRICS ═══════════════ */}
      <section style={{ padding: "6.5rem 8%", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", textAlign: "center" }}>
          {[
            { num: 4.9, suffix: " ★", label: "Average Client Rating" },
            { num: 98, suffix: "%", label: "Client Referral Rate" },
            { num: 450, suffix: "+", label: "Homes & Suites Delivered" },
            { num: 10, suffix: " Yrs", label: "Structural Studio Warranty" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="serif" style={{ fontSize: "4.5rem", fontWeight: 400, lineHeight: 1, color: "#e8651c" }}>
                {item.num}{item.suffix}
              </div>
              <p style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "2px", color: "#777", marginTop: "1rem" }}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS LIST ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.5rem" }}>
              [ Verified Client Reviews ]
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.4rem)", fontWeight: 400 }}>
              What Our Clients Say
            </h2>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {categories.map((c) => (
              <button
                key={c}
                className={`filter-pill ${filter === c ? "active" : ""}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3rem" }}
        >
          <AnimatePresence>
            {filteredReviews.map((r, idx) => (
              <motion.div
                layout
                key={r.id}
                className="forge-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{
                  background: "#faf9f6",
                  borderColor: "rgba(0,0,0,0.06)",
                  padding: "3rem 2.5rem",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "3px" }}>
                      {[...Array(r.rating)].map((_, si) => (
                        <Star key={si} size={15} fill="#e8651c" color="#e8651c" />
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#2e7d32", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase" }}>
                      <CheckCircle size={14} />
                      <span>Verified Client</span>
                    </div>
                  </div>

                  <h3 className="serif" style={{ fontSize: "1.45rem", lineHeight: 1.35, marginBottom: "1.2rem", fontWeight: 400, color: "#111" }}>
                    "{r.headline}"
                  </h3>

                  <p style={{ color: "#666", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "2rem" }}>
                    {r.body}
                  </p>
                </div>

                <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "1.5rem", display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <div style={{ position: "relative", width: "54px", height: "54px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                    <Image src={r.img} alt={r.name} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#111" }}>{r.name}</h4>
                    <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.2rem" }}>{r.role}</p>
                    <span style={{ fontSize: "0.72rem", letterSpacing: "1px", color: "#e8651c", textTransform: "uppercase" }}>
                      {r.project} · {r.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ═══════════════ PRESS & RECOGNITION ═══════════════ */}
      <section style={{ padding: "7rem 8%", background: "#0d0d0d", color: "#fff", textAlign: "center" }}>
        <Reveal>
          <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1.5rem" }}>
            [ Editorial Features & Accolades ]
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.6rem)", fontWeight: 400, marginBottom: "4rem" }}>
            Featured In Premier Architectural Publications
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
          {[
            { name: "Architectural Digest", note: "Top 50 Indian Interior Practices 2025" },
            { name: "Elle Decor India", note: "Best Residential Duplex Architecture" },
            { name: "GoodHomes Award", note: "Excellence in Turnkey Execution" },
            { name: "Design Today Magazine", note: "Cover Feature: The Villa Aurelia" },
          ].map((press, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              style={{ padding: "2.5rem 1.5rem", border: "1px solid rgba(255,255,255,0.08)", background: "#141414", borderRadius: "4px" }}
            >
              <h3 className="serif" style={{ fontSize: "1.5rem", color: "#fff", fontStyle: "italic", marginBottom: "0.8rem" }}>
                {press.name}
              </h3>
              <p style={{ color: "#e8651c", fontSize: "0.8rem", letterSpacing: "1px", textTransform: "uppercase" }}>
                {press.note}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
        <ParallaxImg src="/images/project_villa.jpg" alt="Join our happy homeowners" speed={0.15} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,13,13,0.7)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "2rem" }}>
          <Reveal>
            <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)", color: "#fff", fontStyle: "italic", maxWidth: "750px", lineHeight: 1.15, marginBottom: "2rem", fontWeight: 400 }}>
              Let's Compose Your Private Sanctuary
            </h2>
            <ForgeButton href="/contact" variant="shimmer">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <LetterRoll text="SCHEDULE YOUR INITIAL DISCOVERY" />
                <ArrowRight size={15} />
              </span>
            </ForgeButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
