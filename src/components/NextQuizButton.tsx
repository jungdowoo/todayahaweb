"use client";

import { useRouter } from "next/navigation";
import { readPlayedQuizSlugs, rememberPlayedQuiz } from "@/lib/playedQuizzes";

type NextQuizButtonProps = {
  currentSlug: string;
  compact?: boolean;
};

export function NextQuizButton({ currentSlug, compact = false }: NextQuizButtonProps) {
  const router = useRouter();
  const goNext = () => {
    rememberPlayedQuiz(currentSlug);

    const excluded = new Set(readPlayedQuizSlugs());
    excluded.add(currentSlug);

    const params = new URLSearchParams({
      from: currentSlug,
      t: Date.now().toString(),
    });

    const exclude = [...excluded].join(",");
    if (exclude) params.set("exclude", exclude);

    router.push(`/quiz/random?${params.toString()}`);
  };

  return (
    <button
      type="button"
      onClick={goNext}
      className={[
        "inline-flex items-center justify-center bg-slate-950 text-center font-black text-white shadow-sm transition-all duration-300 hover:bg-slate-900 active:scale-95 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 cursor-pointer",
        compact ? "min-h-[2.75rem] rounded-xl px-4 py-2 text-sm" : "min-h-[3.25rem] rounded-[22px] px-6 py-3",
        compact ? "w-full sm:w-auto" : "w-full",
      ].join(" ")}
    >
      다음 퀴즈 풀기
    </button>
  );
}
