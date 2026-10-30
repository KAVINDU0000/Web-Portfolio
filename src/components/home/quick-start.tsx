import { ArrowRight } from "lucide-react";
import { enquiryServices } from "@/lib/enquiry-options";

// Quick-start bar: pick a service and go straight to the enquiry form with it already selected.
// The form reads ?service= and only accepts known service names, so a plain GET form is enough.
export function QuickStart() {
  return (
    <form
      action="/contact#enquiry"
      method="get"
      aria-labelledby="quick-start-heading"
      className="rise mt-10 max-w-xl rounded-[var(--radius-card)] border border-line-strong bg-bg-2/70 p-4 backdrop-blur [--delay:400ms] sm:p-5"
    >
      <h2 id="quick-start-heading" className="text-sm font-semibold text-text">
        What do you need help with?
      </h2>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="quick-service" className="sr-only">
          Service of interest
        </label>
        <select
          id="quick-service"
          name="service"
          defaultValue=""
          className="min-h-12 w-full appearance-none rounded-[var(--radius-control)] border border-line-strong bg-bg px-4 text-base text-text transition hover:border-white/30 focus:border-cyan focus:outline-none sm:flex-1"
        >
          <option value="">Choose a service</option>
          {enquiryServices.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-cyan px-6 text-sm font-semibold text-bg transition hover:bg-cyan/90 hover:shadow-glow-cyan"
        >
          Start a quote
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
