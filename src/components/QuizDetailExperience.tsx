"use client";

import { useState } from "react";
import { ExplanationBlock } from "@/components/ExplanationBlock";
import { QuizPlayer } from "@/components/QuizPlayer";
import { RelatedQuizzes } from "@/components/RelatedQuizzes";
import type { Quiz } from "@/types/quiz";

type QuizDetailExperienceProps = {
  quiz: Quiz;
  related: Quiz[];
};

export function QuizDetailExperience({ quiz, related }: QuizDetailExperienceProps) {
  const [answered, setAnswered] = useState(false);

  return (
    <>
      <QuizPlayer key={quiz.slug} quiz={quiz} onAnswered={() => setAnswered(true)} />
      {answered && (
        <>
          <ExplanationBlock quiz={quiz} />
          <RelatedQuizzes quizzes={related} />
        </>
      )}
    </>
  );
}
