import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/legal/legal-document";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GENMEDIA handles personal information submitted through the website and during project enquiries.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: LegalSection[] = [
  {
    title: "Who we are",
    paragraphs: [
      `GENMEDIA is a digital solutions and software development agency serving businesses across Sri Lanka. You can contact us about this policy at ${company.email}.`,
    ],
  },
  {
    title: "Information you give us",
    paragraphs: [
      "If you send a project enquiry, we receive the details you enter: your name, business name (if provided), email address, phone number (if provided), the service you are interested in, your estimated budget range and your project description.",
      "If you contact us by email or WhatsApp, we receive the content of those messages and the contact details you use.",
    ],
  },
  {
    title: "How we use information",
    paragraphs: [
      "We use enquiry information to respond to you, to understand your requirements and to prepare a proposal. We do not use it for unrelated marketing without your agreement.",
    ],
  },
  {
    title: "How enquiries are delivered",
    paragraphs: [
      "When you submit the enquiry form, the details you entered are sent from our website server to GENMEDIA by email. The form is not stored on your device.",
      "To deliver these emails we use Resend, an email delivery service, which processes the message content on our behalf.",
    ],
  },
  {
    title: "Sharing and retention",
    paragraphs: [
      "We do not sell personal information. We share it only with the email delivery service above, and only where needed to respond to you or to deliver a project you have agreed to. We keep enquiry records only for as long as needed to respond and manage any resulting work, unless you ask us to delete them. Specific retention periods will be confirmed before publication.",
    ],
  },
  {
    title: "Your choices",
    paragraphs: [
      `You can ask to see, correct or delete the personal information we hold about you by emailing ${company.email}. We will respond to reasonable requests.`,
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: ["We may update this policy from time to time. The latest version will always be published on this page."],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy policy"
      description="This page explains what information we collect through the website and enquiries, and how we use it."
      sections={sections}
    />
  );
}
