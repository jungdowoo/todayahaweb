"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabaseClient";

type RecommendQuizResult = {
  count: number | null;
  isPopular: boolean;
};

export async function recommendQuiz(quizId: string, slug: string): Promise<RecommendQuizResult> {
  if (!quizId || quizId.startsWith("seed-")) {
    return { count: null, isPopular: false };
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { count: null, isPopular: false };
  }

  const rpcResult = await supabase.rpc("increment_quiz_interesting", {
    target_quiz_id: quizId,
  });

  if (!rpcResult.error && Array.isArray(rpcResult.data) && rpcResult.data[0]) {
    const row = rpcResult.data[0] as { interesting_count?: number | null; is_popular?: boolean | null };
    const count = Number(row.interesting_count ?? 0);
    revalidatePath("/");
    revalidatePath("/quiz");
    revalidatePath(`/quiz/${slug}`);
    return { count, isPopular: Boolean(row.is_popular ?? count >= 100) };
  }

  const { data: current } = await supabase
    .from("quizzes")
    .select("interesting_count")
    .eq("id", quizId)
    .maybeSingle();

  if (!current) {
    return { count: null, isPopular: false };
  }

  const nextCount = Number(current.interesting_count ?? 0) + 1;
  const { data, error } = await supabase
    .from("quizzes")
    .update({
      interesting_count: nextCount,
      is_popular: nextCount >= 100,
      popular_score: nextCount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", quizId)
    .select("interesting_count,is_popular")
    .maybeSingle();

  if (error || !data) {
    return { count: null, isPopular: false };
  }

  const count = Number(data.interesting_count ?? nextCount);
  revalidatePath("/");
  revalidatePath("/quiz");
  revalidatePath(`/quiz/${slug}`);
  return { count, isPopular: Boolean(data.is_popular ?? count >= 100) };
}
