"use client";

import { cx } from "@/lib/utils";

type QuizOptionButtonProps = {
  option: string;
  index: number;
  answered: boolean;
  isSelected: boolean;
  isCorrectAnswer: boolean;
  onClick: () => void;
};

const optionMarkers = ["A", "B", "C", "D"] as const;

export function QuizOptionButton({
  option,
  index,
  answered,
  isSelected,
  isCorrectAnswer,
  onClick,
}: QuizOptionButtonProps) {
  const marker = option === "진실" ? "✓" : option === "거짓" ? "×" : optionMarkers[index] ?? String(index + 1);

  return (
    <button
      type="button"
      disabled={answered}
      onClick={onClick}
      className={cx(
        "relative flex min-h-[4rem] w-full cursor-pointer items-center justify-between overflow-hidden rounded-[22px] border-2 px-5 py-4 text-left font-bold transition-all duration-300 sm:px-6",
        !answered &&
          "border-slate-200/60 bg-white/70 text-slate-800 shadow-sm hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-emerald-50/30 hover:shadow-md hover:shadow-emerald-500/5 active:translate-y-0 active:scale-[0.99] dark:border-slate-800/80 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-emerald-400/50 dark:hover:bg-emerald-950/20",
        answered &&
          isCorrectAnswer &&
          "border-emerald-500 bg-emerald-50/60 text-emerald-950 shadow-sm shadow-emerald-500/5 dark:border-emerald-500/80 dark:bg-emerald-950/30 dark:text-emerald-50",
        answered &&
          isSelected &&
          !isCorrectAnswer &&
          "border-rose-500 bg-rose-50/60 text-rose-950 shadow-sm shadow-rose-500/5 dark:border-rose-500/80 dark:bg-rose-950/30 dark:text-rose-50",
        answered &&
          !isCorrectAnswer &&
          !isSelected &&
          "border-slate-200/40 bg-slate-50/30 text-slate-400/70 opacity-40 dark:border-slate-800/40 dark:bg-slate-900/10 dark:text-slate-600",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cx(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-black transition-all",
            answered && isCorrectAnswer
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : answered && isSelected
                ? "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-300",
          )}
        >
          {marker}
        </span>
        <span className="min-w-0 text-base font-semibold leading-snug tracking-tight sm:text-lg">{option}</span>
      </div>

      {answered && (
        <div className="ml-4 flex shrink-0 items-center">
          {isCorrectAnswer && (
            <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-black text-emerald-600 dark:text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
              정답
            </span>
          )}
          {isSelected && !isCorrectAnswer && (
            <span className="flex items-center gap-1 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-black text-rose-600 dark:text-rose-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L10 8.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L11.06 10l3.47 3.47a.75.75 0 1 1-1.06 1.06L10 11.06l-3.47 3.47a.75.75 0 1 1-1.06-1.06L8.94 10 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
              내 선택
            </span>
          )}
        </div>
      )}
    </button>
  );
}
