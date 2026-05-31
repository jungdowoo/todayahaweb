import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { QuizCard } from "@/components/QuizCard";
import { getCategories, getPublishedQuizzes } from "@/lib/quizzes";

export const metadata = {
  title: "전체 퀴즈",
  description: "생활, 과학, 경제, IT, 심리 상식을 퀴즈로 확인하세요.",
};

export default async function QuizListPage({ searchParams }: { searchParams: Promise<{ category?: string; difficulty?: string }> }) {
  const params = await searchParams;
  const [quizzes, categories] = await Promise.all([getPublishedQuizzes(), getCategories()]);
  const filtered = quizzes.filter(
    (quiz) =>
      (!params.category || quiz.category?.slug === params.category) &&
      (!params.difficulty || quiz.difficulty === params.difficulty),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">전체 퀴즈</h1>
      <div className="mt-5 flex flex-wrap gap-2 text-sm font-bold">
        <Link className="rounded-full border border-slate-300 px-3 py-2" href="/quiz">
          전체
        </Link>
        {categories.map((category) => (
          <Link key={category.id} className="rounded-full border border-slate-300 px-3 py-2" href={`/quiz?category=${category.slug}`}>
            {category.name}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {filtered.slice(0, 6).map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
      <AdSlot label="목록 중간 광고 영역" />
      <div className="grid gap-4 md:grid-cols-3">
        {filtered.slice(6).map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
