import { Blocks, Bot, Code2, Cpu, Database, Gauge, LifeBuoy, Layers, Plug, Users, Workflow, Wrench, type LucideIcon } from "lucide-react";

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    text: "We understand your business, challenges, users and goals.",
  },
  {
    number: "02",
    title: "Strategize",
    text: "We define the solution, scope, priorities and implementation approach.",
  },
  {
    number: "03",
    title: "Build",
    text: "We design, develop and test a solution around your requirements.",
  },
  {
    number: "04",
    title: "Launch & Improve",
    text: "We prepare the solution for release and support ongoing improvements according to the agreed scope.",
  },
];

export type Capability = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const capabilities: Capability[] = [
  {
    title: "Custom software development",
    text: "Software shaped around a defined problem, with clear scope and a maintainable codebase.",
    icon: Code2,
  },
  {
    title: "Responsive web experiences",
    text: "Interfaces that adapt cleanly from large desktop screens to small phones.",
    icon: Blocks,
  },
  {
    title: "Database-driven applications",
    text: "Structured data models for records, users, bookings and reporting.",
    icon: Database,
  },
  {
    title: "AI integration",
    text: "Assistants and automation added where they help a specific task, with human review where needed.",
    icon: Bot,
  },
  {
    title: "API integrations",
    text: "Connections between your systems, payment or delivery providers and other tools.",
    icon: Plug,
  },
  {
    title: "Automation & workflow",
    text: "Repetitive steps removed from daily work, so teams spend time on decisions instead of data entry.",
    icon: Workflow,
  },
  {
    title: "Performance & accessibility",
    text: "Fast pages, keyboard-friendly interfaces and readable design for every user.",
    icon: Gauge,
  },
  {
    title: "Maintainable architecture",
    text: "Clear structure and documentation so the software can grow with your business.",
    icon: Wrench,
  },
];

export const technologies = ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "AI / ML"];

export const principles = [
  {
    title: "Understand First",
    text: "We start with real business needs and the challenges your users face.",
  },
  {
    title: "Build With Purpose",
    text: "We choose suitable technology and design every screen around a clear task.",
  },
  {
    title: "Grow Through Improvement",
    text: "We create maintainable solutions that can evolve as your business changes.",
  },
];

export const stats = [
  { value: "6", label: "Service areas", detail: "From websites to AI and industry software", icon: Layers },
  { value: "Client-focused", label: "Custom solutions", detail: "Built around your workflows and customers", icon: Users },
  { value: "Modern", label: "Technologies", detail: "Chosen for the problem, not the trend", icon: Cpu },
  { value: "Ongoing", label: "Support", detail: "Improvements after launch, as agreed", icon: LifeBuoy },
];
