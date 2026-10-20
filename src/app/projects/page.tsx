import type { Metadata } from "next";
import { getFeaturedProjects, projects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { ProjectBrowser } from "@/components/projects/project-browser";
import { ProjectCard } from "@/components/projects/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected GENMEDIA projects, including websites, business management systems and booking platforms. Project status is shown for every case study.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const featured = getFeaturedProjects()[0];

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Ideas turned into digital experiences."
        description="Each case study shows the problem, the approach and the current status. Projects still in development are labelled as such."
      />

      {featured ? (
        <section aria-labelledby="featured-heading" className="py-20 sm:py-28">
          <Container>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">Featured project</p>
            <h2 id="featured-heading" className="sr-only">
              Featured project
            </h2>
            <div className="mt-8 max-w-3xl">
              <ProjectCard project={featured} priority />
            </div>
          </Container>
        </section>
      ) : null}

      <section aria-labelledby="all-projects-heading" className="border-t border-line py-20 sm:py-28">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">All projects</p>
          <h2 id="all-projects-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
            Browse by category
          </h2>
          <div className="mt-10">
            <ProjectBrowser projects={projects} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Have a project in mind?"
        description="Tell us about the problem you want to solve and we will suggest a suitable approach."
      />
    </>
  );
}
