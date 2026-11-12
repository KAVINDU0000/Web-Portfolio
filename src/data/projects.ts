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
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getFeaturedProjects = () => projects.filter((project) => project.featured);
