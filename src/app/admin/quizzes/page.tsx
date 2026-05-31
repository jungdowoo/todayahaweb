import Link from "next/link";
import { getAdminQuizzes } from "@/lib/quizzes";

export default async function AdminQuizzesPage() {
  const quizzes = await getAdminQuizzes();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-slate-950">퀴즈 관리</h1>
        <Link className="rounded-lg bg-slate-950 px-4 py-2 font-bold text-white" href="/admin/quizzes/new">
          새 퀴즈
        </Link>
      </div>
      <div className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-black">{quiz.title}</p>
              <p className="text-sm text-slate-500">/{quiz.slug} · {quiz.is_published ? "공개" : "비공개"}</p>
            </div>
            <Link className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold" href={`/admin/quizzes/${quiz.id}/edit`}>
              수정
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
