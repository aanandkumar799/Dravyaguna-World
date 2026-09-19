import type { MetadataRoute } from "next";
import { plantCatalog } from "../lib/plant/catalog";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/plants", "/learn", "/about", "/feedback"];
  const plantRoutes = plantCatalog.map((plant) => `/plants/${plant.slug}`);
  return [...staticRoutes, ...plantRoutes].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() }));
}