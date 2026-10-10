"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Gauge, 
  Layers, 
  Palette, 
  Volume2, 
  Shapes, 
  Film, 
  Crop, 
  Clock,
  Sparkles
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── 8 Core Craft Elements (from reference) ──────────────────────────────────
const CRAFT_ELEMENTS = [
  {
    id: "pacing",
    title: "Pacing & Rhythm",
    icon: Gauge,
  },
  {
    id: "transitions",
    title: "Transitions",
    icon: Layers,
  },
  {
    id: "colour",
    title: "Colour Grading",
    icon: Palette,
  },
  {
    id: "sound",
    title: "Sound Design & Sync",
    icon: Volume2,
  },
  {
    id: "motion",
    title: "Motion Graphics & Text FX",
    icon: Shapes,
  },
  {
    id: "storytelling",
    title: "Storytelling",
    icon: Film,
  },
  {
    id: "masking",
    title: "Masking & Compositing",
    icon: Crop,
  },
  {
    id: "speed",
    title: "Speed Ramping",
    icon: Clock,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-fade-up", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 w-full px-6 py-24 md:px-16 lg:px-24 overflow-hidden"
      style={{
        background: "#0B0B0C",
        borderTop: "1px solid rgba(212,175,106,0.10)",
        borderBottom: "1px solid rgba(212,175,106,0.10)",
      }}
    >
      {/* Ambient gold background warmth */}
      <div
        className="absolute top-1/4 -left-48 h-96 w-96 rounded-full pointer-events-none"
        style={{ background: "rgba(212,175,106,0.05)", filter: "blur(120px)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-48 h-96 w-96 rounded-full pointer-events-none"
        style={{ background: "rgba(212,175,106,0.04)", filter: "blur(140px)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        {/* Section Eyebrow & Title */}
        <div className="about-fade-up space-y-3">
          <div
            className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase"
            style={{ color: "#D4AF6A" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#D4AF6A" }} />
            03 // ABOUT
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sand">
            ABOUT
          </h2>
        </div>

        {/* Bio Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Main Story Copy */}
          <div className="lg:col-span-12 space-y-6 text-base sm:text-lg leading-relaxed text-sand/85 font-medium max-w-4xl">
            <p className="about-fade-up text-lg sm:text-xl font-normal text-sand">
              I&apos;m <span className="font-bold text-gold">Vansh</span>, an 11th-grade student from a rural area of Maharashtra with a passion for turning ordinary clips into extraordinary visual experiences.
            </p>

            <p className="about-fade-up">
              My editing journey began in 2024, driven by curiosity, creativity, and a desire to push the limits of what&apos;s possible. Since then, I&apos;ve developed my skills in{" "}
              <strong className="text-sand font-bold">
                3D editing, crazy transitions, cinematic effects, and visually striking edits
              </strong>{" "}
              that bring a whole new level of energy to every project.
            </p>

            <p className="about-fade-up">
              For me, editing isn&apos;t just about putting clips together — it&apos;s about creating an experience, capturing attention, and making every frame count. I&apos;m constantly experimenting with new techniques, refining my craft, and pushing my creative boundaries.
            </p>

            {/* Motto Highlight Banner */}
            <div className="about-fade-up pt-2">
              <div
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,106,0.12) 0%, rgba(212,175,106,0.04) 100%)",
                  border: "1px solid rgba(212,175,106,0.35)",
                  boxShadow: "0 10px 30px -5px rgba(0,0,0,0.60), 0 0 20px rgba(212,175,106,0.10)",
                }}
              >
                <Sparkles className="h-4 w-4 text-gold shrink-0" />
                <span className="font-display font-bold text-sm sm:text-base tracking-wide text-sand">
                  Small-town roots. Big creative vision. No limits.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right-Bottom: Boxed Craft Elements Grid (from reference) ── */}
        <div className="about-fade-up pt-4 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <span className="font-mono text-xs font-semibold tracking-widest text-gold uppercase">
              CORE EDITING DISCIPLINES &amp; WORKFLOW
            </span>
            <span className="font-mono text-[11px] text-sand/50 uppercase tracking-wider hidden sm:inline">
              Hover to inspect craft
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {CRAFT_ELEMENTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  data-cursor="hover"
                  className="white-glint-box group relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-[18px] cursor-pointer select-none transition-all duration-300"
                  style={{
                    background: "linear-gradient(145deg, #161618 0%, #111112 100%)",
                    border: "1px solid rgba(212, 175, 106, 0.18)",
                    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.65)",
                    minHeight: "150px",
                  }}
                >
                  {/* Custom Shape Under Element */}
                  <div
                    className="relative flex items-center justify-center h-12 w-12 rounded-xl mb-3.5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "radial-gradient(circle, rgba(212,175,106,0.20) 0%, rgba(212,175,106,0.06) 70%, transparent 100%)",
                      border: "1px solid rgba(212, 175, 106, 0.32)",
                      boxShadow: "0 0 16px rgba(212, 175, 106, 0.15)",
                    }}
                  >
                    <Icon className="h-6 w-6 text-gold group-hover:text-sand transition-colors duration-300" strokeWidth={1.85} />
                  </div>

                  {/* Title Label in Satoshi Medium/Semibold */}
                  <span className="font-display font-medium text-xs sm:text-sm text-sand text-center leading-snug tracking-wide group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
