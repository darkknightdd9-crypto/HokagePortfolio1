"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type FilterCategory = "ALL" | "NARRATIVE" | "RETENTION";

export interface WorkItem {
  id: string;
  number: string;
  youtubeId: string;
  title: string;
  client: string;
  typeBadge: string;
  category: string;
  filter: FilterCategory;
  stats: string;
  statLabel: string;
  skills: string[];
  summary: string;
  breakdown: {
    objective: string;
    editorRole: string;
    result: string;
  };
}

const WORK_ITEMS: WorkItem[] = [
  {
    id: "w1",
    number: "01",
    youtubeId: "HKrRFabikTE",
    title: "Cold Open Narrative Cut",
    client: "Void Gaming Series",
    typeBadge: "CLIENT COMMISSION",
    category: "High-Retention Opening",
    filter: "RETENTION",
    stats: "74% AVD",
    statLabel: "Audience Retention",
    skills: ["Hook Design", "Pattern Interrupts", "Sound Foley"],
    summary:
      "Engineered an urgent 3-second cold open with motion-vector cuts, eliminating early drop-off and securing a 74% average view duration.",
    breakdown: {
      objective: "Hook viewers within the critical first 5 seconds of a 30-minute gaming lore stream.",
      editorRole: "Full narrative reconstruct, custom sub-bass riser design, dialogue sidechaining, and visual motion-matched cuts.",
      result: "Lifted 30-second hold rate by 28% and maintained audience retention past the mid-point.",
    },
  },
  {
    id: "w2",
    number: "02",
    youtubeId: "2lTTVFvMwSc",
    title: "Pacing & Tension Master",
    client: "Chronicle Lab Episodic",
    typeBadge: "CLIENT COMMISSION",
    category: "Pacing & Dramatic Curve",
    filter: "NARRATIVE",
    stats: "14.8M Views",
    statLabel: "Total Views",
    skills: ["Micro-Cutting", "Spatial Foley", "3D Motion"],
    summary:
      "Surgically cut multi-hour stream captures into high-tension cinema with synchronized audio cues and invisible J/L cuts.",
    breakdown: {
      objective: "Transform raw unedited challenge footage into an episodic cinematic thriller.",
      editorRole: "Rhythmic dead-air removal, custom orchestral tension swells, and isometric 3D subtitle tracks.",
      result: "Generated 14.8M aggregate views across YouTube Shorts and main channel cutdowns.",
    },
  },
  {
    id: "w3",
    number: "03",
    youtubeId: "Hdn-EwlNhpw",
    title: "Hook Arc Viral Short",
    client: "Simulacra Gaming",
    typeBadge: "CREATOR SHOWCASE",
    category: "Short-Form Virality",
    filter: "RETENTION",
    stats: "890K Views",
    statLabel: "Shorts Algorithm",
    skills: ["Kinetic Typography", "A/B Hooks", "Color ACES"],
    summary:
      "Optimized for vertical algorithm favor with frame-accurate kinetic captions, speed-ramped transitions, and punchy sound design.",
    breakdown: {
      objective: "Capture mobile scroll-stopping curiosity on YouTube Shorts and TikTok feeds.",
      editorRole: "Vertical 9:16 reframing, animated kinetic subtitle pack, color contrast grading, and sound impacts.",
      result: "#1 trending creator cut within 48 hours of release with 94% viewer completion.",
    },
  },
];

const FILTER_TABS: { label: string; value: FilterCategory }[] = [
  { label: "ALL EDITS",         value: "ALL" },
  { label: "NARRATIVE CINEMA",  value: "NARRATIVE" },
  { label: "RETENTION HOOKS",   value: "RETENTION" },
];

// ── Pure Video Lightbox — Only the Video, Zero Text ──────────────────────────
function Lightbox({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(boxRef.current, { opacity: 0, scale: 0.94, y: 15 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" });
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = useCallback(() => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose });
    gsap.to(boxRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.2 });
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-lg p-3 sm:p-6"
      onClick={(e) => e.target === overlayRef.current && close()}
      role="dialog"
      aria-modal="true"
      aria-label="Video Player"
    >
      {/* Video Container — Only the video player, zero text */}
      <div
        ref={boxRef}
        className="relative w-full max-w-[420px] aspect-[9/16] max-h-[88vh] rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.98)]"
        style={{
          background: "#000000",
          border: "1px solid rgba(212,175,106,0.35)",
        }}
      >
        {/* Floating Close Button (icon only, zero text) */}
        <button
          onClick={close}
          className="absolute top-3 right-3 z-30 flex items-center justify-center h-10 w-10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            background: "rgba(11,11,12,0.85)",
            border: "1px solid rgba(212,175,106,0.40)",
            backdropFilter: "blur(12px)",
          }}
          aria-label="Close video"
        >
          <X className="h-5 w-5 text-sand hover:text-gold" />
        </button>

        {/* 9:16 Video Player Embed — Automatically plays video in website, zero text */}
        <iframe
          src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    </div>
  );
}

// ── Work Card with Touch-Friendly Play Button & Skills Tags ───────────────────
function WorkCard({ item, onOpen }: { item: WorkItem; onOpen: (i: WorkItem) => void }) {
  return (
    <div
      className="work-card group relative flex flex-col items-center"
      style={{ opacity: 0, transform: "translateY(36px)" }}
    >
      {/* 9:16 Video Container */}
      <div
        onClick={() => onOpen(item)}
        className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl cursor-pointer transition-all duration-400 ease-out group-hover:scale-[1.02] group-hover:-translate-y-1.5"
        style={{
          border: "1px solid rgba(212,175,106,0.18)",
          background: "#131314",
          boxShadow: "0 20px 48px rgba(0,0,0,0.75)",
        }}
        role="button"
        tabIndex={0}
        aria-label={`Open case study for ${item.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(item);
          }
        }}
      >
        {/* Video Thumbnail Poster */}
        <img
          src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
          alt={`${item.title} editing showcase`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Dark Gradient Vignette */}
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,12,0.70) 0%, rgba(11,11,12,0.20) 45%, rgba(11,11,12,0.85) 100%)",
          }}
        />

        {/* Central Play Button — Always discoverable on touch, reactive on desktop */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full transition-all duration-300 group-hover:scale-110 shadow-2xl backdrop-blur-sm"
            style={{
              background: "rgba(212,175,106,0.92)",
              boxShadow: "0 0 30px rgba(212,175,106,0.50)",
            }}
          >
            <Play className="h-5 w-5 ml-0.5 text-black fill-black" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="pointer-events-none absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span
            className="rounded-full px-2.5 py-1 text-[9px] font-mono tracking-wider text-sand backdrop-blur-md"
            style={{ background: "rgba(11,11,12,0.78)", border: "1px solid rgba(237,234,227,0.15)" }}
          >
            EDIT // {item.number}
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider"
            style={{ background: "rgba(212,175,106,0.95)", color: "#0B0B0C" }}
          >
            {item.typeBadge === "CLIENT COMMISSION" ? "CLIENT" : "FEATURED"}
          </span>
        </div>

        {/* Bottom Stats & Skills Badge */}
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider backdrop-blur-md"
            style={{
              background: "rgba(11,11,12,0.85)",
              border: "1px solid rgba(212,175,106,0.30)",
              color: "#D4AF6A",
            }}
          >
            {item.stats}
          </span>
          <span className="font-mono text-[9px] text-sand/60 uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
            TAP TO INSPECT ›
          </span>
        </div>

        {/* Bottom Gold Light Accent */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(90deg, #D4AF6A, #EDD99A, #D4AF6A)" }}
        />
      </div>

      {/* Card Metadata Footer */}
      <div className="mt-3.5 flex flex-col w-full px-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-sm font-bold text-sand group-hover:text-gold transition-colors truncate">
            {item.title}
          </p>
          <span className="font-mono text-[10px] text-gold shrink-0 font-bold">
            {item.client}
          </span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-sand/50">
          {item.category}
        </p>

        {/* Visible Skills Tags */}
        <div className="flex flex-wrap gap-1 pt-1">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-sand/65 border border-white/[0.05]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Featured Work Section ────────────────────────────────────────────────
export default function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("ALL");
  const [lightboxItem, setLightboxItem] = useState<WorkItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = WORK_ITEMS.filter((item) =>
    activeFilter === "ALL" ? true : item.filter === activeFilter
  );

  const animateCards = useCallback(() => {
    const cards = gridRef.current?.querySelectorAll(".work-card");
    if (!cards || !cards.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", clearProps: "transform" }
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: animateCards,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [animateCards]);

  useEffect(() => {
    animateCards();
  }, [activeFilter, animateCards]);

  return (
    <>
      {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}

      <section
        ref={sectionRef}
        id="work"
        className="relative z-10 w-full px-6 py-24 md:px-12 lg:px-20"
        style={{ background: "#0B0B0C", borderTop: "1px solid rgba(212,175,106,0.10)" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div
            className="mb-10 flex flex-col md:flex-row md:items-end justify-between pb-6 gap-4"
            style={{ borderBottom: "1px solid rgba(212,175,106,0.10)" }}
          >
            <div>
              <div
                className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase mb-2"
                style={{ color: "#D4AF6A" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#D4AF6A" }} />
                02 // VERIFIED EDITING SHOWCASE
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-sand">
                Featured Shorts &amp; Cuts
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-sand/60 max-w-sm">
              Real YouTube edits analyzed for retention curves, micro-pacing, and sound foley. Click any cut to inspect case study.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className="rounded-full border px-5 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase transition-all duration-200"
                style={{
                  borderColor: activeFilter === tab.value ? "#D4AF6A" : "rgba(212,175,106,0.18)",
                  background:  activeFilter === tab.value ? "rgba(212,175,106,0.12)" : "rgba(255,255,255,0.02)",
                  color:       activeFilter === tab.value ? "#D4AF6A" : "rgba(237,234,227,0.55)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 items-start"
          >
            {filtered.map((item) => (
              <WorkCard key={item.id} item={item} onOpen={setLightboxItem} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
