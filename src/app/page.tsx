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
    <div className="bg-transparent">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-28 md:px-6 lg:px-8 bg-gradient-to-b from-white/30 via-slate-50/10 to-transparent dark:from-slate-900/10 dark:via-slate-950/5 dark:to-transparent">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 dark:opacity-20">
          <div className="h-[400px] w-[400px] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            오늘 하나만 알아도 똑똑해지는 1분 상식 퀴즈
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-7xl leading-tight">
            오늘의 <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-300">아하!</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
            짧은 진실/거짓 퀴즈로 흥미로운 사실을 확인하고, <br className="hidden sm:inline" />
            친절하고 쉬운 요약으로 진짜 이유를 머릿속에 쏙쏙 담아보세요.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {todayQuiz ? (
              <Link
                href={`/quiz/${todayQuiz.slug}`}
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-[22px] bg-slate-950 px-8 font-black text-white shadow-sm transition-all hover:bg-slate-900 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-95 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 cursor-pointer"
              >
                오늘의 퀴즈 풀기
              </Link>
            ) : (
              <Link
                href="/today"
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-[22px] bg-slate-950 px-8 font-black text-white shadow-sm transition-all hover:bg-slate-900 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-95 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 cursor-pointer"
              >
                오늘의 퀴즈 풀기
              </Link>
            )}
            <Link
              href="/quiz"
              className="inline-flex min-h-[3.5rem] items-center justify-center rounded-[22px] border border-slate-200/80 bg-white px-8 font-black text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-95 dark:border-slate-800/80 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900 cursor-pointer"
            >
              전체 퀴즈 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <section className="mb-16">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-1 rounded-full bg-emerald-500" />
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">인기 퀴즈</h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {popularQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-1 rounded-full bg-emerald-500" />
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">최신 퀴즈</h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {latestQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-1 rounded-full bg-emerald-500" />
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">카테고리</h2>
          </div>
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
