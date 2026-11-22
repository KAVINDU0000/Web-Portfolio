export const projectCategories = [
  "Websites & Applications",
  "Business Systems",
  "AI Solutions",
  "E-commerce",
  "Booking & Scheduling",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectStatus = "In Development" | "Completed" | "Live";

export type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  // Public address once the project is launched. Leave unset until then.
  liveUrl?: string;
  categories: ProjectCategory[];
  // Short text for cards and listings.
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  // Empty until real, approved screenshots are supplied. Never use stock images here.
  screenshots: ProjectScreenshot[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "riyona-driving-school",
    title: "Riyona Driving School",
    status: "Live",
    liveUrl: "https://riyonadrivingschool.com.lk/",
    categories: ["Websites & Applications", "Business Systems", "Booking & Scheduling"],
    summary:
      "A modern driving school website and management platform that brings training information, student services, lesson coordination and administrative workflows into one digital experience.",
    overview:
      "Riyona Driving School trains drivers for car, van, motorbike and three-wheeler licence classes in Sri Lanka. This project combines a public website with a management platform for students, instructors and administrators.",
    problem:
      "Training information, course packages, lesson bookings and student records need to be kept in step. Handling them separately creates repeated work for staff and makes it harder for students to know what is available and what is booked.",
    solution:
      "A single platform with a public website for courses and packages, plus role-based portals for students, instructors and administrators. Lesson scheduling, enrolment and payment records are planned to sit in one place.",
    features: [
      "Public website covering courses, packages, vehicle categories and how to apply",
      "Online package information with clear enquiry routes",
      "Free study tools, including road signs, road rules and practice papers in English and Sinhala",
      "Student portal planned for registration, appointments, lesson schedules and payment history",
      "Instructor portal planned for lesson management and student progress tracking",
      "Administrator portal planned for registration review, fleet management and payment review",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    screenshots: [
      {
        src: "/projects/riyona-driving-school/home.png",
        alt: "Riyona Driving School homepage with the headline 'Drive With Confidence', a driving lesson photo and key statistics",
        width: 1898,
        height: 1018,
      },
    ],
    featured: true,
  },
  {
    slug: "green-paradise-mirissa",
    title: "Green Paradise Mirissa",
    status: "Live",
    liveUrl: "https://greenparadisemirissa.com/",
    categories: ["Websites & Applications"],
    summary:
      "A marketing website for a tropical boutique hotel in Mirissa, Sri Lanka, presenting its rooms, poolside courtyard and dining areas, with an enquiry form for room requests.",
    overview:
      "Green Paradise Mirissa is a tropical boutique hotel a short walk from Mirissa beach. The website introduces the stay, the rooms and the setting, and lets guests send a room enquiry.",
    problem:
      "Guests choosing a stay need to see the rooms, the setting and how to get in touch in one place, without searching across several channels.",
    solution:
      "A single website covering the stay, eleven room types from budget doubles to family suites for up to four guests, the poolside courtyard, dining and lounge areas, and a guest enquiry form.",
    features: [
      "Eleven room types, from budget doubles to family suites for up to four guests",
      "Pages for the stay, rooms, experience, gallery and contact",
      "Poolside courtyard, open-air dining and lounge areas presented together",
      "Guest enquiry form for room requests",
    ],
    techStack: ["React", "Vite", "Tailwind CSS", "React Router", "Lucide Icons", "Google Fonts"],
    screenshots: [
      {
        src: "/projects/green-paradise-mirissa/home.png",
        alt: "Green Paradise Mirissa homepage with the headline 'Wake up in green paradise', the poolside courtyard at dusk and the explore and availability buttons",
        width: 1892,
        height: 925,
      },
    ],
    featured: false,
  },
  {
    slug: "galani-coffee",
    title: "Galani Coffee",
    status: "Live",
    liveUrl: "https://revived-pink-porpoise-33.hostingersite.com/",
    categories: ["Websites & Applications"],
    summary:
      "A website for Galani Coffee, a coffee brand with branches, a barista school and online ordering, presented with a warm, cinematic hero and a clear path to the menu.",
    overview:
      "Galani Coffee is a coffee brand with its own story, menu, branches and barista training. This website brings those together and lets visitors order and find a branch from one place.",
    problem:
      "A coffee brand has several things to show at once: its story, what it serves, where to find it and how to learn the craft. Without a clear structure, visitors struggle to find the next step.",
    solution:
      "A single website built around a bold hero and clear navigation to the story, menu, branches, barista school and contact, with an order button always in view.",
    features: [
      "Hero with a clear call to action to explore the menu",
      "Pages for the brand story, menu, branches, barista school and contact",
      "Order now button in the main navigation",
    ],
    techStack: [],
    screenshots: [
      {
        src: "/projects/galani-coffee/home.png",
        alt: "Galani Coffee homepage with the headline 'Galani Coffee', the tagline 'Just the right kick' and an espresso machine pouring into a latte",
        width: 1901,
        height: 924,
      },
    ],
    featured: false,
  },
  {
    slug: "northline",
    title: "NORTHLINE",
    status: "Live",
    liveUrl: "https://planar-papayawhip-pelican-68.hostingersite.com/",
    categories: ["E-commerce"],
    summary:
      "A responsive fashion storefront with an editorial home page, a categorised shop, and an AI virtual try-on, built with Next.js and TypeScript.",
    overview:
      "NORTHLINE is a clothing brand storefront built to feel like a fashion magazine. The home page uses scroll-triggered animations, a category showcase with cycling photos, and a product carousel. Shoppers can browse by category through a mega menu, filter the shop by product type, and open product pages where the colour selection switches the photo. Customers can also upload a photo to preview a piece on themselves through an AI try-on. The site is deployed on Hostinger.",
    problem:
      "A clothing brand needs its storefront to feel as considered as its products. Shoppers also want to know how a piece will look on them before buying, and a plain catalogue does not show that.",
    solution:
      "An editorial storefront with a categorised shop, colour-aware product pages, a persistent cart and an AI virtual try-on that lets customers preview a piece on their own photo.",
    features: [
      "Editorial home page with scroll-triggered animations, a category showcase and a product carousel",
      "Category mega menu, product-type filters and sorting on the shop page",
      "Colour-aware product gallery and hover previews that cycle through colour photos",
      "Persistent cart and server-validated checkout and contact forms",
      "AI virtual try-on with photo validation, consent and a server-side image request",
      "SEO metadata, a sitemap, and scroll-reveal animations that respect reduced-motion settings",
    ],
    techStack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
    ],
    screenshots: [
      {
        src: "/projects/northline/home.png",
        alt: "NORTHLINE homepage with the headline 'Quiet luxury for everyday life.' over a photo of a model in a red suit",
        width: 1600,
        height: 896,
      },
    ],
    featured: false,
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getFeaturedProjects = () => projects.filter((project) => project.featured);
