"use client";

import type { Quiz } from "@/types/quiz";
import { cx } from "@/lib/utils";

type QuizResultBoxProps = {
  quiz: Quiz;
  isCorrect: boolean;
  selectedAnswer: string | null;
};

export function QuizResultBox({ quiz, isCorrect, selectedAnswer }: QuizResultBoxProps) {
  return (
    <div
      className={cx(
        "relative mt-8 overflow-hidden rounded-[28px] border p-6 shadow-md backdrop-blur-sm sm:p-8 transition-all duration-300",
        isCorrect
          ? "border-emerald-500/20 bg-emerald-50/30 text-slate-900 dark:border-emerald-500/20 dark:bg-emerald-950/10 dark:text-white"
          : "border-rose-500/20 bg-rose-50/30 text-slate-900 dark:border-rose-500/20 dark:bg-rose-950/10 dark:text-white",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cx(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-xl font-black shadow-sm",
            isCorrect
              ? "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
              : "border-rose-200 bg-rose-100 text-rose-700 dark:border-rose-800 dark:bg-rose-900 dark:text-rose-300",
          )}
        >
          {isCorrect ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 animate-bounce">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 animate-pulse">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L10 8.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L11.06 10l3.47 3.47a.75.75 0 1 1-1.06 1.06L10 11.06l-3.47 3.47a.75.75 0 1 1-1.06-1.06L8.94 10 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div>
          <h3 className="text-lg font-black tracking-tight leading-none text-slate-950 dark:text-white">
            {isCorrect ? "정답입니다!" : "아쉽지만 오답입니다"}
          </h3>
          <p className="mt-1.5 text-xs font-bold opacity-75">
            {isCorrect ? "좋아요. 핵심을 잘 잡았습니다." : "요약으로 진짜 이유를 확인해보세요."}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3 rounded-2xl border border-slate-200/60 bg-white/85 p-4 dark:border-slate-800/80 dark:bg-slate-950/60">
        {selectedAnswer && !isCorrect && (
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="font-extrabold text-rose-500">내 선택:</span>
            <span className="font-semibold">{selectedAnswer}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200">
          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">정답:</span>
          <span className="rounded-lg bg-emerald-500/10 px-2.5 py-0.5 font-black text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
            {quiz.correct_answer}
          </span>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200/60 pt-5 dark:border-slate-800/60">
        <p className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">한눈에 보는 요약</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-medium">{quiz.short_explanation}</p>
      </div>
    </div>
  );
}
