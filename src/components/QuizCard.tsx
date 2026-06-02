import Link from "next/link";
import type { Quiz } from "@/types/quiz";
import { difficultyLabel } from "@/lib/utils";

export function QuizCard({ quiz }: { quiz: Quiz }) {
  const interestingCount = Number(quiz.interesting_count ?? 0);
  const isPopular = Boolean(quiz.is_popular) || interestingCount >= 100;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/30 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 dark:border-slate-800/60 dark:bg-slate-900/50 dark:hover:border-emerald-400/30 dark:hover:bg-slate-900/90">
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
        <span className="rounded-full bg-slate-100/80 px-2.5 py-0.5 border border-slate-200/10 dark:bg-slate-800/60 dark:border-slate-700/20">{quiz.category?.name}</span>
        <span className="rounded-full bg-slate-100/80 px-2.5 py-0.5 border border-slate-200/10 dark:bg-slate-800/60 dark:border-slate-700/20">{difficultyLabel[quiz.difficulty]}</span>
        <span className="rounded-full bg-slate-100/80 px-2.5 py-0.5 border border-slate-200/10 dark:bg-slate-800/60 dark:border-slate-700/20">{quiz.reading_time}분</span>
        <span className="rounded-full bg-emerald-50/80 px-2.5 py-0.5 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 font-extrabold border border-emerald-500/10">
          추천 {interestingCount.toLocaleString("ko-KR")}
        </span>
        {isPopular && (
          <span className="rounded-full bg-rose-50/80 px-2.5 py-0.5 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 font-extrabold border border-rose-500/10 animate-pulse">
            인기
          </span>
        )}
      </div>
      <h2 className="mt-4 text-lg font-black leading-snug text-slate-950 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
        <Link href={`/quiz/${quiz.slug}`} className="focus:outline-none">
          {quiz.title}
        </Link>
      </h2>
      <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400 font-medium">{quiz.short_explanation}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {quiz.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500 border border-slate-200/30 dark:bg-slate-950/40 dark:text-slate-400 dark:border-slate-800/50">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
