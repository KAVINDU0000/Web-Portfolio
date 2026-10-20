import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Card } from "@/components/ui/card";
import { StatusBadge, TagBadge } from "@/components/ui/badge";
import { ProjectMedia } from "./project-media";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Card interactive className="group relative flex h-full flex-col overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden border-b border-line bg-bg">
        <ProjectMedia project={project} priority={priority} />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StatusBadge status={project.status} />
          <p className="text-xs text-muted">{project.categories[0]}</p>
        </div>

        <h3 className="mt-5 text-[length:var(--text-title)] font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <li key={tech}>
              <TagBadge>{tech}</TagBadge>
            </li>
          ))}
        </ul>

        <p className="mt-auto pt-6">
          {/* The after: layer makes the whole card clickable while keeping one real link for keyboard users. */}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-text underline-offset-4 after:absolute after:inset-0 hover:text-cyan hover:underline"
          >
            View Case Study <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>
    </Card>
  );
}
