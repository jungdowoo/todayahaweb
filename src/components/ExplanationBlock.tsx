import type { ReactNode } from "react";
import { AdSlot } from "@/components/AdSlot";
import type { Quiz } from "@/types/quiz";

function splitParagraphs(text?: string | null) {
  const normalized = text?.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const sentences = normalized.match(/[^.!?。！？]+[.!?。！？]?/g)?.map((item) => item.trim()).filter(Boolean) ?? [
    normalized,
  ];
  const paragraphs: string[] = [];

  for (let index = 0; index < sentences.length; index += 2) {
    paragraphs.push(sentences.slice(index, index + 2).join(" "));
  }

  return paragraphs;
}

function TextCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[28px] bg-emerald-50/20 p-6 shadow-sm ring-1 ring-emerald-500/10 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:ring-emerald-500/20 sm:p-8 dark:bg-emerald-950/5 dark:ring-emerald-500/10">
      <h3 className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-950 dark:text-white">
        <svg
          className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        {title}
      </h3>
      <div className="mt-4 space-y-4 text-base font-semibold leading-8 text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </section>
  );
}

export function ExplanationBlock({ quiz }: { quiz: Quiz }) {
  const easyExplanation = splitParagraphs(quiz.full_explanation);
  const detailExplanation = splitParagraphs(quiz.detail_explanation);
  const exampleText = splitParagraphs(quiz.example_text);
  const misconceptionText = splitParagraphs(quiz.misconception_text);

  return (
    <section id="answer-guide" className="mt-10 scroll-mt-24 space-y-6" aria-label="정답과 해설">
      <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800/80 dark:bg-slate-900/60">
        <p className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          정답과 핵심
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          정답은 {quiz.correct_answer}입니다.
        </h2>
        <p className="mt-4 text-base font-semibold leading-8 text-slate-700 dark:text-slate-300">
          {quiz.short_explanation}
        </p>
        {quiz.aha_point && (
          <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-600 dark:bg-slate-950/50 dark:text-slate-300">
            {quiz.aha_point}
          </p>
        )}
      </div>

      <TextCard title="쉬운 요약">
        {easyExplanation.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </TextCard>

      {detailExplanation.length > 0 && (
        <TextCard title="자세한 해설">
          {detailExplanation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </TextCard>
      )}

      {exampleText.length > 0 && (
        <TextCard title="생활 속 예시">
          {exampleText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </TextCard>
      )}

      {misconceptionText.length > 0 && (
        <TextCard title="흔한 오해">
          {misconceptionText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </TextCard>
      )}

      <AdSlot label="요약 아래 광고 영역" />
    </section>
  );
}
