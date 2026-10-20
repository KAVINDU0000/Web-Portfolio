import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { company, siteUrl } from "@/lib/site";
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
  },
  twitter: {
    card: "summary",
    title: "GENMEDIA | Websites, Software and Apps in Sri Lanka",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg text-text">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-cyan px-4 py-2 font-semibold text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
