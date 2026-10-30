"use client";

import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import { RotateCw } from "lucide-react";
import { GlassRing } from "@/components/3d/glass-ring";
import { Container } from "@/components/ui/container";

const REST_X = -12;
const LIMIT_X = 60;
const SENSITIVITY = 0.35;
const FRICTION = 0.92;

type Motion = { x: number; y: number; vx: number; vy: number; dragging: boolean; lastX: number; lastY: number; frame: number };

// A glass ring the visitor can grab and turn. Drag with a mouse or finger, or use the arrow keys.
// Releasing it carries on with a short, slowing spin; under reduced motion it stops where it is released.
export function InteractiveShowcase() {
  const stage = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const motion = useRef<Motion>({ x: REST_X, y: 0, vx: 0, vy: 0, dragging: false, lastX: 0, lastY: 0, frame: 0 });

  const apply = () => {
    const m = motion.current;
    if (rig.current) rig.current.style.transform = `rotateX(${m.x.toFixed(2)}deg) rotateY(${m.y.toFixed(2)}deg)`;
  };

  const clampX = (value: number) => Math.max(-LIMIT_X, Math.min(LIMIT_X, value));

  useEffect(() => {
    const m = motion.current;
    apply();
    return () => cancelAnimationFrame(m.frame);
  }, []);

  // Coasts after release: friction slows the spin, then the ring eases back toward its resting tilt.
  const coast = () => {
    const m = motion.current;
    m.y += m.vy;
    m.x = clampX(m.x + m.vx);
    m.vx *= FRICTION;
    m.vy *= FRICTION;
    if (Math.abs(m.vx) < 0.02 && Math.abs(m.vy) < 0.02) {
      m.vx = 0;
      m.vy = 0;
      m.x += (REST_X - m.x) * 0.04;
      apply();
      if (Math.abs(REST_X - m.x) > 0.1) m.frame = requestAnimationFrame(coast);
      return;
    }
    apply();
    m.frame = requestAnimationFrame(coast);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const m = motion.current;
    cancelAnimationFrame(m.frame);
    event.currentTarget.setPointerCapture(event.pointerId);
    m.dragging = true;
    m.vx = 0;
    m.vy = 0;
    m.lastX = event.clientX;
    m.lastY = event.clientY;
    event.currentTarget.dataset.dragging = "true";
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const m = motion.current;
    if (!m.dragging) return;
    const dx = (event.clientX - m.lastX) * SENSITIVITY;
    const dy = (event.clientY - m.lastY) * SENSITIVITY;
    m.lastX = event.clientX;
    m.lastY = event.clientY;
    m.y += dx;
    m.x = clampX(m.x + dy);
    m.vy = dx;
    m.vx = dy;
    apply();
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const m = motion.current;
    if (!m.dragging) return;
    m.dragging = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    delete event.currentTarget.dataset.dragging;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      m.vx = 0;
      m.vy = 0;
      return;
    }
    m.frame = requestAnimationFrame(coast);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const m = motion.current;
    const step = 15;
    if (event.key === "ArrowLeft") m.y -= step;
    else if (event.key === "ArrowRight") m.y += step;
    else if (event.key === "ArrowUp") m.x = clampX(m.x - step);
    else if (event.key === "ArrowDown") m.x = clampX(m.x + step);
    else return;
    event.preventDefault();
    apply();
  };

  return (
    <section id="showcase" aria-labelledby="showcase-heading" className="scroll-mt-16 py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-2/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Interactive
          </p>
          <h2 id="showcase-heading" className="mt-6 text-[length:var(--text-headline)] font-semibold leading-[1.06] tracking-tight text-balance">
            Explore the brand in three dimensions.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            Our visual language is built from light, depth and motion. Turn the ring to see it from every side.
          </p>
          <p className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-text">
            <RotateCw aria-hidden="true" className="h-4 w-4 text-cyan" />
            Drag to explore
          </p>
        </div>

        <div className="lg:col-span-7">
          <div
            ref={stage}
            role="application"
            tabIndex={0}
            aria-roledescription="draggable 3D object"
            aria-label="Glass ring. Drag to rotate, or use the arrow keys."
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={onKeyDown}
            className="group relative mx-auto flex aspect-square w-full max-w-md cursor-grab touch-none select-none items-center justify-center rounded-[calc(var(--radius-card)*1.5)] outline-none transition duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan data-[dragging=true]:cursor-grabbing"
            style={{ perspective: "900px" }}
          >
            <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(136,114,255,0.22),transparent_65%)] blur-2xl transition duration-500 group-hover:scale-105" aria-hidden="true" />
            <div ref={rig} data-rig="" className="relative h-[80%] w-[80%] transition-[scale] duration-300 ease-out group-hover:scale-[1.03] [transform-style:preserve-3d]" style={{ transform: `rotateX(${REST_X}deg)` }}>
              <GlassRing />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
