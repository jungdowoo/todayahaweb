import type { Quiz } from "@/types/quiz";

export const siteConfig = {
  name: "오늘의 아하!",
  description: "매일 하나씩 가볍게 풀고 깊게 이해하는 생활 상식 퀴즈",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const absoluteUrl = (path: string) => `${siteConfig.url}${path}`;

export function quizJsonLd(quiz: Quiz) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: quiz.title,
    description: quiz.seo_description ?? quiz.short_explanation,
    datePublished: quiz.published_at,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: absoluteUrl(`/quiz/${quiz.slug}`),
  };
}
