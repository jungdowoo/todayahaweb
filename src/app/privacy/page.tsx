export const metadata = {
  title: "개인정보처리방침 | 오늘의 아하!",
  description: "오늘의 아하! 개인정보처리방침입니다. 쿠키 사용 안내, 구글 애드센스 광고 제공에 따른 쿠키 수집 및 사용자 권리를 확인하실 수 있습니다.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800/80 dark:bg-slate-900/60">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          개인정보처리방침
        </h1>
        <p className="mt-2 text-xs font-bold text-slate-400 dark:text-slate-500">
          최종 개정일: 2026년 6월 1일
        </p>

        <div className="mt-8 space-y-8 text-base leading-8 text-slate-700 dark:text-slate-300 font-medium">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
              1. 수집하는 개인정보의 항목 및 수집 방법
            </h2>
            <p>
              '오늘의 아하!'는 별도의 회원가입 절차 없이 모든 콘텐츠를 자유롭게 이용할 수 있는 비회원제 서비스입니다. 이에 따라 사용자를 식별할 수 있는 고유 개인정보(이름, 주민번호, 전화번호 등)를 수집하거나 저장하지 않습니다.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm leading-7">
              <li>
                <strong>북마크 데이터</strong>: 사용자가 즐겨찾기한 퀴즈 목록은 서버에 저장되지 않고, 사용자의 기기 브라우저 로컬 저장소(localStorage)에만 안전하게 보관됩니다.
              </li>
              <li>
                <strong>통계 분석 데이터</strong>: 퀴즈 정답률 분석 및 시스템 오류 개선을 위해 사용자가 선택한 퀴즈 답변 기록과 기기 종류(PC/모바일) 등의 통계 정보를 익명으로 수집할 수 있습니다.
              </li>
              <li>
                <strong>문의 데이터</strong>: 1:1 문의 폼을 통해 제출된 이메일 주소 및 문의 내용은 문의사항 답변 및 해결 목적으로만 보관되며, 목적 달성 시 즉시 파기됩니다.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-slate-100 pt-8 dark:border-slate-800/60">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
              2. 쿠키(Cookie) 및 제3자 맞춤형 광고 서비스 제공 안내
            </h2>
            <p>
              본 서비스는 방문자 분석 및 맞춤형 광고 제공을 위해 사용자의 기기 정보를 읽고 저장하는 '쿠키(Cookie)'를 사용합니다. 쿠키는 웹사이트 운영에 이용되는 서버가 사용자의 브라우저에 보내는 아주 작은 텍스트 파일입니다.
            </p>

            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/40 text-sm leading-7 space-y-3">
              <p className="font-extrabold text-slate-900 dark:text-white">
                구글 애드센스(Google AdSense) 광고 파트너사 쿠키 고지 사항
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  구글(Google)을 포함한 제3자 광고 제공업체는 사용자가 당사 웹사이트 또는 기타 웹사이트를 방문한 이전 기록을 기반으로 맞춤형 광고를 게재하기 위해 쿠키를 사용합니다.
                </li>
                <li>
                  구글의 광고 쿠키 사용을 통해 구글 및 그 파트너사는 당사 사이트 및/또는 인터넷상의 다른 사이트 방문 정보를 기반으로 방문자에게 가장 적절한 광고를 게재할 수 있습니다.
                </li>
                <li>
                  사용자는 구글의
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="mx-1 text-emerald-600 underline font-black dark:text-emerald-400">
                    구글 광고 설정
                  </a>
                  페이지를 방문하여 맞춤설정 광고 게재를 명시적으로 거부할 수 있습니다.
                </li>
                <li>
                  또한 사용자는 브라우저 설정을 변경하여 제3자 제공업체의 쿠키 사용을 원천적으로 차단하거나 제한할 수 있습니다.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-slate-100 pt-8 dark:border-slate-800/60">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
              3. 쿠키 설정 거부 및 차단 방법
            </h2>
            <p>
              사용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 브라우저 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 text-sm leading-6">
              <div className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800/80">
                <span className="font-extrabold text-slate-900 dark:text-white">Chrome 브라우저:</span>
                <p className="mt-1 text-xs text-slate-500">설정 &gt; 개인정보 보호 및 보안 &gt; 인터넷 사용 기록 삭제 및 쿠키 차단 설정</p>
              </div>
              <div className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800/80">
                <span className="font-extrabold text-slate-900 dark:text-white">Safari 브라우저:</span>
                <p className="mt-1 text-xs text-slate-500">환경설정 &gt; 개인정보 보호 &gt; 쿠키 및 웹사이트 데이터 차단 설정</p>
              </div>
            </div>
            <p className="text-xs text-rose-500 dark:text-rose-400 font-bold">
              ※ 쿠키 저장을 완전히 거부하실 경우, 일부 맞춤형 환경이나 맞춤형 서비스 혜택이 정상적으로 제공되지 않을 수 있습니다.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-slate-100 pt-8 dark:border-slate-800/60">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
              4. 개인정보 보호 책임자 및 문의 안내
            </h2>
            <p>
              서비스 이용 중 발생하는 개인정보 보호 관련 문의, 불만 처리, 의견 제시 등은 아래의 문의처로 접수해 주시면 빠르고 정성스럽게 답변해 드리겠습니다.
            </p>
            <p className="text-sm font-semibold">
              공식 문의 이메일 주소:
              <a href="mailto:support@todayaha.com" className="ml-1 text-emerald-600 underline font-black dark:text-emerald-400">
                jdw9302@naver.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
