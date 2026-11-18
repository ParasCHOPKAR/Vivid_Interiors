"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ForgeButton, LetterRoll } from "./SharedUI";

export interface VerifiedReview {
  id: string;
  author: string;
  location: string;
  source: string;
  rating: number;
  snippet: string;
  projectType: string;
}

export const liveVerifiedReviews: VerifiedReview[] = [
  {
    id: "rev-1",
    author: "Pramod Pune",
    location: "Kothrud, Pune",
    source: "Google Verified Review (Trustindex)",
    rating: 5,
    projectType: "Full Home Renovation",
    snippet:
      "We just renovated our home with Vivid Interiors. The team responded to our requirements very fast, so we could finalize commercials quickly based on their great taste in design. Initially work progressed very fast; in the middle we saw the tremendous focus on finishing and understood why that care is required. The time they took for finishing was worth every bit of investment. The products they delivered are fantastic and undeniably elevate the aesthetics in a great way!",
  },
  {
    id: "rev-2",
    author: "Payal Suryavanshi",
    location: "Model Colony, Pune",
    source: "Google Verified Review (Trustindex)",
    rating: 5,
    projectType: "3BHK Residence Design & Build",
    snippet:
      "Amazing experience! I contacted Vivid Interiors to design and execute my 3BHK home in Model Colony, Pune. When I went with their team to select materials like veneers and Italian marbles, one store owner told us: 'Vivid Interiors is among the very few architects who never take any kickback or commission from vendors.' That was the deciding moment for us. Their clear, ethical mindset eliminates surprises. Their BOQ quotation is completely transparent and straightforward.",
  },
  {
    id: "rev-3",
    author: "Abhishek Siddhaling Patil",
    location: "Wakad, Pune",
    source: "Google Verified Review (Trustindex)",
    rating: 5,
    projectType: "3BHK Turnkey Interior",
    snippet:
      "Hiring an interior designer is difficult because of so many misleading practices in the market. We visited multiple studios before finalizing Vivid Interiors. They took us to their completed site handovers where we saw the build quality firsthand. We are extremely happy with their procedure, design finalization, material selection, and clean billing milestones. What they suggest and execute is worth every penny.",
  },
  {
    id: "rev-4",
    author: "Shivank Purwar",
    location: "Karve Road, Pune",
    source: "Google Verified Review (Trustindex)",
    rating: 5,
    projectType: "Luxury Living Space",
    snippet:
      "I absolutely adore my new space and am forever grateful to Vivid Interiors and the entire team! They were professional, friendly, knowledgeable, and helpful throughout the entire journey. They delivered high-spec finishes in the best possible time frame and at very reasonable pricing.",
  },
  {
    id: "rev-5",
    author: "Yuvraj Gandhmal",
    location: "Pune",
    source: "Google Verified Review (Trustindex)",
    rating: 5,
    projectType: "Complete Interior Transformation",
    snippet:
      "Vivid Interiors was a dream to work with! Their team always arrived prepared with homework, incredibly professional, attentive to the smallest detail, and always willing to go the extra mile. They transformed our home into exactly what we envisioned, and we are genuinely enjoying living in a better space.",
  },
  {
    id: "rev-6",
    author: "Bungalow Homeowner",
    location: "Pune",
    source: "Google Verified Review (Trustindex)",
    rating: 5,
    projectType: "Custom Bungalow Architecture & Interiors",
    snippet:
      "I had my bungalow designs and execution handled by Vivid Interiors. Excellent work, genuine people, and a firm that keeps every promise fulfilled. Cost efficient, best quality interiors without compromises.",
  },
];

export default function LiveSiteTestimonials() {
  return (
    <section
      style={{
        padding: "8rem 8%",
        background: "var(--bg-page, #faf9f6)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              background: "rgba(232, 101, 28, 0.12)",
              color: "#e8651c",
              fontSize: "0.72rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "1.2rem",
            }}
          >
            <CheckCircle size={14} />
            <span>Google Verified · Trustindex Score 4.9/5</span>
          </div>

          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
              fontWeight: 400,
              color: "var(--text-primary, #111)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Trusted by Pune Homeowners
          </h2>

          <p
            style={{
              color: "var(--text-secondary, #666)",
              fontSize: "1.05rem",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Over 165+ families and businesses across Pune have trusted Vivid Interiors for honest, turnkey design and build execution since 2018.
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2rem",
          }}
        >
          {liveVerifiedReviews.map((rev, i) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{
                background: "var(--bg-card, #fff)",
                border: "1px solid var(--border-subtle, rgba(0,0,0,0.08))",
                borderRadius: "8px",
                padding: "2.5rem 2.2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                position: "relative",
              }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} size={15} fill="#e8651c" color="#e8651c" />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#16a34a",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <CheckCircle size={12} />
                    Verified Google
                  </span>
                </div>

                <Quote size={28} color="#e8651c" style={{ opacity: 0.25, marginBottom: "0.8rem" }} />

                <p
                  style={{
                    color: "var(--text-secondary, #444)",
                    fontSize: "0.93rem",
                    lineHeight: 1.75,
                    marginBottom: "1.8rem",
                    fontStyle: "normal",
                  }}
                >
                  "{rev.snippet}"
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--border-subtle, rgba(0,0,0,0.06))",
                  paddingTop: "1.2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text-primary, #111)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {rev.author}
                  </h4>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted, #777)" }}>
                    {rev.location} · {rev.projectType}
                  </p>
                </div>

                <span
                  style={{
                    fontSize: "0.68rem",
                    background: "var(--bg-page-alt, #f0ede6)",
                    color: "var(--text-secondary, #666)",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "4px",
                  }}
                >
                  Pune Client
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <Link
            href="/contact"
            className="forge-shimmer-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.5rem",
              textDecoration: "none",
              fontSize: "0.8rem",
              letterSpacing: "1.5px",
            }}
          >
            <LetterRoll text="START YOUR PROJECT WITH VIVID INTERIORS" />
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
