import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizDetailExperience } from "@/components/QuizDetailExperience";
import { getNextQuiz, getPublishedQuizzes, getQuizBySlug, getRelatedQuizzes } from "@/lib/quizzes";
import { absoluteUrl, quizJsonLd } from "@/lib/seo";
import { difficultyLabel } from "@/lib/utils";

export async function generateStaticParams() {
  const quizzes = await getPublishedQuizzes();
  return quizzes.map((quiz) => ({ slug: quiz.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const quiz = await getQuizBySlug(slug);
  if (!quiz) return {};

  return {
    title: quiz.seo_title ?? quiz.title,
    description: quiz.seo_description ?? quiz.short_explanation,
    alternates: { canonical: absoluteUrl(`/quiz/${quiz.slug}`) },
    openGraph: {
      title: quiz.seo_title ?? quiz.title,
      description: quiz.seo_description ?? quiz.short_explanation,
      type: "article",
      url: absoluteUrl(`/quiz/${quiz.slug}`),
    },
  };
}

export default async function QuizDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = await getQuizBySlug(slug);
  if (!quiz) notFound();

  const [related, next] = await Promise.all([getRelatedQuizzes(quiz), getNextQuiz(quiz)]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd(quiz)) }} />
      <div className="flex flex-wrap gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{quiz.category?.name}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{difficultyLabel[quiz.difficulty]}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">예상 {quiz.reading_time}분</span>
      </div>
      <h1 className="mt-6 text-3xl font-black leading-tight text-slate-950 sm:text-4xl dark:text-white">{quiz.title}</h1>
      <div className="mt-8">
        <QuizDetailExperience key={quiz.slug} quiz={quiz} next={next} related={related} />
      </div>
    </article>
  );
}
