import { ArrowUpRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { DeviceMockup } from "@/components/ui/device-mockup";
import { StatusBadge, TagBadge } from "@/components/ui/badge";
import { ProjectMedia } from "@/components/projects/project-media";
import { Nebula } from "@/components/layout/nebula";

// Split feature: copy on one side, the project's screen in a device frame on the other.
// Until approved screenshots exist, the frame shows the labelled placeholder rather than an invented screen.
export function FeaturedProjects() {
  const [project] = getFeaturedProjects();
  if (!project) return null;

  return (
    <section id="featured-projects" aria-labelledby="featured-heading" className="relative isolate scroll-mt-16 py-24 sm:py-32">
      <Nebula tone="pink" className="-right-48 top-1/4 h-[30rem] w-[30rem]" />
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="reveal-up lg:col-span-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-2/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Selected work
          </p>
          <h2 id="featured-heading" className="mt-6 text-[length:var(--text-headline)] font-semibold leading-[1.06] tracking-tight text-balance">
            Ideas Turned Into Digital Experiences.
          </h2>

          <article className="mt-10 rounded-[var(--radius-card)] border border-line bg-bg-2/70 p-7 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <p className="text-xs text-muted">{project.categories[0]}</p>
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li key={tech}>
                  <TagBadge>{tech}</TagBadge>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/projects/${project.slug}`}>
                View Case Study <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              {project.liveUrl ? (
                <ButtonLink href={project.liveUrl} variant="secondary" external>
                  Visit Live Site <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
              ) : (
                <ButtonLink href="/projects" variant="secondary">
                  See All Projects
                </ButtonLink>
              )}
            </div>
          </article>
        </div>

        <div className="reveal-up reveal-up-s1 lg:col-span-7">
          <DeviceMockup>
            <ProjectMedia project={project} />
          </DeviceMockup>
        </div>
      </Container>
    </section>
  );
}
