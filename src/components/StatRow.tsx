import Image from "next/image";
import type { StatEntry } from "@/lib/types";
import { RankBadge } from "./RankBadge";

export function StatRow({ entry }: { entry: StatEntry }) {
  return (
    <li className="flex h-[82px] w-full items-center justify-between rounded-[24px] border border-white/12 bg-white/10 px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-3 sm:gap-5">
        <p className="w-3 shrink-0 font-[family-name:var(--font-lexend)] text-xl font-medium tracking-[-0.24px] text-[#f5f5f5] sm:text-2xl">
          {entry.rank}
        </p>
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-[#e9eaeb] sm:size-11">
          <Image src="/design/avatar.png" alt="" fill sizes="44px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-[family-name:var(--font-inter)] text-[15px] font-medium text-[#e9eaeb] sm:text-[17px]">
            {entry.name}
          </p>
          <p className="truncate font-[family-name:var(--font-inter)] text-[13px] tracking-[-0.14px] text-[#929098] sm:text-[14px]">
            {entry.activity}
          </p>
        </div>
      </div>
      <RankBadge variant={entry.badge} value={entry.value} />
    </li>
  );
}
