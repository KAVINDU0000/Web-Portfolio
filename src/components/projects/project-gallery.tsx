"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectMedia } from "./project-media";

type ProjectGalleryProps = {
  project: Project;
};

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
        <div className="aspect-[16/9] overflow-hidden rounded-[calc(var(--radius-card)*1.5)] border border-line bg-bg-2">
          <ProjectMedia project={project} sizes="(min-width: 1280px) 1200px, 100vw" priority />
        </div>
        <p className="text-sm text-muted">Screenshots will be published once they are approved for release.</p>
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
              className="group block w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-bg-2 transition duration-500 hover:border-line-strong"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                loading={shotIndex < 2 ? "eager" : "lazy"}
                className="h-auto w-full transition duration-700 ease-out-soft group-hover:scale-[1.01]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onKeyDown={handleKeyDown}
        onClose={() => openerRef.current?.focus()}
        aria-label={`${project.title} screenshots`}
        className="m-auto h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-text backdrop:bg-bg/90 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col gap-4 p-4 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted" aria-live="polite">
              {index + 1} / {shots.length}
            </p>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg transition hover:border-cyan hover:text-cyan"
            >
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
              className="max-h-full w-auto max-w-full rounded-[var(--radius-card)] object-contain"
            />
          </div>

          {shots.length > 1 ? (
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg transition hover:border-cyan hover:text-cyan"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Previous screenshot</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg transition hover:border-cyan hover:text-cyan"
              >
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
