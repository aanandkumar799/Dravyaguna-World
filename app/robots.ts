import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? "https://" + process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
