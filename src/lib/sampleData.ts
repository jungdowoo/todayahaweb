import part1 from "../../quiz-seed-part-1.json";
import part2 from "../../quiz-seed-part-2.json";
import part3 from "../../quiz-seed-part-3.json";
import part4 from "../../quiz-seed-part-4.json";
import type { Category, Difficulty, Quiz, QuizType } from "@/types/quiz";

type SeedQuiz = {
  category: string;
  type: "OX" | "MULTIPLE_CHOICE";
  difficulty: string;
  estimatedReadTime: number;
  timeLimitSeconds?: number;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  title: string;
  question: string;
  options: string[];
  answer: string;
  shortAnswer: string;
  easyExplanation: string;
  detailExplanation: string;
  realLifeExample: string;
  commonMisunderstanding: string;
  ahaSummary: string;
  keywords: string[];
  relatedQuizSlugs: string[];
};

const seedQuizzes = [...part1, ...part2, ...part3, ...part4] as SeedQuiz[];

const categoryMap: Record<string, Category> = {
  생활: {
    id: "life",
    name: "생활",
    slug: "life",
    description: "집안, 몸, 습관처럼 매일 마주치는 생활 속 궁금증을 다룹니다.",
  },
  음식: {
    id: "food",
    name: "음식",
    slug: "food",
    description: "맛, 보관, 조리, 식재료에 관한 궁금증을 쉽게 풀어냅니다.",
  },
  과학: {
    id: "science",
    name: "과학",
    slug: "science",
    description: "하늘, 빛, 물, 소리처럼 익숙한 현상의 과학 원리를 설명합니다.",
  },
  동물: {
    id: "animals",
    name: "동물",
    slug: "animals",
    description: "반려동물과 자연 속 동물 행동에 숨어 있는 이유를 알아봅니다.",
  },
  "역사/문화": {
    id: "history-culture",
    name: "역사/문화",
    slug: "history-culture",
    description: "옛 생활, 발명, 문화에 관한 흥미로운 상식을 모았습니다.",
  },
};

const difficultyMap: Record<string, Difficulty> = {
  쉬움: "easy",
  보통: "normal",
  어려움: "hard",
};

const toQuizType = (type: SeedQuiz["type"]): QuizType => (type === "OX" ? "OX" : "MULTIPLE");

export const categories: Category[] = Object.values(categoryMap);

export const quizzes: Quiz[] = seedQuizzes.map((seed, index) => {
  const category = categoryMap[seed.category] ?? categoryMap["생활"];
  const [option1 = "O", option2 = "X", option3 = null, option4 = null] = seed.options;

  return {
    id: `seed-${index + 1}`,
    slug: seed.slug,
    title: seed.title,
    question: seed.question,
    quiz_type: toQuizType(seed.type),
    option_1: option1,
    option_2: option2,
    option_3: option3,
    option_4: option4,
    correct_answer: seed.answer,
    short_explanation: seed.shortAnswer,
    full_explanation: seed.easyExplanation,
    detail_explanation: seed.detailExplanation,
    example_text: seed.realLifeExample,
    misconception_text: seed.commonMisunderstanding,
    aha_point: seed.ahaSummary,
    category_id: category.id,
    category,
    difficulty: difficultyMap[seed.difficulty] ?? "easy",
    reading_time: seed.estimatedReadTime,
    time_limit_seconds: seed.timeLimitSeconds ?? 10,
    tags: seed.keywords,
    seo_title: `${seed.seoTitle} | 오늘의 아하!`,
    seo_description: seed.seoDescription,
    view_count: 2000 - index * 3,
    is_published: true,
    published_at: new Date(Date.UTC(2026, 0, 1 + index)).toISOString(),
  };
});
