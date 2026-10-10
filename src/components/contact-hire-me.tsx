"use client";

import { useRef, useEffect } from "react";
import { ArrowUpRight, Mail, MessageSquare, Send } from "lucide-react";

export default function ContactHireMe() {
  const panelRef    = useRef<HTMLDivElement>(null);
  const spotRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let tRX = 0, tRY = 0, cRX = 0, cRY = 0, tZ = 0, cZ = 0;
    let sX = 50, sY = 50, cSX = 50, cSY = 50;
    let inside = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      const r = panel.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width)  * 2 - 1;
      const ny = ((e.clientY - r.top)  / r.height) * 2 - 1;
      const dist = Math.min(Math.sqrt(nx*nx + ny*ny), 1.2);
      tRX = -ny * 7 * dist; tRY = nx * 7 * dist; tZ = 10 * dist;
      sX = ((e.clientX - r.left) / r.width)  * 100;
      sY = ((e.clientY - r.top)  / r.height) * 100;
    };
    const onEnter = () => { inside = true; };
    const onLeave = () => { inside = false; tRX = 0; tRY = 0; tZ = 0; };

    const tick = () => {
      cRX += (tRX - cRX) * 0.1; cRY += (tRY - cRY) * 0.1; cZ += (tZ - cZ) * 0.1;
      cSX += (sX - cSX) * 0.12; cSY += (sY - cSY) * 0.12;
      panel.style.transform = `perspective(1000px) rotateX(${cRX.toFixed(2)}deg) rotateY(${cRY.toFixed(2)}deg) translateZ(${cZ.toFixed(1)}px)`;
      panel.style.boxShadow = `${(-cRY*3).toFixed(1)}px ${(cRX*3+22).toFixed(1)}px 48px -10px rgba(0,0,0,0.85), 0 0 32px -5px rgba(212,175,106,${inside ? 0.18 : 0.06})`;
      if (spotRef.current)
        spotRef.current.style.background = `radial-gradient(circle 320px at ${cSX}% ${cSY}%, rgba(212,175,106,0.12) 0%, rgba(212,175,106,0.03) 40%, transparent 80%)`;
      raf = requestAnimationFrame(tick);
    };

    panel.addEventListener("mousemove", onMove);
    panel.addEventListener("mouseenter", onEnter);
    panel.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => { panel.removeEventListener("mousemove", onMove); panel.removeEventListener("mouseenter", onEnter); panel.removeEventListener("mouseleave", onLeave); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section
      id="contact"
      className="relative z-10 w-full px-6 py-24 md:px-16 lg:px-24 overflow-hidden"
      style={{
        background: "#0B0B0C",
        borderTop: "1px solid rgba(212,175,106,0.10)",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-14">

        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase"
             style={{ color: "#D4AF6A" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#D4AF6A" }} />
          07 // COLLABORATION &amp; INQUIRIES
        </div>

        {/* 3D panel */}
        <div className="perspective-container">
          <div
            ref={panelRef}
            className="relative p-8 sm:p-14 lg:p-20 overflow-hidden will-change-transform"
            style={{
              background:   "#131314",
              border:       "1px solid rgba(212,175,106,0.15)",
              borderRadius: "24px",
            }}
          >
            <div ref={spotRef} className="pointer-events-none absolute inset-0 z-0" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono" style={{ color: "#D4AF6A" }}>
                  {/* REC dot */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: "#E5484D" }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "#E5484D" }} />
                  </span>
                  <span>OPEN FOR NEW PROJECTS</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-sand leading-tight">
                  LET&apos;S MAKE <br />
                  <span className="text-gold">SOMETHING</span> <br />
                  WORTH WATCHING.
                </h2>
                <p className="text-base sm:text-lg leading-relaxed max-w-lg" style={{ color: "#8A8680" }}>
                  Got a series, challenge, or short-form project ready to go?
                  Send me a message — I reply within 24 hours.
                </p>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-4">
                <a
                  href="mailto:contact@hokage-editorial.com"
                  data-magnetic
                  className="group relative inline-flex items-center gap-4 rounded-full px-10 py-6 font-bold transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #D4AF6A 0%, #EDD99A 50%, #B8965A 100%)",
                    color: "#0B0B0C",
                    boxShadow: "0 0 32px rgba(212,175,106,0.22)",
                  }}
                >
                  <span className="font-display tracking-wide text-lg font-black text-[#0B0B0C]">GET A QUOTE</span>
                  <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "#0B0B0C" }} />
                </a>
                <span className="font-mono text-xs tracking-wider uppercase" style={{ color: "rgba(237,234,227,0.40)" }}>
                  I reply within 24 hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { href: "mailto:contact@hokage-editorial.com", Icon: Mail,         label: "DIRECT EMAIL",       sub: "contact@hokage-editorial.com", gold: true  },
            { href: "https://discord.com",                  Icon: MessageSquare,label: "DISCORD",            sub: "Connect via Discord Direct",   gold: false },
            { href: "",                                     Icon: Send,         label: "TURNAROUND SPEED",   sub: "48 — 72 Hours via Frame.io",   gold: true  },
          ].map(({ href, Icon, label, sub, gold }) => (
            <a
              key={label}
              href={href || undefined}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="group rounded-2xl p-6 transition-all duration-300"
              style={{
                background:   "#131314",
                border:       "1px solid rgba(212,175,106,0.12)",
                borderRadius: "16px",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,106,0.32)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,106,0.12)"; }}
            >
              <Icon className="h-5 w-5 mb-3" style={{ color: "#D4AF6A" }} />
              <div className="font-display text-base font-bold text-sand">{label}</div>
              <div className="text-xs font-mono mt-1" style={{ color: "#8A8680" }}>{sub}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

