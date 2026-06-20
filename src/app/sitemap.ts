import type { MetadataRoute } from "next";
import { getCategories, getPublishedQuizzes } from "@/lib/quizzes";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [quizzes, categories] = await Promise.all([getPublishedQuizzes(), getCategories()]);
  const base = siteConfig.url;
  const staticLastModified = new Date("2026-06-20T00:00:00+09:00");
  const staticPaths = ["", "/quiz", "/about", "/editorial-policy", "/privacy", "/terms", "/contact"];

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: staticLastModified,
      changeFrequency: path === "" ? "daily" as const : "weekly" as const,
      priority: path === "" ? 1 : path === "/quiz" ? 0.9 : 0.5,
    })),
    ...categories.map((category) => ({
      url: `${base}/category/${category.slug}`,
      lastModified: staticLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...quizzes.map((quiz) => ({
      url: `${base}/quiz/${quiz.slug}`,
      lastModified: new Date(quiz.updated_at ?? quiz.published_at),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
