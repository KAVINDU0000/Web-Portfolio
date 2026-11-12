"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { company } from "@/lib/site";

const headline = ["We", "build", "technology", "around"];

const pillars = [
  { text: "Create.", color: "text-cyan" },
  { text: "Connect.", color: "text-violet-400" },
  { text: "Influence.", color: "text-indigo-400" },
];

// Full-screen About hero. The headline rises word by word, three logo-coloured ribbons draw across the screen as the
// visitor scrolls, the outlined wordmark drifts sideways, and the logo medallion sits in a slowly turning orbit.
// Without JavaScript, or with reduced motion, everything sits in its final position.
export function AboutHero({ description }: { description: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section || prefersReducedMotion()) return;
      const q = gsap.utils.selector(section);

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(q("[data-medallion]"), { scale: 0.6, opacity: 0, duration: 1.2 }, 0)
        .from(q("[data-word]"), { yPercent: 115, duration: 1.1, stagger: 0.08 }, 0.2)
        .from(q("[data-fade]"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.6)
        .from(q("[data-pillar]"), { y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: "back.out(1.6)" }, 1);

      // Ribbons draw from left to right as the hero scrolls out of view.
      gsap.fromTo(
        q("[data-ribbon]"),
        { drawSVG: "0% 0%" },
        {
          drawSVG: "0% 100%",
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
        },
      );

      // The outlined wordmark drifts sideways for a layered feel.
      gsap.to(q("[data-outline]"), {
        xPercent: -22,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to(q("[data-orbit]"), { rotate: 360, duration: 30, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="about-heading" className="relative isolate flex min-h-[92svh] items-center overflow-hidden pb-20 pt-28">
      {/* Navy field with light from the logo. Decorative only. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#02031a]" />
      <div aria-hidden="true" className="absolute -left-40 -top-40 -z-10 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.2),transparent)]" />
      <div aria-hidden="true" className="absolute -right-40 bottom-0 -z-10 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.26),transparent)]" />

      {/* Ribbon artwork in the logo gradient, drawn on scroll. */}
      <svg aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
        <defs>
          <linearGradient id="about-hero-ribbon" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00C8F0" />
            <stop offset="0.5" stopColor="#0078F0" />
            <stop offset="1" stopColor="#5028F0" />
          </linearGradient>
        </defs>
        <path data-ribbon d="M-50 720 C 300 520, 520 900, 760 560 S 1200 180, 1500 420" stroke="url(#about-hero-ribbon)" strokeWidth="26" strokeLinecap="round" opacity="0.55" />
        <path data-ribbon d="M-50 260 C 260 420, 560 60, 820 300 S 1260 700, 1500 120" stroke="url(#about-hero-ribbon)" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
        <path data-ribbon d="M300 920 C 520 700, 900 820, 1500 600" stroke="url(#about-hero-ribbon)" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      </svg>

      {/* Oversized outlined wordmark behind the headline. Decorative only. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none overflow-hidden whitespace-nowrap text-[18vw] font-semibold uppercase leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
        <span data-outline className="inline-block">
          GENMEDIA GENMEDIA GENMEDIA
        </span>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 text-center sm:px-8">
        {/* Logo medallion with a slowly turning dashed ring. */}
        <div data-medallion className="relative flex h-28 w-28 items-center justify-center">
          <span data-orbit aria-hidden="true" className="absolute inset-0 rounded-full border border-dashed border-cyan/40" />
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#070920]/80 ring-1 ring-white/10">
            <Image src="/brand/genmedia-logo-transparent.png" alt="GENMEDIA logo" width={975} height={545} sizes="80px" className="h-auto w-12" />
          </span>
        </div>

        <p data-fade className="mt-8 inline-flex items-center gap-3 rounded-full border border-cyan/20 bg-cyan/[0.06] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cyan/90">
          About GENMEDIA
        </p>

        <h1 id="about-heading" className="mt-6 text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
          {headline.map((word) => (
            <span key={word} className="inline-block overflow-hidden align-top">
              <span data-word className="inline-block">
                {word}&nbsp;
              </span>
            </span>
          ))}
          <br />
          <span className="inline-block overflow-hidden align-top">
            <span data-word className="inline-block bg-[linear-gradient(90deg,#00C8F0,#0078F0_50%,#5028F0)] bg-clip-text pr-[0.08em] text-transparent">
              possibility.
            </span>
          </span>
        </h1>

        <p data-fade className="mx-auto mt-8 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-white/60">
          {description}
        </p>

        <div data-fade className="mt-10 flex flex-wrap justify-center gap-3">
          {pillars.map((pillar) => (
            <span
              key={pillar.text}
              data-pillar
              className={`rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] ${pillar.color}`}
            >
              {pillar.text}
            </span>
          ))}
        </div>

        <p data-fade className="mt-10 bg-linear-to-r from-cyan via-violet-500 to-indigo-500 bg-clip-text text-xs font-semibold tracking-[0.3em] text-transparent">
          {company.tagline}
        </p>
      </div>

      <span aria-hidden="true" className="absolute bottom-8 left-1/2 h-12 w-px -translate-x-1/2 bg-linear-to-b from-cyan to-transparent" />
    </section>
  );
}
