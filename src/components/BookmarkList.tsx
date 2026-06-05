"use client";

import { useState } from "react";
import { QuizCard } from "@/components/QuizCard";
import type { Quiz } from "@/types/quiz";

export function BookmarkList({ quizzes }: { quizzes: Quiz[] }) {
  const [slugs] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const parsed = JSON.parse(window.localStorage.getItem("todayaha:bookmarks") ?? "[]");
      return Array.isArray(parsed) ? parsed.filter((slug): slug is string => typeof slug === "string") : [];
    } catch {
      return [];
    }
  });

  const bookmarked = quizzes.filter((quiz) => slugs.includes(quiz.slug));

  if (!bookmarked.length) {
    return (
      <p className="mt-8 rounded-3xl border border-slate-200/60 bg-white/70 p-8 text-center text-sm font-semibold text-slate-500 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-900/40 dark:text-slate-400">
        아직 저장한 퀴즈가 없습니다.
      </p>
    );
  }

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {bookmarked.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}
