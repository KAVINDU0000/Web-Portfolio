import { ArrowUpRight, Check } from "lucide-react";
import type { PricingCategory, PricingPackage } from "@/data/pricing";
import { ButtonLink } from "@/components/ui/button-link";

type PricingCardProps = {
  category: PricingCategory;
  pkg: PricingPackage;
};

// Link to the enquiry form with the service and package already selected.
export const quoteHref = (category: PricingCategory, pkg: PricingPackage) =>
  `/contact?${new URLSearchParams({ service: category.enquiryService, package: pkg.name }).toString()}`;

// Glass package card. Shows an approved price when one is set in data/pricing.ts, otherwise "Request a Quote".
export function PricingCard({ category, pkg }: PricingCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_30px_80px_-30px_rgba(0,200,240,0.4)] sm:p-8">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600 opacity-50 transition duration-500 group-hover:opacity-100" />

      <h3 className="text-xl font-semibold tracking-tight text-white">{pkg.name}</h3>
      <p className="mt-3 leading-relaxed text-white/60">{pkg.description}</p>

      <div className="mt-7 border-y border-white/10 py-6">
        {pkg.price ? (
          <p className="text-2xl font-semibold text-white">
            <span className="text-sm font-medium text-white/60">{pkg.price.currency} </span>
            {pkg.price.amount.toLocaleString("en-LK")}
            <span className="ml-2 text-sm font-normal text-white/60">{pkg.price.billing}</span>
          </p>
        ) : (
          <p className="bg-linear-to-r from-cyan via-indigo-400 to-violet-500 bg-clip-text text-xl font-semibold text-transparent">
            Request a Quote
          </p>
        )}
        {pkg.deliveryEstimate ? <p className="mt-2 text-sm text-white/60">Delivery: {pkg.deliveryEstimate}</p> : null}
      </div>

      <ul className="mt-6 space-y-3 text-sm">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-cyan">
              <Check aria-hidden="true" className="h-3 w-3" />
            </span>
            <span className="text-white/85">{feature}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm leading-relaxed text-white/65">
        <span className="font-semibold text-white">Ideal for: </span>
        {pkg.idealCustomer}
      </p>

      <div className="mt-auto pt-8">
        <ButtonLink href={quoteHref(category, pkg)} className="w-full">
          Request a Quote for {pkg.name} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </ButtonLink>
      </div>
    </article>
  );
}
