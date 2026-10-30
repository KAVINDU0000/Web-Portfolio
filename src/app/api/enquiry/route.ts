import { NextResponse } from "next/server";
import { budgetRanges, isEnquiryService } from "@/lib/enquiry-options";
import { validateAll, type EnquiryValues } from "@/lib/enquiry";
import { company } from "@/lib/site";

// Receives project enquiries from the contact form. The browser's checks are repeated here, because they can be bypassed.
// Email is sent through Resend when RESEND_API_KEY is set. Without it, the route answers 503 so the form can say so honestly.

const resendEndpoint = "https://api.resend.com/emails";

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

// Header-safe single line, so a name cannot inject extra mail headers.
const line = (value: string) => value.replace(/[\r\n]+/g, " ");

function parseValues(body: Record<string, unknown>): EnquiryValues {
  return {
    name: text(body.name, 120),
    businessName: text(body.businessName, 160),
    email: text(body.email, 200),
    phone: text(body.phone, 30),
    service: text(body.service, 80) as EnquiryValues["service"],
    description: text(body.description, 2000),
    budget: text(body.budget, 80) as EnquiryValues["budget"],
    packageName: text(body.packageName, 120),
    website: "",
  };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ status: "error" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots do not retry.
  if (text(body.website, 200) !== "") {
    return NextResponse.json({ status: "sent" });
  }

  const values = parseValues(body);
  const errors = validateAll(values);
  const badChoice =
    (values.service !== "" && !isEnquiryService(values.service)) ||
    (values.budget !== "" && !(budgetRanges as readonly string[]).includes(values.budget));

  if (Object.keys(errors).length > 0 || badChoice) {
    return NextResponse.json({ status: "invalid", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ status: "not-connected" }, { status: 503 });
  }

  const to = process.env.ENQUIRY_TO_EMAIL ?? company.email;
  const from = process.env.ENQUIRY_FROM_EMAIL ?? "GENMEDIA Enquiries <onboarding@resend.dev>";

  const lines = [
    `Name: ${values.name}`,
    `Business: ${values.businessName || "Not given"}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || "Not given"}`,
    `Service: ${values.service}`,
    `Budget: ${values.budget}`,
    values.packageName ? `Package quote requested: ${values.packageName}` : null,
    "",
    "Project description:",
    values.description,
  ].filter((item): item is string => item !== null);

  try {
    const response = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: line(`New enquiry: ${values.service} from ${values.name}`),
        text: lines.join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return NextResponse.json({ status: "error" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ status: "error" }, { status: 502 });
  }

  return NextResponse.json({ status: "sent" });
}
