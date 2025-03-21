import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { sitemapData } from "@/sanity/lib/queries";
import { headers } from "next/headers";

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

type SitemapFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await sanityFetch({
    query: sitemapData,
  });
  const headersList = await headers();
  const sitemap: MetadataRoute.Sitemap = [];
  const domain: string = headersList.get("host") as string;

  // Add homepage
  sitemap.push({
    url: domain,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: "monthly",
  });

  if (allPostsAndPages?.data?.length > 0) {
    for (const p of allPostsAndPages.data) {
      let priority = 0.5; // default priority
      let changeFrequency: SitemapFrequency = "monthly"; // default frequency
      let url = domain; // default url

      // Set values based on content type
      switch (p._type) {
        case "page":
          priority = 0.8;
          changeFrequency = "monthly";
          url = `${domain}/${p.slug}`;
          break;
        case "post":
          priority = 0.5;
          changeFrequency = "never";
          url = `${domain}/posts/${p.slug}`;
          break;
        default:
          continue; // Skip if not a recognized type
      }

      sitemap.push({
        url,
        lastModified: p._updatedAt || new Date(),
        priority,
        changeFrequency,
      });
    }
  }

  return sitemap;
}
