import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizDetailExperience } from "@/components/QuizDetailExperience";
import { getPublishedQuizzes, getQuizBySlug, getRelatedQuizzes } from "@/lib/quizzes";
import { absoluteUrl, cleanPageTitle, quizJsonLd } from "@/lib/seo";
import { difficultyLabel } from "@/lib/utils";

export async function generateStaticParams() {
  const quizzes = await getPublishedQuizzes();
  return quizzes.map((quiz) => ({ slug: quiz.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const quiz = await getQuizBySlug(slug);
  if (!quiz) return {};
  const title = cleanPageTitle(quiz.seo_title ?? quiz.title);

  return {
    title,
    description: quiz.seo_description ?? quiz.short_explanation,
    alternates: { canonical: absoluteUrl(`/quiz/${quiz.slug}`) },
    openGraph: {
      title,
      description: quiz.seo_description ?? quiz.short_explanation,
      type: "article",
      publishedTime: quiz.published_at,
      modifiedTime: quiz.updated_at ?? quiz.published_at,
      authors: [absoluteUrl("/editorial-policy") + "#editorial-team"],
      url: absoluteUrl(`/quiz/${quiz.slug}`),
    },
  };
}

export default async function QuizDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = await getQuizBySlug(slug);
  if (!quiz) notFound();

  const related = await getRelatedQuizzes(quiz);
  const publishedDate = new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeZone: "Asia/Seoul" }).format(
    new Date(quiz.published_at),
  );
  const modifiedDate = new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeZone: "Asia/Seoul" }).format(
    new Date(quiz.updated_at ?? quiz.published_at),
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd(quiz)).replace(/</g, "\\u003c") }}
      />
      <div className="flex flex-wrap gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{quiz.category?.name}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{difficultyLabel[quiz.difficulty]}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">예상 {quiz.reading_time}분</span>
      </div>
      <h1 className="mt-6 text-3xl font-black leading-tight text-slate-950 sm:text-4xl dark:text-white">{quiz.title}</h1>
      <p className="mt-3 text-base font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
        먼저 정답을 골라보세요. 아래에서 정답과 자세한 이유도 바로 확인할 수 있습니다.
      </p>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-slate-500 dark:text-slate-400">
        <span>
          작성·검토:{" "}
          <Link className="underline underline-offset-2" href="/editorial-policy#editorial-team">
            오늘의 아하 편집팀
          </Link>
        </span>
        <span>게시: {publishedDate}</span>
        <span>최근 검토: {modifiedDate}</span>
      </div>
      <div className="mt-8">
        <QuizDetailExperience key={quiz.slug} quiz={quiz} related={related} />
      </div>
    </article>
  );
}
