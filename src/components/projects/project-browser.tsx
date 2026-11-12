"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { projectCategories, type Project, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./project-card";

type Filter = "All" | ProjectCategory;

const filters: Filter[] = ["All", ...projectCategories];

type ProjectBrowserProps = {
  projects: Project[];
};

// Category filter with an accessible toggle group, a responsive grid and an empty state.
export function ProjectBrowser({ projects }: ProjectBrowserProps) {
  const [active, setActive] = useState<Filter>("All");

  const visible = active === "All" ? projects : projects.filter((project) => project.categories.includes(active));

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-xl">
        {filters.map((filter) => {
          const pressed = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(filter)}
              className={`min-h-10 rounded-xl px-4 text-sm font-medium transition duration-300 ${
                pressed
                  ? "bg-cyan/10 text-cyan shadow-[inset_0_0_0_1px_rgba(0,200,240,0.6),0_0_24px_-8px_rgba(0,200,240,0.7)]"
                  : "text-white/60 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* The count is shown only when there are results, so an empty category never reads as a misleading total. */}
      <p className="mt-6 min-h-5 text-sm text-white/60" aria-live="polite">
        {visible.length > 0 ? `Showing ${visible.length} of ${projects.length} ${projects.length === 1 ? "project" : "projects"}` : null}
      </p>

      {visible.length > 0 ? (
        // Keyed on the filter so the grid re-runs its entrance transition when the category changes.
        <ul key={active} className="mt-6 grid gap-6 md:grid-cols-2">
          {visible.map((project, index) => (
            <li key={project.slug} className="rise" style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-dashed border-cyan/25 bg-white/[0.02] p-10 text-center backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white">No projects in this category yet</h3>
          <p className="mx-auto mt-3 max-w-md text-white/60">
            We are preparing more work for this category. You can view all projects, or tell us about the one you have in mind.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setActive("All")}
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-cyan hover:text-cyan"
            >
              Show all projects
            </button>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-[#02031a] transition hover:shadow-[0_0_30px_-6px_rgba(0,200,240,0.7)]"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
