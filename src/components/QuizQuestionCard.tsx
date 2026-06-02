"use client";

type QuizQuestionCardProps = {
  question: string;
  bookmarked: boolean;
  onToggleBookmark: () => void;
};

export function QuizQuestionCard({ question, bookmarked, onToggleBookmark }: QuizQuestionCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800/80 dark:bg-slate-900/60 dark:backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold tracking-wide text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          진실/거짓 퀴즈
        </span>
        <button
          type="button"
          onClick={onToggleBookmark}
          className={`group flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-black transition-all duration-300 ${
            bookmarked
              ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-500/10 dark:bg-emerald-950/40 dark:text-emerald-400"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
          aria-label="북마크 토글"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 ${
              bookmarked ? "text-emerald-500" : "text-slate-400 group-hover:text-slate-500"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M10 2c-1.716 0-3.408.097-5.07.286-.838.096-1.43.826-1.43 1.668v13.007c0 1.25 1.379 2.007 2.41 1.305l4.09-2.778 4.09 2.778c1.031.702 2.41-.055 2.41-1.305V3.954c0-.842-.592-1.572-1.43-1.668A41.89 41.89 0 0 0 10 2Z"
              clipRule="evenodd"
            />
          </svg>
          {bookmarked ? "저장됨" : "북마크"}
        </button>
      </div>

      <div className="relative mt-6">
        <h2 className="text-xl font-black leading-snug tracking-tight text-slate-900 sm:text-2xl dark:text-white">
          {question}
        </h2>
      </div>
    </div>
  );
}
