"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type MagneticProps = {
  children: ReactNode;
  // How far the element follows the pointer, as a fraction of the distance from its centre.
  strength?: number;
};

// Wraps a button or link so it leans toward the cursor and springs back when the pointer leaves.
// Purely a pointer effect: the child is server-rendered as normal, and reduced-motion visitors get no movement.
export function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  function handleMove(event: PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.4, ease: "power3.out", overwrite: "auto" });
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
  }

  return (
    <span ref={ref} onPointerMove={handleMove} onPointerLeave={handleLeave} className="inline-flex">
      {children}
    </span>
  );
}
