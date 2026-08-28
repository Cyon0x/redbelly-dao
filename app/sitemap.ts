import type { MetadataRoute } from "next";
import { daoFixtures } from "@/features/dao/service";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/developers", "/dao", "/dao/proposals", "/dao/treasury", "/dao/tasks", "/dao/showcase", "/institutional"];
  const staticRoutes = routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const proposalRoutes = daoFixtures.proposals.map((p) => ({
    url: `${base}/dao/proposals/${p.id}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...proposalRoutes];
}
