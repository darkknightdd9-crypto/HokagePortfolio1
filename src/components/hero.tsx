"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Clock } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const subtextRef   = useRef<HTMLParagraphElement>(null);
  const responseRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* hide everything initially */
    gsap.set(videoRef.current, { opacity: 0, scale: 1.06 });
    gsap.set(".hero-line-inner", { y: "110%", opacity: 0 });
    gsap.set([subtextRef.current, ctaRef.current, responseRef.current], {
      opacity: 0,
      y: 22,
    });

    const startHero = () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(videoRef.current, { opacity: 1, scale: 1, duration: 2.0, ease: "power2.out" })
        .to(".hero-line-inner", { y: "0%", opacity: 1, duration: 1.0, stagger: 0.09 }, "-=1.6")
        .to(subtextRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.75")
        .to(ctaRef.current,     { opacity: 1, y: 0, duration: 0.8 }, "-=0.65")
        .to(responseRef.current,{ opacity: 1, y: 0, duration: 0.7 }, "-=0.55");
    };

    window.addEventListener("intro-complete", startHero);
    const fallback = setTimeout(startHero, 1500);

    /* scroll parallax */
    if (!prefersReducedMotion) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (s) => {
          if (!videoRef.current) return;
          gsap.set(videoRef.current, { scale: 1 + s.progress * 0.10, yPercent: s.progress * 15 });
        },
      });
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (s) => gsap.set(headlineRef.current, { yPercent: s.progress * -12 }),
      });
    }

    return () => {
      window.removeEventListener("intro-complete", startHero);
      clearTimeout(fallback);
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === containerRef.current)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-start overflow-hidden px-6 pt-28 pb-20 md:px-16 lg:px-24"
    >
      {/* ── Full-coverage background video ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          /* object-cover fills every pixel — no empty right half */
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
        />

        {/* Noir vignette: heavy left darkening so text always readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,11,12,0.96) 0%, rgba(11,11,12,0.82) 28%, rgba(11,11,12,0.40) 60%, rgba(11,11,12,0.65) 100%)",
          }}
        />
        {/* Subtle gold warmth radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 40% 55%, rgba(212,175,106,0.10) 0%, transparent 55%)",
          }}
        />
        {/* Top + bottom fade */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-base/85 via-transparent to-base" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-3xl pt-8 md:pt-12">

        {/* Tag line — replaces old eyebrow pill */}
        <p className="mb-5 font-mono text-xs tracking-[0.22em] text-gold/70 uppercase">
          Video editor for YouTubers
        </p>

        {/* ── Headline ── */}
        <h1
          ref={headlineRef}
          className="font-display font-black leading-[0.92] tracking-[-0.04em] text-sand
                     text-[clamp(3.4rem,9.5vw,8rem)]"
        >
          {/* Each word on its own overflow clip — correct spacing, no collision */}
          <div className="overflow-hidden pb-1">
            <span className="hero-line-inner inline-block">I edit videos</span>
          </div>
          <div className="overflow-hidden pb-1">
            <span className="hero-line-inner inline-block">people watch</span>
          </div>
          <div className="overflow-hidden pb-1">
            <span className="hero-line-inner inline-block text-sand">
              till the end.
            </span>
          </div>
        </h1>

        {/* ── Subtext — plain language ── */}
        <p
          ref={subtextRef}
          className="mt-7 max-w-lg text-base md:text-lg leading-relaxed text-sand/80 font-normal"
        >
          I turn your raw footage into clean, exciting videos and Shorts.
          You send the clips, I send back something you&apos;re proud to post.
        </p>

        {/* ── CTAs ── */}
        <div
          ref={ctaRef}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          {/* Primary — gold filled */}
          <a
            href="#work"
            data-magnetic
            className="group inline-flex items-center gap-3 rounded-full px-8 py-4
                       font-display text-sm font-bold tracking-wide
                       transition-all duration-300 hover:scale-105
                       hover:shadow-gold-glow"
            style={{
              background: "linear-gradient(135deg, #D4AF6A 0%, #EDD99A 50%, #B8965A 100%)",
              color: "#0B0B0C",
            }}
          >
            <span className="font-extrabold text-[#0B0B0C] tracking-wide">See my work</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{color:"#0B0B0C"}} />
          </a>

          {/* Secondary — ghost */}
          <a
            href="#contact"
            data-magnetic
            className="group inline-flex items-center gap-2.5 rounded-full border px-7 py-4
                       text-sm font-semibold text-sand/80 backdrop-blur-sm
                       transition-all duration-300
                       hover:text-gold hover:bg-gold/[0.06]"
            style={{ borderColor: "rgba(212,175,106,0.30)" }}
          >
            <span>Get a quote</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* ── Response-time micro-line ── */}
        <div
          ref={responseRef}
          className="mt-5 flex items-center gap-2"
        >
          {/* REC dot */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: "#E5484D" }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "#E5484D" }} />
          </span>
          <span className="font-mono text-[11px] tracking-wider text-sand/50">
            I reply within{" "}
            <span className="text-sand/80 font-semibold">24 hours</span>
            {" "}— open for new projects
          </span>
        </div>
      </div>
    </section>
  );
}
