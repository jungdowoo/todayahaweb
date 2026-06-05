import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { QuizCard } from "@/components/QuizCard";
import { getCategories, getLatestQuizzes, getPopularQuizzes, getTodayQuiz } from "@/lib/quizzes";

export default async function Home() {
  const [todayQuiz, popularQuizzes, latestQuizzes, categories] = await Promise.all([
    getTodayQuiz(),
    getPopularQuizzes(3),
    getLatestQuizzes(3),
    getCategories(),
  ]);

  return (
    <div>
      <section className="px-4 py-16 sm:py-24 md:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            하루 하나, 진실/거짓 생활 상식
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl dark:text-white">
            오늘 믿고 있던 상식이 정말 맞는지 확인해보세요.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">
            오늘의 아하!는 일상 속 오해와 속설을 짧은 퀴즈로 풀고, 정답 뒤에는 왜 그런지 쉽게 설명하는 상식 퀴즈 사이트입니다.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={todayQuiz ? `/quiz/${todayQuiz.slug}` : "/today"}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-slate-950 px-6 font-black text-white shadow-sm transition hover:bg-slate-900 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
            >
              오늘 퀴즈 풀기
            </Link>
            <Link
              href="/quiz"
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 font-black text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            >
              전체 퀴즈 보기
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">많이 본 퀴즈</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {popularQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">최신 퀴즈</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {latestQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">카테고리</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            관심 있는 주제부터 골라 일상 속 오해를 하나씩 확인해보세요.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard key={`${category.id}-${index}`} category={category} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
