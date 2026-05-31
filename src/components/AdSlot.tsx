type AdSlotProps = {
  label?: string;
};

export function AdSlot({ label = "광고 영역" }: AdSlotProps) {
  return (
    <aside className="my-10 rounded-2xl border border-dashed border-slate-300 bg-slate-100 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
      {label}
    </aside>
  );
}
