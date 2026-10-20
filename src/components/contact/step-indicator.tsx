export type Step = 1 | 2 | 3;

const steps: { step: Step; label: string }[] = [
  { step: 1, label: "About you" },
  { step: 2, label: "Your project" },
  { step: 3, label: "Budget & review" },
];

// Visible progress for the enquiry form. The current step is announced with aria-current.
export function StepIndicator({ current }: { current: Step }) {
  return (
    <nav aria-label="Enquiry progress">
      <ol className="grid grid-cols-3 gap-2">
        {steps.map(({ step, label }) => {
          const done = step < current;
          const active = step === current;
          return (
            <li key={step} aria-current={active ? "step" : undefined} className="flex flex-col gap-2">
              <span
                className={`h-1 rounded-full transition-colors ${done || active ? "bg-cyan" : "bg-line-strong"} ${active ? "" : "opacity-80"}`}
              />
              <span className={`text-xs sm:text-sm ${active ? "font-semibold text-text" : "text-muted"}`}>
                <span className="font-mono">0{step}</span>
                <span className="hidden sm:inline"> · {label}</span>
                <span className="sr-only sm:hidden"> {label}</span>
                {done ? <span className="sr-only"> (completed)</span> : null}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
