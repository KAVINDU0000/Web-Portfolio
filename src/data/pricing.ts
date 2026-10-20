// Pricing data. No amounts have been approved for publication yet.
// To publish a price, set `price` on a package. Until then every package shows "Request a Quote".
// Package names and feature lists are drafts and need approval before launch.

import type { EnquiryService } from "@/lib/enquiry-options";

export type PackagePrice = {
  amount: number;
  currency: "LKR";
  // Shown after the amount, for example "one-time" or "per month".
  billing: string;
};

export type PricingPackage = {
  id: string;
  name: string;
  description: string;
  features: string[];
  idealCustomer: string;
  price?: PackagePrice;
  // Only set when the package data states a verified delivery estimate.
  deliveryEstimate?: string;
};

export type PricingCategory = {
  slug: string;
  title: string;
  description: string;
  // The matching option in the enquiry form, so the quote link pre-selects it.
  enquiryService: EnquiryService;
  packages: PricingPackage[];
};

export const pricingNote =
  "Final pricing depends on project scope, features, integrations, content, hosting and agreed support. Hosting, domains, maintenance and third-party subscriptions are not included unless a quote states otherwise.";

export const pricingCategories: PricingCategory[] = [
  {
    slug: "websites",
    title: "Websites & Web Applications",
    description: "Business websites, landing pages and web applications.",
    enquiryService: "Website or Web Application",
    packages: [
      {
        id: "business-website",
        name: "Business Website",
        description: "A clear multi-page website that presents your business and makes it easy to get in touch.",
        features: ["Responsive design for mobile and desktop", "Up to the agreed number of pages", "Contact or enquiry form", "Basic search engine setup"],
        idealCustomer: "Small businesses and professionals who need a credible online presence.",
      },
      {
        id: "web-application",
        name: "Web Application",
        description: "A custom web application with user accounts, dashboards and business-specific features.",
        features: ["Custom features defined in scope", "User roles and secure login", "Admin dashboard", "Phased delivery with review points"],
        idealCustomer: "Businesses that need a tool for customers or staff, beyond a brochure site.",
      },
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce Solutions",
    description: "Online stores and custom commerce platforms.",
    enquiryService: "E-commerce",
    packages: [
      {
        id: "starter-online-store",
        name: "Starter Online Store",
        description: "An online store with a product catalogue, cart and checkout for a focused product range.",
        features: ["Product catalogue with categories", "Cart and checkout", "Order management for staff", "Mobile-first shopping experience"],
        idealCustomer: "Retailers starting to sell online with a manageable product range.",
      },
      {
        id: "custom-commerce-platform",
        name: "Custom Commerce Platform",
        description: "A tailored commerce platform for complex catalogues, pricing rules or marketplace models.",
        features: ["Custom pricing and catalogue rules", "Integrations agreed in scope", "Vendor or seller management, where needed", "Reporting for sales and stock"],
        idealCustomer: "Established businesses with specific commerce workflows.",
      },
    ],
  },
  {
    slug: "business-systems",
    title: "Business Management Systems",
    description: "Custom CRM, inventory, invoicing, HR and operations software.",
    enquiryService: "Business Management System",
    packages: [
      {
        id: "single-module-system",
        name: "Single-Module System",
        description: "One focused system that replaces a manual process, such as invoicing or stock control.",
        features: ["One module defined in scope", "Searchable records and history", "Basic reports", "Staff training session"],
        idealCustomer: "Businesses with one process causing the most delay or errors.",
      },
      {
        id: "multi-module-business-system",
        name: "Multi-Module Business System",
        description: "Connected modules for sales, stock, staff and reporting, delivered in phases.",
        features: ["Multiple connected modules", "Role-based access", "Data import from existing records", "Phased rollout and support plan"],
        idealCustomer: "Growing businesses that run several processes across teams.",
      },
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    description: "Chatbots, document processing and workflow automation.",
    enquiryService: "AI Solution",
    packages: [
      {
        id: "ai-chatbot",
        name: "AI Chatbot",
        description: "A chatbot that answers common questions using the content you approve.",
        features: ["Answers based on your content", "Handover to a person when needed", "Website integration", "Review of sample conversations"],
        idealCustomer: "Businesses that receive repeated customer questions.",
      },
      {
        id: "document-intelligence-automation",
        name: "Document Intelligence & Automation",
        description: "Tools that read documents, extract information and route work for review.",
        features: ["Document extraction for agreed formats", "Review screens for staff", "Connection to existing systems", "Accuracy checks during rollout"],
        idealCustomer: "Teams that spend hours entering information from forms or invoices.",
      },
    ],
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    description: "Android, iOS and progressive web applications.",
    enquiryService: "Mobile Application",
    packages: [
      {
        id: "mobile-app",
        name: "Mobile App",
        description: "A native-style app for Android or iOS, built around one clear customer or staff task.",
        features: ["Android or iOS release, as agreed", "Core features defined in scope", "Backend and admin tools where needed", "Store submission support"],
        idealCustomer: "Businesses that need an app for customers or field staff.",
      },
      {
        id: "progressive-web-app",
        name: "Progressive Web App",
        description: "A web app that works on phones and can be added to the home screen, without an app store release.",
        features: ["Works on any modern phone browser", "Installable on the home screen", "One codebase for web and mobile", "Offline support where agreed"],
        idealCustomer: "Businesses that want mobile reach without the cost of separate app builds.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    description: "Ongoing care, updates and improvements after launch.",
    enquiryService: "Other",
    packages: [
      {
        id: "essential-support",
        name: "Essential Support",
        description: "Routine updates, security fixes and help when something needs attention.",
        features: ["Security and dependency updates", "Bug fixes within agreed scope", "Reasonable response times for requests", "Monthly summary of work done"],
        idealCustomer: "Businesses that want their software kept up to date with minimal effort.",
      },
      {
        id: "growth-support",
        name: "Growth Support",
        description: "Essential support plus a planned allowance for improvements and new features.",
        features: ["Everything in Essential Support", "Planned improvement hours each month", "Regular review of performance and usage", "Priority scheduling for changes"],
        idealCustomer: "Businesses that keep adding features as they grow.",
      },
    ],
  },
];

export const getPricingCategory = (slug: string) => pricingCategories.find((category) => category.slug === slug);

export const getPricingPackage = (categorySlug: string, packageId: string) =>
  getPricingCategory(categorySlug)?.packages.find((pkg) => pkg.id === packageId);
