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
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const pressed = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(filter)}
              className={`min-h-10 rounded-full border px-4 text-sm font-medium transition duration-300 ${
                pressed
                  ? "border-cyan bg-cyan/10 text-cyan"
                  : "border-line-strong text-muted hover:border-cyan hover:text-text"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* The count is shown only when there are results, so an empty category never reads as a misleading total. */}
      <p className="mt-6 min-h-5 text-sm text-muted" aria-live="polite">
        {visible.length > 0
          ? `Showing ${visible.length} of ${projects.length} ${projects.length === 1 ? "project" : "projects"}`
          : null}
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
        <div className="mt-6 rounded-[var(--radius-card)] border border-dashed border-line-strong bg-bg-2 p-10 text-center">
          <h3 className="text-lg font-semibold">No projects in this category yet</h3>
          <p className="mx-auto mt-3 max-w-md text-muted">
            We are preparing more work for this category. You can view all projects, or tell us about the one you have in mind.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setActive("All")}
              className="min-h-11 rounded-full border border-line-strong px-5 text-sm font-semibold transition hover:border-cyan hover:text-cyan"
            >
              Show all projects
            </button>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 text-sm font-semibold text-bg transition hover:bg-cyan/90"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
