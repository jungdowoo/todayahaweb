import type { MetadataRoute } from "next";
import { getCategories, getPublishedQuizzes } from "@/lib/quizzes";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [quizzes, categories] = await Promise.all([getPublishedQuizzes(), getCategories()]);
  const base = siteConfig.url;
  const staticPaths = ["", "/today", "/quiz", "/bookmarks", "/about", "/privacy", "/terms", "/contact"];

  return [
    ...staticPaths.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...categories.map((category) => ({ url: `${base}/category/${category.slug}`, lastModified: new Date() })),
    ...quizzes.map((quiz) => ({ url: `${base}/quiz/${quiz.slug}`, lastModified: new Date(quiz.published_at) })),
  ];
}
