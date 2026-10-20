import { ArrowUpRight, Check } from "lucide-react";
import type { PricingCategory, PricingPackage } from "@/data/pricing";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";

type PricingCardProps = {
  category: PricingCategory;
  pkg: PricingPackage;
};

// Link to the enquiry form with the service and package already selected.
export const quoteHref = (category: PricingCategory, pkg: PricingPackage) =>
  `/contact?${new URLSearchParams({ service: category.enquiryService, package: pkg.name }).toString()}`;

// Shows an approved price when one is set in data/pricing.ts. Otherwise it shows "Request a Quote".
export function PricingCard({ category, pkg }: PricingCardProps) {
  return (
    <Card className="flex h-full flex-col p-7 sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight">{pkg.name}</h3>
      <p className="mt-3 leading-relaxed text-muted">{pkg.description}</p>

      <div className="mt-7 border-y border-line py-6">
        {pkg.price ? (
          <p className="text-2xl font-semibold">
            <span className="text-sm font-medium text-muted">{pkg.price.currency} </span>
            {pkg.price.amount.toLocaleString("en-LK")}
            <span className="ml-2 text-sm font-normal text-muted">{pkg.price.billing}</span>
          </p>
        ) : (
          <p className="text-xl font-semibold text-cyan">Request a Quote</p>
        )}
        {pkg.deliveryEstimate ? <p className="mt-2 text-sm text-muted">Delivery: {pkg.deliveryEstimate}</p> : null}
      </div>

      <ul className="mt-6 space-y-3 text-sm">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
            <span className="text-text">{feature}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm leading-relaxed text-muted">
        <span className="font-semibold text-text">Ideal for: </span>
        {pkg.idealCustomer}
      </p>

      <div className="mt-auto pt-8">
        <ButtonLink href={quoteHref(category, pkg)} variant="secondary" className="w-full">
          Request a Quote for {pkg.name} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </ButtonLink>
      </div>
    </Card>
  );
}
