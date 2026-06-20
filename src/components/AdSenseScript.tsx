"use client";

import { useEffect } from "react";

export function AdSenseScript({ clientId }: { clientId: string }) {
  useEffect(() => {
    const selector = 'script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]';
    if (document.head.querySelector(selector)) return;

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + clientId;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [clientId]);

  return null;
}
