import { capabilities, technologies } from "@/data/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TagBadge } from "@/components/ui/badge";

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="scroll-mt-16 border-t border-line bg-bg-2 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our approach"
          title="Modern Technology. Meaningful Outcomes."
          description="We choose technology based on the problem we are solving, not simply because it is trending."
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <li key={capability.title} className="bg-bg p-7 transition duration-500 hover:bg-surface">
                <Icon aria-hidden="true" className="h-6 w-6 text-violet" />
                <h3 className="mt-6 text-base font-semibold">{capability.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{capability.text}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-12">
          <p className="text-sm text-muted">Technologies we work with, chosen per project</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <li key={tech}>
                <TagBadge>{tech}</TagBadge>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
