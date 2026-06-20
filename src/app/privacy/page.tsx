import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "오늘의 아하!의 개인정보, 쿠키, 로컬스토리지, Google AdSense 관련 안내입니다.",
  alternates: { canonical: absoluteUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900/60">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">개인정보처리방침</h1>
        <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">최종 수정일: 2026년 6월 5일</p>

        <div className="mt-8 space-y-9 text-base font-semibold leading-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">1. 수집하는 정보</h2>
            <p className="mt-3">
              오늘의 아하!는 회원가입 없이 이용할 수 있는 퀴즈 서비스입니다. 이름, 주소, 전화번호 같은 고유한
              개인정보를 필수로 요구하지 않습니다.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
              <li>북마크, 푼 퀴즈 목록은 사용자의 브라우저 localStorage에 저장됩니다.</li>
              <li>문의 메일을 보내는 경우 이메일 주소와 문의 내용이 회신 목적으로 사용될 수 있습니다.</li>
              <li>서비스 안정화와 통계 확인을 위해 접속 환경, 페이지 이용 기록 같은 비식별 정보가 처리될 수 있습니다.</li>
            </ul>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">2. 쿠키와 Google AdSense</h2>
            <p className="mt-3">
              오늘의 아하!는 광고 제공과 서비스 개선을 위해 쿠키를 사용할 수 있습니다. Google을 포함한 제3자 광고
              제공업체는 사용자의 이전 방문 기록을 바탕으로 맞춤형 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.
            </p>
            <div className="mt-4 rounded-2xl bg-slate-50 p-5 text-sm leading-7 dark:bg-slate-950/50">
              <p>
                사용자는{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-emerald-700 underline dark:text-emerald-300"
                >
                  Google 광고 설정
                </a>
                에서 맞춤형 광고를 관리할 수 있습니다. 또한 브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수 있습니다.
              </p>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">3. 정보 이용 목적</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
              <li>퀴즈 이용 경험 제공: 북마크, 이미 푼 퀴즈 제외 등</li>
              <li>문의 응대: 오류 제보, 제휴 문의, 일반 문의에 대한 답변</li>
              <li>서비스 개선: 오류 확인, 콘텐츠 품질 개선, 부정 이용 방지</li>
              <li>광고 운영: Google AdSense 등 광고 네트워크를 통한 광고 제공</li>
            </ul>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">4. 보관과 삭제</h2>
            <p className="mt-3">
              브라우저 localStorage에 저장된 북마크와 푼 퀴즈 목록은 사용자가 브라우저 저장 데이터를 삭제하면 함께
              삭제됩니다. 문의 메일은 문의 처리와 기록 확인에 필요한 기간 동안 보관한 뒤 불필요해지면 삭제합니다.
            </p>
          </section>

          <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">5. 문의</h2>
            <p className="mt-3">
              개인정보 처리와 관련한 문의는{" "}
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
