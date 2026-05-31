import { BookmarkList } from "@/components/BookmarkList";
import { getPublishedQuizzes } from "@/lib/quizzes";

export const metadata = {
  title: "북마크",
  description: "저장한 오늘의 아하 퀴즈를 확인합니다.",
};

export default async function BookmarksPage() {
  const quizzes = await getPublishedQuizzes();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">북마크</h1>
      <p className="mt-3 text-slate-600">이 브라우저에 저장한 퀴즈 목록입니다.</p>
      <BookmarkList quizzes={quizzes} />
    </div>
  );
}
