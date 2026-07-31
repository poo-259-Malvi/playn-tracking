import type { StatEntry } from "@/lib/types";
import { StatRow } from "./StatRow";

export function StatSection({ title, entries }: { title: string; entries: StatEntry[] }) {
  return (
    <section className="flex w-full flex-col items-start gap-[25px]">
      <h2 className="w-full font-[family-name:var(--font-inter-tight)] text-[16px] font-semibold tracking-[4.5px] text-white uppercase sm:text-[18px]">
        {title}
      </h2>
      <ul className="flex w-full flex-col items-start gap-[16px]">
        {entries.map((entry) => (
          <StatRow key={entry.rank} entry={entry} />
        ))}
      </ul>
    </section>
  );
}
