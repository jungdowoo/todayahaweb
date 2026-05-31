import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-slate-600 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-base font-black text-slate-900">오늘의 아하!</p>
          <p className="mt-2 max-w-2xl">
            매일 하나씩 풀어보는 생활 상식 퀴즈. 정답보다 오래 남는 이해를 위해 자세한 해설과 예시를 함께 제공합니다.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 font-semibold">
          <Link href="/about">소개</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
          <Link href="/contact">문의하기</Link>
        </nav>
      </div>
    </footer>
  );
}
