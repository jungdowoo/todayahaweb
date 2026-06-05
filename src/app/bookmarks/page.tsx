import { BookmarkList } from "@/components/BookmarkList";
import { getPublishedQuizzes } from "@/lib/quizzes";

export const metadata = {
  title: "북마크",
  description: "브라우저에 저장한 오늘의 아하! 퀴즈 목록을 확인합니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BookmarksPage() {
  const quizzes = await getPublishedQuizzes();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-16">
      <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">북마크</h1>
      <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
        이 브라우저에 저장한 퀴즈 목록입니다.
      </p>
      <BookmarkList quizzes={quizzes} />
    </div>
  );
}
