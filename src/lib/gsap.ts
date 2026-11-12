// Single place where GSAP plugins are registered. Import GSAP from here, never from "gsap" directly,
// so ScrollTrigger, DrawSVG, Draggable and InertiaPlugin are always available. Only client components may import this file.
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, Draggable, InertiaPlugin, useGSAP);

// Visitors who ask for reduced motion see the final layout with no animation.
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, Draggable, useGSAP };
