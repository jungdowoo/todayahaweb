export type QuizType = "OX" | "MULTIPLE";
export type Difficulty = "easy" | "normal" | "hard";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at?: string;
};

export type Quiz = {
  id: string;
  slug: string;
  title: string;
  question: string;
  quiz_type: QuizType;
  option_1: string;
  option_2: string;
  option_3?: string | null;
  option_4?: string | null;
  correct_answer: string;
  short_explanation: string;
  full_explanation: string;
  detail_explanation?: string | null;
  example_text?: string | null;
  misconception_text?: string | null;
  aha_point: string;
  category_id: string;
  category?: Category;
  difficulty: Difficulty;
  reading_time: number;
  time_limit_seconds: number;
  tags: string[];
  seo_title?: string | null;
  seo_description?: string | null;
  view_count: number;
  is_published: boolean;
  published_at: string;
  created_at?: string;
  updated_at?: string;
};

export type QuizAttempt = {
  id?: string;
  quiz_id: string;
  selected_answer: string;
  is_correct: boolean;
  created_at?: string;
};
