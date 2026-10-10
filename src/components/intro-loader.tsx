"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";

interface IntroLoaderProps {
  onComplete?: () => void;
}

// Timeline clip data – Film Noir Gold palette
const CLIPS = [
  { id: 1, label: "COLD OPEN", duration: 18, color: "#D4AF6A", track: 0 },
  { id: 2, label: "HOOK", duration: 12, color: "#EDD99A", track: 0 },
  { id: 3, label: "ACT I", duration: 22, color: "#B8965A", track: 0 },
  { id: 4, label: "SFX LAYER", duration: 28, color: "#8A6030", track: 1 },
  { id: 5, label: "SCORE", duration: 40, color: "#D4AF6A", track: 1 },
  { id: 6, label: "COLOR ACES", duration: 52, color: "#EDD99A", track: 2 },
];

function toTimecode(frames: number): string {
  const fps = 24;
  const totalSecs = Math.floor(frames / fps);
  const f = frames % fps;
  const s = totalSecs % 60;
  const m = Math.floor(totalSecs / 60) % 60;
  const h = Math.floor(totalSecs / 3600);
  return [h, m, s, f]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [isDone, setIsDone] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineBarRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const clipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const frameRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const finish = useCallback(() => {
    document.body.style.overflow = "";
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("hokage_intro_seen", "1");
      } catch {
        /* Ignore storage errors */
      }
    }
    setIsDone(true);
    window.dispatchEvent(new CustomEvent("intro-complete"));
    if (onComplete) onComplete();
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (skipped) return;
    setSkipped(true);
    tlRef.current?.kill();
    cancelAnimationFrame(rafRef.current);

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
        onComplete: finish,
      });
    } else {
      finish();
    }
  }, [skipped, finish]);

  useEffect(() => {
    // If intro already seen in this session or prefers-reduced-motion, finish immediately
    if (typeof window !== "undefined") {
      const alreadySeen = sessionStorage.getItem("hokage_intro_seen") === "1";
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (alreadySeen || prefersReducedMotion) {
        finish();
        return;
      }
    }

    document.body.style.overflow = "hidden";

    // Keyboard shortcut Escape to skip
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleSkip();
    };
    window.addEventListener("keydown", onKeyDown);

    // Fast, crisp timecode counter (~1.3s total)
    const TOTAL_FRAMES = 32;
    let startTime: number | null = null;

    const tickTimecode = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / 1300, 1);
      frameRef.current = Math.floor(progress * TOTAL_FRAMES);
      if (timecodeRef.current) {
        timecodeRef.current.textContent = toTimecode(frameRef.current);
      }
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tickTimecode);
      }
    };
    rafRef.current = requestAnimationFrame(tickTimecode);

    // Master GSAP timeline — streamlined to 1.35s
    const tl = gsap.timeline({ onComplete: finish });
    tlRef.current = tl;

    gsap.set(clipRefs.current, { scaleX: 0, transformOrigin: "left center", opacity: 0 });
    gsap.set(playheadRef.current, { left: "0%", opacity: 0 });
    gsap.set(wordmarkRef.current, { opacity: 0, y: 6 });

    // 1. Clips snap in rapidly
    clipRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.to(
        el,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.12,
          ease: "power3.out",
        },
        i * 0.06
      );
    });

    // 2. Playhead sweeps across
    tl.fromTo(
      playheadRef.current,
      { left: "0%", opacity: 1 },
      { left: "100%", opacity: 1, duration: 0.85, ease: "power1.inOut" },
      0.08
    );

    // 3. Wordmark clean reveal
    tl.to(
      wordmarkRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.28,
        ease: "power2.out",
      },
      0.45
    );

    // 4. Smooth curtain dissolve into Hero
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        y: -12,
        duration: 0.35,
        ease: "power2.inOut",
      },
      1.15
    );

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      tl.kill();
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, [finish, handleSkip]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Hokage Introduction Animation"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0B0B0C] overflow-hidden will-change-transform"
    >
      {/* Skip button — clearly accessible */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-6 z-10 font-mono text-xs tracking-widest text-sand/60 hover:text-gold transition-colors uppercase px-3 py-1.5 rounded-full border border-gold/20 hover:border-gold/50 bg-[#131314]/80 backdrop-blur-sm"
        aria-label="Skip introduction animation"
      >
        SKIP [ESC] ›
      </button>

      {/* ── VIDEO EDITOR UI SHELL ── */}
      <div className="w-full max-w-3xl px-6 sm:px-10 space-y-5">

        {/* Top bar: program monitor mock */}
        <div className="flex items-center justify-between text-[10px] font-mono text-sand/40 tracking-widest uppercase mb-1">
          <span>SEQUENCE_01 // TIMELINE</span>
          <span
            ref={timecodeRef}
            className="tabular-nums text-gold font-bold tracking-widest"
          >
            00:00:00:00
          </span>
          <span>24 FPS // 4K PRORES</span>
        </div>

        {/* Track labels + clip lanes */}
        <div ref={timelineBarRef} className="relative space-y-1.5">

          {/* Track rows */}
          {[0, 1, 2].map((trackIndex) => {
            const trackLabels = ["V1 – VIDEO", "A1 – AUDIO", "FX – COLOR"];
            const trackClips = CLIPS.filter((c) => c.track === trackIndex);

            let offsetPercent = 0;
            const clipLayout: { clip: typeof CLIPS[0]; left: number; width: number }[] = [];
            const totalDuration = trackClips.reduce((s, c) => s + c.duration, 0);

            trackClips.forEach((clip) => {
              const width = (clip.duration / (totalDuration || 1)) * 100;
              clipLayout.push({ clip, left: offsetPercent, width });
              offsetPercent += width;
            });

            return (
              <div key={trackIndex} className="flex items-center gap-2">
                <span className="w-20 shrink-0 text-right font-mono text-[9px] tracking-widest text-sand/40 uppercase">
                  {trackLabels[trackIndex]}
                </span>

                <div className="relative flex-1 h-8 sm:h-9 bg-white/[0.03] rounded border border-white/[0.06] overflow-hidden">
                  {clipLayout.map(({ clip, left, width }) => (
                    <div
                      key={clip.id}
                      ref={(el) => {
                        const globalIdx = CLIPS.findIndex((c) => c.id === clip.id);
                        clipRefs.current[globalIdx] = el;
                      }}
                      className="absolute top-0.5 bottom-0.5 rounded-sm flex items-center px-2 overflow-hidden shadow-sm"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        backgroundColor: clip.color,
                        opacity: 0.92,
                        borderLeft: `2px solid rgba(255,255,255,0.4)`,
                      }}
                    >
                      <span className="font-mono text-[8px] font-bold text-black/80 uppercase truncate tracking-wider">
                        {clip.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Playhead */}
          <div
            ref={playheadRef}
            className="absolute top-0 bottom-0 w-px bg-gold opacity-0 pointer-events-none"
            style={{ left: "0%", marginLeft: "80px" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-gold shadow-[0_0_10px_rgba(212,175,106,0.9)]" />
          </div>
        </div>

        {/* Timecode ruler ticks */}
        <div className="flex justify-between ml-[88px] text-[8px] font-mono text-sand/30 select-none">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i}>{String(i * 3).padStart(2, "0")}s</span>
          ))}
        </div>

        {/* ── HOKAGE Wordmark ── */}
        <div
          ref={wordmarkRef}
          className="mt-6 text-center font-display font-black tracking-tight text-sand text-5xl sm:text-7xl leading-none select-none opacity-0"
          style={{ textShadow: "0 0 35px rgba(212,175,106,0.30)" }}
        >
          HOKAGE<span className="text-gold">.</span>
        </div>

        <p className="text-center font-mono text-[10px] tracking-widest text-sand/50 uppercase mt-2">
          CINEMATIC VIDEO EDITOR
        </p>
      </div>
    </div>
  );
}
