import Link from "next/link";
import { QuizPlayer } from "@/components/QuizPlayer";
import { getNextQuiz, getTodayQuiz } from "@/lib/quizzes";

export const metadata = {
  title: "오늘 퀴즈",
  description: "오늘의 아하!에서 오늘 풀어볼 진실/거짓 생활 상식 퀴즈를 확인해보세요.",
};

export default async function TodayPage() {
  const quiz = await getTodayQuiz();
  const next = quiz ? await getNextQuiz(quiz) : null;

  if (!quiz) {
    return <div className="mx-auto max-w-3xl px-4 py-12 font-bold text-slate-500">오늘 표시할 퀴즈가 없습니다.</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <p className="text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">오늘 퀴즈</p>
      <h1 className="mt-3 text-3xl font-black leading-snug text-slate-950 sm:text-4xl dark:text-white">{quiz.title}</h1>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-500 dark:text-slate-400">
        먼저 정답을 골라보세요. 선택한 뒤 정답과 해설이 열립니다.
      </p>
      <div className="mt-8">
        <QuizPlayer quiz={quiz} />
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/quiz/${quiz.slug}`}
          className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 font-black text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
        >
          상세 페이지 보기
        </Link>
        {next && (
          <Link
            href={`/quiz/${next.slug}`}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 font-black text-white shadow-sm transition hover:bg-slate-900 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
          >
            다른 퀴즈 보기
          </Link>
        )}
      </div>
    </div>
  );
}
