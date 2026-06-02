"use client";

import { useEffect, useState, useTransition } from "react";
import { recommendQuiz } from "@/app/quiz/actions";
import { cx } from "@/lib/utils";
import type { Quiz } from "@/types/quiz";

const countsKey = "todayaha:interesting-counts";
const votedKey = "todayaha:interesting-voted";

const readJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "") as T;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export function InterestingButton({ quiz }: { quiz: Quiz }) {
  const initialCount = Math.max(0, Number(quiz.interesting_count ?? 0));
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isPopular = count >= 100 || Boolean(quiz.is_popular);

  useEffect(() => {
    const counts = readJson<Record<string, number>>(countsKey, {});
    const votedSlugs = readJson<string[]>(votedKey, []);

    setCount(Math.max(initialCount, Number(counts[quiz.slug] ?? 0)));
    setVoted(votedSlugs.includes(quiz.slug));
  }, [initialCount, quiz.slug]);

  const saveLocalState = (nextCount: number, nextVoted = true) => {
    const counts = readJson<Record<string, number>>(countsKey, {});
    const votedSlugs = readJson<string[]>(votedKey, []);
    const nextVotedSlugs = nextVoted && !votedSlugs.includes(quiz.slug) ? [...votedSlugs, quiz.slug] : votedSlugs;

    writeJson(countsKey, { ...counts, [quiz.slug]: nextCount });
    writeJson(votedKey, nextVotedSlugs);
  };

  const handleClick = () => {
    if (voted || isPending) return;

    const optimisticCount = count + 1;
    setCount(optimisticCount);
    setVoted(true);
    saveLocalState(optimisticCount);

    startTransition(async () => {
      const result = await recommendQuiz(quiz.id, quiz.slug);
      if (typeof result.count === "number") {
        const syncedCount = Math.max(result.count, optimisticCount);
        setCount(syncedCount);
        saveLocalState(syncedCount);
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/10">
      <button
        type="button"
        onClick={handleClick}
        disabled={voted || isPending}
        className={cx(
          "inline-flex min-h-[2.75rem] items-center gap-2 rounded-xl px-4 text-sm font-black transition",
          voted
            ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
            : "bg-slate-950 text-white hover:bg-slate-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400",
          isPending && "opacity-80",
        )}
        aria-pressed={voted}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-.316-.18 22.338 22.338 0 0 1-3.041-2.139C4.39 13.007 2.5 10.807 2.5 8.25A4.25 4.25 0 0 1 9.2 4.771a4.25 4.25 0 0 1 8.3 1.479c0 2.557-1.89 4.757-3.772 6.333a22.338 22.338 0 0 1-3.041 2.139 20.759 20.759 0 0 1-.316.18l-.019.01-.005.003h-.002a.75.75 0 0 1-.692 0h-.002Z" />
        </svg>
        {voted ? "흥미로워요 완료" : "흥미로워요"}
      </button>

      <div className="flex flex-wrap items-center gap-2 text-sm font-extrabold text-slate-700 dark:text-slate-200">
        <span>{count.toLocaleString("ko-KR")}개 추천</span>
        {isPopular && (
          <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
            인기퀴즈
          </span>
        )}
      </div>
    </div>
  );
}
