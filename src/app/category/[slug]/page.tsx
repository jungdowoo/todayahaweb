import { notFound } from "next/navigation";
import { QuizCard } from "@/components/QuizCard";
import { getCategories, getLatestQuizzes, getPopularQuizzes, getQuizzesByCategory } from "@/lib/quizzes";

const categoryContent: Record<string, { title: string; intro: string; focus: string[] }> = {
  life: {
    title: "생활 속 오해를 확인하는 퀴즈",
    intro:
      "몸, 습관, 집안일, 안전처럼 매일 마주치지만 정확히 설명하기 어려운 상식을 모았습니다. 익숙해서 더 쉽게 믿는 속설을 짧은 퀴즈로 확인해보세요.",
    focus: ["건강 습관과 몸의 변화", "집안일과 안전 상식", "디지털 기기와 일상 도구"],
  },
  food: {
    title: "음식과 재료에 관한 상식 퀴즈",
    intro:
      "과일, 채소, 조리법, 보관법처럼 식탁에서 자주 만나는 궁금증을 다룹니다. 이름 때문에 생긴 오해와 실제 원리를 함께 확인할 수 있습니다.",
    focus: ["재료의 실제 분류", "조리 과정에서 생기는 변화", "보관과 위생에 관한 오해"],
  },
  animals: {
    title: "동물 행동과 생태를 이해하는 퀴즈",
    intro:
      "반려동물과 야생동물에 관한 익숙한 이미지를 다시 살펴봅니다. 만화나 속설로 굳어진 이야기를 실제 생태와 비교해봅니다.",
    focus: ["반려동물 안전 상식", "동물의 몸 구조와 분류", "야생동물의 생존 방식"],
  },
  science: {
    title: "자연 현상과 과학 원리를 푸는 퀴즈",
    intro:
      "빛, 물, 전기, 날씨, 우주처럼 주변에서 자주 보지만 원리는 놓치기 쉬운 현상을 쉽게 설명합니다.",
    focus: ["빛과 색의 원리", "날씨와 자연 현상", "물질과 에너지의 기초 상식"],
  },
  "history-culture": {
    title: "역사와 문화 속 상식 퀴즈",
    intro:
      "발명, 문자, 유적, 인물에 관한 널리 퍼진 이야기를 살펴봅니다. 단순한 암기보다 배경과 맥락을 이해하는 데 초점을 둡니다.",
    focus: ["발명과 기술의 역사", "문자와 문화유산", "대중적으로 퍼진 역사 오해"],
  },
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const [quizzes, popular, latest] = await Promise.all([
    getQuizzesByCategory(slug),
    getPopularQuizzes(3),
    getLatestQuizzes(3),
  ]);
  const content = categoryContent[slug] ?? {
    title: `${category.name} 퀴즈`,
    intro: category.description,
    focus: ["주제별 상식", "자주 헷갈리는 오해", "짧고 쉬운 해설"],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-16">
      <header className="border-b border-slate-200 pb-8 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="h-6 w-1 rounded-full bg-emerald-500" />
          <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">{category.name}</p>
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">{content.title}</h1>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">{content.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {content.focus.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {item}
            </span>
          ))}
        </div>
      </header>

      <section className="mt-10">
        <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">이 카테고리의 퀴즈</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">많이 본 퀴즈</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {popular.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">최신 퀴즈</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {latest.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>
    </div>
  );
}
