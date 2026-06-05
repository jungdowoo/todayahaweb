import type { Quiz } from "@/types/quiz";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!configuredUrl) return "http://localhost:3000";

  const withProtocol = configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`;
  return normalizeSiteUrl(withProtocol);
}

export const siteConfig = {
  name: "오늘의 아하!",
  description: "일상 속 잘못 알기 쉬운 상식을 진실/거짓 퀴즈로 가볍게 확인하는 생활 상식 퀴즈",
  url: getSiteUrl(),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "jdw9302@naver.com",
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
