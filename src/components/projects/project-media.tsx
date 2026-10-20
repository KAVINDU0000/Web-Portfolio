import Image from "next/image";
import type { Project } from "@/data/projects";
import { RibbonArt } from "@/components/ui/ribbon-art";

type ProjectMediaProps = {
  project: Project;
  sizes?: string;
  priority?: boolean;
};

// Shows the first approved screenshot, or an intentional placeholder until one is supplied.
// The placeholder is never a stock photo, so it cannot be mistaken for a real screenshot.
export function ProjectMedia({ project, sizes = "(min-width: 768px) 50vw, 100vw", priority = false }: ProjectMediaProps) {
  const [cover] = project.screenshots;

  if (cover) {
    return (
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        sizes={sizes}
        priority={priority}
        className="h-full w-full object-cover object-top transition duration-700 ease-out-soft group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${project.title}: screenshot to be added`}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-bg-2"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="mesh-blob -left-16 -top-10 h-64 w-64 bg-cyan/30" />
        <div className="mesh-blob -bottom-16 right-0 h-72 w-72 bg-violet/35 [animation-delay:-7s]" />
      </div>
      <RibbonArt id={`ph-${project.slug}`} className="absolute inset-[8%] h-[84%] w-[84%] opacity-80" />
      <p className="relative rounded-full border border-line-strong bg-bg/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted backdrop-blur">
        Screenshot to be added
      </p>
    </div>
  );
}
