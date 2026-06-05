"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdUnitProps = {
  clientId: string;
  slotId: string;
};

export function AdUnit({ clientId, slotId }: AdUnitProps) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense can throw while the site is still under review or blocked locally.
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block min-h-[120px]"
      data-ad-client={clientId}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
