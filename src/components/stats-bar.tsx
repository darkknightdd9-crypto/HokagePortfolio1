"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { value: 44579, suffix: " views", label: "TOTAL VIEWS DELIVERED", context: "Verified on YouTube shorts & episodes" },
  { value: 50,    suffix: "+",      label: "VIDEOS EDITED",           context: "Commissioned cuts & episodic edits" },
  { value: 74,    suffix: "%",      label: "AVG AUDIENCE RETENTION", context: "Achieved on 20+ minute lore streams" },
  { value: 1,     suffix: " yr",    label: "YEARS IN PRODUCTION",     context: "Dedicated creator editing studio" },
];

const CREATORS = [
  "VOID GAMING", "CHRONICLE LAB", "SIMULACRA SERIES", "APEX NARRATIVES",
  "PIXEL FORGE",  "DARKWOOD FILMS", "REALM CRAFT",     "INFERNO STUDIO",
];

function Counter({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
  const elRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!elRef.current) return;
    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: elRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        gsap.to(obj, {
          val: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (elRef.current)
              elRef.current.textContent = Math.round(obj.val).toLocaleString() + suffix;
          },
        });
      },
    });
    return () => trigger.kill();
  }, [target, suffix, duration]);

  return <span ref={elRef} className="tabular-nums">0{suffix}</span>;
}

export default function StatsBar() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pref) return;
    const clone = el.cloneNode(true) as HTMLDivElement;
    clone.setAttribute("aria-hidden", "true");
    el.parentElement?.appendChild(clone);
  }, []);

  return (
    <section
      id="stats"
      className="relative z-10 w-full py-20 overflow-hidden"
      style={{
        background: "#131314",
        borderTop: "1px solid rgba(212,175,106,0.12)",
      }}
    >
      {/* Gold top line accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,106,0.35), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase" style={{ color: "#D4AF6A" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#D4AF6A" }} />
            PROOF OF SCALE &amp; RETENTION
          </div>
          <span className="font-mono text-[11px] text-sand/60 uppercase tracking-wider">
            Documented Channel Impact
          </span>
        </div>

        {/* Counters Grid with Sub-Context */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {STATS.map((stat) => (
            <div key={stat.label} className="space-y-1.5">
              <div className="font-display font-black leading-none tracking-tighter text-3xl sm:text-4xl lg:text-5xl text-sand">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-mono text-xs font-bold tracking-wider uppercase text-sand/80 pt-1">
                {stat.label}
              </p>
              <p className="font-sans text-[11px] text-sand/55 leading-snug">
                {stat.context}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-8" style={{ borderTop: "1px solid rgba(212,175,106,0.10)" }} />

        {/* Creator Logos / Names Marquee */}
        <p className="font-mono text-xs font-semibold tracking-widest uppercase mb-5 text-sand/60">
          SERIES &amp; CREATORS FEATURING EDITS:
        </p>

        <div className="relative overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, #131314, transparent)" }}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(-90deg, #131314, transparent)" }}
            aria-hidden="true"
          />
          <div className="flex overflow-hidden">
            <div ref={marqueeRef} className="flex items-center gap-12 animate-marquee whitespace-nowrap shrink-0 py-2">
              {CREATORS.map((name) => (
                <span
                  key={name}
                  className="font-display font-bold text-sm tracking-wide uppercase cursor-default transition-colors duration-300 hover:text-gold"
                  style={{ color: "rgba(212,175,106,0.55)" }}
                >
                  {name}
                  <span
                    className="ml-12 inline-block w-1.5 h-1.5 rounded-full align-middle"
                    style={{ background: "rgba(212,175,106,0.35)" }}
                    aria-hidden="true"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
