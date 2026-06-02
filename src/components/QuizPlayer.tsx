"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Quiz } from "@/types/quiz";
import { quizOptions } from "@/lib/utils";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

// Import modular components
import { InterestingButton } from "@/components/InterestingButton";
import { QuizQuestionCard } from "@/components/QuizQuestionCard";
import { QuizOptionButton } from "@/components/QuizOptionButton";
import { QuizResultBox } from "@/components/QuizResultBox";

type QuizPlayerProps = {
  quiz: Quiz;
  onAnswered?: () => void;
};

export function QuizPlayer({ quiz, onAnswered }: QuizPlayerProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const reportedAnswer = useRef(false);
  
  const [bookmarked, setBookmarked] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = JSON.parse(window.localStorage.getItem("todayaha:bookmarks") ?? "[]") as string[];
    return saved.includes(quiz.slug);
  });

  const options = useMemo(() => quizOptions(quiz), [quiz]);
  const answered = selected !== null;
  const isCorrect = selected === quiz.correct_answer;

  // Answer Report Effect
  useEffect(() => {
    if (!answered || reportedAnswer.current) return;
    reportedAnswer.current = true;
    onAnswered?.();
  }, [answered, onAnswered]);

  // Selection Handler
  const choose = async (option: string) => {
    if (answered) return;

    setSelected(option);

    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.from("quiz_attempts").insert({
        quiz_id: quiz.id,
        selected_answer: option,
        is_correct: option === quiz.correct_answer,
      });
    }
  };

  // Bookmark Toggle
  const toggleBookmark = () => {
    const key = "todayaha:bookmarks";
    const current = JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
    const next = current.includes(quiz.slug)
      ? current.filter((slug) => slug !== quiz.slug)
      : [...current, quiz.slug];
    window.localStorage.setItem(key, JSON.stringify(next));
    setBookmarked(next.includes(quiz.slug));
  };

  return (
    <div className="space-y-6">
      {/* 1. Quiz Question details card */}
      <QuizQuestionCard
        question={quiz.question}
        bookmarked={bookmarked}
        onToggleBookmark={toggleBookmark}
      />

      {/* 2. Quiz recommendation */}
      <InterestingButton quiz={quiz} />

      {/* 3. Options choice grid */}
      <div className="grid gap-3 sm:gap-4">
        {options.map((option, index) => {
          const isAnswer = option === quiz.correct_answer;
          const isSelected = option === selected;
          return (
            <QuizOptionButton
              key={`${option}-${index}`}
              option={option}
              index={index}
              answered={answered}
              isSelected={isSelected}
              isCorrectAnswer={isAnswer}
              onClick={() => choose(option)}
            />
          );
        })}
      </div>

      {/* 4. Results & short explanation box */}
      {answered && (
        <QuizResultBox
          quiz={quiz}
          isCorrect={isCorrect}
          selectedAnswer={selected}
        />
      )}
    </div>
  );
}
