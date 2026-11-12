import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Lock } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { StatusBadge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectMedia } from "@/components/projects/project-media";

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

const eyebrow = "text-xs font-semibold uppercase tracking-[0.22em] text-cyan";
const heading = "mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl";
const glassCard = "relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10";
const topEdge = "absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600";

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects.filter(
    (item) => item.slug !== project.slug && item.categories.some((category) => project.categories.includes(category)),
  );
  const isInDevelopment = project.status === "In Development";

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
      <section className="pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Container>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-cyan">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to all projects
          </Link>

          <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-cyan/20 bg-cyan/[0.06] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cyan/90">
            Case study
          </p>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-[length:var(--text-lead)] leading-relaxed text-white/60">{project.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            {project.categories.map((category) => (
              <span key={category} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                {category}
              </span>
            ))}
          </div>

          {project.liveUrl ? (
            <div className="mt-10">
              <ButtonLink href={project.liveUrl} external>
                Visit Live Site <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
            </div>
          ) : null}

          {/* Browser-style frame around the project's first screenshot, or the placeholder until one is approved. */}
          <div className="relative mt-16 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-2 shadow-[0_60px_120px_-40px_rgba(0,200,240,0.3)] backdrop-blur-xl">
            <div className="flex items-center gap-4 px-3 py-2.5">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <div className="mx-auto flex max-w-md flex-1 items-center justify-center gap-2 rounded-lg bg-white/[0.05] px-3 py-1.5 text-xs text-white/65">
                <Lock aria-hidden="true" className="h-3 w-3" />
                {project.liveUrl ? new URL(project.liveUrl).hostname.replace(/^www\./, "") : "Project preview"}
              </div>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#03041a]">
              <ProjectMedia project={project} sizes="(min-width: 1280px) 1200px, 100vw" priority />
            </div>
          </div>
        </Container>
      </section>

      {/* Screenshots */}
      <section aria-labelledby="media-heading" className="pb-24 sm:pb-32">
        <Container>
          <p className={eyebrow}>Screenshots</p>
          <h2 id="media-heading" className={heading}>
            Visual work
          </h2>
          <div className="mt-12">
            <ProjectGallery project={project} />
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section aria-labelledby="overview-heading" className="pb-24 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className={eyebrow}>Overview</p>
            <h2 id="overview-heading" className={heading}>
              About the project
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className={glassCard}>
              <span aria-hidden="true" className={topEdge} />
              <p className="text-lg leading-relaxed text-white/70">{project.overview}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem and solution */}
      <section aria-labelledby="problem-heading" className="pb-24 sm:pb-32">
        <Container className="grid gap-6 md:grid-cols-2">
          <div id="problem-heading" className={glassCard}>
            <span aria-hidden="true" className={topEdge} />
            <span className="font-mono text-sm text-cyan">01</span>
            <p className={`${eyebrow} mt-4`}>The problem</p>
            <h3 className="mt-3 text-xl font-semibold text-white">Business need</h3>
            <p className="mt-4 leading-relaxed text-white/60">{project.problem}</p>
          </div>
          <div className={glassCard}>
            <span aria-hidden="true" className={topEdge} />
            <span className="font-mono text-sm text-cyan">02</span>
            <p className={`${eyebrow} mt-4`}>The solution</p>
            <h3 className="mt-3 text-xl font-semibold text-white">Proposed approach</h3>
            <p className="mt-4 leading-relaxed text-white/60">{project.solution}</p>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section aria-labelledby="features-heading" className="pb-24 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className={eyebrow}>Key features</p>
            <h2 id="features-heading" className={heading}>
              {isInDevelopment ? "Planned and in-progress features" : "Key features"}
            </h2>
            {isInDevelopment ? (
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                Features are listed as they are being built. Each one is confirmed as complete before it is described as available.
              </p>
            ) : null}
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {project.features.map((feature, index) => (
              <li
                key={feature}
                className="group relative flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 leading-relaxed text-white/85 backdrop-blur-xl transition duration-500 hover:border-cyan/30"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan/20 via-indigo-500/15 to-violet-600/20 text-cyan ring-1 ring-inset ring-white/10">
                  <Check aria-hidden="true" className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-mono text-xs text-white/60">0{index + 1}</span>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Technology */}
      <section aria-labelledby="stack-heading" className="pb-24 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className={eyebrow}>Technology stack</p>
            <h2 id="stack-heading" className={heading}>
              Built with
            </h2>
          </div>
          <ul className="flex flex-wrap content-start gap-3 lg:col-span-8">
            {project.techStack.map((tech) => (
              <li key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 backdrop-blur">
                {tech}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Development status */}
      <section aria-labelledby="status-heading" className="pb-24 sm:pb-32">
        <Container>
          <div className={`${glassCard} grid gap-6 md:grid-cols-12 md:items-center`}>
            <span aria-hidden="true" className={topEdge} />
            <div className="md:col-span-4">
              <p className={eyebrow}>Development status</p>
              <h2 id="status-heading" className="mt-4 text-3xl font-semibold tracking-tight text-white">
                {project.status}
              </h2>
            </div>
            <p className="leading-relaxed text-white/60 md:col-span-7 md:col-start-6">
              {isInDevelopment
                ? "This project is under active development and has not been publicly launched. No launch date or live address has been published yet."
                : project.liveUrl
                  ? `This project is live and publicly available at ${project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}.`
                  : "Current status as listed above."}
            </p>
          </div>
        </Container>
      </section>

      {/* Related projects */}
      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="pb-24 sm:pb-32">
          <Container>
            <p className={eyebrow}>Related projects</p>
            <h2 id="related-heading" className={heading}>
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

      {/* Closing call to action */}
      <section aria-labelledby="case-cta-heading" className="pb-24 sm:pb-32">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-12">
            <span aria-hidden="true" className={topEdge} />
            <div aria-hidden="true" className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.15),transparent)]" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 id="case-cta-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Want something similar to {project.title}?
                </h2>
                <p className="mt-3 leading-relaxed text-white/60">Tell us about your business and the challenge you are facing.</p>
              </div>
              <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
                <ButtonLink href="/contact">Let&apos;s Discuss Your Project ↗</ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  Explore Our Services
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
