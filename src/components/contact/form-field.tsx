import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

// Label, control, hint and error for one form field. Callers pass aria-describedby and aria-invalid to the control.
export function FormField({ id, label, required = false, hint, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-pink">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-muted">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-pink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const controlClass =
  "min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-base text-white placeholder:text-white/35 transition duration-300 hover:border-white/25 focus:border-cyan focus:bg-cyan/[0.04] focus:outline-none focus:ring-4 focus:ring-cyan/15 aria-[invalid=true]:border-pink [&>option]:bg-[#02031a]";
