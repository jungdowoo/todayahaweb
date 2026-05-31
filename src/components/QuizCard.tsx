import Link from "next/link";
import type { Quiz } from "@/types/quiz";
import { difficultyLabel } from "@/lib/utils";

export function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 dark:bg-slate-800">{quiz.category?.name}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 dark:bg-slate-800">{difficultyLabel[quiz.difficulty]}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 dark:bg-slate-800">{quiz.reading_time}분</span>
      </div>
      <h2 className="mt-4 text-lg font-black leading-snug text-slate-950 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
        <Link href={`/quiz/${quiz.slug}`}>{quiz.title}</Link>
      </h2>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{quiz.short_explanation}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {quiz.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
