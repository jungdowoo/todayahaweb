"use client";

import { useState } from "react";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validation
    if (!email.trim() || !message.trim()) {
      setErrorMsg("이메일 주소와 문의 내용을 입력해 주세요.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg("유효한 이메일 형식을 입력해 주세요.");
      return;
    }

    setLoading(true);

    // Simulate API request delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:py-20 animate-fade-in">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800/80 dark:bg-slate-900/60">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          문의하기
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-500 dark:text-slate-400 font-medium">
          콘텐츠 제안, 제보, 비즈니스 제휴 등 다양한 의견을 편하게 남겨주세요. 남겨주신 내용은 정성스럽게 검토 후 입력하신 이메일로 답변해 드리겠습니다.
        </p>

        {success ? (
          <div className="mt-8 rounded-2xl bg-emerald-50/50 p-6 text-center border border-emerald-200/50 dark:bg-emerald-950/10 dark:border-emerald-900/30 animate-fade-in">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/80 shadow-sm text-emerald-600 dark:text-emerald-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-black text-emerald-950 dark:text-emerald-300">
              문의가 성공적으로 전달되었습니다!
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
              작성해주신 메일 주소로 조속히 정성을 담아 답변해 드리겠습니다. <br className="hidden sm:inline" />
              오늘의 아하를 찾아주셔서 감사합니다.
            </p>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-6 inline-flex rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-black text-emerald-950 shadow-sm transition hover:bg-emerald-400 active:scale-[0.98] cursor-pointer"
            >
              추가 문의하기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {errorMsg && (
              <div className="rounded-xl bg-rose-50/50 px-4 py-3 text-xs font-bold text-rose-600 border border-rose-200/50 dark:bg-rose-950/10 dark:border-rose-900/30">
                {errorMsg}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                답변받을 이메일 주소
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold transition focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                문의 내용
              </label>
              <textarea
                id="contact-message"
                value={message}
                disabled={loading}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[12rem] w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold transition focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                placeholder="콘텐츠 제안, 기능 건의 및 제보 등을 꼼꼼하게 적어주시면 상세히 답변 드릴게요."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin text-white dark:text-emerald-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  전송 중...
                </span>
              ) : (
                "문의 내용 전송"
              )}
            </button>
          </form>
        )}
      </div>
    </article>
  );
}

