import { categories as fallbackCategories, getEnhancedDetailExplanation, quizzes as fallbackQuizzes } from "@/lib/sampleData";
import { connection } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseClient";
import type { Category, Quiz } from "@/types/quiz";

const slugAliases: Record<string, string> = {
  "coffee-sleep": "coffee-sleep-caffeine",
};

const withCategory = (quiz: Quiz): Quiz =>
  ({
    ...quiz,
    question: quiz.statement ?? quiz.question,
    quiz_type: "TRUE_FALSE",
    option_1: "진실",
    option_2: "거짓",
    option_3: null,
    option_4: null,
    detail_explanation: getEnhancedDetailExplanation(quiz.slug, quiz.detail_explanation),
    category: quiz.category ?? fallbackCategories.find((category) => category.id === quiz.category_id),
  });

const uniqueCategories = (categories: Category[]): Category[] =>
  Array.from(new Map(categories.map((category) => [category.id, category])).values());

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return uniqueCategories(fallbackCategories);

  const { data, error } = await supabase.from("categories").select("*").order("name");
  return uniqueCategories(error || !data?.length ? fallbackCategories : data);
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

const interestingCountOf = (quiz: Quiz) => Number(quiz.interesting_count ?? 0);
const popularScoreOf = (quiz: Quiz) => Number(quiz.popular_score ?? 0);
const isPopularQuiz = (quiz: Quiz) => Boolean(quiz.is_popular) || interestingCountOf(quiz) >= 100;

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
  await connection();
  const quizzes = await getPublishedQuizzes();
  const candidates = quizzes.filter((quiz) => quiz.slug !== current.slug);
  if (!candidates.length) return null;

  return candidates[Math.floor(Math.random() * candidates.length)];
}

export async function getTodayQuiz(): Promise<Quiz | null> {
  await connection();
  const quizzes = await getPublishedQuizzes();
  if (!quizzes.length) return null;

  return quizzes[Math.floor(Math.random() * quizzes.length)];
}

export const getPopularQuizzes = async (limit = 6) =>
  (await getPublishedQuizzes())
    .sort(
      (a, b) =>
        Number(isPopularQuiz(b)) - Number(isPopularQuiz(a)) ||
        interestingCountOf(b) - interestingCountOf(a) ||
        popularScoreOf(b) - popularScoreOf(a) ||
        b.view_count - a.view_count,
    )
    .slice(0, limit);

export const getLatestQuizzes = async (limit = 6) =>
  (await getPublishedQuizzes())
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, limit);
