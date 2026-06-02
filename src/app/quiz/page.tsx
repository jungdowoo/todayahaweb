import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { QuizCard } from "@/components/QuizCard";
import { getCategories, getPublishedQuizzes } from "@/lib/quizzes";

export const metadata = {
  title: "전체 퀴즈",
  description: "생활, 과학, 경제, IT, 심리 상식을 퀴즈로 확인하세요.",
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
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-16 md:px-6">
      <div className="flex items-center gap-2.5">
        <span className="h-6 w-1 rounded-full bg-emerald-500" />
        <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">전체 퀴즈</h1>
      </div>

      {/* Categories Filter Tabs */}
      <div className="mt-6 flex flex-wrap gap-2 text-xs font-black">
        <Link 
          className={`rounded-full px-4.5 py-2 border transition-all duration-300 cursor-pointer ${
            !params.category
              ? "bg-slate-950 text-white border-slate-950 dark:bg-emerald-500 dark:text-emerald-950 dark:border-emerald-500 shadow-sm"
              : "border-slate-200/80 bg-white/70 text-slate-600 hover:border-emerald-500/30 hover:bg-emerald-50/20 dark:border-slate-800/80 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-emerald-950/20"
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
              className={`rounded-full px-4.5 py-2 border transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-slate-950 text-white border-slate-950 dark:bg-emerald-500 dark:text-emerald-950 dark:border-emerald-500 shadow-sm"
                  : "border-slate-200/80 bg-white/70 text-slate-600 hover:border-emerald-500/30 hover:bg-emerald-50/20 dark:border-slate-800/80 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-emerald-950/20"
              }`}
              href={`/quiz?category=${category.slug}`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.slice(0, 6).map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
      
      <AdSlot label="목록 중간 광고 영역" />
      
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.slice(6).map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
