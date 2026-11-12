"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

// A thin GENMEDIA-gradient ribbon fixed to the right edge. It draws itself from top to bottom as the whole page scrolls,
// so it works as a visual progress marker and a brand signature. Decorative only, hidden on small screens.
export function ScrollRibbon() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg || prefersReducedMotion()) return;
      const path = svg.querySelector("path");
      if (!path) return;

      gsap.fromTo(
        path,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.6 },
        },
      );
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 120 1000"
      preserveAspectRatio="none"
      fill="none"
      className="pointer-events-none fixed right-3 top-0 -z-10 hidden h-screen w-16 opacity-70 md:block xl:right-8"
    >
      <defs>
        <linearGradient id="scroll-ribbon-gradient" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#20D9F4" />
          <stop offset="0.5" stopColor="#8872FF" />
          <stop offset="1" stopColor="#E65DCA" />
        </linearGradient>
      </defs>
      <path
        d="M90 -20 C 10 160, 110 300, 40 480 S 110 800, 30 1020"
        stroke="url(#scroll-ribbon-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
