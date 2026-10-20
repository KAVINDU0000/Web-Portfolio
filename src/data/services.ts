import {
  BrainCircuit,
  CalendarClock,
  Building2,
  Globe,
  Layers,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  // One short line for cards on the homepage and services grid.
  cardText: string;
  icon: LucideIcon;
  challenges: string[];
  capabilities: string[];
  features: string[];
  process: { title: string; text: string }[];
  faqs: ServiceFaq[];
  // Slugs from data/projects.ts that show real work related to this service.
  relatedProjects: string[];
};

export const services: Service[] = [
  {
    slug: "websites-web-applications",
    number: "01",
    cardText: "Modern, high-performing websites and web applications.",
    title: "Websites & Web Applications",
    summary:
      "Business websites, landing pages, portfolio sites and web applications that present your business clearly and work reliably on every device.",
    icon: Globe,
    challenges: [
      "Customers cannot find clear information about what you offer, or how to contact you.",
      "Your current website is slow on phones or hard to update without outside help.",
      "Manual processes, such as enquiries by phone or paper forms, slow down your team.",
    ],
    capabilities: [
      "Business and company websites",
      "Landing pages for campaigns and offers",
      "Portfolio websites",
      "Web applications with user accounts and dashboards",
      "Progressive web applications that install on phones",
    ],
    features: [
      "Responsive layouts designed for mobile first",
      "Search-friendly structure, page titles and descriptions",
      "Contact and enquiry forms with validation",
      "Content areas your team can maintain",
      "Fast loading images and fonts",
    ],
    process: [
      { title: "Discover", text: "We review your goals, audience and any existing website." },
      { title: "Design", text: "We plan the page structure and visual direction for your review." },
      { title: "Build", text: "We develop and test the site on desktop and mobile devices." },
      { title: "Launch", text: "We prepare the site for release and explain how to update it." },
    ],
    faqs: [
      {
        question: "Can you update an existing website instead of building a new one?",
        answer: "Yes. We first review what you have, then recommend whether to improve it or rebuild it.",
      },
      {
        question: "Do you include hosting and a domain name?",
        answer: "Hosting, domains and third-party subscriptions are quoted separately unless your proposal states otherwise.",
      },
    ],
    relatedProjects: ["riyona-driving-school"],
  },
  {
    slug: "business-management-systems",
    number: "02",
    cardText: "Custom systems to streamline your operations.",
    title: "Business Management Systems",
    summary:
      "Custom systems for managing customers, stock, invoices, staff and projects, built around the way your business actually works.",
    icon: Layers,
    challenges: [
      "Records are spread across spreadsheets, notebooks and chat messages.",
      "Invoices, stock levels or payroll are updated by hand and often disagree.",
      "Managers lack a clear view of performance, so decisions are slow.",
    ],
    capabilities: [
      "Customer relationship management (CRM)",
      "Inventory and stock control",
      "Invoicing and billing",
      "Point of sale (POS) and sales records",
      "HR, payroll and project management",
    ],
    features: [
      "Role-based access for staff, managers and administrators",
      "Searchable records with history and audit trails",
      "Reports and summaries for daily decisions",
      "Import of existing spreadsheet data",
      "Modules added in phases as the business grows",
    ],
    process: [
      { title: "Map", text: "We document your current workflows, forms and reports." },
      { title: "Scope", text: "We agree on priority modules and what the first version includes." },
      { title: "Build", text: "We develop the system in stages and review each one with your team." },
      { title: "Train & support", text: "We help your team adopt the system and fix issues after launch." },
    ],
    faqs: [
      {
        question: "Can we start with one module and add others later?",
        answer: "Yes. Most systems are scoped in phases, so you can begin with the workflow that causes the most trouble.",
      },
      {
        question: "Can existing data be moved into the new system?",
        answer: "In most cases, yes. We review your current data files and agree on an import approach during scoping.",
      },
    ],
    relatedProjects: ["riyona-driving-school"],
  },
  {
    slug: "ecommerce-solutions",
    number: "03",
    cardText: "Online stores with powerful features and smooth experiences.",
    title: "E-commerce Solutions",
    summary:
      "Online stores, product catalogues and commerce platforms designed to make buying simple and to keep your product information organised.",
    icon: ShoppingBag,
    challenges: [
      "Customers abandon carts because checkout is confusing or slow.",
      "Product information is inconsistent across social media, messages and price lists.",
      "Orders are tracked manually, which causes delays and errors.",
    ],
    capabilities: [
      "Online stores with product categories and search",
      "Product catalogues and price lists",
      "Marketplace-style listings for multiple sellers",
      "Custom commerce platforms for specific business models",
    ],
    features: [
      "Product pages with images, variants and stock status",
      "Clear checkout steps and order confirmation",
      "Order management for your team",
      "Mobile-first shopping experience",
      "Integration with payment and delivery providers, where agreed",
    ],
    process: [
      { title: "Plan", text: "We define your product range, customer journey and fulfilment process." },
      { title: "Design", text: "We design product pages and checkout around how your customers buy." },
      { title: "Build", text: "We develop the store and connect the integrations agreed in scope." },
      { title: "Launch", text: "We test orders end to end before the store goes live." },
    ],
    faqs: [
      {
        question: "Can you connect the store to a payment gateway?",
        answer: "Integrations are scoped individually, depending on the provider and the approvals your business has in place.",
      },
      {
        question: "Can staff manage products without a developer?",
        answer: "Yes. Product and order screens are designed for daily use by non-technical staff.",
      },
    ],
    relatedProjects: [],
  },
  {
    slug: "ai-powered-solutions",
    number: "04",
    cardText: "Intelligent tools to automate and enhance your business.",
    title: "AI-Powered Solutions",
    summary:
      "Chatbots, document processing and workflow automation that use artificial intelligence where it genuinely saves time or improves service.",
    icon: BrainCircuit,
    challenges: [
      "Customers ask the same questions repeatedly and wait too long for answers.",
      "Staff spend hours reading and entering information from documents.",
      "Knowledge is locked in a few people’s heads and is hard to find.",
    ],
    capabilities: [
      "Customer-facing chatbots trained on your own information",
      "Intelligent document processing for forms, invoices and records",
      "Internal knowledge assistants for staff",
      "Workflow automation connected to your existing tools",
    ],
    features: [
      "Answers grounded in the content you provide",
      "Human handover when a question needs a person",
      "Review steps so staff can check automated results",
      "Usage limits and monitoring agreed during scoping",
      "Clear documentation of what the AI does and does not do",
    ],
    process: [
      { title: "Identify", text: "We pick a specific task where AI can measurably help." },
      { title: "Prototype", text: "We test the approach on a small sample of your real content." },
      { title: "Build", text: "We integrate the solution into your website or internal systems." },
      { title: "Improve", text: "We review real conversations or results and refine the solution." },
    ],
    faqs: [
      {
        question: "Will the chatbot make things up?",
        answer: "We design answers around your approved content and include handover to a person for anything outside that scope.",
      },
      {
        question: "Do we need to share sensitive customer data?",
        answer: "Only if the solution requires it. We agree on what data is used before any build starts.",
      },
    ],
    relatedProjects: [],
  },
  {
    slug: "booking-scheduling-systems",
    number: "05",
    cardText: "Online bookings and calendars that save your team time.",
    title: "Booking & Scheduling Systems",
    summary:
      "Appointment, training and reservation platforms that let customers book online and let your team manage the calendar in one place.",
    icon: CalendarClock,
    challenges: [
      "Bookings come in by phone and messages, which leads to double bookings.",
      "Staff time is wasted coordinating schedules and reminders by hand.",
      "Customers cannot see what is available without contacting you first.",
    ],
    capabilities: [
      "Appointment booking for clinics, salons and consultants",
      "Training and lesson scheduling",
      "Restaurant and hotel reservations",
      "Staff availability and calendar management",
    ],
    features: [
      "Live availability by service, staff member or resource",
      "Booking confirmations and reminders",
      "Admin view for managing, moving and cancelling bookings",
      "Attendance and schedule history",
      "Mobile-friendly booking flow",
    ],
    process: [
      { title: "Discover", text: "We map your services, resources and booking rules." },
      { title: "Design", text: "We design the booking flow for customers and the calendar for staff." },
      { title: "Build", text: "We develop the scheduling logic and test edge cases such as cancellations." },
      { title: "Launch", text: "We run a test period and support the team during the first weeks." },
    ],
    faqs: [
      {
        question: "Can customers pay when they book?",
        answer: "Payment can be added where agreed. Provider setup and approvals are scoped separately.",
      },
      {
        question: "Can the system handle different staff and resources?",
        answer: "Yes. Availability can be set per staff member, room, vehicle or other resource.",
      },
    ],
    relatedProjects: ["riyona-driving-school"],
  },
  {
    slug: "industry-specific-software",
    number: "06",
    cardText: "Software built around your sector’s real processes.",
    title: "Industry-Specific Software",
    summary:
      "Custom software built for the processes, terminology and compliance needs of your sector, from education to healthcare to retail.",
    icon: Building2,
    challenges: [
      "Off-the-shelf software includes features you never use and lacks the ones you need.",
      "Sector-specific records are kept in formats that are hard to share or audit.",
      "Staff work around tools that were not designed for their industry.",
    ],
    capabilities: [
      "School and training management",
      "Clinic and hospital management",
      "Retail and distribution tools",
      "Finance and payment applications",
      "Custom tools for other industry workflows",
    ],
    features: [
      "Workflows matched to your sector’s real processes",
      "Role-based portals for students, staff, clients or patients",
      "Records, documents and audit logs",
      "Bilingual interfaces where required",
      "Scope and compliance requirements agreed before build",
    ],
    process: [
      { title: "Learn", text: "We learn your sector’s processes and the people who use the system." },
      { title: "Specify", text: "We write down requirements, roles and any compliance needs." },
      { title: "Build", text: "We develop the system in reviewed stages with your team." },
      { title: "Support", text: "We help with rollout, training and planned improvements." },
    ],
    faqs: [
      {
        question: "Do you build for sectors you have not worked in before?",
        answer: "Yes. We begin with discovery sessions so the system reflects your sector’s real requirements.",
      },
      {
        question: "Can the interface be in Sinhala or other languages?",
        answer: "Where needed, yes. Language support is agreed as part of the scope.",
      },
    ],
    relatedProjects: ["riyona-driving-school"],
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
