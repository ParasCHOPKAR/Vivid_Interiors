"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoItem {
  src: string;
  label: string;
}

const HERO_VIDEOS: VideoItem[] = [
  {
    src: "/video/Make_manual_room_video_65319ef5_1080p_gwr_video_mvp.mp4",
    label: "Manual Room Design",
  },
  {
    src: "/video/Create_non_AI_video_6edf5a02_1080p_gwr_video_mvp.mp4",
    label: "Living & Architecture",
  },
];

interface HeroVideoPlayerProps {
  poster?: string;
}

export default function HeroVideoPlayer({
  poster = "/images/hero_img_01.png",
}: HeroVideoPlayerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const transitioningRef = useRef(false);

  const video0Ref = useRef<HTMLVideoElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);

  const getVideoRef = (index: number) => (index === 0 ? video0Ref : video1Ref);

  // Transition to specific video index with smooth crossfade
  const switchVideo = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex && hasStarted) return;
      transitioningRef.current = true;

      const currentVideo = getVideoRef(activeIndex).current;
      const nextVideo = getVideoRef(targetIndex).current;

      if (nextVideo) {
        nextVideo.currentTime = 0;
        const playPromise = nextVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browser autoplay policy fallback
          });
        }
      }

      setActiveIndex(targetIndex);
      setProgress(0);

      // Allow transition to complete
      setTimeout(() => {
        if (currentVideo && currentVideo !== nextVideo) {
          currentVideo.pause();
        }
        transitioningRef.current = false;
      }, 1200);
    },
    [activeIndex, hasStarted]
  );

  // Initial autoplay on mount
  useEffect(() => {
    const firstVid = video0Ref.current;
    if (firstVid) {
      firstVid.currentTime = 0;
      const p = firstVid.play();
      if (p !== undefined) {
        p.then(() => setHasStarted(true)).catch(() => {
          // Autoplay was prevented; still marked as initialized
          setHasStarted(true);
        });
      }
    }
  }, []);

  // Timeupdate handler for active video: updates progress & crossfades before video ends
  const handleTimeUpdate = (index: number) => {
    if (index !== activeIndex) return;
    const vid = getVideoRef(index).current;
    if (!vid || !vid.duration) return;

    const current = vid.currentTime;
    const dur = vid.duration;
    setProgress((current / dur) * 100);

    // Crossfade trigger: 0.8s before the video reaches the end
    if (dur > 0 && dur - current <= 0.8 && !transitioningRef.current) {
      const nextIndex = (index + 1) % HERO_VIDEOS.length;
      switchVideo(nextIndex);
    }
  };

  // Fallback onEnded handler
  const handleEnded = (index: number) => {
    if (index === activeIndex && !transitioningRef.current) {
      const nextIndex = (index + 1) % HERO_VIDEOS.length;
      switchVideo(nextIndex);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* ─── VIDEO 1 ─── */}
      <video
        ref={video0Ref}
        src={HERO_VIDEOS[0].src}
        poster={poster}
        muted
        playsInline
        autoPlay
        preload="auto"
        onTimeUpdate={() => handleTimeUpdate(0)}
        onEnded={() => handleEnded(0)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: activeIndex === 0 ? 2 : 1,
          opacity: activeIndex === 0 ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity",
        }}
      />

      {/* ─── VIDEO 2 ─── */}
      <video
        ref={video1Ref}
        src={HERO_VIDEOS[1].src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={() => handleTimeUpdate(1)}
        onEnded={() => handleEnded(1)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: activeIndex === 1 ? 2 : 1,
          opacity: activeIndex === 1 ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity",
        }}
      />

      {/* ─── SCENE SWITCHER INDICATOR (Bottom Right) ─── */}
      <div
        className="scene-switcher-indicator"
        style={{
          position: "absolute",
          bottom: "38px",
          right: "8%",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
          background: "rgba(12, 12, 12, 0.65)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "0.55rem 1.1rem",
          borderRadius: "2px",
        }}
      >
        <span
          style={{
            fontSize: "0.64rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.5)",
            fontWeight: 500,
          }}
        >
          Scene
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {HERO_VIDEOS.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={item.src}
                onClick={() => switchVideo(idx)}
                aria-label={`Switch to ${item.label}`}
                title={item.label}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.2rem 0",
                  color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
                  transition: "color 0.3s ease",
                }}
              >
                <span
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "1.5px",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#e8651c" : "inherit",
                  }}
                >
                  0{idx + 1}
                </span>

                {/* Micro progress bar for the active video */}
                <div
                  style={{
                    width: "32px",
                    height: "2px",
                    background: "rgba(255, 255, 255, 0.18)",
                    borderRadius: "1px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                      width: isActive ? `${progress}%` : "0%",
                      background: "#e8651c",
                      transition: "width 0.15s linear",
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

