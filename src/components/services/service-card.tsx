import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { Card } from "@/components/ui/card";

type ServiceCardProps = {
  service: Service;
  // Colour of the icon tile, cycled across the grid for rhythm.
  accent?: "cyan" | "violet" | "pink";
};

const accents = {
  cyan: "text-cyan border-cyan/30 bg-cyan/10 group-hover:border-cyan/70",
  violet: "text-violet border-violet/30 bg-violet/10 group-hover:border-violet/70",
  pink: "text-pink border-pink/30 bg-pink/10 group-hover:border-pink/70",
};

export function ServiceCard({ service, accent = "cyan" }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Card interactive className="group relative flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition duration-500 ${accents[accent]}`}>
          <Icon aria-hidden="true" className="h-6 w-6" />
        </span>
        <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-muted transition duration-300 group-hover:border-cyan group-hover:text-cyan">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <h3 className="mt-7 text-xl font-semibold tracking-tight">{service.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{service.cardText}</p>

      <p className="mt-6">
        <Link
          href={`/services/${service.slug}`}
          className="text-sm font-semibold text-text underline-offset-4 after:absolute after:inset-0 hover:text-cyan hover:underline"
        >
          Explore Service
        </Link>
      </p>
    </Card>
  );
}
