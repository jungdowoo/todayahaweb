import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "문의하기",
  description: "오늘의 아하! 콘텐츠 오류 제보, 퀴즈 주제 제안, 서비스 문의를 보낼 수 있는 공식 연락처입니다.",
  alternates: { canonical: absoluteUrl("/contact") },
};

const inquiryTypes = ["콘텐츠 오류 제보", "퀴즈 주제 제안", "서비스 이용 문의", "광고 및 제휴 문의"];

export default function ContactPage() {
  const mailtoHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("[오늘의 아하] 문의")}`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900/60">
        <p className="text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Contact</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">문의하기</h1>
        <p className="mt-4 text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">
          콘텐츠 오류, 더 좋은 설명 제안, 추가하면 좋은 퀴즈 주제, 서비스 이용 문의를 아래 이메일로 보내주세요.
          확인 가능한 문의부터 순서대로 답변하겠습니다.
        </p>

        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <p className="text-sm font-black text-slate-950 dark:text-white">공식 문의 이메일</p>
          <a
            href={mailtoHref}
            className="mt-2 inline-flex break-all text-lg font-black text-emerald-700 underline decoration-emerald-300 underline-offset-4 dark:text-emerald-300"
          >
            {siteConfig.contactEmail}
          </a>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-black text-slate-950 dark:text-white">문의 가능한 내용</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {inquiryTypes.map((type) => (
              <li
                key={type}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300"
              >
                {type}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-8 text-sm font-semibold leading-7 text-slate-500 dark:text-slate-400">
          오류 제보를 보내실 때는 문제가 발생한 페이지 주소와 화면에서 보신 문구를 함께 알려주시면 더 정확하게 확인할 수 있습니다.
        </p>
      </div>
    </article>
  );
}
