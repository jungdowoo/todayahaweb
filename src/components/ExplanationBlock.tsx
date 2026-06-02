import type { ReactNode } from "react";
import { AdSlot } from "@/components/AdSlot";
import type { Quiz } from "@/types/quiz";

function splitParagraphs(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
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

  return (
    <section className="mt-8 space-y-6" aria-label="쉬운 요약">
      <TextCard title="쉬운 요약">
        {easyExplanation.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </TextCard>

      <AdSlot label="요약 아래 광고 영역" />
    </section>
  );
}
