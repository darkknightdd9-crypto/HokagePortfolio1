"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable completely on touch / mobile devices
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let mouseX = -200;
    let mouseY = -200;
    let dotX = -200;
    let dotY = -200;
    let ringX = -200;
    let ringY = -200;

    let magneticTarget: HTMLElement | null = null;
    let magneticBounds: DOMRect | null = null;

    let isHovered = false;
    let isMouseDown = false;
    let isVisible = false;
    let isIntroFinished = false;

    let rafId: number;

    const onIntroComplete = () => {
      isIntroFinished = true;
    };

    window.addEventListener("intro-complete", onIntroComplete);

    // Fallback if intro was skipped or already complete
    const fallbackTimer = setTimeout(() => {
      isIntroFinished = true;
    }, 1400);

    const onMouseMove = (e: MouseEvent) => {
      if (!isIntroFinished) return;

      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dotX = mouseX;
        dotY = mouseY;
        ringX = mouseX;
        ringY = mouseY;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        "a, button, [data-cursor], input, textarea, select, iframe, [role='button']"
      ) as HTMLElement | null;

      const magneticEl = target.closest("[data-magnetic]") as HTMLElement | null;
      if (magneticEl) {
        magneticTarget = magneticEl;
        magneticBounds = magneticEl.getBoundingClientRect();
      } else {
        if (magneticTarget) {
          magneticTarget.style.transform = "translate3d(0, 0, 0)";
          magneticTarget = null;
          magneticBounds = null;
        }
      }

      isHovered = !!interactiveEl;
    };

    const onMouseDown = () => {
      isMouseDown = true;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (magneticTarget) {
        magneticTarget.style.transform = "translate3d(0, 0, 0)";
        magneticTarget = null;
        magneticBounds = null;
      }
    };

    const renderLoop = () => {
      if (!isIntroFinished) {
        rafId = requestAnimationFrame(renderLoop);
        return;
      }

      // Dot follows directly with slight lerp
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;

      // Outer ring follows with smooth organic trailing lag
      const ringLerp = isHovered ? 0.22 : 0.15;
      ringX += (mouseX - ringX) * ringLerp;
      ringY += (mouseY - ringY) * ringLerp;

      // Magnetic attraction
      if (magneticTarget && magneticBounds) {
        const centerX = magneticBounds.left + magneticBounds.width / 2;
        const centerY = magneticBounds.top + magneticBounds.height / 2;
        const deltaX = (mouseX - centerX) * 0.32;
        const deltaY = (mouseY - centerY) * 0.32;
        magneticTarget.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      }

      if (dotRef.current) {
        const dotScale = isMouseDown ? 0.6 : isHovered ? 1.3 : 1;
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        dotRef.current.style.backgroundColor = isHovered ? "#FF7A18" : "#FFF4E6";
      }

      if (ringRef.current) {
        // Base outer circle: 56px (large as requested)
        // Hover state: increases by exactly ~30% (56 * 1.3 = ~73px)
        const baseSize = 56;
        let ringSize = isHovered ? baseSize * 1.3 : baseSize;

        if (isMouseDown) {
          ringSize *= 0.88;
        }

        const borderColor = isHovered
          ? "rgba(255, 122, 24, 0.85)"
          : "rgba(255, 244, 230, 0.42)";

        const bgColor = isHovered
          ? "rgba(255, 122, 24, 0.05)"
          : "transparent";

        ringRef.current.style.width = `${ringSize}px`;
        ringRef.current.style.height = `${ringSize}px`;
        ringRef.current.style.borderColor = borderColor;
        ringRef.current.style.backgroundColor = bgColor;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("intro-complete", onIntroComplete);
      clearTimeout(fallbackTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-ivory opacity-0 transition-opacity duration-300 will-change-transform hidden md:block"
      />

      {/* Large Outer Ring (56px base -> 73px on hover (+30%), zero text) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-ivory/40 opacity-0 backdrop-blur-[1px] transition-[width,height,border-color,background-color] duration-200 ease-out will-change-transform hidden md:block"
      />
    </>
  );
}
