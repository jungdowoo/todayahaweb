const PLAYED_QUIZZES_KEY = "todayaha:played-quizzes";

export function readPlayedQuizSlugs(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(PLAYED_QUIZZES_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((slug): slug is string => typeof slug === "string") : [];
  } catch {
    return [];
  }
}

export function rememberPlayedQuiz(slug: string) {
  if (typeof window === "undefined") return;

  const played = new Set(readPlayedQuizSlugs());
  played.add(slug);
  window.localStorage.setItem(PLAYED_QUIZZES_KEY, JSON.stringify([...played]));
}
