"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Home, Play, User, Layers, Mail } from "lucide-react";

interface DockItemDef {
  id: string;
  label: string;
  href: string;
  icon: typeof Home;
  ariaLabel: string;
}

const DOCK_ITEMS: DockItemDef[] = [
  { id: "hero",     label: "HOME",     href: "#hero",     icon: Home,   ariaLabel: "Navigate to Home section"     },
  { id: "work",     label: "WORK",     href: "#work",     icon: Play,   ariaLabel: "Navigate to Featured Work"     },
  { id: "about",    label: "ABOUT",    href: "#about",    icon: User,   ariaLabel: "Navigate to About the Craft"   },
  { id: "services", label: "SERVICES", href: "#services", icon: Layers, ariaLabel: "Navigate to Editing Disciplines" },
  { id: "contact",  label: "HIRE ME",  href: "#contact",  icon: Mail,   ariaLabel: "Navigate to Contact & Hire Me" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [introFinished, setIntroFinished] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetScales = useRef<number[]>([1, 1, 1, 1, 1]);
  const currentScales = useRef<number[]>([1, 1, 1, 1, 1]);
  const targetYs = useRef<number[]>([0, 0, 0, 0, 0]);
  const currentYs = useRef<number[]>([0, 0, 0, 0, 0]);
  const animFrameId = useRef<number | null>(null);

  // Intro loader completion listener
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIntroFinished(true);
      return;
    }

    const onDone = () => setIntroFinished(true);
    window.addEventListener("intro-complete", onDone);
    const fallback = setTimeout(() => setIntroFinished(true), 2000);
    return () => {
      window.removeEventListener("intro-complete", onDone);
      clearTimeout(fallback);
    };
  }, []);

  // Active section scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = DOCK_ITEMS.length - 1; i >= 0; i--) {
        const item = DOCK_ITEMS[i];
        const sec = document.querySelector(item.href) as HTMLElement | null;
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Physics animation loop: lerp smoothing for magnification pop-out
  const updatePhysics = useCallback(() => {
    let needsUpdate = false;
    for (let i = 0; i < DOCK_ITEMS.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;

      const diffScale = targetScales.current[i] - currentScales.current[i];
      const diffY = targetYs.current[i] - currentYs.current[i];

      if (Math.abs(diffScale) > 0.002 || Math.abs(diffY) > 0.04) {
        currentScales.current[i] += diffScale * 0.24;
        currentYs.current[i] += diffY * 0.24;
        needsUpdate = true;
      } else {
        currentScales.current[i] = targetScales.current[i];
        currentYs.current[i] = targetYs.current[i];
      }

      const s = currentScales.current[i];
      const y = currentYs.current[i];
      el.style.transform = `scale(${s.toFixed(3)}) translateY(${y.toFixed(2)}px)`;
    }

    if (needsUpdate) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    } else {
      animFrameId.current = null;
    }
  }, []);

  const triggerAnimation = useCallback(() => {
    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    }
  }, [updatePhysics]);

  // Mouse move across UI Bar: calculates continuous bell-curve magnification with collision-free spacing
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const mouseX = e.clientX;
    const maxRadius = 140; // influence distance in pixels

    let closestIdx = -1;
    let minDistance = Infinity;

    for (let i = 0; i < DOCK_ITEMS.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - centerX);

      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = i;
      }

      if (distance < maxRadius) {
        const ratio = distance / maxRadius;
        // Smooth cosine curve falloff
        const intensity = (1 + Math.cos(ratio * Math.PI)) / 2;
        // Refined magnification (1.18x) and tactile upward pop-out (-12px)
        targetScales.current[i] = 1 + intensity * 0.18;
        targetYs.current[i] = -intensity * 12;
      } else {
        targetScales.current[i] = 1;
        targetYs.current[i] = 0;
      }
    }

    setHoveredIdx(minDistance < 70 ? closestIdx : null);
    triggerAnimation();
  };

  const handleMouseLeave = () => {
    for (let i = 0; i < DOCK_ITEMS.length; i++) {
      targetScales.current[i] = 1;
      targetYs.current[i] = 0;
    }
    setHoveredIdx(null);
    triggerAnimation();
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-start justify-center pt-3.5 sm:pt-5 pointer-events-none transition-all duration-700 ${
        introFinished ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      {/* ── UI Bar / Dock Container — wide collision-free gaps & generous padding ── */}
      <nav
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="pointer-events-auto flex items-center gap-4 sm:gap-6 px-5 sm:px-7 py-3 sm:py-3.5 rounded-[22px] transition-all duration-300"
        style={{
          background: "rgba(14, 14, 16, 0.86)",
          border: "1px solid rgba(212, 175, 106, 0.28)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          boxShadow:
            "0 16px 44px -8px rgba(0, 0, 0, 0.92), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 28px rgba(212, 175, 106, 0.12)",
        }}
        aria-label="Primary Navigation Dock"
      >
        {DOCK_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredIdx === idx;
          const isHireCTA = item.id === "contact";

          return (
            <div key={item.id} className="flex items-center">
              {/* Category Divider before ABOUT and before CONTACT/HIRE with ample spacing */}
              {(idx === 2 || idx === 4) && (
                <div
                  className="w-[1px] h-7 -ml-2 sm:-ml-3 mr-2 sm:mr-3 shrink-0 rounded-full"
                  style={{ background: "rgba(212, 175, 106, 0.24)" }}
                  aria-hidden="true"
                />
              )}

              {/* Dock Item Button — Enlarged ~30% with generous spacing */}
              <div
                ref={(el) => { itemRefs.current[idx] = el; }}
                onClick={() => scrollTo(item.href)}
                data-cursor="hover"
                role="button"
                tabIndex={0}
                aria-label={item.ariaLabel}
                aria-current={isActive ? "page" : undefined}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    scrollTo(item.href);
                  }
                }}
                className={`group relative flex items-center justify-center w-[62px] h-[62px] sm:w-[68px] sm:h-[68px] rounded-[16px] cursor-pointer outline-none select-none shrink-0 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  isHireCTA && !isHovered ? "bg-gold/[0.08] border-gold/40" : ""
                }`}
                style={{
                  transformOrigin: "center center",
                  background: isHovered
                    ? isHireCTA
                      ? "rgba(212, 175, 106, 0.22)"
                      : "rgba(212, 175, 106, 0.15)"
                    : isActive
                    ? "rgba(212, 175, 106, 0.10)"
                    : isHireCTA
                    ? "rgba(212, 175, 106, 0.08)"
                    : "rgba(255, 255, 255, 0.03)",
                  border: isHovered
                    ? "1px solid rgba(212, 175, 106, 0.85)"
                    : isActive
                    ? "1px solid rgba(212, 175, 106, 0.50)"
                    : isHireCTA
                    ? "1px solid rgba(212, 175, 106, 0.35)"
                    : "1px solid rgba(212, 175, 106, 0.18)",
                  boxShadow: isHovered
                    ? "0 0 26px rgba(212, 175, 106, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.22)"
                    : "none",
                }}
              >
                {/* Icon — Enlarged ~30% (w-[30px] h-[30px] sm:w-[32px] sm:h-[32px]) */}
                <Icon
                  className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] transition-colors duration-200 pointer-events-none"
                  style={{
                    color: isHovered
                      ? "#EDEAE3"
                      : isActive || isHireCTA
                      ? "#D4AF6A"
                      : "rgba(237, 234, 227, 0.70)",
                    strokeWidth: 1.85,
                  }}
                />

                {/* Active Section Indicator Dot */}
                {isActive && (
                  <span
                    className="absolute bottom-2 h-1.5 w-1.5 rounded-full shadow-sm"
                    style={{
                      background: "#D4AF6A",
                      boxShadow: "0 0 8px #D4AF6A",
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Pop Out Tooltip Label */}
                <div
                  className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap px-3.5 py-1 rounded-md transition-all duration-200 ${
                    isHovered
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-2 scale-90"
                  }`}
                  style={{
                    background: "rgba(11, 11, 12, 0.96)",
                    border: "1px solid rgba(212, 175, 106, 0.40)",
                    boxShadow: "0 10px 28px rgba(0, 0, 0, 0.85), 0 0 14px rgba(212, 175, 106, 0.18)",
                  }}
                  aria-hidden="true"
                >
                  <span
                    className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase"
                    style={{ color: "#EDEAE3" }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </header>
  );
}
