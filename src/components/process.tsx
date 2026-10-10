"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Scissors, Sliders, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Step {
  step: string;
  phase: string;
  title: string;
  description: string;
  checklist: string[];
  icon: typeof Scissors;
}

const steps: Step[] = [
  {
    step: "01",
    phase: "PHASE 01 // ARCHITECTURE",
    title: "THE INGEST & TENSION CURVE",
    description:
      "Cataloging raw footage, transcribing key story moments, and mapping a dynamic emotional tension graph to identify climax points and retention pitfalls.",
    checklist: [
      "Footage metadata tagging & sync",
      "Narrative 3-act story outline",
      "Cold open hook construction",
    ],
    icon: Eye,
  },
  {
    step: "02",
    phase: "PHASE 02 // SURGERY",
    title: "RHYTHMIC MICRO-CUTTING",
    description:
      "Eliminating dead air, stammers, and pacing drags with surgical precision. Cuts timed to visual motion vectors for invisible transitions.",
    checklist: [
      "Dead air & verbal clutter removal",
      "Motion-matched cut continuity",
      "Dynamic split-edits & J/L cuts",
    ],
    icon: Scissors,
  },
  {
    step: "03",
    phase: "PHASE 03 // ATMOSPHERE",
    title: "SPATIAL SOUND IMMERSION",
    description:
      "Rebuilding game audio from scratch with cinematic foley, spatial footsteps, visceral bass drops, and custom orchestral score.",
    checklist: [
      "Custom foley & environmental beds",
      "Dynamic dialogue sidechaining",
      "Emotional orchestral music cues",
    ],
    icon: Sliders,
  },
  {
    step: "04",
    phase: "PHASE 04 // POLISH",
    title: "CINEMATIC FINISH & PACKAGING",
    description:
      "Final grade pass: custom LUTs, atmospheric halation, kinetic motion-graphic subtitles, and 4K export optimisation for YouTube.",
    checklist: [
      "ACES color grading & highlight roll-off",
      "Kinetic typography animations",
      "Frame.io review & master delivery",
    ],
    icon: Sparkles,
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Cards animate in early (80% viewport) for no empty gaps
      gsap.from(".process-card", {
        opacity: 0,
        y: 44,
        duration: 0.75,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Connecting line animates width on scroll (desktop only)
      if (!prefersReducedMotion && trackRef.current) {
        gsap.from(trackRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative z-10 w-full bg-base-elevated border-t border-ivory/10 px-6 py-20 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between border-b border-ivory/10 pb-7 gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-orange-accent uppercase mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-accent" />
              05 // CREATIVE PIPELINE
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ivory">
              EDITING METHODOLOGY
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-ivory-muted leading-relaxed">
            A battle-tested 4-stage pipeline that transforms 50 hours of raw
            footage into an addictive, cinematic masterpiece.
          </p>
        </div>

        {/* Desktop: horizontal connecting line */}
        <div className="relative hidden lg:block mb-8 mx-7">
          <div
            ref={trackRef}
            className="h-px bg-gradient-to-r from-orange-accent/60 via-yellow-accent/40 to-orange-accent/60"
          />
          {/* Step dots on the line */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
            {steps.map((s) => (
              <div
                key={s.step}
                className="h-2.5 w-2.5 rounded-full bg-orange-accent shadow-[0_0_8px_rgba(255,122,24,0.8)] -mt-[1px]"
              />
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="process-card group relative flex flex-col justify-between rounded-2xl border border-ivory/10 bg-base p-6 transition-all duration-500 hover:border-orange-accent/50 hover:bg-base-card hover:shadow-card-depth"
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-ivory/10 pb-4 mb-4">
                    <span className="font-mono text-[10px] font-bold text-orange-accent tracking-wider">
                      {step.phase}
                    </span>
                    <span className="font-display text-2xl font-black text-ivory/20 group-hover:text-yellow-accent transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-4 w-4 text-orange-accent shrink-0" />
                    <h3 className="font-display text-base font-bold text-ivory group-hover:text-orange-accent transition-colors leading-tight">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-ivory-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Checklist */}
                <div className="mt-6 pt-4 border-t border-ivory/5 space-y-2">
                  {step.checklist.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 text-[10px] font-mono text-ivory/75"
                    >
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-orange-accent shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
