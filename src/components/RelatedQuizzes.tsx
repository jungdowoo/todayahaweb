import { QuizCard } from "@/components/QuizCard";
import type { Quiz } from "@/types/quiz";

export function RelatedQuizzes({ quizzes }: { quizzes: Quiz[] }) {
  if (!quizzes.length) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2.5">
        <span className="h-6 w-1 rounded-full bg-emerald-500" />
        <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">관련 퀴즈</h2>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </section>
  );
}
