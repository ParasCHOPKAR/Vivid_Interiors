"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, ChevronDown, ArrowRight } from "lucide-react";
import { PageHero, Reveal, MarqueeTicker, LetterRoll } from "@/components/SharedUI";

const contactFaqs = [
  {
    q: "How does the initial discovery consultation work?",
    a: "The initial 45-minute discovery consultation is held either at one of our design ateliers or over a high-definition video call. We discuss your floor plan, lifestyle preferences, timeline, and preliminary budget to outline spatial feasibility and conceptual direction.",
  },
  {
    q: "Is there a fee for the preliminary design consultation?",
    a: "Our initial discovery session is complimentary. Should you decide to proceed with our studio, we prepare a formal engagement contract with 3D visualization, detailed space plans, and a guaranteed itemized BOQ.",
  },
  {
    q: "Do you take projects outside our studio cities?",
    a: "Yes. In addition to Mumbai, Bengaluru, Delhi NCR, Hyderabad, and Pune, our turnkey project management team routinely delivers luxury villas and estates in Goa, Alibaug, Chandigarh, Chennai, and overseas for NRI clients.",
  },
  {
    q: "How early should we engage Vivid Interiors before receiving possession?",
    a: "We recommend engaging us 60 to 90 days before possession. This allows our architects to finalize spatial modifications, structural approvals, 3D renders, and material selections so civil work begins on day one of possession.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Mumbai",
    propertyType: "Luxury Apartment",
    budget: "₹60L – ₹1.2 Cr",
    meetingType: "In-Person Studio Visit",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ overflowX: "hidden" }}>
      {/* ═══════════════ PAGE HERO ═══════════════ */}
      <PageHero
        tag="[ Start Your Project ]"
        title={
          <>
            Let's Build Something <span style={{ fontStyle: "italic", color: "#e8651c" }}>Extraordinary</span>
          </>
        }
        subtitle="Schedule a private consultation with our Principal Architects. Experience the fabrics, natural stones, and lighting in person at our studios."
        bgImage="/images/locations_studio.jpg"
        primaryCta={{ label: "FILL INQUIRY FORM", href: "#inquiry-form" }}
        secondaryCta={{ label: "OUR STUDIOS", href: "/locations" }}
      />

      {/* ═══════════════ TICKER ═══════════════ */}
      <MarqueeTicker text="Direct Senior Architect Consultation ✦ Guaranteed Fixed Pricing ✦ In-Studio Material Review ✦ Nationwide Presence ✦" />

      {/* ═══════════════ INQUIRY FORM & STUDIO CONTACT ═══════════════ */}
      <section id="inquiry-form" style={{ padding: "8rem 8%", background: "#0d0d0d", color: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "6rem", alignItems: "start" }}>
          {/* Form Side */}
          <div>
            <Reveal direction="left">
              <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem" }}>
                [ Private Consultation ]
              </span>
              <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: "1.5rem" }}>
                Tell Us About<br /><em>Your Space</em>
              </h2>
              <p style={{ color: "#aaa", fontSize: "0.98rem", lineHeight: 1.8, marginBottom: "3rem" }}>
                Complete the brief form below and our Senior Architect will review your requirements and reach out within 24 business hours.
              </p>
            </Reveal>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: "#161616",
                  border: "1px solid #e8651c",
                  padding: "4rem 3rem",
                  textAlign: "center",
                  borderRadius: "4px",
                }}
              >
                <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#e8651c", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#fff" }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="serif" style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
                  Inquiry Received
                </h3>
                <p style={{ color: "#ccc", fontSize: "1.05rem", maxWidth: "450px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
                  Thank you, <strong>{formData.name}</strong>. Our Senior Architect for <strong>{formData.city}</strong> will contact you at <strong>{formData.phone}</strong> to confirm your <strong>{formData.meetingType}</strong>.
                </p>
                <button
                  className="btn-ghost"
                  onClick={() => setSubmitted(false)}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <label style={{ fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.6rem" }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      className="luxury-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.6rem" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. vikram@example.com"
                      className="luxury-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <label style={{ fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.6rem" }}>
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      className="luxury-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.6rem" }}>
                      City / Property Location *
                    </label>
                    <select
                      className="luxury-select"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                      <option value="Mumbai">Mumbai (Bandra / South Bombay / Suburbs)</option>
                      <option value="Bengaluru">Bengaluru (Indiranagar / Whitefield / Koramangala)</option>
                      <option value="Delhi NCR">Delhi NCR (Gurgaon / Central Delhi / Noida)</option>
                      <option value="Hyderabad">Hyderabad (Jubilee Hills / Hitec City)</option>
                      <option value="Pune">Pune (Koregaon Park / Kalyani Nagar)</option>
                      <option value="Goa">Goa (Villa / Estate)</option>
                      <option value="Overseas / NRI">International / NRI Client</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <label style={{ fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.6rem" }}>
                      Property Scope *
                    </label>
                    <select
                      className="luxury-select"
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    >
                      <option value="Luxury Apartment">Luxury Apartment (3BHK / 4BHK)</option>
                      <option value="Sky Penthouse">Sky Penthouse / Duplex</option>
                      <option value="Independent Villa">Independent Villa / Bungalow</option>
                      <option value="Commercial Office">Executive Corporate Office</option>
                      <option value="Complete Renovation">Complete Architectural Renovation</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.6rem" }}>
                      Estimated Interior Budget
                    </label>
                    <select
                      className="luxury-select"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="₹35L – ₹60L">₹35 Lakhs – ₹60 Lakhs</option>
                      <option value="₹60L – ₹1.2 Cr">₹60 Lakhs – ₹1.2 Crore</option>
                      <option value="₹1.2 Cr – ₹2.5 Cr">₹1.2 Crore – ₹2.5 Crore</option>
                      <option value="₹2.5 Cr+">₹2.5 Crore+ (Ultra Luxury)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.6rem" }}>
                    Preferred Consultation Mode
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                    {["In-Person Studio Visit", "Virtual 4K Video Call", "On-Site Assessment"].map((m) => (
                      <button
                        type="button"
                        key={m}
                        onClick={() => setFormData({ ...formData, meetingType: m })}
                        style={{
                          padding: "0.9rem",
                          border: formData.meetingType === m ? "1px solid #e8651c" : "1px solid rgba(255,255,255,0.12)",
                          background: formData.meetingType === m ? "rgba(232, 101, 28, 0.15)" : "transparent",
                          color: formData.meetingType === m ? "#fff" : "#aaa",
                          cursor: "pointer",
                          fontSize: "0.78rem",
                          letterSpacing: "0.5px",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.6rem" }}>
                    Project Notes & Timeline Preferences
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your possession date, square footage, design aesthetic, and any specific requirements..."
                    className="luxury-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="forge-shimmer-btn"
                  style={{ width: "100%", justifyContent: "center", padding: "1.2rem", fontSize: "0.85rem" }}
                >
                  <LetterRoll text="SUBMIT INQUIRY FOR SENIOR ARCHITECT REVIEW" />
                  <span style={{ fontSize: "1rem", marginLeft: "4px" }}>→</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <Reveal direction="right">
              <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)", padding: "3rem", borderRadius: "4px" }}>
                <span style={{ fontSize: "0.72rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1.2rem" }}>
                  Direct Atelier Contact
                </span>
                <h3 className="serif" style={{ fontSize: "2rem", marginBottom: "2rem", fontWeight: 400 }}>
                  We Are At Your Service
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(232,101,28,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Phone size={18} color="#e8651c" />
                    </div>
                    <div>
                      <span style={{ fontSize: "0.72rem", color: "#777", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>General Inquiries</span>
                      <a href="tel:+919876543210" style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 500 }}>+91 98765 43210</a>
                      <p style={{ color: "#777", fontSize: "0.8rem", marginTop: "0.2rem" }}>Available Mon – Sat, 10:00 AM – 7:30 PM</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(232,101,28,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <MessageCircle size={18} color="#e8651c" />
                    </div>
                    <div>
                      <span style={{ fontSize: "0.72rem", color: "#777", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>Instant WhatsApp Concierge</span>
                      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontSize: "1.05rem", fontWeight: 500 }}>
                        Chat with Design Concierge &nbsp;↗
                      </a>
                      <p style={{ color: "#777", fontSize: "0.8rem", marginTop: "0.2rem" }}>Average response within 15 minutes</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(232,101,28,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Mail size={18} color="#e8651c" />
                    </div>
                    <div>
                      <span style={{ fontSize: "0.72rem", color: "#777", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>Architectural Proposals</span>
                      <a href="mailto:hello@vividinteriors.in" style={{ color: "#fff", fontSize: "1.05rem" }}>hello@vividinteriors.in</a>
                      <p style={{ color: "#777", fontSize: "0.8rem", marginTop: "0.2rem" }}>Send architectural plans / drawings directly</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(232,101,28,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <MapPin size={18} color="#e8651c" />
                    </div>
                    <div>
                      <span style={{ fontSize: "0.72rem", color: "#777", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>Flagship Headquarters</span>
                      <p style={{ color: "#ddd", fontSize: "0.92rem", lineHeight: 1.6 }}>Level 4, Vivid Atelier, Bandra West, Mumbai 400050, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Studio Hours Card */}
            <Reveal direction="right" delay={0.15}>
              <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)", padding: "2.5rem", borderRadius: "4px" }}>
                <span style={{ fontSize: "0.72rem", letterSpacing: "2.5px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem" }}>
                  Visiting Hours
                </span>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem", marginBottom: "1rem" }}>
                  <span style={{ color: "#aaa" }}>Monday – Friday</span>
                  <strong style={{ color: "#fff" }}>10:00 AM – 7:30 PM</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem", marginBottom: "1rem" }}>
                  <span style={{ color: "#aaa" }}>Saturday</span>
                  <strong style={{ color: "#fff" }}>10:30 AM – 6:30 PM</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#aaa" }}>Sunday</span>
                  <span style={{ color: "#e8651c" }}>By Advance Appointment</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ FREQUENTLY ASKED QUESTIONS ═══════════════ */}
      <section style={{ padding: "8rem 8%", background: "#faf9f6" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem", textAlign: "center" }}>
              [ Frequently Asked Questions ]
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.4rem)", textAlign: "center", marginBottom: "4rem", fontWeight: 400 }}>
              Before Your Consultation
            </h2>
          </Reveal>

          <div>
            {contactFaqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                    padding: "1.6rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span className="serif" style={{ fontSize: "1.25rem", fontWeight: 400 }}>
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
