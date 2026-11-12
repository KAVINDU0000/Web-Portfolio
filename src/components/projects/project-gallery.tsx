"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectMedia } from "./project-media";

type ProjectGalleryProps = {
  project: Project;
};

const roundButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#070920]/80 text-white/80 transition hover:border-cyan hover:text-cyan";

// Responsive gallery. Thumbnails keep each screenshot's own aspect ratio, so nothing is stretched or cropped.
// Selecting one opens a native <dialog>, which handles focus trapping and Escape for us.
export function ProjectGallery({ project }: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const shots = project.screenshots;

  if (shots.length === 0) {
    return (
      <div className="space-y-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#03041a]">
          <ProjectMedia project={project} sizes="(min-width: 1280px) 1200px, 100vw" priority />
        </div>
        <p className="text-sm text-white/60">Screenshots will be published once they are approved for release.</p>
      </div>
    );
  }

  const open = (next: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setIndex(next);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const step = (delta: number) => setIndex((current) => (current + delta + shots.length) % shots.length);

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  const current = shots[index];

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2">
        {shots.map((shot, shotIndex) => (
          <li key={shot.src}>
            <button
              type="button"
              onClick={(event) => open(shotIndex, event.currentTarget)}
              aria-label={`Open screenshot ${shotIndex + 1} of ${shots.length}: ${shot.alt}`}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-2 transition duration-500 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_30px_80px_-30px_rgba(0,200,240,0.4)]"
            >
              <span className="block overflow-hidden rounded-xl">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  loading={shotIndex < 2 ? "eager" : "lazy"}
                  className="h-auto w-full transition duration-700 ease-out-soft group-hover:scale-[1.02]"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onKeyDown={handleKeyDown}
        onClose={() => openerRef.current?.focus()}
        aria-label={`${project.title} screenshots`}
        className="m-auto h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-white backdrop:bg-[#02031a]/90 backdrop:backdrop-blur-md"
      >
        <div className="flex h-full flex-col gap-4 p-4 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70" aria-live="polite">
              {index + 1} / {shots.length}
            </p>
            <button type="button" onClick={close} className={roundButton}>
              <X aria-hidden="true" className="h-5 w-5" />
              <span className="sr-only">Close screenshot viewer</span>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="max-h-full w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-[0_60px_120px_-40px_rgba(0,200,240,0.35)]"
            />
          </div>

          {shots.length > 1 ? (
            <div className="flex items-center justify-center gap-4">
              <button type="button" onClick={() => step(-1)} className={roundButton}>
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Previous screenshot</span>
              </button>
              <button type="button" onClick={() => step(1)} className={roundButton}>
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Next screenshot</span>
              </button>
            </div>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
