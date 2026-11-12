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
      {/* Category tabs as a glass segmented control. The selected tab glows in the logo colours. */}
      <div
        role="tablist"
        aria-label="Service categories"
        className="-mx-5 flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-2 px-5 backdrop-blur-xl sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-2"
      >
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
              className={`min-h-11 shrink-0 rounded-xl px-5 text-sm font-medium transition duration-300 ${
                active
                  ? "bg-cyan/10 text-cyan shadow-[inset_0_0_0_1px_rgba(0,200,240,0.6),0_0_24px_-8px_rgba(0,200,240,0.7)]"
                  : "text-white/60 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div id="pricing-panel" role="tabpanel" aria-labelledby={`tab-${category.slug}`} tabIndex={0} className="mt-10 focus:outline-none">
        <PanelContent category={category} />
      </div>
    </div>
  );
}

function PanelContent({ category }: { category: PricingCategory }) {
  const count = category.packages.length;

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{category.title}</h2>
          <p className="mt-3 leading-relaxed text-white/60">{category.description}</p>
        </div>
        {count > 0 ? (
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/60">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan" />
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
        <div className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-dashed border-cyan/25 bg-white/[0.02] p-10 text-center backdrop-blur-xl">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.2),transparent)]" />
          <h3 className="relative text-xl font-semibold text-white">Packages for this category are being prepared</h3>
          <p className="relative mx-auto mt-3 max-w-md text-white/60">
            Describe what you need and we will prepare a tailored scope and quote.
          </p>
          <Link
            href={`/contact?${new URLSearchParams({ service: category.enquiryService }).toString()}`}
            className="relative mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-cyan px-6 text-sm font-semibold text-[#02031a] transition hover:shadow-[0_0_30px_-6px_rgba(0,200,240,0.7)]"
          >
            Request a quote <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      )}
    </>
  );
}
