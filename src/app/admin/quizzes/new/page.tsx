import { createQuiz } from "@/app/admin/actions";
import { QuizForm } from "@/components/QuizForm";
import { getCategories } from "@/lib/quizzes";

export default async function NewQuizPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">새 퀴즈</h1>
      <QuizForm action={createQuiz} categories={categories} />
    </div>
  );
}
