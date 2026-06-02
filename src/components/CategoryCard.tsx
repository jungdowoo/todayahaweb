import Link from "next/link";
import type { Category } from "@/types/quiz";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.slug}`} className="group rounded-3xl border border-slate-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/30 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 dark:border-slate-800/60 dark:bg-slate-900/50 dark:hover:border-emerald-400/30 dark:hover:bg-slate-900/90">
      <p className="text-lg font-black text-slate-950 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">{category.name}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400 font-medium">{category.description}</p>
    </Link>
  );
}
