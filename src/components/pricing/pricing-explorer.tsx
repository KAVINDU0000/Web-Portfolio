"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pricingCategories, type PricingCategory } from "@/data/pricing";
import { PricingCard } from "./pricing-card";

// Accessible tabs: arrow keys move between categories, Home and End jump to the ends.
// Only the selected tab sits in the tab order, and the panel updates without a page reload.
export function PricingExplorer() {
  const [selected, setSelected] = useState(pricingCategories[0].slug);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const category = pricingCategories.find((item) => item.slug === selected) ?? pricingCategories[0];

  const select = (slug: string, focus = false) => {
    setSelected(slug);
    if (focus) tabRefs.current[slug]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = pricingCategories.length - 1;
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") nextIndex = index === 0 ? last : index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = last;
    if (nextIndex === null) return;

    event.preventDefault();
    select(pricingCategories[nextIndex].slug, true);
  };

  return (
    <div>
      <div role="tablist" aria-label="Service categories" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {pricingCategories.map((item, index) => {
          const active = item.slug === category.slug;
          return (
            <button
              key={item.slug}
              ref={(node) => {
                tabRefs.current[item.slug] = node;
              }}
              id={`tab-${item.slug}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="pricing-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => select(item.slug)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition duration-300 ${
                active ? "border-cyan bg-cyan/10 text-cyan" : "border-line-strong text-muted hover:border-cyan hover:text-text"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div
        id="pricing-panel"
        role="tabpanel"
        aria-labelledby={`tab-${category.slug}`}
        tabIndex={0}
        className="mt-10 focus:outline-none"
      >
        <PanelContent category={category} />
      </div>
    </div>
  );
}

function PanelContent({ category }: { category: PricingCategory }) {
  const count = category.packages.length;

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-[length:var(--text-title)] font-semibold tracking-tight">{category.title}</h2>
          <p className="mt-3 leading-relaxed text-muted">{category.description}</p>
        </div>
        {count > 0 ? (
          <p className="text-sm text-muted">
            {count} {count === 1 ? "package" : "packages"} · Request a quote for the closest fit
          </p>
        ) : null}
      </div>

      {count > 0 ? (
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {category.packages.map((pkg) => (
            <li key={pkg.id} className="flex">
              <PricingCard category={category} pkg={pkg} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-line-strong bg-bg-2 p-10 text-center">
          <h3 className="text-lg font-semibold">Packages for this category are being prepared</h3>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Describe what you need and we will prepare a tailored scope and quote.
          </p>
          <Link
            href={`/contact?${new URLSearchParams({ service: category.enquiryService }).toString()}`}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-cyan px-6 text-sm font-semibold text-bg transition hover:bg-cyan/90"
          >
            Request a quote <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      )}
    </>
  );
}
