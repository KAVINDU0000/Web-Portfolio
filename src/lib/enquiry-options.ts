// Service and budget options shared by the enquiry form and the pricing explorer.
// Kept free of client-only code so server modules can import it.

export const enquiryServices = [
  "Website or Web Application",
  "Business Management System",
  "E-commerce",
  "AI Solution",
  "Mobile Application",
  "Booking or Scheduling",
  "Other",
] as const;

export type EnquiryService = (typeof enquiryServices)[number];

// Budget brackets help us plan a first conversation. They are not prices and do not guarantee a solution or quote.
export const budgetRanges = [
  "Under LKR 100,000",
  "LKR 100,000 to 300,000",
  "LKR 300,000 to 700,000",
  "Above LKR 700,000",
  "Not sure yet",
] as const;

export type BudgetRange = (typeof budgetRanges)[number];

export const isEnquiryService = (value: string): value is EnquiryService =>
  (enquiryServices as readonly string[]).includes(value);
