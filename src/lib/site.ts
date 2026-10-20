// Central company details and URL helpers. Edit content here, not in page components.

export const company = {
  name: "GENMEDIA",
  tagline: "CREATE. CONNECT. INFLUENCE.",
  description:
    "A digital solutions and software development agency helping businesses across Sri Lanka turn ideas into practical, user-focused digital experiences.",
  email: "genmediait@gmail.com",
  phoneDisplay: "077 042 7496",
  // WhatsApp and tel: links need the international number without spaces or symbols.
  phoneInternational: "+94770427496",
  whatsappNumber: "94770427496",
  serviceArea: "Serving businesses across Sri Lanka.",
  // Static on purpose: a runtime year is read per request in the footer, see site-footer.tsx.
  copyrightYear: 2026,
};

// Public site URL, used for canonical links, Open Graph and the sitemap.
// Set NEXT_PUBLIC_SITE_URL when the domain is known.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

export const whatsappLink = (message: string) =>
  `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
