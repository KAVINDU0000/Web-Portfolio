"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { DeviceMockup } from "@/components/ui/device-mockup";
import { StatusBadge } from "@/components/ui/badge";
import { ProjectMedia } from "@/components/projects/project-media";
import { gsap, useGSAP } from "@/lib/gsap";

// Case study that plays out as you scroll. The section is pinned on large screens while the laptop rises and
// rotates into place, a progress line fills, and each feature of the project lights up in turn.
// Phones and reduced-motion visitors get the same content as a plain stacked layout, fully visible.
export function WorkShowcase() {
  const [project] = getFeaturedProjects();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const items = q("[data-feature]");
        const step = 0.8 / Math.max(items.length, 1);

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.8 },
        });

        tl.fromTo(
          q("[data-device]"),
          { scale: 0.55, rotationX: 30, y: 140, opacity: 0.1 },
          { scale: 1, rotationX: 0, y: 0, opacity: 1, duration: 1, ease: "none" },
          0,
        )
          .fromTo(q("[data-scan]"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, 0)
          .fromTo(q("[data-progress]"), { scaleY: 0 }, { scaleY: 1, duration: 1, ease: "none" }, 0);

        items.forEach((item, index) => {
          tl.fromTo(
            item,
            { opacity: 0.25, x: 28 },
            { opacity: 1, x: 0, duration: step * 1.2, ease: "power2.out" },
            0.1 + index * step,
          );
        });
      });
    },
    { scope: ref },
  );

  if (!project) return null;

  return (
    <section
      ref={ref}
      id="work"
      aria-labelledby="work-heading"
      className="relative isolate scroll-mt-16 lg:h-[260vh]"
    >
      <div className="relative overflow-hidden py-24 sm:py-32 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-0">
        <div
          aria-hidden="true"
          data-scan
          className="absolute inset-x-0 top-0 hidden h-px origin-left bg-linear-to-r from-cyan via-violet to-pink lg:block"
        />
        <div aria-hidden="true" className="absolute -right-40 top-1/3 -z-10 h-[32rem] w-[32rem] rounded-full bg-pink/15 blur-3xl" />

        <Container className="grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-muted">
              <span className="font-mono text-cyan">03</span>
              <span aria-hidden="true" className="h-px w-10 bg-linear-to-r from-cyan via-violet to-pink" />
              <span>Selected work</span>
            </p>
            <h2 id="work-heading" className="mt-6 text-[length:var(--text-headline)] font-semibold leading-[1.04] tracking-tight text-balance">
              Ideas Turned Into Digital Experiences.
            </h2>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <p className="text-sm text-muted">{project.categories[0]}</p>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted">{project.summary}</p>

            <div className="relative mt-8 pl-8">
              {/* Track and fill for the feature list. The fill grows with the scroll on large screens. */}
              <span aria-hidden="true" className="absolute bottom-1 left-[0.4rem] top-1 w-px bg-line-strong" />
              <span
                aria-hidden="true"
                data-progress
                className="absolute bottom-1 left-[0.4rem] top-1 w-px origin-top bg-linear-to-b from-cyan via-violet to-pink"
              />
              <ul className="grid gap-4">
                {project.features.slice(0, 5).map((feature, index) => (
                  <li key={feature} data-feature className="relative flex items-start gap-4 text-sm leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border border-cyan bg-bg ring-4 ring-bg"
                    />
                    <span className="font-mono text-xs text-cyan">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-text/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/projects/${project.slug}`}>
                View Case Study <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              {project.liveUrl ? (
                <ButtonLink href={project.liveUrl} variant="secondary" external>
                  Visit Live Site <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-7" style={{ perspective: 1400 }}>
            <div data-device className="will-change-transform">
              <DeviceMockup>
                <ProjectMedia project={project} sizes="(min-width: 1024px) 60vw, 100vw" />
              </DeviceMockup>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
