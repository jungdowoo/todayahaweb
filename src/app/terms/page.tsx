export const metadata = {
  title: "이용약관 | 오늘의 아하!",
  description: "오늘의 아하! 이용약관입니다. 서비스 제공 목적, 전문 자문 면책 조항, 콘텐츠 사용 범위 등을 친절하고 상세하게 고지합니다.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800/80 dark:bg-slate-900/60">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          이용약관
        </h1>
        <p className="mt-2 text-xs font-bold text-slate-400 dark:text-slate-500">
          시행일자: 2026년 6월 1일
        </p>

        <div className="mt-8 space-y-8 text-base leading-8 text-slate-700 dark:text-slate-300 font-medium">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
              1. 목적 및 서비스 정의
            </h2>
            <p>
              본 약관은 '오늘의 아하!'가 제공하는 인터넷 상식 퀴즈 정보 서비스의 이용 조건 및 절차에 대한 기본적인 사항을 규정함을 목적으로 합니다. '오늘의 아하!'는 일상의 궁금증을 퀴즈로 풀며 배울 수 있는 순수한 교육 및 정보 공유 플랫폼입니다.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-slate-100 pt-8 dark:border-slate-800/60">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
              2. 전문적인 정보 면책 고지 (중요)
            </h2>
            <div className="rounded-2xl bg-amber-50/50 p-5 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 text-sm leading-7 space-y-3">
              <p className="font-extrabold text-amber-950 dark:text-amber-300">
                의학, 법률, 재정 등 전문 분야 면책 조항
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  '오늘의 아하!'에서 제공하는 모든 퀴즈 및 해설 콘텐츠는 대중적인 상식 교육과 유용한 정보 전달만을 목적으로 제작되었습니다.
                </li>
                <li>
                  제공되는 정보는 전문가의 <strong>의학적 진단, 약학적 조언, 법률 자문, 자산 투자 조언</strong> 등을 절대 대신할 수 없으며, 자문 성격을 갖지 않습니다.
                </li>
                <li>
                  특정 증상, 건강 상태 또는 법률적 문제, 투자 결정을 내리실 때는 반드시 해당 분야의 공인된 전문가(의사, 변호사, 금융자산운용사 등)와 직접 상담해 주시기 바랍니다.
                </li>
                <li>
                  당사는 사이트에 게재된 정보의 오류, 누락 또는 사용자가 본 정보를 신뢰하여 행한 결정이나 행동으로 인해 발생할 수 있는 직·간접적 손실에 대해 법적인 책임을 지지 않습니다.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-slate-100 pt-8 dark:border-slate-800/60">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
              3. 콘텐츠 저작권 및 사용 가이드
            </h2>
            <p>
              '오늘의 아하!' 내의 모든 퀴즈 문제, 쉬운 요약, 상세 해설, 이미지 및 SEO 텍스트 등 일체의 저작물은 '오늘의 아하!'에 소유권이 귀속됩니다.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm leading-7">
              <li>
                사용자는 개인적인 정보 습득 및 비상업적 목적에 한해 자유롭게 콘텐츠를 탐색하고 공유할 수 있습니다.
              </li>
              <li>
                당사의 사전 동의 없는 무단 크롤링, 상업적 복제, 재배포, 자동 수집(스크래핑), 과도한 웹 요청 유발 행위 등은 플랫폼의 안정성 보호를 위해 엄격히 금지됩니다.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-slate-100 pt-8 dark:border-slate-800/60">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
              4. 서비스 제공 및 제한
            </h2>
            <p>
              본 서비스는 기기 환경에 맞춰 연중무휴 24시간 가동을 지향하나, 시스템 점검, 통신 장애 또는 운영상 긴급 보수가 필요한 경우 서비스의 일부 또는 전부를 일시 제한할 수 있습니다.
            </p>
            <p>
              또한 공익적이거나 쾌적한 상식 공유 환경을 유지하기 위해 무분별한 오류 악용 또는 방해 행위가 감지될 경우 해당 방문자에 대해 접근 통제 조치를 취할 수 있습니다.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
