"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Quiz } from "@/types/quiz";
import { cx, quizOptions } from "@/lib/utils";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type QuizPlayerProps = {
  quiz: Quiz;
  onAnswered?: () => void;
};

export function QuizPlayer({ quiz, onAnswered }: QuizPlayerProps) {
  const timeLimit = Math.max(5, quiz.time_limit_seconds ?? 10);
  const [selected, setSelected] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const reportedAnswer = useRef(false);
  const [bookmarked, setBookmarked] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = JSON.parse(window.localStorage.getItem("todayaha:bookmarks") ?? "[]") as string[];
    return saved.includes(quiz.slug);
  });

  const options = useMemo(() => quizOptions(quiz), [quiz]);
  const answered = selected !== null || timedOut;
  const isCorrect = selected === quiz.correct_answer;
  const timerPercent = Math.max(0, Math.min(100, (timeLeft / timeLimit) * 100));

  useEffect(() => {
    if (answered) return;

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setTimedOut(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [answered]);

  useEffect(() => {
    if (!answered || reportedAnswer.current) return;

    reportedAnswer.current = true;
    onAnswered?.();
  }, [answered, onAnswered]);

  const choose = async (option: string) => {
    if (answered) return;

    setSelected(option);

    const supabase = getSupabaseBrowserClient();
    await supabase?.from("quiz_attempts").insert({
      quiz_id: quiz.id,
      selected_answer: option,
      is_correct: option === quiz.correct_answer,
    });
  };

  const toggleBookmark = () => {
    const key = "todayaha:bookmarks";
    const current = JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
    const next = current.includes(quiz.slug) ? current.filter((slug) => slug !== quiz.slug) : [...current, quiz.slug];
    window.localStorage.setItem(key, JSON.stringify(next));
    setBookmarked(next.includes(quiz.slug));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
          {quiz.quiz_type === "OX" ? "O/X 퀴즈" : "4지선다 퀴즈"}
        </p>
        <button
          type="button"
          onClick={toggleBookmark}
          className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="북마크 토글"
        >
          {bookmarked ? "저장됨" : "북마크"}
        </button>
      </div>

      <h2 className="mt-4 text-2xl font-black leading-snug text-slate-950 sm:text-3xl dark:text-white">{quiz.question}</h2>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
        <div className="flex items-center justify-between gap-4 text-sm font-black text-slate-700 dark:text-slate-200">
          <span>남은 시간</span>
          <span aria-live="polite">{timeLeft}초</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" aria-hidden="true">
          <div
            className={cx(
              "h-full rounded-full transition-all duration-500",
              timeLeft <= 3 ? "bg-rose-500" : "bg-emerald-500",
            )}
            style={{ width: `${timerPercent}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {options.map((option) => {
          const isAnswer = option === quiz.correct_answer;
          const isSelected = option === selected;
          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => choose(option)}
              className={cx(
                "flex min-h-[3.5rem] items-center rounded-2xl border-2 px-5 py-4 text-left font-bold leading-6 transition-all",
                !answered &&
                  "border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30",
                answered && isAnswer && "border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-100",
                answered && isSelected && !isAnswer && "border-rose-500 bg-rose-50 text-rose-900 dark:border-rose-500 dark:bg-rose-900/30 dark:text-rose-100",
                answered && !isAnswer && !isSelected && "border-slate-100 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-500",
              )}
            >
              {answered && isAnswer && <span className="mr-3 text-sm font-black text-emerald-700 dark:text-emerald-300">정답</span>}
              {answered && isSelected && !isAnswer && <span className="mr-3 text-sm font-black text-rose-700 dark:text-rose-300">오답</span>}
              <span className="text-lg">{option}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={cx(
            "mt-6 rounded-2xl p-6 transition-all",
            isCorrect ? "bg-emerald-50 text-emerald-950 dark:bg-emerald-900/20 dark:text-emerald-100" : "bg-rose-50 text-rose-950 dark:bg-rose-900/20 dark:text-rose-100",
          )}
        >
          <p className="text-lg font-black">
            {timedOut ? "시간이 끝났습니다." : isCorrect ? "정답입니다." : "아쉽지만 오답입니다."}
          </p>
          <p className="mt-3 text-lg font-bold">정답: {quiz.correct_answer}</p>
          <p className="mt-4 leading-8 text-slate-800 dark:text-slate-200">{quiz.short_explanation}</p>
        </div>
      )}
    </section>
  );
}
