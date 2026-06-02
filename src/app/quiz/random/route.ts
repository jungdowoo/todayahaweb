import { NextResponse } from "next/server";
import { getPublishedQuizzes } from "@/lib/quizzes";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const from = url.searchParams.get("from");
  const quizzes = await getPublishedQuizzes();
  const candidates = quizzes.filter((quiz) => quiz.slug !== from);

  if (!candidates.length) {
    return NextResponse.redirect(new URL("/quiz", request.url));
  }

  const next = candidates[Math.floor(Math.random() * candidates.length)];
  return NextResponse.redirect(new URL(`/quiz/${next.slug}`, request.url));
}
