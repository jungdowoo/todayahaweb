import { updateQuiz } from "@/app/admin/actions";
import { QuizForm } from "@/components/QuizForm";
import { getCategories, getQuizById } from "@/lib/quizzes";

export default async function EditQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [quiz, categories] = await Promise.all([getQuizById(id), getCategories()]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">퀴즈 수정</h1>
      <p className="mt-2 text-sm text-slate-500">ID: {id}</p>
      <QuizForm action={updateQuiz} quiz={quiz ?? undefined} categories={categories} />
    </div>
  );
}
