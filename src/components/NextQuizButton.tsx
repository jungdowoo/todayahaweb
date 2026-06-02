import Link from "next/link";

type NextQuizButtonProps = {
  currentSlug: string;
  compact?: boolean;
};

export function NextQuizButton({ currentSlug, compact = false }: NextQuizButtonProps) {
  return (
    <Link
      href={`/quiz/random?from=${encodeURIComponent(currentSlug)}`}
      prefetch={false}
      className={[
        "inline-flex min-h-[3.25rem] items-center justify-center rounded-[22px] bg-slate-950 px-6 py-3 text-center font-black text-white shadow-sm transition-all duration-300 hover:bg-slate-900 active:scale-95 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 cursor-pointer",
        compact ? "w-full sm:w-auto" : "w-full",
      ].join(" ")}
    >
      다음 퀴즈 풀기
    </Link>
  );
}
