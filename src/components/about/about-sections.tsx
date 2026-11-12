"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

// Scroll effects for the About page sections. Content is server-rendered; these only change how it appears.

type StoryRevealProps = {
  paragraphs: string[];
};

// Each word of the story starts dim and lights up as it scrolls through the viewport. The text stays real HTML.
export function StoryReveal({ paragraphs }: StoryRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const words = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-word]"));

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", end: "bottom 50%", scrub: true },
      });
      words.forEach((word, index) => {
        tl.fromTo(word, { opacity: 0.18 }, { opacity: 1, duration: 1, ease: "none" }, index);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="space-y-8 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.55] tracking-[-0.01em] text-white">
      {paragraphs.map((paragraph, pIndex) => (
        <p key={pIndex}>
          {paragraph.split(" ").map((word, wIndex) => (
            <span key={`${pIndex}-${wIndex}`}>
              <span data-word>{word}</span>
              {" "}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

type PrincipleRowsProps = {
  items: { title: string; text: string }[];
};

// Principles as full-width rows. Each row slides in from the left as it reaches the viewport.
export function PrincipleRows({ items }: PrincipleRowsProps) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-row]")).forEach((row) => {
        gsap.from(row, {
          x: -70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="border-b border-white/10">
      {items.map((item, index) => (
        <li key={item.title} data-row className="grid gap-4 border-t border-white/10 py-10 md:grid-cols-12 md:items-center md:gap-8 md:py-14">
          <span className="font-mono text-[clamp(4rem,9vw,8rem)] font-semibold leading-none text-transparent [-webkit-text-stroke:1px_rgba(0,200,240,0.55)] md:col-span-2">
            0{index + 1}
          </span>
          <h3 className="text-3xl font-semibold tracking-tight text-white md:col-span-4">{item.title}</h3>
          <p className="text-lg leading-relaxed text-white/60 md:col-span-6">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

type ProcessRailProps = {
  steps: { number: string; title: string; text: string }[];
};

// Process as a vertical rail. The rail fills as you scroll, and each stage brightens as it is reached.
export function ProcessRail({ steps }: ProcessRailProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const fill = root.querySelector("[data-rail-fill]");
      if (fill) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 60%", scrub: true } },
        );
      }
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-stage]")).forEach((stage) => {
        gsap.fromTo(
          stage,
          { opacity: 0.3, x: 24 },
          { opacity: 1, x: 0, ease: "none", scrollTrigger: { trigger: stage, start: "top 85%", end: "top 45%", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative pl-12">
      <span aria-hidden="true" className="absolute bottom-2 left-4 top-2 w-px bg-white/10">
        <span data-rail-fill className="absolute inset-0 origin-top bg-linear-to-b from-cyan via-violet-500 to-indigo-500" />
      </span>
      <ol className="space-y-14">
        {steps.map((step) => (
          <li key={step.number} data-stage className="relative">
            <span className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-cyan/50 bg-[#02031a] font-mono text-xs text-cyan shadow-[0_0_24px_-6px_rgba(0,200,240,0.8)]">
              {step.number}
            </span>
            <h3 className="text-2xl font-semibold tracking-tight text-white">{step.title}</h3>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/60">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
