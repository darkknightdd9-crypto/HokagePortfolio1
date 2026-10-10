"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      // Modest duration — feels natural without being sluggish
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    const rafTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafTick);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor-link handling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          lenis.scrollTo(el as HTMLElement, { offset: -48, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(rafTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
