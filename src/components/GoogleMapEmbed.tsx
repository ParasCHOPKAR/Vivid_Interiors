"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Phone, Clock, ExternalLink } from "lucide-react";

interface GoogleMapEmbedProps {
  title?: string;
  subtitle?: string;
  showDetailsCard?: boolean;
}

export default function GoogleMapEmbed({
  title = "Visit Our Pune Design Studio",
  subtitle = "Experience materials, finishes, and spatial models in person at our flagship studio.",
  showDetailsCard = true,
}: GoogleMapEmbedProps) {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101789.02879731319!2d73.82051378374963!3d18.53986134868188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf9bd09f5f85%3A0xc14911b57ac477a0!2sVivid%20Interiors%20-%20Interior%20Designers%20in%20Kothrud%20Pune%2C%20Residential%2C%20Commercial%2C%20Industrial%20Interior!5e0!3m2!1sen!2sin!4v1765359051221!5m2!1sen!2sin";

  const directionsUrl =
    "https://www.google.com/maps/dir//Vivid+Interiors+-+Interior+Designers+in+Kothrud+Pune,+Residential,+Commercial,+Industrial+Interior,+B8,+New+Meenal+Society,+Nal+stop+chowk,+Karve+Rd,+Erandwane,+Pune,+Maharashtra+411004/@18.5085376,73.8299881,15z";

  return (
    <section
      style={{
        position: "relative",
        background: "var(--bg-page, #0d0d0d)",
        padding: "5rem 8%",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3rem", textAlign: "center" }}
        >
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
            [ Studio Location & Map ]
          </span>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text-primary, #fff)",
              marginBottom: "1rem",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              color: "var(--text-secondary, #aaa)",
              fontSize: "1rem",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Map Container + Overlay Card */}
        <div
          style={{
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
            border: "1px solid var(--border-subtle, rgba(255,255,255,0.12))",
            minHeight: "480px",
            display: "grid",
            gridTemplateColumns: showDetailsCard ? "1fr 380px" : "1fr",
            background: "var(--bg-card, #161616)",
          }}
          className="map-grid-container"
        >
          {/* Iframe */}
          <div style={{ position: "relative", width: "100%", minHeight: "450px" }}>
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{
                border: 0,
                display: "block",
                minHeight: "450px",
                filter: "contrast(1.05) saturate(1.1)",
              }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vivid Interiors Pune Location Map"
            />
          </div>

          {/* Details Card */}
          {showDetailsCard && (
            <div
              style={{
                padding: "2.8rem 2.2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "var(--bg-card, #141414)",
                borderLeft: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.35rem 0.8rem",
                    borderRadius: "4px",
                    background: "rgba(232, 101, 28, 0.15)",
                    color: "#e8651c",
                    fontSize: "0.7rem",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: "1.2rem",
                  }}
                >
                  <MapPin size={13} />
                  <span>Nal Stop Chowk, Karve Road</span>
                </div>

                <h3
                  className="serif"
                  style={{
                    fontSize: "1.6rem",
                    color: "var(--text-primary, #fff)",
                    marginBottom: "1rem",
                    fontWeight: 400,
                    lineHeight: 1.25,
                  }}
                >
                  Vivid Interiors Pune
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary, #aaa)",
                    fontSize: "0.88rem",
                    lineHeight: 1.65,
                    marginBottom: "1.8rem",
                  }}
                >
                  B8, New Meenal Society, Nal stop chowk, Karve Road, Erandwane, Pune, Maharashtra 411004.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    borderTop: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                    paddingTop: "1.5rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem" }}>
                    <Clock size={16} color="#e8651c" style={{ flexShrink: 0 }} />
                    <span style={{ color: "var(--text-secondary, #aaa)" }}>
                      Mon – Sat: <strong style={{ color: "var(--text-primary, #fff)" }}>10:00 AM – 7:30 PM</strong>
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.85rem" }}>
                    <Phone size={16} color="#e8651c" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      <a
                        href="tel:+919970180947"
                        style={{ color: "var(--text-primary, #fff)", textDecoration: "none" }}
                      >
                        +91 99701 80947
                      </a>
                      <a
                        href="tel:+918999923438"
                        style={{ color: "var(--text-primary, #fff)", textDecoration: "none" }}
                      >
                        +91 89999 23438
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="forge-shimmer-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.85rem 1.4rem",
                    fontSize: "0.78rem",
                    letterSpacing: "1.5px",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  <Navigation size={14} />
                  <span>GET DIRECTIONS IN GOOGLE MAPS</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href="https://wa.me/919970180947?text=Hello%20Vivid%20Interiors,%20I%20would%20like%20to%20schedule%20a%20visit%20to%20your%20Pune%20studio."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.8rem 1.2rem",
                    border: "1px solid var(--border-subtle, rgba(255,255,255,0.18))",
                    borderRadius: "4px",
                    background: "transparent",
                    color: "var(--text-primary, #fff)",
                    fontSize: "0.74rem",
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#25D366";
                    e.currentTarget.style.color = "#25D366";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-subtle, rgba(255,255,255,0.18))";
                    e.currentTarget.style.color = "var(--text-primary, #fff)";
                  }}
                >
                  <span>SCHEDULE STUDIO VISIT (WHATSAPP)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
