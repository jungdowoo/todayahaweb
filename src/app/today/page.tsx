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

  if (!quiz) return <div className="mx-auto max-w-3xl px-4 py-12">오늘 표시할 퀴즈가 없습니다.</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-black text-cyan-700">오늘의 퀴즈</p>
      <h1 className="mt-2 text-3xl font-black text-slate-950">{quiz.title}</h1>
      <div className="mt-6">
        <QuizPlayer quiz={quiz} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/quiz/${quiz.slug}`} className="rounded-lg border border-slate-300 px-5 py-3 font-bold">
          자세한 해설 보기
        </Link>
        {next && (
          <Link href={`/quiz/${next.slug}`} className="rounded-lg bg-cyan-600 px-5 py-3 font-bold text-white">
            다음 퀴즈 보기
          </Link>
        )}
      </div>
    </div>
  );
}
