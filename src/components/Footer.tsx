import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/60 bg-slate-50/50 dark:border-slate-800/60 dark:bg-slate-950/20 transition-all duration-300">
      <div className="mx-auto grid max-w-4xl gap-6 px-4 py-10 text-sm text-slate-600 dark:text-slate-400 md:grid-cols-[1fr_auto] md:px-6">
        <div>
          <p className="text-base font-black text-slate-950 dark:text-white">
            오늘의 <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">아하!</span>
          </p>
          <p className="mt-2 max-w-2xl text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
            매일 하나씩 풀어보는 생활 상식 퀴즈. 정답보다 오래 남는 이해를 위해 쉬운 요약을 제공합니다.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
          <Link href="/about" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">소개</Link>
          <Link href="/privacy" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">개인정보처리방침</Link>
          <Link href="/terms" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">이용약관</Link>
          <Link href="/contact" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">문의하기</Link>
        </nav>
      </div>
    </footer>
  );
}
