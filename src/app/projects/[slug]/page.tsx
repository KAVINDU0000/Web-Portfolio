import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/ui/cta-band";
import { StatusBadge, TagBadge } from "@/components/ui/badge";
import { PageHero } from "@/components/ui/page-hero";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectGallery } from "@/components/projects/project-gallery";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: false } };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

const sectionClass = "border-t border-line py-20 sm:py-28";
const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.22em] text-cyan";

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects.filter(
    (item) => item.slug !== project.slug && item.categories.some((category) => project.categories.includes(category)),
  );
  const isInDevelopment = project.status === "In Development";

  return (
    <>
      <PageHero eyebrow="Case study" title={project.title} description={project.summary}>
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          {project.categories.map((category) => (
            <TagBadge key={category}>{category}</TagBadge>
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-text"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to all projects
        </Link>
      </PageHero>

      <section aria-labelledby="media-heading" className="py-20 sm:py-28">
        <Container>
          <p className={eyebrowClass}>Screenshots</p>
          <h2 id="media-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
            Visual work
          </h2>
          <div className="mt-12">
            <ProjectGallery project={project} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="overview-heading" className={sectionClass}>
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={eyebrowClass}>Overview</p>
            <h2 id="overview-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
              About the project
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7 lg:col-start-6">
            <p>{project.overview}</p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="problem-heading" className={`${sectionClass} bg-bg-2`}>
        <Container className="grid gap-8 md:grid-cols-2">
          <Card className="p-8 sm:p-10">
            <p className={eyebrowClass}>The problem</p>
            <h2 id="problem-heading" className="mt-4 text-xl font-semibold">
              Business need
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{project.problem}</p>
          </Card>
          <Card className="p-8 sm:p-10">
            <p className={eyebrowClass}>The solution</p>
            <h2 className="mt-4 text-xl font-semibold">Proposed approach</h2>
            <p className="mt-4 leading-relaxed text-muted">{project.solution}</p>
          </Card>
        </Container>
      </section>

      <section aria-labelledby="features-heading" className={sectionClass}>
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={eyebrowClass}>Key features</p>
            <h2 id="features-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
              {isInDevelopment ? "Planned and in-progress features" : "Key features"}
            </h2>
            {isInDevelopment ? (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Features are listed as they are being built. Each one is confirmed as complete before it is described as available.
              </p>
            ) : null}
          </div>
          <ul className="grid gap-4 lg:col-span-7 lg:col-start-6">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-bg-2 p-6 leading-relaxed">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-cyan" />
                {feature}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="stack-heading" className={`${sectionClass} bg-bg-2`}>
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={eyebrowClass}>Technology stack</p>
            <h2 id="stack-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
              Built with
            </h2>
          </div>
          <ul className="flex flex-wrap content-start gap-3 lg:col-span-7 lg:col-start-6">
            {project.techStack.map((tech) => (
              <li key={tech}>
                <TagBadge>{tech}</TagBadge>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="status-heading" className={sectionClass}>
        <Container>
          <Card className="grid gap-6 p-8 sm:p-12 md:grid-cols-12 md:items-center">
            <div className="md:col-span-4">
              <p className={eyebrowClass}>Development status</p>
              <h2 id="status-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
                {project.status}
              </h2>
            </div>
            <p className="leading-relaxed text-muted md:col-span-7 md:col-start-6">
              {isInDevelopment
                ? "This project is under active development and has not been publicly launched. No launch date or live address has been published yet."
                : "Current status as listed above."}
            </p>
          </Card>
        </Container>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className={sectionClass}>
          <Container>
            <p className={eyebrowClass}>Related projects</p>
            <h2 id="related-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
              More work in these categories
            </h2>
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProjectCard project={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand
        title={`Want something similar to ${project.title}?`}
        description="Tell us about your business and the challenge you are facing."
      />
    </>
  );
}
