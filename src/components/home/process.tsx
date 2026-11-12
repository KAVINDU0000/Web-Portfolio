"use client";

import { useRef } from "react";
import { Compass, Hammer, Rocket, Search, type LucideIcon } from "lucide-react";
import { processSteps } from "@/data/home";
import { Container } from "@/components/ui/container";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/scroll-motion";

const icons: LucideIcon[] = [Search, Compass, Hammer, Rocket];
// One logo colour per step, in order: cyan, violet, pink, then cyan again for the launch.
const colours = ["#20D9F4", "#8872FF", "#E65DCA", "#20D9F4"];

// The connecting line fills as you scroll, and each step lights up in the logo colours as it is reached.
// The section is readable without motion: with reduced motion every step is already fully lit.
export function Process() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section || prefersReducedMotion()) return;
      const q = gsap.utils.selector(section);

      const stepEls = q("[data-step]");
      const iconEls = q("[data-step-icon]");
      const textEls = q("[data-step-text]");
      const track = q("[data-process-track]")[0];
      if (!track) return;
      gsap.set(textEls, { opacity: 0.3 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: track, start: "top 75%", end: "bottom 55%", scrub: 0.6 },
      });

      tl.fromTo(q("[data-line-x]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: stepEls.length }, 0)
        .fromTo(q("[data-line-y]"), { scaleY: 0 }, { scaleY: 1, ease: "none", duration: stepEls.length }, 0);

      stepEls.forEach((_, index) => {
        const colour = colours[index];
        tl.to(
          iconEls[index],
          { scale: 1.08, borderColor: colour, boxShadow: `0 0 48px -8px ${colour}`, duration: 0.6 },
          index,
        ).to(textEls[index], { opacity: 1, duration: 0.6 }, index);
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="process"
      aria-labelledby="process-heading"
      className="relative isolate scroll-mt-16 overflow-hidden py-24 sm:py-32"
    >
      <Container>
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-2/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan" />
              How we work
            </p>
            <h2 id="process-heading" className="mt-6 text-[length:var(--text-headline)] font-semibold leading-[1.06] tracking-tight text-balance">
              From First Conversation to Real-World Impact.
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-muted lg:text-right">
            A clear route from first conversation to a working solution, with agreed scope at every stage.
          </p>
        </Reveal>

        <div data-process-track className="relative mt-20">
          {/* Connecting lines in the logo gradient. The horizontal one shows from medium screens up, the vertical one on phones. */}
          <span
            aria-hidden="true"
            data-line-y
            className="absolute bottom-10 left-[2.75rem] top-10 w-px origin-top bg-linear-to-b from-cyan via-violet to-pink md:hidden"
          />
          <span
            aria-hidden="true"
            data-line-x
            className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px origin-left bg-linear-to-r from-cyan via-violet to-pink md:block"
          />

          <ol className="relative grid gap-12 md:grid-cols-4 md:gap-6">
            {processSteps.map((step, index) => {
              const Icon = icons[index];
              return (
                <li key={step.number} data-step className="flex items-start gap-6 md:flex-col md:items-center md:text-center">
                  <span
                    data-step-icon
                    className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bg-2"
                    style={{ color: colours[index] }}
                  >
                    <Icon aria-hidden="true" className="h-8 w-8" />
                    <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-bg font-mono text-[0.65rem] text-muted ring-1 ring-line-strong">
                      {step.number}
                    </span>
                  </span>
                  <div data-step-text className="md:mt-2">
                    <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-3 max-w-xs leading-relaxed text-muted md:mx-auto">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-16 max-w-2xl text-sm text-muted">
          Timelines and outcomes depend on the agreed scope. We do not promise guaranteed business results.
        </p>
      </Container>
    </section>
  );
}
