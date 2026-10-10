"use client";

import { useEffect, useRef } from "react";

export default function AmbientGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // Also update CSS root variables for edge light
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    const updateGlow = () => {
      // Smooth lerp (0.08 factor for gentle atmospheric lag)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updateGlow);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden md:block"
    >
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-35 blur-[130px] transition-opacity duration-700 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 122, 24, 0.12) 0%, rgba(255, 200, 61, 0.04) 45%, rgba(8, 6, 5, 0) 70%)",
        }}
      />
    </div>
  );
}
