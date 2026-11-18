"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Home,
  MessageCircle,
  CheckCircle2,
  CalendarPlus,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  // Step 1: Scheduling
  const [selectedDuration, setSelectedDuration] = useState("30 min");
  const [selectedSlot, setSelectedSlot] = useState("11:30 AM");
  const [selectedDate, setSelectedDate] = useState<Date>(getTomorrow);
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => {
    const t = getTomorrow();
    return new Date(t.getFullYear(), t.getMonth(), 1);
  });

  // Step 2: Contact Details
  const [step, setStep] = useState<"schedule" | "contact">("schedule");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Luxury Villa / Bungalow");
  const [contactMode, setContactMode] = useState<"whatsapp" | "call" | "studio">("whatsapp");
  const [formError, setFormError] = useState("");

  // Step 3: Submitted state
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  useEffect(() => {
    if (isOpen) {
      const tomorrow = getTomorrow();
      setSelectedDate(tomorrow);
      setCalendarMonth(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1));
      setStep("schedule");
      setConsultSubmitted(false);
      setFormError("");
    }
  }, [isOpen]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoPrev = calendarMonth > currentMonthStart;

  const handlePrevMonth = () => {
    const prevMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
    if (prevMonth >= currentMonthStart) {
      setCalendarMonth(prevMonth);
    }
  };

  const handleNextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const calYear = calendarMonth.getFullYear();
  const calMonth = calendarMonth.getMonth();
  const firstDayOfMonth = new Date(calYear, calMonth, 1);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const leadingBlanks = Array.from({ length: startOffset }, (_, i) => i);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthYearTitle = calendarMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const selectedDateFormattedFull = selectedDate
    ? `${selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })} (IST)`
    : "";

  const selectedDateFormattedSimple = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  // WhatsApp Message Builder
  const buildWhatsAppMessage = (ref: string) => {
    const lines = [
      `*🏛️ NEW CALL & CONSULTATION REQUEST*`,
      `*Vivid Interiors Pune* | Ref: #${ref}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Client Name:* ${fullName}`,
      `📱 *Mobile / WhatsApp:* ${phone}`,
      email ? `✉️ *Email:* ${email}` : null,
      `📅 *Preferred Date:* ${selectedDateFormattedSimple}`,
      `⏰ *Time Slot:* ${selectedSlot} (${selectedDuration})`,
      `🏡 *Project Type:* ${projectType}`,
      `📞 *Preferred Mode:* ${
        contactMode === "whatsapp"
          ? "WhatsApp Call / Chat"
          : contactMode === "call"
          ? "Regular Phone Call"
          : "Studio Meeting in Erandwane Pune"
      }`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `_Submitted via vividinteriorspune.com website_`,
    ].filter(Boolean);

    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const generatedRef = "VI-" + Math.floor(100000 + Math.random() * 900000);
    setRefId(generatedRef);
    setFormError("");
    setConsultSubmitted(true);

    // Open WhatsApp to Vivid Interiors team (+91 99701 80947)
    const encodedMsg = buildWhatsAppMessage(generatedRef);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919970180947&text=${encodedMsg}`;

    // Trigger WhatsApp in new tab
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Generate .ics calendar download file
  const downloadCalendarEvent = () => {
    if (!selectedDate) return;
    const dateStr = selectedDate.toISOString().split("T")[0].replace(/-/g, "");
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Vivid Interiors Pune//Consultation//EN",
      "BEGIN:VEVENT",
      `UID:${refId || "vivid"}-${Date.now()}@vividinteriorspune.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART:${dateStr}T113000`,
      `DTEND:${dateStr}T120000`,
      "SUMMARY:Vivid Interiors Consultation with Senior Architect",
      `DESCRIPTION:Consultation call with Vivid Interiors Pune. Slot: ${selectedSlot} (${selectedDuration}). Reference: #${refId}. Phone: +91 99701 80947.`,
      "LOCATION:Vivid Interiors Studio, Nal Stop Chowk, Karve Road, Erandwane, Pune",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Vivid_Interiors_Consultation_${refId || "appointment"}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ zIndex: 3000 }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "880px",
              width: "92%",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 25px 70px rgba(0,0,0,0.75)",
            }}
          >
            <button className="close-modal" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>

            {/* ═══════════════ CONFIRMATION / SUCCESS SCREEN ═══════════════ */}
            {consultSubmitted ? (
              <div
                style={{
                  padding: "4rem 3rem",
                  textAlign: "center",
                  background: "#0d0d0d",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "rgba(37, 211, 102, 0.15)",
                    border: "2px solid #25d366",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    color: "#25d366",
                  }}
                >
                  <CheckCircle2 size={40} />
                </div>

                <span
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#e8651c",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  [ Request Received · Ref #{refId} ]
                </span>

                <h3 className="serif" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginBottom: "1rem" }}>
                  Your Call Request is Confirmed!
                </h3>

                <p
                  style={{
                    color: "#ccc",
                    fontSize: "1rem",
                    maxWidth: "540px",
                    margin: "0 auto 2rem",
                    lineHeight: 1.7,
                  }}
                >
                  Thank you, <strong>{fullName}</strong>! Your appointment request has been submitted to the{" "}
                  <strong>Vivid Interiors senior architectural team</strong>.
                </p>

                {/* Appointment Card */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "1.5rem 2rem",
                    maxWidth: "520px",
                    margin: "0 auto 2.5rem",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", fontSize: "0.88rem" }}>
                    <div>
                      <span style={{ color: "#888", display: "block", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Scheduled Date
                      </span>
                      <strong style={{ color: "#fff" }}>{selectedDateFormattedSimple}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#888", display: "block", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Time &amp; Duration
                      </span>
                      <strong style={{ color: "#e8651c" }}>{selectedSlot} ({selectedDuration})</strong>
                    </div>
                    <div>
                      <span style={{ color: "#888", display: "block", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Contact Number
                      </span>
                      <span style={{ color: "#fff" }}>{phone}</span>
                    </div>
                    <div>
                      <span style={{ color: "#888", display: "block", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Response Time
                      </span>
                      <span style={{ color: "#25d366", fontWeight: 600 }}>Within 24 Hours</span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "1.2rem",
                      paddingTop: "1rem",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      fontSize: "0.8rem",
                      color: "#aaa",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <ShieldCheck size={16} color="#e8651c" />
                    <span>A WhatsApp notification with these booking details has been sent to our desk.</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <a
                    href={`https://api.whatsapp.com/send?phone=919970180947&text=${buildWhatsAppMessage(refId)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.9rem 2rem",
                      background: "#25d366",
                      color: "#fff",
                      borderRadius: "4px",
                      textDecoration: "none",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    <MessageCircle size={18} />
                    <span>Open in WhatsApp</span>
                  </a>

                  <button
                    onClick={downloadCalendarEvent}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.9rem 1.8rem",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    <CalendarPlus size={16} />
                    <span>Save to Calendar</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="btn-orange"
                    style={{ padding: "0.9rem 2.2rem" }}
                  >
                    DONE
                  </button>
                </div>
              </div>
            ) : (
              /* ═══════════════ 2-STEP INTERACTIVE FORM ═══════════════ */
              <div className="modal-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr" }}>
                {/* LEFT CALENDAR COLUMN */}
                <div
                  className="modal-left"
                  style={{
                    background: "#111",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "2.4rem 2rem",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          background: "#e8651c",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                        }}
                      >
                        V
                      </div>
                      <div>
                        <h3 className="serif" style={{ fontSize: "1.3rem", margin: 0, color: "#fff" }}>
                          Request a Call
                        </h3>
                        <span style={{ fontSize: "0.68rem", color: "#e8651c", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600 }}>
                          Vivid Interiors Pune
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: "0.8rem", color: "#aaa", lineHeight: 1.5, marginBottom: "1.4rem" }}>
                      Select your preferred date &amp; slot. Our principal architect will connect directly with no vendor middle-men.
                    </p>

                    {/* Month Header with Navigation */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.85rem",
                        padding: "0 0.25rem",
                      }}
                    >
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={!canGoPrev}
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "none",
                          color: canGoPrev ? "#e8651c" : "#333",
                          cursor: canGoPrev ? "pointer" : "default",
                          borderRadius: "4px",
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-label="Previous month"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <div
                        style={{
                          fontSize: "0.88rem",
                          color: "#fff",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                        }}
                      >
                        {monthYearTitle}
                      </div>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "none",
                          color: "#e8651c",
                          cursor: "pointer",
                          borderRadius: "4px",
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-label="Next month"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Days Grid */}
                    <div className="calendar-grid">
                      <span>M</span>
                      <span>T</span>
                      <span>W</span>
                      <span>T</span>
                      <span>F</span>
                      <span>S</span>
                      <span>S</span>
                      {leadingBlanks.map((b) => (
                        <span key={`blank-${b}`} />
                      ))}
                      {monthDays.map((dayNum) => {
                        const cellDate = new Date(calYear, calMonth, dayNum);
                        cellDate.setHours(0, 0, 0, 0);
                        const isPast = cellDate < today;
                        const isSelected =
                          selectedDate &&
                          cellDate.getFullYear() === selectedDate.getFullYear() &&
                          cellDate.getMonth() === selectedDate.getMonth() &&
                          cellDate.getDate() === selectedDate.getDate();
                        const isToday = cellDate.getTime() === today.getTime();

                        return (
                          <button
                            key={`day-${dayNum}`}
                            type="button"
                            disabled={isPast}
                            onClick={() => setSelectedDate(cellDate)}
                            className={`calendar-day-btn ${isSelected ? "active-day" : ""} ${
                              isToday ? "today-day" : ""
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary card at bottom of left column */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      padding: "0.85rem 1rem",
                      marginTop: "1.2rem",
                      fontSize: "0.78rem",
                    }}
                  >
                    <div style={{ color: "#aaa", marginBottom: "0.2rem" }}>Selected Appointment:</div>
                    <div style={{ color: "#fff", fontWeight: 600 }}>
                      {selectedDateFormattedSimple} &nbsp;·&nbsp; <span style={{ color: "#e8651c" }}>{selectedSlot}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: STEP 1 (SLOT/DURATION) OR STEP 2 (CONTACT DETAILS) */}
                <div
                  className="modal-right"
                  style={{
                    background: "var(--modal-bg, #faf9f6)",
                    color: "var(--text-primary, #222)",
                    padding: "2.4rem 2.2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {step === "schedule" ? (
                    <div>
                      {/* Step Indicator */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                        <span style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", fontWeight: 600 }}>
                          Step 1 of 2: Time &amp; Duration
                        </span>
                      </div>

                      <h4
                        style={{
                          fontSize: "0.82rem",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          marginBottom: "0.75rem",
                          color: "var(--text-primary, #222)",
                          fontWeight: 600,
                        }}
                      >
                        How long do you need?
                      </h4>
                      <div className="duration-btns" style={{ marginBottom: "1.5rem" }}>
                        {["15 min", "30 min", "1 hour"].map((dur) => (
                          <button
                            key={dur}
                            type="button"
                            className={selectedDuration === dur ? "active" : ""}
                            style={{
                              borderColor: selectedDuration === dur ? "#e8651c" : "var(--border-subtle, #ddd)",
                              background: selectedDuration === dur ? "#e8651c" : "var(--bg-surface, #fff)",
                              color: selectedDuration === dur ? "#fff" : "var(--text-primary, #333)",
                            }}
                            onClick={() => setSelectedDuration(dur)}
                          >
                            {dur}
                          </button>
                        ))}
                      </div>

                      <h4
                        style={{
                          fontSize: "0.82rem",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          marginBottom: "0.4rem",
                          color: "var(--text-primary, #222)",
                          fontWeight: 600,
                        }}
                      >
                        Select a Time Slot
                      </h4>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted, #777)",
                          marginBottom: "0.8rem",
                        }}
                      >
                        {selectedDateFormattedFull}
                      </p>
                      <div
                        className="time-slots"
                        style={{ maxHeight: "170px", overflowY: "auto", paddingRight: "4px" }}
                      >
                        {["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM", "07:30 PM"].map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            style={{
                              borderColor: selectedSlot === slot ? "#e8651c" : "var(--border-subtle, #ddd)",
                              background:
                                selectedSlot === slot ? "rgba(232, 101, 28, 0.15)" : "var(--bg-surface, #fff)",
                              color: selectedSlot === slot ? "#e8651c" : "var(--text-primary, #333)",
                              fontWeight: selectedSlot === slot ? "bold" : "normal",
                            }}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="btn-orange"
                        style={{ width: "100%", marginTop: "1.8rem", justifyContent: "center" }}
                        onClick={() => setStep("contact")}
                      >
                        CONTINUE TO CONTACT DETAILS &nbsp;→
                      </button>
                    </div>
                  ) : (
                    /* STEP 2: CONTACT DETAILS */
                    <form onSubmit={handleSubmit}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
                        <button
                          type="button"
                          onClick={() => setStep("schedule")}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#e8651c",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            padding: 0,
                            fontWeight: 600,
                          }}
                        >
                          <ChevronLeft size={14} /> Back to Schedule
                        </button>
                        <span style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#888" }}>
                          Step 2 of 2
                        </span>
                      </div>

                      <h4 className="serif" style={{ fontSize: "1.35rem", marginBottom: "0.4rem", color: "var(--text-primary, #111)" }}>
                        Your Contact Details
                      </h4>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted, #666)", marginBottom: "1.2rem" }}>
                        We will send your appointment confirmation &amp; connect on WhatsApp/phone within 24 hours.
                      </p>

                      {formError && (
                        <div
                          style={{
                            background: "rgba(232, 101, 28, 0.12)",
                            border: "1px solid #e8651c",
                            color: "#e8651c",
                            padding: "0.6rem 0.8rem",
                            borderRadius: "4px",
                            fontSize: "0.78rem",
                            marginBottom: "1rem",
                          }}
                        >
                          {formError}
                        </div>
                      )}

                      {/* Name Input */}
                      <div style={{ marginBottom: "0.9rem" }}>
                        <label style={{ display: "block", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.3rem", fontWeight: 600 }}>
                          Full Name *
                        </label>
                        <div style={{ position: "relative" }}>
                          <User size={15} style={{ position: "absolute", left: "10px", top: "12px", color: "#888" }} />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rajesh Sharma"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "0.7rem 0.8rem 0.7rem 2.2rem",
                              borderRadius: "4px",
                              border: "1px solid var(--border-subtle, #ddd)",
                              background: "var(--bg-surface, #fff)",
                              color: "var(--text-primary, #111)",
                              fontSize: "0.88rem",
                            }}
                          />
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div style={{ marginBottom: "0.9rem" }}>
                        <label style={{ display: "block", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.3rem", fontWeight: 600 }}>
                          Mobile / WhatsApp Number *
                        </label>
                        <div style={{ position: "relative" }}>
                          <Phone size={15} style={{ position: "absolute", left: "10px", top: "12px", color: "#888" }} />
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "0.7rem 0.8rem 0.7rem 2.2rem",
                              borderRadius: "4px",
                              border: "1px solid var(--border-subtle, #ddd)",
                              background: "var(--bg-surface, #fff)",
                              color: "var(--text-primary, #111)",
                              fontSize: "0.88rem",
                            }}
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div style={{ marginBottom: "0.9rem" }}>
                        <label style={{ display: "block", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.3rem", fontWeight: 600 }}>
                          Email Address (Optional)
                        </label>
                        <div style={{ position: "relative" }}>
                          <Mail size={15} style={{ position: "absolute", left: "10px", top: "12px", color: "#888" }} />
                          <input
                            type="email"
                            placeholder="rajesh@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "0.7rem 0.8rem 0.7rem 2.2rem",
                              borderRadius: "4px",
                              border: "1px solid var(--border-subtle, #ddd)",
                              background: "var(--bg-surface, #fff)",
                              color: "var(--text-primary, #111)",
                              fontSize: "0.88rem",
                            }}
                          />
                        </div>
                      </div>

                      {/* Project Type */}
                      <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.3rem", fontWeight: 600 }}>
                          Project Scope
                        </label>
                        <select
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "0.7rem 0.8rem",
                            borderRadius: "4px",
                            border: "1px solid var(--border-subtle, #ddd)",
                            background: "var(--bg-surface, #fff)",
                            color: "var(--text-primary, #111)",
                            fontSize: "0.85rem",
                          }}
                        >
                          <option value="Luxury Villa / Bungalow">Luxury Villa / Bungalow</option>
                          <option value="3BHK / 4BHK Apartment">3BHK / 4BHK Apartment</option>
                          <option value="Penthouse Renovation">Penthouse Renovation</option>
                          <option value="Commercial Workplace / Office">Commercial Workplace / Office</option>
                          <option value="Kitchen & Living Architecture">Kitchen &amp; Living Architecture</option>
                        </select>
                      </div>

                      {/* Preferred Contact Mode */}
                      <div style={{ marginBottom: "1.2rem" }}>
                        <label style={{ display: "block", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem", fontWeight: 600 }}>
                          Preferred Mode
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                          {[
                            { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
                            { id: "call", label: "Phone Call", icon: Phone },
                            { id: "studio", label: "Studio Visit", icon: Home },
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setContactMode(item.id as any)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.35rem",
                                padding: "0.55rem 0.4rem",
                                borderRadius: "4px",
                                border: contactMode === item.id ? "1px solid #e8651c" : "1px solid var(--border-subtle, #ddd)",
                                background: contactMode === item.id ? "rgba(232, 101, 28, 0.12)" : "var(--bg-surface, #fff)",
                                color: contactMode === item.id ? "#e8651c" : "var(--text-primary, #333)",
                                fontSize: "0.75rem",
                                fontWeight: contactMode === item.id ? 600 : 400,
                                cursor: "pointer",
                              }}
                            >
                              <item.icon size={13} />
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn-orange"
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                        }}
                      >
                        <Send size={15} />
                        <span>SUBMIT REQUEST VIA WHATSAPP &nbsp;→</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
