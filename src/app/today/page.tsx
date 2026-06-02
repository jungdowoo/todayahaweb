import Link from "next/link";
import { QuizPlayer } from "@/components/QuizPlayer";
import { getNextQuiz, getTodayQuiz } from "@/lib/quizzes";

export const metadata = {
  title: "오늘의 퀴즈",
  description: "오늘 날짜에 맞춰 선정된 생활 상식 퀴즈를 풀어보세요.",
};

export default async function TodayPage() {
  const quiz = await getTodayQuiz();
  const next = quiz ? await getNextQuiz(quiz) : null;

  if (!quiz) return <div className="mx-auto max-w-3xl px-4 py-12 font-bold text-slate-500">오늘 표시할 퀴즈가 없습니다.</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16 md:px-6">
      <p className="text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">오늘의 퀴즈</p>
      <h1 className="mt-3 text-3xl font-black leading-snug text-slate-950 sm:text-4xl dark:text-white">{quiz.title}</h1>
      <div className="mt-8">
        <QuizPlayer quiz={quiz} />
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={`/quiz/${quiz.slug}`} className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[22px] border border-slate-200/80 bg-white/80 px-6 py-3 font-black text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-95 dark:border-slate-800/80 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900 cursor-pointer">
          자세한 해설 보기
        </Link>
        {next && (
          <Link href={`/quiz/${next.slug}`} className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[22px] bg-slate-950 px-6 py-3 font-black text-white shadow-sm transition hover:bg-slate-900 active:scale-95 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 cursor-pointer">
            다음 퀴즈 보기
          </Link>
        )}
      </div>
    </div>
  );
}
