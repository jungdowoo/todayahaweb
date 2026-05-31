import type { Quiz } from "@/types/quiz";
import { AdSlot } from "@/components/AdSlot";

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

function TextCard({
  title,
  children,
  tone = "default",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "default" | "amber" | "emerald";
}) {
  const toneClass = {
    default: "bg-white ring-slate-200 dark:bg-slate-900 dark:ring-slate-800",
    amber: "bg-amber-50 ring-amber-200 dark:bg-amber-950/20 dark:ring-amber-900/50",
    emerald: "bg-emerald-50 ring-emerald-200 dark:bg-emerald-950/30 dark:ring-emerald-900/50",
  }[tone];

  return (
    <section className={`rounded-2xl p-6 shadow-sm ring-1 sm:p-7 ${toneClass}`}>
      <h2 className="text-xl font-black text-slate-950 dark:text-white">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-slate-700 dark:text-slate-300">{children}</div>
    </section>
  );
}

export function ExplanationBlock({ quiz }: { quiz: Quiz }) {
  const fullExplanation = splitParagraphs(quiz.full_explanation);

  return (
    <section className="mt-8 space-y-6" aria-label="자세한 설명">
      <TextCard title="쉬운 해설">
        {fullExplanation.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </TextCard>

      <AdSlot label="해설 아래 광고 영역" />

      <div className="grid gap-5 md:grid-cols-2">
        {quiz.example_text && (
          <TextCard title="생활 속 예시">
            {splitParagraphs(quiz.example_text).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </TextCard>
        )}

        {quiz.misconception_text && (
          <TextCard title="흔한 오해" tone="amber">
            {splitParagraphs(quiz.misconception_text).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </TextCard>
        )}
      </div>
    </section>
  );
}
