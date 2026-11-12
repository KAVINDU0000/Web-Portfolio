"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Lock, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Draggable, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { StatusBadge } from "@/components/ui/badge";
import { ProjectMedia } from "@/components/projects/project-media";

// Starting positions for the cards, spread across the browser canvas. Left is clamped so cards never start off-screen.
const slots = [
  { left: "3%", top: "8%", rotate: -3 },
  { left: "36%", top: "5%", rotate: 2 },
  { left: "68%", top: "11%", rotate: -2 },
  { left: "14%", top: "56%", rotate: 2 },
  { left: "50%", top: "52%", rotate: -1.5 },
];

type Item = { kind: "project"; project: Project } | { kind: "placeholder" };

// Browser playground: each site is a card you can drag and throw. The throw keeps its momentum and stops at the edges.
// A short click (not a drag) opens a preview with a link to the live site. Reduced-motion visitors get the same cards, static.
export function WorkPlayground() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const draggedCards = useRef(new WeakSet<HTMLElement>());
  const [active, setActive] = useState<Project | null>(null);

  // Five slots: one per site, with placeholder cards for the rest until more sites are added.
  const items: Item[] = Array.from({ length: Math.max(5, projects.length) }, (_, index) =>
    index < projects.length ? { kind: "project", project: projects[index] } : { kind: "placeholder" },
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;
    const cards = Array.from(canvas.querySelectorAll<HTMLElement>("[data-card]"));
    const dragged = draggedCards.current;

    const instances = Draggable.create(cards, {
      type: "x,y",
      bounds: canvas,
      inertia: true,
      edgeResistance: 0.85,
      zIndexBoost: true,
      onPress() {
        dragged.delete(this.target as HTMLElement);
      },
      onDrag() {
        dragged.add(this.target as HTMLElement);
      },
    });

    return () => instances.forEach((instance) => instance.kill());
  }, []);

  // Clicks that followed a drag are ignored, so throwing a card never opens it.
  function handleCardClick(element: HTMLElement, open: () => void) {
    if (draggedCards.current.has(element)) {
      draggedCards.current.delete(element);
      return;
    }
    open();
  }

  return (
    <section id="work" aria-labelledby="work-heading" className="relative isolate scroll-mt-16 overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute -right-40 top-1/3 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.25),transparent)]" />

      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-white/65">
              <span className="font-mono text-cyan">03</span>
              <span aria-hidden="true" className="h-px w-10 bg-linear-to-r from-cyan to-indigo-500" />
              <span>Selected work</span>
            </p>
            <h2 id="work-heading" className="mt-6 text-[length:var(--text-headline)] font-semibold leading-[1.04] tracking-tight text-balance text-white">
              Ideas Turned Into Digital Experiences.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/65 lg:text-right">
            Drag the sites around and throw them. Click one to preview it.
          </p>
        </div>

        {/* Glass browser window. */}
        <div className="relative mt-12 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-2 shadow-[0_60px_120px_-40px_rgba(0,200,240,0.3)]">
          <div className="flex items-center gap-4 px-3 py-2.5">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <span className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/80">Selected work</span>
            <div className="mx-auto hidden max-w-md flex-1 items-center justify-center gap-2 rounded-lg bg-white/[0.05] px-3 py-1.5 text-xs text-white/65 sm:flex">
              <Lock aria-hidden="true" className="h-3 w-3" />
              Drag to explore · click to preview
            </div>
          </div>

          <div
            ref={canvasRef}
            className="relative h-[30rem] overflow-hidden rounded-xl bg-[#03041a] bg-[linear-gradient(rgba(0,200,240,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,240,0.05)_1px,transparent_1px)] bg-[size:40px_40px] lg:h-[36rem]"
          >
            {items.map((item, index) => {
              const slot = slots[index % slots.length];
              const style = {
                left: `min(${slot.left}, calc(100% - 17rem))`,
                top: slot.top,
                transform: `rotate(${slot.rotate}deg)`,
              };

              if (item.kind === "placeholder") {
                return (
                  <Link
                    key={`placeholder-${index}`}
                    href="/contact"
                    data-card
                    style={style}
                    onClick={(event) => {
                      const el = event.currentTarget;
                      if (draggedCards.current.has(el)) {
                        event.preventDefault();
                        draggedCards.current.delete(el);
                      }
                    }}
                    className="absolute flex w-[17rem] cursor-grab flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-cyan/30 bg-cyan/[0.04] p-6 text-center active:cursor-grabbing"
                  >
                    <span className="text-sm font-semibold text-white/85">Next is your site.</span>
                    <span className="text-xs text-white/60">Click here to start a conversation</span>
                  </Link>
                );
              }

              const { project } = item;
              return (
                <button
                  key={project.slug}
                  type="button"
                  data-card
                  style={style}
                  aria-label={`Preview ${project.title}`}
                  onClick={(event) => handleCardClick(event.currentTarget, () => setActive(project))}
                  className="absolute w-[17rem] cursor-grab select-none rounded-2xl border border-white/15 bg-[#0a0c24]/85 p-2 text-left shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)] transition-shadow duration-300 hover:border-cyan/50 hover:shadow-[0_0_40px_-8px_rgba(0,200,240,0.5)] active:cursor-grabbing"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#03041a]">
                    <ProjectMedia project={project} sizes="17rem" />
                  </div>
                  <p className="mt-3 px-1 pb-1 text-sm font-medium text-white/85">{project.title}</p>
                </button>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Portalled to <body> so the draggable cards (z-index boosted by GSAP) can never paint above the preview. */}
      {active ? createPortal(<ProjectPreview project={active} onClose={() => setActive(null)} />, document.body) : null}
    </section>
  );
}

// Preview opened from a card: the screenshot in a browser frame, with the project details and actions beside it.
// It fades in and rises gently. Escape or a click outside closes it.
function ProjectPreview({ project, onClose }: { project: Project; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
      gsap.from(panelRef.current, { y: 28, scale: 0.97, opacity: 0, duration: 0.6, ease: "power3.out" });
    },
    { scope: overlayRef },
  );

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Keep the page behind the preview from scrolling while it is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const domain = project.liveUrl ? new URL(project.liveUrl).hostname.replace(/^www\./, "") : "Project preview";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex cursor-auto items-center justify-center bg-[#02031a]/85 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070920]/95 shadow-[0_80px_160px_-40px_rgba(0,200,240,0.35)] ring-1 ring-white/5"
      >
        {/* Gradient hairline along the top edge. */}
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600" />

        {/* Window header: dots, address, and close. */}
        <div className="flex items-center gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <div className="mx-auto flex min-w-0 max-w-md flex-1 items-center justify-center gap-2 rounded-lg bg-white/[0.05] px-3 py-1.5 text-xs text-white/60">
            <Lock aria-hidden="true" className="h-3 w-3 shrink-0 text-cyan" />
            <span className="truncate">{domain}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-cyan hover:text-cyan"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.35fr_1fr]">
          {/* Screenshot. */}
          <div className="bg-[#03041a] p-4 sm:p-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-white/10">
              <ProjectMedia project={project} sizes="(min-width: 1024px) 60vw, 100vw" priority />
            </div>
          </div>

          {/* Details and actions. */}
          <div className="flex flex-col gap-6 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="text-xs text-white/60">{project.categories[0]}</span>
            </div>

            <div>
              <h3 id="preview-title" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{project.summary}</p>
            </div>

            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/60">Built with</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.techStack.slice(0, 6).map((tech) => (
                  <li key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/75">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-2">
              {project.liveUrl ? (
                <ButtonLink href={project.liveUrl} external className="w-full !bg-cyan !text-[#02031a]">
                  Visit live site <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
              ) : null}
              <ButtonLink href={`/projects/${project.slug}`} variant="secondary" className="w-full !border-white/15 !text-white hover:!border-cyan hover:!text-cyan">
                View case study
              </ButtonLink>
              {project.liveUrl ? <p className="text-center text-xs text-white/60">Opens the live site in a new tab</p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
