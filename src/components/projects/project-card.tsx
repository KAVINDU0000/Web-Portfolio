import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { StatusBadge } from "@/components/ui/badge";
import { ProjectMedia } from "./project-media";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

// Glass project card: the screenshot in a framed well, the status and category, and a link to the case study.
// The after: layer makes the whole card clickable while keeping one real link for keyboard users.
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_30px_80px_-30px_rgba(0,200,240,0.4)]">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600 opacity-50 transition duration-500 group-hover:opacity-100" />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#03041a]">
        <ProjectMedia project={project} priority={priority} />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StatusBadge status={project.status} />
          <p className="text-xs text-white/60">{project.categories[0]}</p>
        </div>

        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-white/60">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <li key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
              {tech}
            </li>
          ))}
        </ul>

        <p className="mt-auto pt-6">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 after:absolute after:inset-0 hover:text-cyan hover:underline"
          >
            View Case Study <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>
    </article>
  );
}
