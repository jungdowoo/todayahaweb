import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "오늘의 아하 소개",
  description: "오늘의 아하가 어떤 기준으로 생활 상식 퀴즈를 만들고 운영하는지 소개합니다.",
  alternates: { canonical: absoluteUrl("/about") },
};

const principles = [
  {
    title: "일상 속 오해를 다룹니다",
    body: "전문 시험 지식보다 사람들이 평소에 자주 헷갈리는 생활 상식, 음식, 동물, 자연 현상, 역사 문화 이야기를 진실/거짓 퀴즈로 정리합니다.",
  },
  {
    title: "짧지만 근거 있게 설명합니다",
    body: "정답만 보여주는 데서 끝내지 않고, 왜 그런 오해가 생겼는지와 실제 원리를 함께 설명해 사용자가 스스로 이해할 수 있게 구성합니다.",
  },
  {
    title: "정정 가능한 콘텐츠로 운영합니다",
    body: "상식 콘텐츠도 새 자료나 표현 방식에 따라 보완이 필요할 수 있습니다. 오류 제보가 들어오면 확인 후 수정하는 것을 원칙으로 합니다.",
  },
];

const categories = [
  ["생활", "건강 습관, 집안일, 안전, 디지털 사용처럼 매일 마주치는 오해를 다룹니다."],
  ["음식", "재료, 조리, 보관, 영양과 관련해 흔히 잘못 알려진 이야기를 다룹니다."],
  ["동물", "반려동물과 야생동물의 행동, 생태, 분류에 관한 재미있는 사실을 다룹니다."],
  ["과학/자연", "날씨, 빛, 물, 전기, 우주처럼 주변 현상에 숨어 있는 원리를 다룹니다."],
  ["역사/문화", "발명, 문자, 유적, 문화권에 관한 널리 퍼진 오해와 배경을 다룹니다."],
];

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      <header className="border-b border-slate-200 pb-8 dark:border-slate-800">
        <p className="text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">About</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
          오늘의 아하!는 일상 상식을 다시 확인하는 퀴즈 서비스입니다.
        </h1>
        <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">
          오늘의 아하!는 사람들이 자주 믿고 지나가는 상식, 인터넷에서 반복되는 속설, 대화 중 한 번쯤
          들어본 이야기를 짧은 진실/거짓 퀴즈로 확인하는 콘텐츠 사이트입니다.
        </p>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {principles.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
            <h2 className="text-lg font-black text-slate-950 dark:text-white">{item.title}</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">콘텐츠 제작 기준</h2>
        <div className="mt-5 space-y-4 text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">
          <p>
            각 퀴즈는 한 문장으로 판단할 수 있는 주제를 고르고, 정답 이후에는 쉬운 요약과 상세 설명을 제공합니다.
            상세 설명에는 오해가 생긴 이유, 실제 원리, 일상에서 이해할 포인트를 포함하려고 합니다.
          </p>
          <p>
            건강, 법률, 금융처럼 개인 상황에 따라 판단이 달라질 수 있는 내용은 전문 조언을 대체하지 않습니다.
            오늘의 아하!는 학습과 흥미를 위한 일반 정보 제공을 목적으로 운영됩니다.
          </p>
          <p>
            주제 선정, 확인 방법, 수정 절차는{" "}
            <Link className="font-black text-emerald-700 underline dark:text-emerald-300" href="/editorial-policy">
              편집 원칙
            </Link>
            에 공개합니다. 각 퀴즈에는 게시일과 최근 검토일을 표시합니다.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">운영 주체</h2>
        <dl className="mt-5 grid gap-4 text-sm font-semibold leading-7 text-slate-600 sm:grid-cols-2 dark:text-slate-300">
          <div>
            <dt className="font-black text-slate-950 dark:text-white">콘텐츠 운영</dt>
            <dd>오늘의 아하 편집팀</dd>
          </div>
          <div>
            <dt className="font-black text-slate-950 dark:text-white">공식 연락처</dt>
            <dd>
              <a className="underline" href={"mailto:" + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">카테고리 구성</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {categories.map(([title, body]) => (
            <div key={title} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950/50">
              <h3 className="font-black text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">오류 제보와 문의</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
          잘못된 설명, 더 나은 표현, 추가하면 좋은 퀴즈 주제가 있다면 언제든 알려주세요. 문의는{" "}
          <a className="font-black text-emerald-700 underline dark:text-emerald-300" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          로 받을 수 있습니다.
        </p>
      </section>
    </article>
  );
}
