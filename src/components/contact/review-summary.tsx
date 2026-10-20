import type { EnquiryValues } from "@/lib/enquiry";
import type { Step } from "./step-indicator";

type ReviewSummaryProps = {
  values: EnquiryValues;
  onEdit: (step: Step) => void;
};

// Read-only review of everything entered so far, with a button to return to each step.
export function ReviewSummary({ values, onEdit }: ReviewSummaryProps) {
  const rows: { label: string; value: string; step: Step }[] = [
    { label: "Name", value: values.name, step: 1 },
    { label: "Business name", value: values.businessName || "Not provided", step: 1 },
    { label: "Email", value: values.email, step: 1 },
    { label: "Phone", value: values.phone || "Not provided", step: 1 },
    { label: "Service", value: values.service || "Not selected", step: 2 },
    { label: "Project", value: values.description || "Not provided", step: 2 },
  ];

  return (
    <section aria-labelledby="review-heading" className="rounded-[var(--radius-card)] border border-line bg-bg p-6">
      <h4 id="review-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan">
        Review your enquiry
      </h4>
      <dl className="mt-5 divide-y divide-line text-sm">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-2 py-3 sm:grid-cols-[10rem_1fr_auto] sm:items-start sm:gap-4">
            <dt className="text-muted">{row.label}</dt>
            <dd className="break-words whitespace-pre-line text-text">{row.value}</dd>
            <dd>
              <button
                type="button"
                onClick={() => onEdit(row.step)}
                className="min-h-9 text-xs font-semibold text-cyan underline-offset-4 hover:underline"
              >
                Edit<span className="sr-only"> {row.label.toLowerCase()}</span>
              </button>
            </dd>
          </div>
        ))}
        <div className="grid gap-2 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
          <dt className="text-muted">Budget</dt>
          <dd className="text-text">{values.budget || "Not selected"}</dd>
        </div>
      </dl>
    </section>
  );
}
