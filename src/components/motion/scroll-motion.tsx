"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

// Small GSAP ScrollTrigger wrappers. Children are rendered on the server, so content is always in the HTML.
// The animation only moves them into place in the browser. Reduced-motion visitors get no animation.

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
};

// Fades and lifts a block into view once, when it reaches the trigger line.
export function Reveal({ children, className, delay = 0, y = 40, start = "top 88%" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.from(el, {
        y,
        opacity: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  // CSS selector for the items to stagger, searched inside the wrapper. Keeps the list's own markup unchanged.
  targets?: string;
  step?: number;
  y?: number;
};

// Reveals a group of items one after another as the group scrolls into view.
export function Stagger({ children, className, targets = ":scope > *", step = 0.12, y = 48 }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const items = el.querySelectorAll(targets);
      if (items.length === 0) return;
      gsap.from(items, {
        y,
        opacity: 0,
        duration: 0.9,
        stagger: step,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  // Distance in pixels the element travels across the full scroll through the viewport.
  amount?: number;
};

// Moves its content slower or faster than the page, tied to scroll position.
export function Parallax({ children, className, amount = 80 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.fromTo(
        el,
        { y: amount },
        {
          y: -amount,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
