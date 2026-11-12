import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getFeaturedProjects, projects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
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
    // One navy background for the whole page, matching the other inner pages.
    <div className="relative isolate overflow-hidden bg-[#02031a]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,240,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,240,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_25%,transparent_75%,black)]" />
        <div className="absolute -left-40 top-[6%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.14),transparent)]" />
        <div className="absolute -right-40 top-[40%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.18),transparent)]" />
        <div className="absolute -left-40 bottom-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,120,240,0.14),transparent)]" />
      </div>

      {/* Hero */}
      <section className="pb-14 pt-32 sm:pb-20 sm:pt-40">
        <Container>
          <p className="inline-flex items-center gap-3 rounded-full border border-cyan/20 bg-cyan/[0.06] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cyan/90">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
            Portfolio
          </p>

          <h1 className="mt-7 max-w-4xl text-[clamp(2.75rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            Ideas turned into{" "}
            <span className="bg-[linear-gradient(90deg,#00C8F0,#0078F0_50%,#5028F0)] bg-clip-text text-transparent">digital experiences.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-white/60">
            Each case study shows the problem, the approach and the current status. Projects still in development are labelled as such.
          </p>
        </Container>
      </section>

      {featured ? (
        <section aria-labelledby="featured-heading" className="pb-20 sm:pb-28">
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

      <section aria-labelledby="all-projects-heading" className="border-t border-white/10 pb-20 pt-20 sm:pb-28 sm:pt-28">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">All projects</p>
          <h2 id="all-projects-heading" className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Browse by category
          </h2>
          <div className="mt-10">
            <ProjectBrowser projects={projects} />
          </div>
        </Container>
      </section>

      {/* Closing call to action */}
      <section aria-labelledby="projects-cta-heading" className="pb-24 sm:pb-32">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 sm:p-12">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600" />
            <div aria-hidden="true" className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.2),transparent)]" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 id="projects-cta-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Have a project in mind?
                </h2>
                <p className="mt-3 leading-relaxed text-white/60">
                  Tell us about the problem you want to solve and we will suggest a suitable approach.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
                <ButtonLink href="/contact">Let&apos;s Discuss Your Project ↗</ButtonLink>
                <Link href="/services" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-cyan hover:text-cyan">
                  Explore Our Services <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
