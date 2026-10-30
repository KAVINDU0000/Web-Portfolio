import { ChevronDown } from "lucide-react";
import { homeFaqs } from "@/data/home";
import { Container } from "@/components/ui/container";

// Native <details> accordion: keyboard and screen-reader support without JavaScript.
export function HomeFaq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">Common questions</p>
          <h2 id="faq-heading" className="mt-4 text-[length:var(--text-headline)] font-semibold leading-[1.08] tracking-tight text-balance">
            Before you get in touch.
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            Not sure what to expect? These answers cover the questions we hear most often.
          </p>
        </div>

        <ul className="divide-y divide-line rounded-[var(--radius-card)] border border-line bg-bg-2/70 lg:col-span-7 lg:col-start-6">
          {homeFaqs.map((item) => (
            <li key={item.question}>
              <details className="group p-6 sm:p-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-semibold text-text marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-cyan transition duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">{item.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
