import Link from "next/link";
import { Suspense } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { QuizCard } from "@/components/QuizCard";
import { SearchBox } from "@/components/SearchBox";
import { getCategories, getLatestQuizzes, getPopularQuizzes, getTodayQuiz } from "@/lib/quizzes";

export default async function Home() {
  const [todayQuiz, popularQuizzes, latestQuizzes, categories] = await Promise.all([
    getTodayQuiz(),
    getPopularQuizzes(3),
    getLatestQuizzes(3),
    getCategories(),
  ]);

  return (
    <div className="bg-transparent">
      <section className="bg-white/50 px-4 py-16 sm:py-24 md:px-6 lg:px-8 dark:bg-slate-900/50">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black tracking-wider text-emerald-600 dark:text-emerald-400">오늘 하나만 알아도 똑똑해지는 1분 상식 퀴즈</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl dark:text-white">오늘의 아하!</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            생활 속 궁금증을 O/X와 4지선다로 가볍게 풀고, 쉬운 해설로 이해해보세요.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {todayQuiz ? (
              <Link
                href={`/quiz/${todayQuiz.slug}`}
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-2xl bg-slate-900 px-8 font-bold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
              >
                오늘의 퀴즈 풀기
              </Link>
            ) : (
              <Link
                href="/today"
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-2xl bg-slate-900 px-8 font-bold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
              >
                오늘의 퀴즈 풀기
              </Link>
            )}
            <Link
              href="/quiz"
              className="inline-flex min-h-[3.5rem] items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              전체 퀴즈 보기
            </Link>
          </div>
          <div className="mx-auto mt-12 max-w-xl">
            <Suspense>
              <SearchBox />
            </Suspense>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">인기 퀴즈</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {popularQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">최신 퀴즈</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {latestQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">카테고리</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
