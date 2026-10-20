"use client";

import { useEffect, useRef } from "react";
import { GlassRing } from "@/components/3d/glass-ring";
import { GlowOrb } from "@/components/3d/glow-orb";

// Floating forms around the hero device. On mouse devices they lean toward the pointer at different depths.
// The pointer position is written to two CSS variables in one animation-frame loop, so React never re-renders for it.
// Touch and reduced-motion visitors get the static composition, and nothing is listening or animating.
export function HeroForms() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reduce.matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let running = false;

    const step = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      el.style.setProperty("--px", current.x.toFixed(4));
      el.style.setProperty("--py", current.y.toFixed(4));

      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
      if (settled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const kick = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(step);
    };

    const clamp = (v: number) => Math.max(-1, Math.min(1, v));

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1);
      target.y = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1);
      kick();
    };

    // Pointer left the window: ease back to the resting position.
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Desktop only. A faint orbit frames the headline block, and the objects sit around its edges, clear of the text.
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-x-[-6%] inset-y-[-10%] hidden rounded-[50%] border border-white/[0.06] lg:block" />
      <div className="absolute -left-16 -top-28 hidden h-16 w-16 lg:block">
        <div className="hf h-full w-full" style={{ ["--d" as string]: "14px" }}>
          <GlassRing />
        </div>
      </div>
      <div className="absolute -right-[6%] top-[30%] hidden h-24 w-24 lg:block">
        <div className="hf h-full w-full" style={{ ["--d" as string]: "34px" }}>
          <GlowOrb />
        </div>
      </div>
      <div className="absolute bottom-[-30%] left-[62%] hidden h-28 w-28 lg:block">
        <div className="hf h-full w-full" style={{ ["--d" as string]: "22px" }}>
          <GlassRing />
        </div>
      </div>
    </div>
  );
}
