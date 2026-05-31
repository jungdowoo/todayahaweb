"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBox() {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 text-base outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
        placeholder="퀴즈 제목, 질문, 태그 검색"
        aria-label="검색어"
      />
      <button className="rounded-lg bg-slate-950 px-5 py-3 font-bold text-white hover:bg-slate-800">검색</button>
    </form>
  );
}
