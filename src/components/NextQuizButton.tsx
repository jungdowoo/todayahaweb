import Link from "next/link";
import type { Quiz } from "@/types/quiz";

type NextQuizButtonProps = {
  quiz: Quiz | null;
  compact?: boolean;
};

export function NextQuizButton({ quiz, compact = false }: NextQuizButtonProps) {
  if (!quiz) return null;

  return (
    <Link
      href={`/quiz/${quiz.slug}`}
      className={[
        "inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-cyan-600 px-6 py-3 text-center font-black text-white shadow-sm transition-all hover:bg-cyan-700 hover:shadow-md dark:bg-cyan-400 dark:text-cyan-950 dark:hover:bg-cyan-300",
        compact ? "w-full sm:w-auto" : "w-full",
      ].join(" ")}
    >
      다음 퀴즈 풀기
    </Link>
  );
}
