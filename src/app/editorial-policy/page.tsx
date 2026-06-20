import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "편집 원칙과 콘텐츠 검토 정책",
  description: "오늘의 아하가 퀴즈 주제를 선정하고 사실을 확인하며 오류를 수정하는 기준을 안내합니다.",
  alternates: { canonical: absoluteUrl("/editorial-policy") },
};

const reviewSteps = [
  ["1. 주제 선정", "일상에서 반복되지만 사실 여부를 한 문장으로 분명하게 판단할 수 있는 오해와 궁금증을 고릅니다."],
  ["2. 사실 확인", "공공기관, 교육기관, 학술·전문기관의 공개 자료와 신뢰할 수 있는 참고 자료를 우선 확인합니다. 근거가 엇갈리면 단정적인 표현을 피합니다."],
  ["3. 설명 작성", "정답만 제시하지 않고 오해가 생긴 배경, 실제 원리, 생활에서 이해할 수 있는 예를 독자적인 문장으로 설명합니다."],
  ["4. 검토와 수정", "게시 전 문장과 사실관계를 다시 확인하고, 새 자료나 오류 제보가 있으면 내용을 고친 뒤 최근 검토일을 갱신합니다."],
];

export default function EditorialPolicyPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      <header className="border-b border-slate-200 pb-8 dark:border-slate-800">
        <p className="text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Editorial policy</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
          편집 원칙과 콘텐츠 검토 정책
        </h1>
        <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">
          오늘의 아하는 짧은 퀴즈도 읽을 만한 정보가 되어야 한다고 생각합니다. 아래 기준은 주제를 고르고, 설명을
          작성하고, 잘못된 내용을 바로잡을 때 편집팀이 따르는 원칙입니다.
        </p>
        <p className="mt-4 text-sm font-bold text-slate-500 dark:text-slate-400">최종 수정: 2026년 6월 20일</p>
      </header>

      <section id="editorial-team" className="mt-10 scroll-mt-24">
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">콘텐츠 제작 과정</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {reviewSteps.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="font-black text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-4 text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">출처와 표현 기준</h2>
        <p>
          특정 기관의 이름이나 자료를 인용할 때는 원래 의미를 바꾸지 않으며, 다른 사이트의 설명을 그대로 복제하지
          않습니다. 연구 결과가 조건에 따라 달라지거나 아직 결론이 확실하지 않은 주제는 “항상”, “절대” 같은 표현을
          피하고 적용 범위를 함께 설명합니다.
        </p>
        <p>
          건강·안전 관련 내용은 일반적인 학습 정보이며 진단이나 개인별 전문 조언을 대신하지 않습니다. 긴급하거나 개인
          상황에 따른 판단이 필요한 경우에는 관련 전문가와 공공기관 안내를 우선해야 합니다.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">정정 요청</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
          사실 오류, 오래된 정보, 오해를 부를 표현을 발견했다면 해당 페이지 주소와 수정이 필요한 부분을{" "}
          <a className="font-black text-emerald-700 underline dark:text-emerald-300" href={"mailto:" + siteConfig.contactEmail}>
            {siteConfig.contactEmail}
          </a>
          로 보내주세요. 내용을 확인해 필요한 경우 수정하고 검토일을 갱신합니다.
        </p>
      </section>
    </article>
  );
}
