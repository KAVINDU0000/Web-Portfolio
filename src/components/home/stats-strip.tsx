import { stats } from "@/data/home";
import { Container } from "@/components/ui/container";

// Four facts about how GENMEDIA works. Values describe the offer, not client results.
export function StatsStrip() {
  return (
    <section id="stats" aria-label="At a glance" className="border-y border-line bg-bg-2/70 backdrop-blur-sm">
      <Container>
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <li key={stat.label} className="flex items-center gap-5 bg-bg-2 px-2 py-8 sm:px-6 lg:py-10">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bg shadow-glow-cyan/0">
                  <Icon aria-hidden="true" className="h-6 w-6 text-cyan" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">{stat.label}</p>
                  <p className="mt-1 text-lg font-semibold leading-snug">{stat.value}</p>
                  <p className="mt-1 text-sm leading-snug text-muted">{stat.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
