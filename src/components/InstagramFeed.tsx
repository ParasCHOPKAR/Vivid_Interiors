"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Heart,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  X,
  Share2,
  ExternalLink,
} from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "./SocialIcons";
import { LetterRoll, Reveal } from "./SharedUI";

interface ReelItem {
  id: string;
  title: string;
  caption: string;
  videoSrc: string;
  poster: string;
  tag: string;
  likes: string;
  views: string;
  comments: string;
  duration: string;
  instaUrl: string;
}

const reels: ReelItem[] = [
  {
    id: "reel-1",
    title: "Double-Height Living Architecture Walkthrough",
    caption:
      "Full site handover in Model Colony Pune. Double-height fluted oak panelling, 2700K warm channels, and bespoke bookmatched Italian marble. #VividInteriors #PuneArchitects",
    videoSrc: "/video/Make_manual_room_video_65319ef5_1080p_gwr_video_mvp.mp4",
    poster: "/images/project_villa.jpg",
    tag: "Model Colony, Pune",
    likes: "1.2k",
    views: "24.5k",
    comments: "84",
    duration: "0:28",
    instaUrl: "https://www.instagram.com/vivid_interiors_developers/reels/",
  },
  {
    id: "reel-2",
    title: "Turnkey Civil Joinery & Lighting Detail Execution",
    caption:
      "Crafting perfection at our Erandwane studio workshop — precision factory joinery, zero-kickback vendor procurement, and direct architect supervision. #TurnkeyPune",
    videoSrc: "/video/Create_non_AI_video_6edf5a02_1080p_gwr_video_mvp.mp4",
    poster: "/images/service_kitchen.jpg",
    tag: "Studio Workshop, Pune",
    likes: "892",
    views: "18.3k",
    comments: "56",
    duration: "0:25",
    instaUrl: "https://www.instagram.com/vivid_interiors_developers/reels/",
  },
  {
    id: "reel-3",
    title: "Bespoke Quartzite Island & German Tandem Storage",
    caption:
      "Behind the scenes of our latest chef's kitchen handover in Kothrud. German soft-close tandem hardware with continuous quartzite waterfall grains. #LuxuryKitchens",
    videoSrc: "/video/Make_manual_room_video_65319ef5_1080p_gwr_video_mvp.mp4",
    poster: "/images/craft_macro_detail.jpg",
    tag: "Kothrud, Pune",
    likes: "1.5k",
    views: "32.1k",
    comments: "112",
    duration: "0:30",
    instaUrl: "https://www.instagram.com/vivid_interiors_developers/reels/",
  },
  {
    id: "reel-4",
    title: "Commercial Workplace Acoustic Slats & Diffusers",
    caption:
      "Executive boardroom in Baner. Custom acoustic timber fluting, concealed linear climate diffusers, and 12-seater quartzite conference table. #CommercialInteriors",
    videoSrc: "/video/Create_non_AI_video_6edf5a02_1080p_gwr_video_mvp.mp4",
    poster: "/images/service_commercial.jpg",
    tag: "Baner, Pune",
    likes: "740",
    views: "14.2k",
    comments: "39",
    duration: "0:22",
    instaUrl: "https://www.instagram.com/vivid_interiors_developers/reels/",
  },
  {
    id: "reel-5",
    title: "Minimalist Master Sanctuary with Custom Fluting",
    caption:
      "A serene master bedroom suite in Wakad with floor-to-ceiling wardrobe joinery, ambient warm backlighting, and acoustic upholstered headboard. #MinimalistInteriors",
    videoSrc: "/video/Make_manual_room_video_65319ef5_1080p_gwr_video_mvp.mp4",
    poster: "/images/service_bedroom.jpg",
    tag: "Wakad, Pune",
    likes: "1.1k",
    views: "21.8k",
    comments: "72",
    duration: "0:27",
    instaUrl: "https://www.instagram.com/vivid_interiors_developers/reels/",
  },
  {
    id: "reel-6",
    title: "Architect Site Supervision & Milestone Handover",
    caption:
      "Milestone inspection with our Senior Architect at Nal Stop Pune. Ensuring millimeter accuracy and zero vendor compromises before client handover. #VividPune",
    videoSrc: "/video/Create_non_AI_video_6edf5a02_1080p_gwr_video_mvp.mp4",
    poster: "/images/locations_studio.jpg",
    tag: "Erandwane, Pune",
    likes: "960",
    views: "19.7k",
    comments: "64",
    duration: "0:24",
    instaUrl: "https://www.instagram.com/vivid_interiors_developers/reels/",
  },
];

export default function InstagramFeed() {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const handleOpenReel = (reel: ReelItem) => {
    setActiveReel(reel);
    setIsPlaying(true);
    setIsMuted(false);
  };

  const handleCloseReel = () => {
    setActiveReel(null);
  };

  const togglePlay = () => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        modalVideoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      style={{
        padding: "8rem 8%",
        background: "var(--bg-dark-section, #0a0a0a)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
      id="instagram-reels"
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        {/* Header */}
        <Reveal>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "3rem",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" }}>
                <InstagramIcon size={18} color="#e8651c" />
                <span
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#e8651c",
                    fontWeight: 600,
                  }}
                >
                  [ Instagram Videos &amp; Reels ]
                </span>
              </div>

              <h2
                className="serif"
                style={{
                  fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                  fontWeight: 400,
                  lineHeight: 1.12,
                  color: "#fff",
                  marginBottom: "0.8rem",
                }}
              >
                Watch Our Craft in Motion
              </h2>

              <p style={{ color: "#aaa", fontSize: "1rem", maxWidth: "620px", lineHeight: 1.7, margin: 0 }}>
                Directly from our official Instagram{" "}
                <a
                  href="https://www.instagram.com/vivid_interiors_developers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#e8651c", textDecoration: "none", fontWeight: 600 }}
                >
                  @vivid_interiors_developers
                </a>
                . Watch real site walkthroughs, joinery craftsmanship, and living room handovers across Pune.
              </p>
            </div>

            {/* Social CTAs */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="https://www.instagram.com/vivid_interiors_developers/reels/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.95rem 1.8rem",
                  fontSize: "0.75rem",
                  letterSpacing: "1.5px",
                  textDecoration: "none",
                  borderRadius: "4px",
                  background: "rgba(232, 101, 28, 0.12)",
                  border: "1px solid #e8651c",
                  color: "#e8651c",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                }}
              >
                <InstagramIcon size={16} color="#e8651c" />
                <span>Browse All Reels ↗</span>
              </a>

              <a
                href="https://www.instagram.com/vivid_interiors_developers/"
                target="_blank"
                rel="noopener noreferrer"
                className="forge-shimmer-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.95rem 2rem",
                  fontSize: "0.75rem",
                  letterSpacing: "1.5px",
                  textDecoration: "none",
                }}
              >
                <InstagramIcon size={16} />
                <LetterRoll text="FOLLOW ON INSTAGRAM" />
                <ArrowUpRight size={14} />
              </a>

              <a
                href="https://www.youtube.com/channel/UCeGNUunmmJuyLsbioeN31-g"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.95rem 1.6rem",
                  fontSize: "0.75rem",
                  letterSpacing: "1.5px",
                  textDecoration: "none",
                  borderRadius: "4px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                <YoutubeIcon size={16} color="#ff0000" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* ═══════════════ PROFILE CALLOUT BANNER ═══════════════ */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "1.2rem 2rem",
            marginBottom: "3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "#111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                }}
              >
                V
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <a
                  href="https://www.instagram.com/vivid_interiors_developers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "1rem" }}
                >
                  vivid_interiors_developers
                </a>
                <span style={{ color: "#e8651c", fontSize: "0.85rem" }}>✓</span>
              </div>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#888" }}>
                Vivid Interiors &amp; Developers Pune · 190+ Completed Sites · Nal Stop Chowk, Karve Road, Erandwane
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.8rem" }}>
            <a
              href="https://www.instagram.com/vivid_interiors_developers/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.75rem",
                color: "#e8651c",
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <span>Visit Profile</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* ═══════════════ REELS VIDEO GRID ═══════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.8rem",
          }}
        >
          {reels.map((reel, idx) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: idx * 0.08 }}
              style={{
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                aspectRatio: "9 / 14",
                background: "#141414",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              }}
              whileHover="hover"
            >
              {/* Background Video with Loop (plays on hover / muted preview) */}
              <video
                src={reel.videoSrc}
                poster={reel.poster}
                loop
                muted
                playsInline
                autoPlay
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                }}
                className="reel-card-video"
              />

              {/* Gradient Scrim */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.65) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Top Header inside Reel Card */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  right: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.3rem 0.65rem",
                    borderRadius: "999px",
                    background: "rgba(0,0,0,0.7)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "0.68rem",
                    color: "#fff",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  <InstagramIcon size={12} color="#e8651c" />
                  <span>Reel · {reel.duration}</span>
                </div>

                <a
                  href={reel.instaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Open on Instagram"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.7)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  className="insta-direct-link"
                >
                  <ExternalLink size={13} color="#e8651c" />
                </a>
              </div>

              {/* Center Play Button (opens player modal) */}
              <button
                type="button"
                onClick={() => handleOpenReel(reel)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(232, 101, 28, 0.9)",
                  border: "none",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 25px rgba(232,101,28,0.5)",
                  zIndex: 3,
                  cursor: "pointer",
                  transition: "transform 0.3s ease, background 0.3s ease",
                }}
                className="center-play-btn"
                aria-label={`Play ${reel.title}`}
              >
                <Play size={22} fill="#fff" style={{ marginLeft: "3px" }} />
              </button>

              {/* Bottom Content inside Reel Card */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  right: "16px",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "#e8651c",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: "0.3rem",
                  }}
                >
                  {reel.tag}
                </span>

                <h3
                  className="serif"
                  style={{
                    fontSize: "1.15rem",
                    color: "#fff",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    marginBottom: "0.6rem",
                  }}
                >
                  {reel.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "#ccc",
                    lineHeight: 1.45,
                    margin: "0 0 0.8rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {reel.caption}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.6rem",
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    fontSize: "0.75rem",
                    color: "#aaa",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleOpenReel(reel)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#e8651c",
                      fontWeight: 600,
                      fontSize: "0.72rem",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <span>PLAY REEL</span>
                    <Play size={10} fill="#e8651c" />
                  </button>

                  <a
                    href={reel.instaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      color: "#aaa",
                      textDecoration: "none",
                      fontSize: "0.72rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <span>Instagram</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════ LIGHTBOX REEL POPUP ═══════════════ */}
        <AnimatePresence>
          {activeReel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseReel}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.92)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 4000,
                padding: "1.5rem",
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "920px",
                  height: "85vh",
                  maxHeight: "720px",
                  background: "#111",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.9)",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseReel}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                  aria-label="Close reel player"
                >
                  <X size={18} />
                </button>

                {/* Left: Video Player */}
                <div style={{ position: "relative", background: "#000", height: "100%", overflow: "hidden" }}>
                  <video
                    ref={modalVideoRef}
                    src={activeReel.videoSrc}
                    autoPlay
                    loop
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  {/* Player Controls Bar */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "16px",
                      right: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "rgba(0,0,0,0.65)",
                      backdropFilter: "blur(8px)",
                      padding: "0.5rem 1rem",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                      <button
                        type="button"
                        onClick={togglePlay}
                        style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex", padding: 0 }}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} fill="#fff" />}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex", padding: 0 }}
                      >
                        {isMuted ? <VolumeX size={18} color="#e8651c" /> : <Volume2 size={18} />}
                      </button>
                    </div>

                    <span style={{ fontSize: "0.72rem", color: "#ccc", letterSpacing: "1px" }}>
                      {activeReel.duration} · High-Res Walkthrough
                    </span>
                  </div>
                </div>

                {/* Right: Instagram Post Meta & Discussion */}
                <div
                  style={{
                    padding: "2.5rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#111",
                    color: "#fff",
                    overflowY: "auto",
                  }}
                >
                  <div>
                    {/* Channel Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.4rem" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "50%",
                          background: "#e8651c",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                        }}
                      >
                        V
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.92rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <a
                            href="https://www.instagram.com/vivid_interiors_developers/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#fff", textDecoration: "none" }}
                          >
                            vivid_interiors_developers
                          </a>
                          <span style={{ color: "#e8651c" }}>✦</span>
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#888" }}>
                          Vivid Interiors · Nal Stop Chowk, Pune
                        </span>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: "0.72rem",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "#e8651c",
                        fontWeight: 600,
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {activeReel.tag}
                    </span>

                    <h3 className="serif" style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.25 }}>
                      {activeReel.title}
                    </h3>

                    <p style={{ fontSize: "0.88rem", color: "#ccc", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                      {activeReel.caption}
                    </p>

                    {/* Stats pills */}
                    <div style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.5rem" }}>
                      <div>
                        <span style={{ display: "block", fontSize: "0.7rem", color: "#888", textTransform: "uppercase" }}>Total Plays</span>
                        <strong style={{ fontSize: "1.1rem", color: "#fff" }}>{activeReel.views}</strong>
                      </div>
                      <div>
                        <span style={{ display: "block", fontSize: "0.7rem", color: "#888", textTransform: "uppercase" }}>Likes</span>
                        <strong style={{ fontSize: "1.1rem", color: "#e8651c" }}>{activeReel.likes}</strong>
                      </div>
                      <div>
                        <span style={{ display: "block", fontSize: "0.7rem", color: "#888", textTransform: "uppercase" }}>Comments</span>
                        <strong style={{ fontSize: "1.1rem", color: "#fff" }}>{activeReel.comments}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    <a
                      href={activeReel.instaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="forge-shimmer-btn"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.6rem",
                        padding: "0.9rem",
                        textDecoration: "none",
                        fontSize: "0.75rem",
                      }}
                    >
                      <InstagramIcon size={16} />
                      <span>OPEN REEL ON INSTAGRAM (@vivid_interiors_developers)</span>
                      <ExternalLink size={13} />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        handleCloseReel();
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(new CustomEvent("open-consultation"));
                        }
                      }}
                      style={{
                        padding: "0.85rem",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        color: "#fff",
                        borderRadius: "4px",
                        fontSize: "0.72rem",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      BOOK THIS ARCHITECTURAL STYLE &nbsp;→
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          .reel-card-video {
            filter: brightness(0.9);
          }
          div[style*="aspect-ratio"]:hover .reel-card-video {
            transform: scale(1.05);
            filter: brightness(1);
          }
          div[style*="aspect-ratio"]:hover .center-play-btn {
            transform: translate(-50%, -50%) scale(1.15);
            background: #e8651c;
          }
          .insta-direct-link:hover {
            background: #e8651c !important;
            border-color: #e8651c !important;
            transform: scale(1.1);
          }
          .insta-direct-link:hover svg {
            color: #fff !important;
          }
        `}</style>
      </div>
    </section>
  );
}
