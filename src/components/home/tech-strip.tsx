"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

type TechStripProps = {
  items: string[];
};

// Endless ticker of the technologies we build with. It loops at a calm pace and speeds up when the visitor scrolls quickly,
// so the scroll itself drives the motion. Reduced-motion visitors get the same list, static and wrapped.
export function TechStrip({ items }: TechStripProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section || prefersReducedMotion()) return;
      const track = section.querySelector<HTMLElement>("[data-ticker]");
      if (!track) return;

      const loop = gsap.to(track, { xPercent: -50, duration: 28, repeat: -1, ease: "none" });

      // Scrolling fast nudges the ticker forward; it settles back to its calm speed when scrolling stops.
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 1200, 4);
          gsap.to(loop, { timeScale: boost, duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.15, overwrite: "auto" });
        },
      });
    },
    { scope: ref },
  );

  const row = items.map((item) => (
    <li key={item} className="flex shrink-0 items-center gap-10 pr-10 text-2xl font-semibold tracking-tight text-muted sm:text-3xl">
      {item}
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-linear-to-r from-cyan via-violet to-pink" />
    </li>
  ));

  return (
    <section ref={ref} id="tech" aria-label="Technologies we build with" className="overflow-hidden border-y border-line bg-bg-2/40 py-8">
      <p className="mx-auto mb-6 max-w-[var(--container-page)] px-5 text-xs font-medium uppercase tracking-[0.22em] text-muted sm:px-8">
        Technologies we build with
      </p>
      <div className="overflow-hidden">
        <ul data-ticker className="flex w-max items-center">
          {row}
          {/* Duplicate row so the loop joins seamlessly. Hidden from assistive tech. */}
          <span aria-hidden="true" className="contents">
            {row}
          </span>
        </ul>
      </div>
    </section>
  );
}
