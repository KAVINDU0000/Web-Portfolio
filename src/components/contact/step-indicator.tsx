import { Check } from "lucide-react";

export type Step = 1 | 2 | 3;

const steps: { step: Step; label: string }[] = [
  { step: 1, label: "About you" },
  { step: 2, label: "Your project" },
  { step: 3, label: "Budget & review" },
];

// Visible progress for the enquiry form: numbered steps joined by a line. Completed steps show a check mark.
// The current step is announced with aria-current.
export function StepIndicator({ current }: { current: Step }) {
  return (
    <nav aria-label="Enquiry progress">
      <ol className="flex items-center">
        {steps.map(({ step, label }, index) => {
          const done = step < current;
          const active = step === current;
          return (
            <li key={step} aria-current={active ? "step" : undefined} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition duration-500 ${
                    done
                      ? "border-cyan bg-cyan text-[#02031a]"
                      : active
                        ? "border-cyan text-cyan shadow-[0_0_24px_-6px_rgba(0,200,240,0.8)]"
                        : "border-white/15 text-white/40"
                  }`}
                >
                  {done ? <Check aria-hidden="true" className="h-4 w-4" /> : <span className="font-mono">0{step}</span>}
                </span>
                <span className={`hidden text-sm sm:inline ${active ? "font-semibold text-white" : "text-white/50"}`}>
                  {label}
                  {done ? <span className="sr-only"> (completed)</span> : null}
                </span>
                <span className="sr-only sm:hidden">
                  {label}
                  {done ? " (completed)" : ""}
                </span>
              </div>
              {index < steps.length - 1 ? (
                <span aria-hidden="true" className={`mx-3 h-px flex-1 transition-colors duration-500 ${done ? "bg-cyan" : "bg-white/10"}`} />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
