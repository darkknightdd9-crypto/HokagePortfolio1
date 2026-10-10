"use client";

import { useState } from "react";
import { Sparkles, Layers, Volume2, Target, Palette, Box, ArrowRight } from "lucide-react";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  clientBenefit: string;
  description: string;
  tools: string[];
  deliverables: string[];
  icon: typeof Layers;
}

const servicesData: ServiceItem[] = [
  {
    id: "narrative-editing",
    number: "01",
    title: "NARRATIVE EDITING & PACING",
    clientBenefit: "Keep viewers hooked past the 30-minute mark with zero dead air",
    description:
      "Crafting dramatic narrative arcs from raw multi-hour stream captures. Every micro-lull is eliminated, tension curves are sculpted, and seamless split-edits keep audiences watching to the end.",
    tools: ["Adobe Premiere Pro", "DaVinci Studio", "Pacing Algorithms"],
    deliverables: ["Full Narrative Master Cut", "Social Teaser Cuts", "Timecoded Re-edit Passes"],
    icon: Layers,
  },
  {
    id: "sound-design",
    number: "02",
    title: "CINEMATIC SOUND DESIGN & FOLEY",
    clientBenefit: "Immersive audio layers that make every cut and climax feel visceral",
    description:
      "Rebuilding video audio from scratch with spatial in-game foley, visceral sub-bass drops, custom environment ambience, and dynamic orchestral swells that deliver emotional goosebumps.",
    tools: ["FL Studio", "FabFilter Pro", "iZotope RX", "Cinematic Soundbanks"],
    deliverables: ["Bespoke Audio Mix", "Mastered 5.1 & Stereo Stem Pack", "SFX Cue Sheets"],
    icon: Volume2,
  },
  {
    id: "retention-engineering",
    number: "03",
    title: "RETENTION HOOK ARCHITECTURE",
    clientBenefit: "Stronger openings that double your first 30-second hold rate",
    description:
      "Engineering visceral cold opens, psychological curiosity loops, and high-frequency pattern interrupts that prevent viewer drop-off and maximize YouTube algorithmic recommendations.",
    tools: ["Retention Graph Analytics", "Pattern Interrupt Frameworks"],
    deliverables: ["Alternative Hook Variations", "Cold Open Polish", "A/B Retention Strategy"],
    icon: Target,
  },
  {
    id: "color-grading",
    number: "04",
    title: "COLOR GRADING & ATMOSPHERE",
    clientBenefit: "A signature cinematic film look that elevates raw gameplay to cinema",
    description:
      "Transforming flat in-game captures into rich atmospheric film prints with custom highlight roll-off, moody blacks, and rich amber contrast grades in ACES color management.",
    tools: ["DaVinci Resolve", "ACES Color Pipeline", "Custom Film LUTs"],
    deliverables: ["Finished Color Master", "Custom Show LUT", "Dynamic Scene Profiles"],
    icon: Palette,
  },
  {
    id: "motion-3d",
    number: "05",
    title: "MOTION GRAPHICS & 3D BLENDER",
    clientBenefit: "Animated captions, kinetic subtitles, and 3D overlays that drive clarity",
    description:
      "Seamlessly integrating isometric 3D camera sweeps, dynamic world maps, kinetic subtitle typography, and smooth UI overlays to maintain high visual pacing.",
    tools: ["Blender 3D", "After Effects", "Cinema 4D"],
    deliverables: ["3D Map Explanations", "Kinetic Subtitle Pack", "Lower Thirds"],
    icon: Box,
  },
  {
    id: "channel-packaging",
    number: "06",
    title: "FULL EPISODE PACKAGING",
    clientBenefit: "End-to-end synergy between thumbnail promise and first-second hook",
    description:
      "Aligning the master narrative cut directly with the thumbnail promise and title curiosity loop to guarantee maximum CTR-to-AVD conversion and recurring subscriber growth.",
    tools: ["Thumbnail Synergy", "A/B Title Matching", "End Screen Flow"],
    deliverables: ["Optimized Upload Package", "Thumbnail Screen Captures", "Metadata Tags"],
    icon: Sparkles,
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState<ServiceItem>(servicesData[0]);

  return (
    <section
      id="services"
      className="relative z-10 w-full px-6 py-24 md:px-16 lg:px-24"
      style={{ background: "#0B0B0C" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between pb-8 gap-6"
          style={{ borderBottom: "1px solid rgba(212,175,106,0.12)" }}
        >
          <div>
            <div
              className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase mb-3"
              style={{ color: "#D4AF6A" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#D4AF6A" }} />
              04 // CAPABILITIES &amp; SERVICES
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sand">
              EDITING DISCIPLINES
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base leading-relaxed text-sand/75">
            Every discipline calibrated to bridge creative storytelling and ruthless algorithmic retention.
          </p>
        </div>

        {/* Layout: Left Bars + Right Inspection Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left Bars — square-type elements with hover glint */}
          <div className="lg:col-span-7 space-y-3.5">
            {servicesData.map((service) => {
              const isSelected = activeService.id === service.id;
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  data-cursor="hover"
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`Select service: ${service.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveService(service);
                    }
                  }}
                  onMouseEnter={() => setActiveService(service)}
                  onClick={() => setActiveService(service)}
                  className={`glint-box group relative flex items-center justify-between py-5 px-5 sm:px-7 rounded-xl cursor-pointer transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold ${
                    isSelected ? "border-gold/60" : "border-white/[0.06] hover:border-gold/40"
                  }`}
                  style={{
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(212,175,106,0.09) 0%, rgba(19,19,20,0.90) 100%)"
                      : "rgba(19,19,20,0.65)",
                    border: isSelected
                      ? "1px solid rgba(212,175,106,0.55)"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Left indicator accent */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full transition-all duration-300"
                    style={{
                      background: "#D4AF6A",
                      opacity: isSelected ? 1 : 0,
                    }}
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className="font-mono text-xs sm:text-sm font-semibold transition-colors duration-300"
                      style={{ color: isSelected ? "#D4AF6A" : "rgba(237,234,227,0.45)" }}
                    >
                      {service.number}
                    </span>
                    <div className="flex items-center gap-3.5">
                      <Icon
                        className="h-5 w-5 hidden sm:block transition-colors duration-300"
                        style={{ color: isSelected ? "#D4AF6A" : "rgba(237,234,227,0.40)" }}
                      />
                      <div>
                        <h3
                          className={`font-display text-base sm:text-lg md:text-xl transition-all duration-300 ${
                            isSelected ? "font-bold text-sand" : "font-medium text-sand/75 group-hover:text-sand"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p className="font-sans text-xs text-sand/55 line-clamp-1 mt-0.5">
                          {service.clientBenefit}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className="h-4 w-4 transition-all duration-300 shrink-0 ml-3"
                    style={{
                      color: "#D4AF6A",
                      opacity: isSelected ? 1 : 0.35,
                      transform: isSelected ? "translateX(4px)" : "none",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Inspection Board — square shape with hover glint */}
          <div
            className="glint-box lg:col-span-5 sticky top-28 sm:top-32 p-7 sm:p-8 transition-all duration-400 rounded-2xl"
            style={{
              background:   "#131314",
              border:       "1px solid rgba(212,175,106,0.22)",
              boxShadow:    "0 25px 50px -12px rgba(0,0,0,0.85)",
            }}
          >
            <div
              className="flex items-center justify-between pb-4 mb-6"
              style={{ borderBottom: "1px solid rgba(212,175,106,0.12)" }}
            >
              <div className="flex items-center gap-2 font-mono text-xs font-semibold" style={{ color: "#D4AF6A" }}>
                <span
                  className="h-2 w-2 rounded-full animate-ping"
                  style={{ background: "#D4AF6A" }}
                />
                SERVICE SPEC // {activeService.number}
              </div>
              <span className="font-mono text-[11px] font-bold" style={{ color: "#EDD99A" }}>
                STUDIO PRODUCTION
              </span>
            </div>

            <h4 className="font-display text-2xl font-bold text-sand">
              {activeService.title}
            </h4>
            <p className="mt-2 text-xs font-mono uppercase tracking-wider text-gold font-semibold">
              {activeService.clientBenefit}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-sand/80">
              {activeService.description}
            </p>

            {/* Deliverables */}
            <div className="mt-6 pt-5 space-y-3" style={{ borderTop: "1px solid rgba(212,175,106,0.10)" }}>
              <span className="font-mono text-[11px] uppercase tracking-widest text-sand/60 font-semibold">
                CORE DELIVERABLES
              </span>
              <ul className="space-y-2">
                {activeService.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-mono text-sand/90">
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#D4AF6A" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="mt-5 pt-4 flex flex-wrap gap-2" style={{ borderTop: "1px solid rgba(212,175,106,0.10)" }}>
              {activeService.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded px-2.5 py-1 font-mono text-[10px] text-sand/75"
                  style={{
                    background: "#0B0B0C",
                    border: "1px solid rgba(212,175,106,0.16)",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Direct Scope Action */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono text-sand/55">Need this discipline?</span>
              <a
                href="#contact"
                className="font-mono text-xs font-bold text-gold hover:text-sand transition-colors"
              >
                BOOK THIS SERVICE ›
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
