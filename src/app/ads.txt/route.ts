import { getAdsensePublisherId } from "@/lib/adsense";

export const dynamic = "force-dynamic";

export async function GET() {
  const publisherId = getAdsensePublisherId();

  if (!publisherId) {
    return new Response("AdSense publisher ID is not configured.\n", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }

  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
