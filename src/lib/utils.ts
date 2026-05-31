import type { Quiz } from "@/types/quiz";

export const difficultyLabel = {
  easy: "쉬움",
  normal: "보통",
  hard: "어려움",
} as const;

export const quizOptions = (quiz: Quiz) =>
  [quiz.option_1, quiz.option_2, quiz.option_3, quiz.option_4].filter(Boolean) as string[];

export const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");
