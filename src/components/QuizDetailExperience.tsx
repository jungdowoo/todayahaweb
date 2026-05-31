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
  next: Quiz | null;
  related: Quiz[];
};

const detailPreferenceKey = "todayaha:show-detail-after-answer";

export function QuizDetailExperience({ quiz, next, related }: QuizDetailExperienceProps) {
  const [answered, setAnswered] = useState(false);
  const [showDetails, setShowDetails] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(detailPreferenceKey) === "true";
  });

  const toggleDetails = () => {
    const nextValue = !showDetails;
    setShowDetails(nextValue);
    window.localStorage.setItem(detailPreferenceKey, String(nextValue));
  };

  return (
    <>
      <QuizPlayer key={quiz.slug} quiz={quiz} onAnswered={() => setAnswered(true)} />

      {answered && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={toggleDetails}
            className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 font-black text-white shadow-sm transition hover:bg-slate-800 sm:w-auto dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
          >
            {showDetails ? "자세한 설명 숨기기" : "자세한 설명 보기"}
          </button>
          <NextQuizButton quiz={next} compact />
        </div>
      )}

      {answered && showDetails && <ExplanationBlock quiz={quiz} />}

      {answered && (
        <>
          <AdSlot label="관련 퀴즈 아래 광고 영역" />
          <RelatedQuizzes quizzes={related} />
        </>
      )}
    </>
  );
}
