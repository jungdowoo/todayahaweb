import Link from "next/link";
import type { Category } from "@/types/quiz";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <p className="text-lg font-black text-slate-950 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">{category.name}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{category.description}</p>
    </Link>
  );
}
