import { categories as fallbackCategories, quizzes as fallbackQuizzes } from "@/lib/sampleData";
import { getSupabaseServerClient } from "@/lib/supabaseClient";
import type { Category, Quiz } from "@/types/quiz";

const slugAliases: Record<string, string> = {
  "coffee-sleep": "coffee-sleep-caffeine",
};

const withCategory = (quiz: Quiz): Quiz => ({
  ...quiz,
  category: quiz.category ?? fallbackCategories.find((category) => category.id === quiz.category_id),
});

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return fallbackCategories;

  const { data, error } = await supabase.from("categories").select("*").order("name");
  return error || !data?.length ? fallbackCategories : data;
}

export async function getPublishedQuizzes(): Promise<Quiz[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return fallbackQuizzes;

  const { data, error } = await supabase
    .from("quizzes")
    .select("*, category:categories(*)")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return error || !data?.length ? fallbackQuizzes : (data as Quiz[]).map(withCategory);
}

export async function getQuizBySlug(slug: string): Promise<Quiz | null> {
  const normalizedSlug = slugAliases[slug] ?? slug;
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase
      .from("quizzes")
      .select("*, category:categories(*)")
      .eq("slug", normalizedSlug)
      .eq("is_published", true)
      .maybeSingle();
    if (data) return withCategory(data as Quiz);
  }

  return fallbackQuizzes.find((quiz) => quiz.slug === normalizedSlug) ?? null;
}

export async function getQuizById(id: string): Promise<Quiz | null> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase.from("quizzes").select("*, category:categories(*)").eq("id", id).maybeSingle();
    if (data) return withCategory(data as Quiz);
  }

  return fallbackQuizzes.find((quiz) => quiz.id === id) ?? null;
}

export async function getAdminQuizzes(): Promise<Quiz[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return fallbackQuizzes;

  const { data, error } = await supabase.from("quizzes").select("*, category:categories(*)").order("created_at", { ascending: false });
  return error || !data?.length ? fallbackQuizzes : (data as Quiz[]).map(withCategory);
}

export async function getQuizzesByCategory(slug: string): Promise<Quiz[]> {
  const category = fallbackCategories.find((item) => item.slug === slug);
  const quizzes = await getPublishedQuizzes();
  return quizzes.filter((quiz) => quiz.category?.slug === slug || quiz.category_id === category?.id);
}

export async function searchQuizzes(query: string): Promise<Quiz[]> {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  const supabase = getSupabaseServerClient();
  if (supabase) {
    const pattern = `%${term}%`;
    const { data } = await supabase
      .from("quizzes")
      .select("*, category:categories(*)")
      .eq("is_published", true)
      .or(`title.ilike.${pattern},question.ilike.${pattern},short_explanation.ilike.${pattern}`);
    if (data?.length) return (data as Quiz[]).map(withCategory);
  }

  return fallbackQuizzes.filter((quiz) =>
    [quiz.title, quiz.question, quiz.short_explanation, quiz.aha_point, quiz.tags.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
}

export async function getRelatedQuizzes(quiz: Quiz, limit = 3): Promise<Quiz[]> {
  const quizzes = await getPublishedQuizzes();
  return quizzes
    .filter((item) => item.slug !== quiz.slug)
    .map((item) => ({
      item,
      score:
        (item.category_id === quiz.category_id ? 3 : 0) +
        item.tags.filter((tag) => quiz.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || b.item.view_count - a.item.view_count)
    .slice(0, limit)
    .map(({ item }) => item);
}

export async function getNextQuiz(current: Quiz): Promise<Quiz | null> {
  const related = await getRelatedQuizzes(current, 1);
  if (related[0]) return related[0];

  const quizzes = await getPublishedQuizzes();
  return quizzes.find((quiz) => quiz.slug !== current.slug) ?? null;
}

export async function getTodayQuiz(): Promise<Quiz | null> {
  const quizzes = await getPublishedQuizzes();
  if (!quizzes.length) return null;

  const today = new Date();
  const seed = Number(`${today.getUTCFullYear()}${today.getUTCMonth() + 1}${today.getUTCDate()}`);
  return quizzes[seed % quizzes.length];
}

export const getPopularQuizzes = async (limit = 6) =>
  (await getPublishedQuizzes()).sort((a, b) => b.view_count - a.view_count).slice(0, limit);

export const getLatestQuizzes = async (limit = 6) =>
  (await getPublishedQuizzes())
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, limit);
