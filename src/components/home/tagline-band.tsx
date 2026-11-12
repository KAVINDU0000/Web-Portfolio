"use client";

import { useRef } from "react";
import { stats } from "@/data/home";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { SpotlightCard } from "@/components/motion/spotlight-card";

const words = [
  { text: "Create.", color: "text-cyan" },
  { text: "Connect.", color: "text-violet" },
  { text: "Influence.", color: "text-pink" },
];

// Full-screen band on wide screens. Scrolling down pins it and slides the logo tagline and the four company facts sideways.
// Phones and reduced-motion visitors get the same content as a stacked column, so nothing depends on the animation.
export function TaglineBand() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Pinned sideways scroll only on wide screens without reduced motion. Elsewhere the band is a stacked column.
      const mm = gsap.matchMedia();
      // Numeric facts count up once when the band comes into view.
      section.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        if (Number.isNaN(target) || prefersReducedMotion()) return;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        });
      });

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    },
    { scope: ref },
  );

  // The block wrapper sits outside the page's flex column, so the pinned section's spacing is measured normally.
  return (
    <div className="relative w-full">
      <section
        ref={ref}
        aria-label="Our promise and key facts"
        className="relative isolate z-10 flex items-center overflow-hidden bg-transparent py-20 sm:py-28 lg:motion-safe:h-screen lg:motion-safe:py-0"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_20%_50%,rgba(32,217,244,0.10),transparent),radial-gradient(60%_80%_at_80%_50%,rgba(230,93,202,0.10),transparent)]" />

        <div
          ref={trackRef}
          className="mx-auto flex w-full max-w-[var(--container-page)] flex-col items-start gap-12 px-5 sm:px-8 lg:motion-safe:mx-0 lg:motion-safe:w-max lg:motion-safe:max-w-none lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-x-24 lg:motion-safe:pl-[6vw] lg:motion-safe:pr-[6vw]"
        >
          {words.map((word) => (
            <p
              key={word.text}
              className={`whitespace-nowrap text-[clamp(3.5rem,11vw,10rem)] font-semibold uppercase leading-none tracking-tight ${word.color}`}
            >
              {word.text}
            </p>
          ))}

          <ul className="flex w-full flex-col gap-5 lg:w-auto lg:flex-row lg:items-stretch lg:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const numeric = /^\d+$/.test(stat.value);
              return (
                <li key={stat.label} className="flex lg:w-[19rem] lg:shrink-0">
                  <SpotlightCard className="flex w-full">
                    <article className="group relative flex w-full flex-col gap-6 overflow-hidden rounded-[var(--radius-card)] border border-line bg-bg-2/70 p-7 transition duration-500 hover:border-line-strong sm:p-8">
                      {/* Gradient edge that brightens on hover. */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-violet to-pink opacity-40 transition duration-500 group-hover:opacity-100"
                      />

                      <div className="flex items-center justify-between">
                        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan/20 via-violet/15 to-pink/20 ring-1 ring-inset ring-white/10">
                          <Icon aria-hidden="true" className="h-5 w-5 text-cyan" />
                        </span>
                        <span aria-hidden="true" className="font-mono text-xs tracking-widest text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div>
                        <p className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">
                          <span aria-hidden="true" className="h-px w-6 bg-linear-to-r from-cyan to-pink" />
                          {stat.label}
                        </p>
                        <p className="mt-3 text-3xl font-semibold tracking-tight">
                          {numeric ? (
                            <span data-count={stat.value} className="tabular-nums">
                              {stat.value}
                            </span>
                          ) : (
                            <span className="text-accent">{stat.value}</span>
                          )}
                        </p>
                      </div>

                      <p className="mt-auto text-sm leading-relaxed text-muted">{stat.detail}</p>
                    </article>
                  </SpotlightCard>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
