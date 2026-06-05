import { AdUnit } from "@/components/AdUnit";
import { getAdsenseClientId, getAdsenseSlotId } from "@/lib/adsense";

type AdSlotProps = {
  label?: string;
};

export function AdSlot({ label = "광고" }: AdSlotProps) {
  const clientId = getAdsenseClientId();
  const slotId = getAdsenseSlotId();

  if (!clientId || !slotId) return null;

  return (
    <aside className="my-10" aria-label={label}>
      <AdUnit clientId={clientId} slotId={slotId} />
    </aside>
  );
}
