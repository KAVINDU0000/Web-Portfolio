import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/legal/legal-document";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms that apply to the GENMEDIA website, enquiries and information about our services.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    title: "About this website",
    paragraphs: [
      "This website provides general information about GENMEDIA, our services and selected projects. Nothing on it is a binding offer or a contract.",
    ],
  },
  {
    title: "Enquiries and proposals",
    paragraphs: [
      "Sending an enquiry does not create a contract with GENMEDIA. A project begins only when both parties sign a written proposal or agreement.",
    ],
  },
  {
    title: "Pricing",
    paragraphs: [
      "Where prices are shown, they are indicative unless a written quote says otherwise. Final quotes depend on requirements, complexity, integrations, content, hosting and agreed support. Hosting, domains and third-party subscriptions are not included unless stated in a quote.",
    ],
  },
  {
    title: "Project status and case studies",
    paragraphs: [
      "Projects marked as in development have not been publicly launched. Descriptions of features reflect planned or current scope and are not a promise of availability on a particular date.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "The text, design, graphics and the GENMEDIA name and logo on this website belong to GENMEDIA. Please do not copy or reuse them without written permission. Client work is owned as set out in the relevant agreement.",
    ],
  },
  {
    title: "Third-party links",
    paragraphs: [
      "This website links to third-party services such as WhatsApp. We are not responsible for the content or practices of those services.",
    ],
  },
  {
    title: "Limitation of responsibility",
    paragraphs: [
      "To the extent permitted by law, GENMEDIA is not liable for losses arising from reliance on information on this website. Obligations for any project are set out in the signed agreement for that project.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [`Questions about these terms can be sent to ${company.email}.`],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms of service"
      description="These terms set out how this website may be used and what to expect when you contact GENMEDIA."
      sections={sections}
    />
  );
}
