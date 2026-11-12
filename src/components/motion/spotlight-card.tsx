"use client";

import type { ReactNode, PointerEvent } from "react";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

// Wraps a card with a light that follows the pointer and a slight 3D tilt toward it.
// The card's own content is unchanged and server-rendered. Touch screens and reduced-motion visitors get no tilt.
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const tilt = useRef<{ rx: ReturnType<typeof gsap.quickTo>; ry: ReturnType<typeof gsap.quickTo> } | null>(null);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const el = outer.current;
    const card = inner.current;
    if (!el || !card) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--sx", `${x}px`);
    el.style.setProperty("--sy", `${y}px`);

    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    if (!tilt.current) {
      tilt.current = {
        rx: gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" }),
        ry: gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" }),
      };
    }
    tilt.current.ry((x / rect.width - 0.5) * 8);
    tilt.current.rx(-(y / rect.height - 0.5) * 6);
  }

  function handleLeave() {
    tilt.current?.rx(0);
    tilt.current?.ry(0);
  }

  return (
    <div
      ref={outer}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`group/spot relative ${className}`}
      style={{ perspective: 1000 }}
    >
      <div ref={inner} className="relative h-full w-full will-change-transform">
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100 bg-[radial-gradient(260px_circle_at_var(--sx,50%)_var(--sy,50%),rgba(32,217,244,0.16),rgba(136,114,255,0.08)_40%,transparent_70%)]"
        />
      </div>
    </div>
  );
}
