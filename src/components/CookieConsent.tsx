"use client";

import { useEffect, useState } from "react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check localStorage on client-side to avoid hydration mismatch
    const key = "todayaha:cookie-consented";
    const consented = localStorage.getItem(key);
    if (!consented) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("todayaha:cookie-consented", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 p-0.5 animate-slide-up">
      {/* Outer border glowing accent */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-500/30 to-teal-500/30 p-px shadow-2xl shadow-emerald-500/10">
        {/* Inner glass box */}
        <div className="rounded-[23px] border border-white/20 bg-white/80 p-5 backdrop-blur-xl dark:border-slate-800/40 dark:bg-slate-900/80">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h4 className="flex items-center gap-1.5 text-sm font-black tracking-tight text-slate-950 dark:text-white">
                쿠키 사용 및 맞춤형 광고 안내
              </h4>
              <p className="text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
                오늘의 아하는 분석 및 맞춤형 광고(Google AdSense) 제공을 위해 쿠키를 활용합니다. 자세한 정보는{" "}
                <a href="/privacy" className="text-emerald-600 underline hover:text-emerald-500 dark:text-emerald-400">
                  개인정보처리방침
                </a>
                을 확인해 주세요.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={handleAccept}
                className="w-full rounded-full bg-emerald-500 px-5 py-2 text-xs font-black text-emerald-950 shadow-sm transition-all hover:bg-emerald-400 active:scale-[0.98] sm:w-auto cursor-pointer"
              >
                수락하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
