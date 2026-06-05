const publisherIdPattern = /^pub-\d{16}$/;

export function normalizeAdsensePublisherId(value?: string | null) {
  if (!value) return null;

  const normalized = value.trim().replace(/^ca-/, "");
  return publisherIdPattern.test(normalized) ? normalized : null;
}

export function getAdsensePublisherId() {
  return (
    normalizeAdsensePublisherId(process.env.ADSENSE_PUBLISHER_ID) ??
    normalizeAdsensePublisherId(process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID) ??
    normalizeAdsensePublisherId(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID)
  );
}

export function getAdsenseClientId() {
  const explicitClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  if (explicitClientId?.startsWith("ca-pub-")) return explicitClientId;

  const publisherId = getAdsensePublisherId();
  return publisherId ? `ca-${publisherId}` : null;
}

export function getAdsenseSlotId() {
  return process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID?.trim() || null;
}
