import { connection } from "next/server";
import { getPublishedQuizzes } from "@/lib/quizzes";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await connection();

  const url = new URL(request.url);
  const from = url.searchParams.get("from");
  const excludedSlugs = new Set(
    (url.searchParams.get("exclude") ?? "")
      .split(",")
      .map((slug) => slug.trim())
      .filter(Boolean),
  );
  const quizzes = await getPublishedQuizzes();
  const candidates = quizzes.filter((quiz) => quiz.slug !== from && !excludedSlugs.has(quiz.slug));
  const fallbackCandidates = quizzes.filter((quiz) => quiz.slug !== from);
  const pool = candidates.length ? candidates : fallbackCandidates;

  if (!pool.length) {
    return redirectTo("/quiz");
  }

  const next = pool[Math.floor(Math.random() * pool.length)];
  return redirectTo(`/quiz/${next.slug}`);
}

function redirectTo(path: string) {
  return new Response(null, {
    status: 307,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Location: path,
    },
  });
}
