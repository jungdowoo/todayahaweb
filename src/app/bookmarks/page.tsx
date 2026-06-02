import { BookmarkList } from "@/components/BookmarkList";
import { getPublishedQuizzes } from "@/lib/quizzes";

export const metadata = {
  title: "북마크",
  description: "저장한 오늘의 아하 퀴즈를 확인합니다.",
};

export default async function BookmarksPage() {
  const quizzes = await getPublishedQuizzes();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-16 md:px-6">
      <div className="flex items-center gap-2.5">
        <span className="h-6 w-1 rounded-full bg-emerald-500" />
        <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">북마크</h1>
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400">이 브라우저에 저장한 퀴즈 목록입니다.</p>
      <BookmarkList quizzes={quizzes} />
    </div>
  );
}
