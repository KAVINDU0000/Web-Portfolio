import { principles } from "@/data/home";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutPreview() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-16 border-t border-line bg-bg-2 py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Who we are"
              title="We Build Technology Around Possibility."
              description="GENMEDIA is a digital solutions and software development agency focused on helping businesses turn ideas into practical, user-focused digital experiences. We combine thoughtful design, modern engineering and emerging technologies to create solutions that simplify work and support sustainable growth."
            />
            <ButtonLink href="/about" variant="secondary" className="mt-10">
              Discover GENMEDIA ↗
            </ButtonLink>
          </div>

          <ol className="space-y-4 lg:col-span-5 lg:col-start-8">
            {principles.map((principle, index) => (
              <li key={principle.title} className="rounded-[var(--radius-card)] border border-line bg-bg p-7">
                <p className="font-mono text-xs text-cyan">0{index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold">{principle.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
