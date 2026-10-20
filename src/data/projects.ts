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
    status: "In Development",
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
    screenshots: [],
    featured: true,
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getFeaturedProjects = () => projects.filter((project) => project.featured);
