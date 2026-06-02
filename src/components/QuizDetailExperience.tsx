"use client";

import { useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { ExplanationBlock } from "@/components/ExplanationBlock";
import { NextQuizButton } from "@/components/NextQuizButton";
import { QuizPlayer } from "@/components/QuizPlayer";
import { RelatedQuizzes } from "@/components/RelatedQuizzes";
import type { Quiz } from "@/types/quiz";

type QuizDetailExperienceProps = {
  quiz: Quiz;
  related: Quiz[];
};

const summaryPreferenceKey = "todayaha:show-summary-after-answer";

export function QuizDetailExperience({ quiz, related }: QuizDetailExperienceProps) {
  const [answered, setAnswered] = useState(false);
  const [showSummary, setShowSummary] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(summaryPreferenceKey) === "true";
  });

  const toggleSummary = () => {
    const nextValue = !showSummary;
    setShowSummary(nextValue);
    window.localStorage.setItem(summaryPreferenceKey, String(nextValue));
  };

  return (
    <>
      <QuizPlayer key={quiz.slug} quiz={quiz} onAnswered={() => setAnswered(true)} />

      {answered && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={toggleSummary}
            className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 font-black text-white shadow-sm transition hover:bg-slate-800 sm:w-auto dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
          >
            {showSummary ? "쉬운 요약 숨기기" : "쉬운 요약 보기"}
          </button>
          <NextQuizButton currentSlug={quiz.slug} compact />
        </div>
      )}

      {answered && showSummary && <ExplanationBlock quiz={quiz} />}

      {answered && (
        <>
          <AdSlot label="관련 퀴즈 아래 광고 영역" />
          <RelatedQuizzes quizzes={related} />
        </>
      )}
    </>
  );
}
