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
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-16 md:px-6">
      <div className="flex items-center gap-2.5">
        <span className="h-6 w-1 rounded-full bg-emerald-500" />
        <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">{category.name}</h1>
      </div>
      <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-slate-500 dark:text-slate-400">{category.description}</p>
      
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>

      <section className="mt-16">
        <div className="flex items-center gap-2.5">
          <span className="h-6 w-1 rounded-full bg-emerald-500" />
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">인기 퀴즈</h2>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {popular.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center gap-2.5">
          <span className="h-6 w-1 rounded-full bg-emerald-500" />
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">최신 퀴즈</h2>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {latest.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>
    </div>
  );
}
