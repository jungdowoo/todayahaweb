import { Suspense } from "react";
import { QuizCard } from "@/components/QuizCard";
import { SearchBox } from "@/components/SearchBox";
import { searchQuizzes } from "@/lib/quizzes";

export const metadata = {
  title: "검색",
  description: "오늘의 아하 퀴즈를 제목, 질문, 태그로 검색합니다.",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = params.q ?? "";
  const results = query ? await searchQuizzes(query) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">퀴즈 검색</h1>
      <div className="mt-5 max-w-2xl">
        <Suspense>
          <SearchBox />
        </Suspense>
      </div>
      {query && (
        <p className="mt-6 text-slate-600">
          <strong>{query}</strong> 검색 결과 {results.length}개
        </p>
      )}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {results.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
      {query && !results.length && <p className="mt-8 rounded-lg bg-slate-50 p-6 text-slate-600">검색 결과가 없습니다. 다른 단어로 찾아보세요.</p>}
    </div>
  );
}
