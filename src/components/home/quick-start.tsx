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
      className="rise mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-xl [--delay:400ms]"
    >
      <h2 id="quick-start-heading" className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-[0.18em] text-white/50">
        What do you need help with?
      </h2>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="quick-service" className="sr-only">
          Service of interest
        </label>
        <select
          id="quick-service"
          name="service"
          defaultValue=""
          className="min-h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#02031a] px-4 text-base text-white transition hover:border-cyan/40 focus:border-cyan focus:outline-none sm:flex-1"
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
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan px-6 text-sm font-semibold text-[#02031a] transition hover:shadow-[0_0_30px_-6px_rgba(0,200,240,0.7)]"
        >
          Start a quote
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
