export const metadata = {
  title: "오늘의 아하! 소개",
  description: "매일 푸는 흥미진진한 생활 상식 퀴즈 서비스 '오늘의 아하!'를 소개합니다. 카테고리 구성 및 기획 의도를 확인해 보세요.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      {/* 1. Page Header with gradient background */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white shadow-lg sm:p-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <span className="text-xs font-black tracking-widest uppercase text-emerald-100/80 bg-white/10 px-3 py-1 rounded-full border border-white/10">
          About Today&apos;s Aha!
        </span>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl leading-tight">
          매일 배움의 기쁨,<br />오늘의 아하!
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-emerald-50/90 font-medium">
          오늘의 아하는 매일 하나씩 유익한 상식 퀴즈를 풀어보고, 정답 뒤에 숨겨진 재미있는 원리를 알아가는 퀴즈형 정보 콘텐츠 플랫폼입니다.
        </p>
      </div>

      {/* 2. Platform Core Values */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/60 transition-all hover:shadow-md">
          <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h2 className="mt-4 text-lg font-black text-slate-950 dark:text-white">쉽고 정확한 정보</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400 font-medium">
            누구나 부담 없이 읽을 수 있는 쉬운 말을 지향합니다. 불필요한 전문 기술 학술 용어는 걷어내고 일상어로 명쾌하게 설명합니다.
          </p>
        </div>
        
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/60 transition-all hover:shadow-md">
          <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <h2 className="mt-4 text-lg font-black text-slate-950 dark:text-white">사용자 친화적 설계</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400 font-medium">
            복잡한 가입 절차 없이 누구나 바로 문제를 풀고 실시간 피드백을 받을 수 있습니다. 북마크 데이터 역시 브라우저에 안전히 기록됩니다.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/60 transition-all hover:shadow-md">
          <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="mt-4 text-lg font-black text-slate-950 dark:text-white">콘텐츠 신뢰성 & SEO</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400 font-medium">
            사용자가 평소에 궁금해할 법한 자연스러운 질문을 테마로 하여 고품질 지식 유입을 돕습니다.
          </p>
        </div>
      </div>

      {/* 3. Categories and Contents Structure */}
      <div className="mt-16 border-t border-slate-100 pt-16 dark:border-slate-800/60">
        <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white text-center">
          우리가 제공하는 상식 테마
        </h2>
        <p className="mt-2 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
          오늘의 아하는 생활, 음식, 동물, 과학 중심의 흥미로운 카테고리를 제공합니다.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 justify-center">
          <div className="p-5 border border-slate-100 bg-white rounded-2xl dark:border-slate-800/80 dark:bg-slate-900/40">
            <span className="text-xs font-black px-2 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded">생활</span>
            <h3 className="mt-3 font-extrabold text-slate-900 dark:text-white">일상생활 상식</h3>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              충전기 요금, 선풍기 안전, 김 서림 등 가정과 실생활 가전 속의 꿀팁들을 쉽고 아기자기하게 다룹니다.
            </p>
          </div>

          <div className="p-5 border border-slate-100 bg-white rounded-2xl dark:border-slate-800/80 dark:bg-slate-900/40">
            <span className="text-xs font-black px-2 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded">음식</span>
            <h3 className="mt-3 font-extrabold text-slate-900 dark:text-white">푸드 & 맛의 원리</h3>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              바나나 냉장 보관 갈변 원리, 고기 굽기 마이야르 등 식탁 위 흥미진진한 요리와 맛 상식을 파헤칩니다.
            </p>
          </div>

          <div className="p-5 border border-slate-100 bg-white rounded-2xl dark:border-slate-800/80 dark:bg-slate-900/40">
            <span className="text-xs font-black px-2 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded">과학</span>
            <h3 className="mt-3 font-extrabold text-slate-900 dark:text-white">자연 및 물질 과학</h3>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              철로 만든 배가 뜨는 원리, 노을과 하늘의 다채로운 파란빛 등 세상 현상의 진짜 원인을 친절하게 전합니다.
            </p>
          </div>

          <div className="p-5 border border-slate-100 bg-white rounded-2xl dark:border-slate-800/80 dark:bg-slate-900/40">
            <span className="text-xs font-black px-2 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded">동물</span>
            <h3 className="mt-3 font-extrabold text-slate-900 dark:text-white">반려동물 & 곤충 생태</h3>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              고양이가 택배 박스를 사랑하는 속사정, 거미가 자기 거미줄에 걸리지 않는 비밀 등 자연 속 신비를 탐구합니다.
            </p>
          </div>

        </div>
      </div>
    </article>
  );
}
