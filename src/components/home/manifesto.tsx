"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

// Each word starts dim and lights up as the section scrolls through the viewport. Words in the accent set take the logo gradient.
const sentence = "We don't build software for its own sake. Every screen, system and automation should make one part of your business easier to run, and your customers' lives a little simpler.";
const accents = new Set(["easier", "simpler."]);

// Scroll-scrubbed statement. The text is real HTML, so it is always readable; the scroll only changes its brightness.
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section || prefersReducedMotion()) return;
      const words = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-word]"));

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 80%", end: "bottom 45%", scrub: true },
      });
      words.forEach((word, index) => {
        tl.fromTo(word, { opacity: 0.14 }, { opacity: 1, duration: 1, ease: "none" }, index);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="Our approach" className="relative isolate overflow-hidden py-28 sm:py-40">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/15 blur-3xl" />
      <p className="mx-auto max-w-5xl px-5 text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.22] tracking-[-0.02em] text-balance sm:px-8">
        {sentence.split(" ").map((word, index, all) => {
          const plain = word.replace(/[^a-z]/gi, "").toLowerCase();
          const isAccent = accents.has(word.toLowerCase()) || accents.has(plain);
          return (
            <span key={`${word}-${index}`}>
              <span data-word className={isAccent ? "text-accent" : undefined}>
                {word}
              </span>
              {index < all.length - 1 ? " " : null}
            </span>
          );
        })}
      </p>
    </section>
  );
}
