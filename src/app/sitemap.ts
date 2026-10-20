import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/projects", "/pricing", "/about", "/contact", "/privacy-policy", "/terms"];

  return [
    ...staticRoutes.map((path) => ({ url: absoluteUrl(path || "/") })),
    ...services.map((service) => ({ url: absoluteUrl(`/services/${service.slug}`) })),
    ...projects.map((project) => ({ url: absoluteUrl(`/projects/${project.slug}`) })),
  ];
}
