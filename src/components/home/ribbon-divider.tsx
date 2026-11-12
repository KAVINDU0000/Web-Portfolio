"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

// Full-width ribbon in the GENMEDIA logo gradient (cyan, violet, pink). It draws itself as the page scrolls past,
// so each section break echoes the swoosh in the logo. Decorative, so it is hidden from assistive tech.
export function RibbonDivider() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg || prefersReducedMotion()) return;
      const paths = gsap.utils.toArray<SVGPathElement>(svg.querySelectorAll("path[data-draw]"));
      gsap.fromTo(
        paths,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: svg, start: "top 95%", end: "bottom 45%", scrub: 0.6 },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div aria-hidden="true" className="relative mx-auto h-24 w-full overflow-hidden sm:h-28">
      <svg ref={ref} viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="divider-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#20D9F4" />
            <stop offset="0.5" stopColor="#8872FF" />
            <stop offset="1" stopColor="#E65DCA" />
          </linearGradient>
        </defs>
        <path
          data-draw
          d="M-10 80 C 260 10, 470 110, 720 60 S 1180 10, 1450 70"
          stroke="url(#divider-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          data-draw
          d="M-10 96 C 280 40, 500 120, 740 84 S 1190 40, 1450 96"
          stroke="url(#divider-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
