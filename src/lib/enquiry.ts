// Project enquiry model, frontend validation and the submission boundary.
// Nothing here sends or stores a message. submitEnquiry is the single function to replace when a backend exists.

import type { BudgetRange, EnquiryService } from "./enquiry-options";

export type EnquiryValues = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: EnquiryService | "";
  description: string;
  budget: BudgetRange | "";
  // Set when the visitor arrives from a package's quote link. Shown for review only.
  packageName: string;
};

export type EnquiryField = keyof EnquiryValues;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  service: "",
  description: "",
  budget: "",
  packageName: "",
};

// Fields that belong to each step of the form.
export const stepFields: Record<1 | 2 | 3, EnquiryField[]> = {
  1: ["name", "email", "phone"],
  2: ["service", "description"],
  3: ["budget"],
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s-]{7,20}$/;

export function validateFields(values: EnquiryValues, fields: EnquiryField[]): EnquiryErrors {
  const errors: EnquiryErrors = {};

  for (const field of fields) {
    switch (field) {
      case "name":
        if (values.name.trim().length < 2) errors.name = "Please enter your name.";
        break;
      case "email":
        if (!emailPattern.test(values.email.trim())) errors.email = "Please enter a valid email address, such as name@business.lk.";
        break;
      case "phone":
        if (values.phone.trim() && !phonePattern.test(values.phone.trim())) {
          errors.phone = "Please enter a valid phone number, or leave this blank.";
        }
        break;
      case "service":
        if (!values.service) errors.service = "Please choose the service you are interested in.";
        break;
      case "description": {
        const length = values.description.trim().length;
        if (length < 20) errors.description = "Please describe your project in at least 20 characters.";
        else if (length > 2000) errors.description = "Please keep your description under 2,000 characters.";
        break;
      }
      case "budget":
        if (!values.budget) errors.budget = "Please choose an estimated budget range.";
        break;
      default:
        break;
    }
  }

  return errors;
}

export function validateAll(values: EnquiryValues): EnquiryErrors {
  return validateFields(values, [...stepFields[1], ...stepFields[2], ...stepFields[3]]);
}

// Outcomes the form can display. "sent" is kept for the backend; the current stub never returns it.
export type EnquiryResult = { status: "not-connected" } | { status: "sent" };

// Boundary for the future backend. It does not send or store anything yet.
// When connected, replace the body with a request to the real endpoint and return "sent" only after it succeeds.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function submitEnquiry(_values: EnquiryValues): Promise<EnquiryResult> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { status: "not-connected" };
}
