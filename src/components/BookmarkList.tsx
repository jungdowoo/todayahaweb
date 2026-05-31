"use client";

import { useState } from "react";
import { QuizCard } from "@/components/QuizCard";
import type { Quiz } from "@/types/quiz";

export function BookmarkList({ quizzes }: { quizzes: Quiz[] }) {
  const [slugs] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(window.localStorage.getItem("todayaha:bookmarks") ?? "[]");
  });

  const bookmarked = quizzes.filter((quiz) => slugs.includes(quiz.slug));

  if (!bookmarked.length) {
    return <p className="mt-8 rounded-lg bg-slate-50 p-6 text-slate-600">저장한 퀴즈가 아직 없습니다.</p>;
  }

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {bookmarked.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}
