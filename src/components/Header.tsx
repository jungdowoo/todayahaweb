import Link from "next/link";

const navItems = [
  ["오늘 퀴즈", "/today"],
  ["전체 퀴즈", "/quiz"],
  ["검색", "/search"],
  ["북마크", "/bookmarks"],
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="text-xl font-black text-slate-950 dark:text-white" aria-label="오늘의 아하 홈">
          오늘의 아하!
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto text-sm font-semibold text-slate-700 dark:text-slate-300">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-full px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
