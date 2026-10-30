import { Nebula } from "@/components/layout/nebula";
import { Compass, Hammer, Rocket, Search, type LucideIcon } from "lucide-react";
import { processSteps } from "@/data/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const icons: LucideIcon[] = [Search, Compass, Hammer, Rocket];
const glows = [
  "shadow-[0_0_48px_-8px_rgba(32,217,244,0.55)] text-cyan",
  "shadow-[0_0_48px_-8px_rgba(136,114,255,0.6)] text-violet",
  "shadow-[0_0_48px_-8px_rgba(230,93,202,0.55)] text-pink",
  "shadow-[0_0_48px_-8px_rgba(32,217,244,0.55)] text-cyan",
];

// Connected timeline with glowing step icons. Steps reveal as they scroll into view, and the connecting line grows with scroll.
// All scroll effects are CSS-only (see globals.css); the steps are readable without them.
export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="relative isolate scroll-mt-16 py-24 sm:py-32">
      <Nebula tone="violet" className="-right-56 top-1/3 h-[38rem] w-[38rem]" />
      <Nebula tone="pink" className="-left-56 bottom-0 h-[28rem] w-[28rem]" />
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="How we work"
            title="From First Conversation to Real-World Impact."
            description={undefined}
          />
          <p className="max-w-sm text-muted leading-relaxed lg:text-right">
            A clear route from first conversation to a working solution, with agreed scope at every stage.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Decorative progress lines: horizontal between icon centres from md, vertical on mobile. */}
          <span
            aria-hidden="true"
            className="reveal-line-y absolute bottom-10 left-[2.75rem] top-10 w-px origin-top bg-linear-to-b from-cyan via-violet to-pink md:hidden"
          />
          <span
            aria-hidden="true"
            className="reveal-line-x absolute left-[12.5%] right-[12.5%] top-10 hidden h-px origin-left bg-linear-to-r from-cyan via-violet to-pink md:block"
          />

          <ol className="relative grid gap-12 md:grid-cols-4 md:gap-6">
            {processSteps.map((step, index) => {
              const Icon = icons[index];
              return (
                <li key={step.number} className="reveal-step flex items-start gap-6 md:flex-col md:items-center md:text-center">
                  <span
                    className={`relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bg-2 ${glows[index]}`}
                  >
                    <Icon aria-hidden="true" className="h-8 w-8" />
                    <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-bg font-mono text-[0.65rem] text-muted ring-1 ring-line-strong">
                      {step.number}
                    </span>
                  </span>
                  <div className="md:mt-2">
                    <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-3 max-w-xs leading-relaxed text-muted md:mx-auto">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-16 max-w-2xl text-sm text-muted">
          Timelines and outcomes depend on the agreed scope. We do not promise guaranteed business results.
        </p>
      </Container>
    </section>
  );
}
