import { QuizCard } from "@/components/QuizCard";
import type { Quiz } from "@/types/quiz";

export function RelatedQuizzes({ quizzes }: { quizzes: Quiz[] }) {
  if (!quizzes.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">관련 퀴즈</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </section>
  );
}
