import type { Category, Quiz } from "@/types/quiz";

type QuizFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  categories: Category[];
  quiz?: Quiz;
};

export function QuizForm({ action, categories, quiz }: QuizFormProps) {
  return (
    <form action={action} className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-white p-5">
      {quiz && <input type="hidden" name="id" value={quiz.id} />}
      <input
        name="admin_password"
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
        placeholder="관리자 비밀번호"
        aria-label="관리자 비밀번호"
        type="password"
      />
      <input
        name="title"
        defaultValue={quiz?.title}
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
        placeholder="제목"
        aria-label="제목"
        required
      />
      <input
        name="slug"
        defaultValue={quiz?.slug}
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
        placeholder="slug"
        aria-label="slug"
        required
      />
      <textarea
        name="question"
        defaultValue={quiz?.question}
        className="min-h-24 w-full rounded-lg border border-slate-300 px-4 py-3"
        placeholder="진실/거짓 판단 문장"
        aria-label="진실/거짓 판단 문장"
        required
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <select
          name="quiz_type"
          defaultValue={quiz?.quiz_type ?? "TRUE_FALSE"}
          className="rounded-lg border border-slate-300 px-4 py-3"
          aria-label="퀴즈 유형"
        >
          <option value="TRUE_FALSE">진실/거짓</option>
        </select>
        <select
          name="difficulty"
          defaultValue={quiz?.difficulty ?? "easy"}
          className="rounded-lg border border-slate-300 px-4 py-3"
          aria-label="난이도"
        >
          <option value="easy">쉬움</option>
          <option value="normal">보통</option>
          <option value="hard">어려움</option>
        </select>
        <input
          name="reading_time"
          defaultValue={quiz?.reading_time ?? 1}
          className="rounded-lg border border-slate-300 px-4 py-3"
          type="number"
          min="1"
          aria-label="읽기 시간"
        />
      </div>
      <select
        name="category_id"
        defaultValue={quiz?.category_id}
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
        aria-label="카테고리"
      >
        <option value="">카테고리 선택</option>
        {categories.map((category, index) => (
          <option key={`${category.id}-${index}`} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="option_1"
          defaultValue={quiz?.option_1}
          className="rounded-lg border border-slate-300 px-4 py-3"
          placeholder="선택지 1"
          aria-label="선택지 1"
          required
        />
        <input
          name="option_2"
          defaultValue={quiz?.option_2}
          className="rounded-lg border border-slate-300 px-4 py-3"
          placeholder="선택지 2"
          aria-label="선택지 2"
          required
        />
      </div>
      <input
        name="correct_answer"
        defaultValue={quiz?.correct_answer}
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
        placeholder="정답"
        aria-label="정답"
        required
      />
      <input
        name="short_explanation"
        defaultValue={quiz?.short_explanation}
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
        placeholder="짧은 해설"
        aria-label="짧은 해설"
        required
      />
      <textarea
        name="full_explanation"
        defaultValue={quiz?.full_explanation}
        className="min-h-36 w-full rounded-lg border border-slate-300 px-4 py-3"
        placeholder="쉬운 요약"
        aria-label="쉬운 요약"
        required
      />
      <input
        name="aha_point"
        defaultValue={quiz?.aha_point}
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
        placeholder="오늘의 아하 요약"
        aria-label="오늘의 아하 요약"
        required
      />
      <input
        name="tags"
        defaultValue={quiz?.tags.join(", ")}
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
        placeholder="태그, 쉼표로 구분"
        aria-label="태그"
      />
      <input
        name="seo_title"
        defaultValue={quiz?.seo_title ?? ""}
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
        placeholder="SEO title"
        aria-label="SEO title"
      />
      <input
        name="seo_description"
        defaultValue={quiz?.seo_description ?? ""}
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
        placeholder="SEO description"
        aria-label="SEO description"
      />
      <label className="flex items-center gap-2 font-bold">
        <input name="is_published" type="checkbox" defaultChecked={quiz?.is_published} />
        공개
      </label>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-lg bg-slate-950 px-5 py-3 font-bold text-white" type="submit">
          저장
        </button>
      </div>
    </form>
  );
}
