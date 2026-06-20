import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { QuizCard } from "@/components/QuizCard";
import { getCategories, getPublishedQuizzes } from "@/lib/quizzes";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "전체 퀴즈",
  description: "생활, 음식, 동물, 과학/자연, 역사/문화 상식을 진실/거짓 퀴즈로 확인해보세요.",
  alternates: { canonical: absoluteUrl("/quiz") },
};

export default async function QuizListPage({ searchParams }: { searchParams: Promise<{ category?: string; difficulty?: string }> }) {
  const params = await searchParams;
  const [quizzes, categories] = await Promise.all([getPublishedQuizzes(), getCategories()]);
  const filtered = quizzes.filter(
    (quiz) =>
      (!params.category || quiz.category?.slug === params.category) &&
      (!params.difficulty || quiz.difficulty === params.difficulty),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-16">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">전체 퀴즈</h1>
        <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-500 dark:text-slate-400">
          지금까지 등록된 {quizzes.length}개의 진실/거짓 퀴즈를 모았습니다. 카테고리별로 골라 풀고, 각 상세 페이지의 설명에서 이유까지 확인해보세요.
        </p>
      </header>

      <div className="mt-6 flex flex-wrap gap-2 text-xs font-black">
        <Link
          className={`rounded-full border px-4 py-2 transition ${
            !params.category
              ? "border-slate-950 bg-slate-950 text-white dark:border-emerald-500 dark:bg-emerald-500 dark:text-emerald-950"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          }`}
          href="/quiz"
        >
          전체
        </Link>
        {categories.map((category, index) => {
          const isActive = params.category === category.slug;
          return (
            <Link
              key={`${category.id}-${index}`}
              className={`rounded-full border px-4 py-2 transition ${
                isActive
                  ? "border-slate-950 bg-slate-950 text-white dark:border-emerald-500 dark:bg-emerald-500 dark:text-emerald-950"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              }`}
              href={`/quiz?category=${category.slug}`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.slice(0, 9).map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>

      {filtered.length > 9 && <AdSlot label="퀴즈 목록 중간 광고 영역" />}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.slice(9).map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
