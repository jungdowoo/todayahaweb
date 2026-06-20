import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "이용약관",
  description: "오늘의 아하! 서비스 이용 조건과 콘텐츠 이용 기준을 안내합니다.",
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900/60">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">이용약관</h1>
        <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">시행일: 2026년 6월 5일</p>

        <div className="mt-8 space-y-9 text-base font-semibold leading-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">1. 서비스 목적</h2>
            <p className="mt-3">
              오늘의 아하!는 일상 속 상식과 자주 퍼진 오해를 진실/거짓 퀴즈 형태로 제공하는 정보성 콘텐츠
              서비스입니다. 사용자는 회원가입 없이 공개된 퀴즈와 설명을 열람할 수 있습니다.
            </p>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">2. 전문 조언이 아닙니다</h2>
            <p className="mt-3">
              사이트의 모든 퀴즈와 해설은 일반적인 학습과 흥미를 위한 정보입니다. 건강, 의료, 법률, 금융,
              안전과 관련된 중요한 판단에는 해당 분야 전문가의 조언을 우선해야 합니다.
            </p>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">3. 콘텐츠 이용</h2>
            <p className="mt-3">
              오늘의 아하!의 퀴즈 문항, 설명, 페이지 구성은 서비스 운영자가 제작하거나 편집한 콘텐츠입니다.
              개인적인 학습과 공유는 가능하지만, 사전 허락 없는 대량 복제, 자동 수집, 상업적 재게시를 금지합니다.
            </p>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">4. 서비스 변경과 오류</h2>
            <p className="mt-3">
              콘텐츠는 더 정확한 설명을 위해 수정될 수 있으며, 기술적 문제나 운영 사정에 따라 일부 기능이 일시적으로
              제한될 수 있습니다. 오류를 발견한 경우 문의 메일로 알려주시면 확인 후 반영하겠습니다.
            </p>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">5. 문의</h2>
            <p className="mt-3">
              약관과 서비스 이용에 관한 문의는{" "}
              <a className="font-black text-emerald-700 underline dark:text-emerald-300" href={`mailto:${siteConfig.contactEmail}`}>
                {siteConfig.contactEmail}
              </a>
              로 보내주세요.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
