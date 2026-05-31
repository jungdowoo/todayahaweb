import { notFound } from "next/navigation";
import { QuizCard } from "@/components/QuizCard";
import { getCategories, getLatestQuizzes, getPopularQuizzes, getQuizzesByCategory } from "@/lib/quizzes";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const [quizzes, popular, latest] = await Promise.all([getQuizzesByCategory(slug), getPopularQuizzes(3), getLatestQuizzes(3)]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">{category.name}</h1>
      <p className="mt-3 max-w-3xl leading-7 text-slate-600">{category.description}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
      <h2 className="mt-12 text-2xl font-black text-slate-950">인기 퀴즈</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {popular.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
      <h2 className="mt-12 text-2xl font-black text-slate-950">최신 퀴즈</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {latest.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
