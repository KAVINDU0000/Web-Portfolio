"use client";

import Link from "next/link";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { budgetRanges, enquiryServices, isEnquiryService } from "@/lib/enquiry-options";
import {
  emptyEnquiry,
  stepFields,
  submitEnquiry,
  validateAll,
  validateFields,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
} from "@/lib/enquiry";
import { controlClass, FormField } from "./form-field";
import { StepIndicator, type Step } from "./step-indicator";
import { ReviewSummary } from "./review-summary";
import { EnquiryResultDialog, type ResultStatus } from "./enquiry-result-dialog";

type SubmitState = "idle" | "submitting" | "not-connected" | "sent" | "error";

const stepTitles: Record<Step, string> = {
  1: "About you",
  2: "Your project",
  3: "Budget and review",
};

// Three-step enquiry form. Values live in React state until the visitor submits them to /api/enquiry.
export function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") ?? "";
  const packageParam = searchParams.get("package") ?? "";

  const [values, setValues] = useState<EnquiryValues>(() => ({
    ...emptyEnquiry,
    service: isEnquiryService(serviceParam) ? serviceParam : "",
    packageName: packageParam.slice(0, 120),
  }));
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [step, setStep] = useState<Step>(1);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const submittingRef = useRef(false);

  // The result popup shows for sent, failed and not-connected outcomes. Closing it after a send starts a fresh enquiry.
  const dialogStatus: ResultStatus | null =
    submitState === "sent" || submitState === "error" || submitState === "not-connected" ? submitState : null;

  const closeDialog = () => {
    if (submitState === "sent") {
      setValues({ ...emptyEnquiry });
      setErrors({});
      setStep(1);
    }
    setSubmitState("idle");
  };

  const update = (field: EnquiryField) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    // Clear a field's error as soon as the visitor edits it, so the message does not linger.
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const describedBy = (field: EnquiryField, hasHint?: boolean) => {
    if (errors[field]) return `${field}-error`;
    if (hasHint) return `${field}-hint`;
    return undefined;
  };

  const invalid = (field: EnquiryField) => (errors[field] ? true : undefined);

  // Move keyboard focus to the new step's heading so screen reader and keyboard users land at the start of the step.
  const goToStep = (next: Step) => {
    setStep(next);
    setErrors({});
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const focusFirstInvalid = () => {
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
  };

  const continueFrom = (current: Step) => {
    // Step 3 finishes with the submit button, so there is nothing to continue to from there.
    if (current === 3) return;
    const nextErrors = validateFields(values, stepFields[current]);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid();
      return;
    }
    goToStep((current + 1) as Step);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Block repeat submissions before React re-renders the disabled button.
    if (submittingRef.current) return;

    const nextErrors = validateAll(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // Send the visitor back to the earliest step that has a problem.
      const firstStep: Step = stepFields[1].some((field) => nextErrors[field]) ? 1 : stepFields[2].some((field) => nextErrors[field]) ? 2 : 3;
      if (firstStep !== step) setStep(firstStep);
      focusFirstInvalid();
      return;
    }

    submittingRef.current = true;
    setSubmitState("submitting");
    try {
      const result = await submitEnquiry(values);
      if (result.status === "invalid") {
        // The server found problems the browser missed: show them on their fields and return to the first step with one.
        setSubmitState("idle");
        setErrors(result.errors);
        const firstStep: Step = stepFields[1].some((field) => result.errors[field])
          ? 1
          : stepFields[2].some((field) => result.errors[field])
            ? 2
            : 3;
        setStep(firstStep);
        focusFirstInvalid();
      } else {
        setSubmitState(result.status);
      }
    } catch {
      setSubmitState("error");
    } finally {
      submittingRef.current = false;
    }
  }

  const submitting = submitState === "submitting";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-labelledby="enquiry-heading" className="space-y-8">
      <StepIndicator current={step} />

      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/[0.06] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cyan">
          Step {step} of 3
        </span>
        <h3 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-semibold tracking-tight text-white focus:outline-none sm:text-3xl">
          {stepTitles[step]}
        </h3>
        <p className="mt-2 text-sm text-muted">
          Fields marked <span className="text-pink">*</span> are required.
        </p>
      </div>

      {step === 1 ? (
        <fieldset className="grid gap-6 sm:grid-cols-2">
          <legend className="sr-only">About you</legend>
          <FormField id="name" label="Name" required error={errors.name}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={update("name")}
              aria-invalid={invalid("name")}
              aria-describedby={describedBy("name")}
              className={controlClass}
            />
          </FormField>

          <FormField id="businessName" label="Business name">
            <input
              id="businessName"
              name="businessName"
              type="text"
              autoComplete="organization"
              value={values.businessName}
              onChange={update("businessName")}
              className={controlClass}
            />
          </FormField>

          <FormField id="email" label="Email" required error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={values.email}
              onChange={update("email")}
              aria-invalid={invalid("email")}
              aria-describedby={describedBy("email")}
              className={controlClass}
            />
          </FormField>

          <FormField id="phone" label="Phone" hint="Include your country code if you are outside Sri Lanka." error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={update("phone")}
              aria-invalid={invalid("phone")}
              aria-describedby={describedBy("phone", true)}
              className={controlClass}
            />
          </FormField>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="space-y-6">
          <legend className="sr-only">Your project</legend>
          {values.packageName ? (
            <p className="rounded-[var(--radius-control)] border border-cyan/40 bg-cyan/5 px-4 py-3 text-sm">
              Quote requested for: <span className="font-semibold">{values.packageName}</span>
            </p>
          ) : null}

          <FormField id="service" label="Service of interest" required error={errors.service}>
            <select
              id="service"
              name="service"
              required
              value={values.service}
              onChange={update("service")}
              aria-invalid={invalid("service")}
              aria-describedby={describedBy("service")}
              className={`${controlClass} appearance-none`}
            >
              <option value="">Choose a service</option>
              {enquiryServices.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="description"
            label="What are you planning to build, or what challenge would you like us to solve?"
            required
            hint="Between 20 and 2,000 characters. The more detail, the more useful our first reply."
            error={errors.description}
          >
            <textarea
              id="description"
              name="description"
              rows={7}
              required
              value={values.description}
              onChange={update("description")}
              aria-invalid={invalid("description")}
              aria-describedby={describedBy("description", true)}
              className={`${controlClass} min-h-44 py-3 leading-relaxed`}
            />
          </FormField>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <>
          <fieldset aria-describedby={errors.budget ? "budget-error" : undefined} className="space-y-3">
            <legend className="text-sm font-medium text-text">
              Estimated budget <span aria-hidden="true" className="text-pink">*</span>
            </legend>
            <p className="text-xs text-muted">
              A range helps us plan the first conversation. It does not guarantee a solution or a final quote.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {budgetRanges.map((range) => (
                <label
                  key={range}
                  className="group flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm transition duration-300 hover:border-cyan/40 hover:bg-white/[0.04] has-[:checked]:border-cyan has-[:checked]:bg-cyan/[0.07] has-[:checked]:shadow-[0_0_30px_-12px_rgba(0,200,240,0.7)]"
                >
                  {/* The radio stays in the form for keyboard and screen reader users; the dot below is the visible control. */}
                  <input
                    type="radio"
                    name="budget"
                    value={range}
                    checked={values.budget === range}
                    onChange={update("budget")}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/30 transition duration-300 peer-checked:border-cyan peer-focus-visible:ring-2 peer-focus-visible:ring-cyan/50"
                  >
                    <span className="h-2 w-2 rounded-full bg-cyan opacity-0 transition duration-300 peer-checked:opacity-100" />
                  </span>
                  <span className="text-white/90">{range}</span>
                </label>
              ))}
            </div>
            {errors.budget ? (
              <p id="budget-error" className="text-sm text-pink">
                {errors.budget}
              </p>
            ) : null}
          </fieldset>

          <ReviewSummary values={values} onEdit={(target) => goToStep(target)} />
        </>
      ) : null}

      <p className="text-xs leading-relaxed text-muted">
        We use your details only to reply to your enquiry. Read our{" "}
        <Link href="/privacy-policy" className="text-text underline underline-offset-4 hover:text-cyan">
          privacy policy
        </Link>
        .
      </p>

      <div className="flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => goToStep((step - 1) as Step)}
            disabled={submitting}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-line-strong px-6 text-sm font-semibold transition hover:border-cyan hover:text-cyan disabled:opacity-50"
          >
            Back
          </button>
        ) : (
          <span aria-hidden="true" />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={() => continueFrom(step)}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-cyan px-8 text-sm font-semibold text-bg transition hover:bg-cyan/90"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-cyan px-8 text-sm font-semibold text-bg transition hover:bg-cyan/90 disabled:cursor-wait disabled:opacity-70"
          >
            {submitting ? "Submitting…" : "Submit enquiry"}
          </button>
        )}
      </div>

      {/* Honeypot: hidden from people and screen readers. Only automated form fillers tend to complete it. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} />
        </label>
      </div>

      {dialogStatus ? <EnquiryResultDialog status={dialogStatus} onClose={closeDialog} /> : null}
    </form>
  );
}
