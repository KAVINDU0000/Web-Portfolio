import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CosmicBackdrop } from "@/components/layout/cosmic-backdrop";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { absoluteUrl, company, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "GENMEDIA builds websites, business software, AI tools and mobile apps for businesses across Sri Lanka.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GENMEDIA | Websites, Software and Apps in Sri Lanka",
    template: "%s | GENMEDIA",
  },
  description,
  applicationName: company.name,
  openGraph: {
    type: "website",
    siteName: company.name,
    title: "GENMEDIA | Websites, Software and Apps in Sri Lanka",
    description,
    locale: "en_LK",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "GENMEDIA | Websites, Software and Apps in Sri Lanka",
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#080810",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Organization details for search engines. Built from the same source as the visible footer and contact details.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: siteUrl,
  logo: absoluteUrl("/brand/genmedia-logo-transparent.png"),
  description,
  email: company.email,
  telephone: company.phoneInternational,
  areaServed: { "@type": "Country", name: "Sri Lanka" },
  slogan: company.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-cyan px-4 py-2 font-semibold text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <CosmicBackdrop />
        <ScrollProgress />
        <SiteHeader />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
