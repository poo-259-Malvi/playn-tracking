"use client";

import Image from "next/image";
import { addDays, weekdayShort } from "@/lib/date";

function DayCard({ date, active, logged }: { date: Date; active: boolean; logged: boolean }) {
  return (
    <div
      className={
        "flex shrink-0 flex-col items-center justify-center gap-3 rounded-[50px] border border-white/12 bg-white/10 transition-all " +
        (active
          ? "h-[124px] w-[74px] px-4 py-6 sm:h-[142px] sm:w-[88px]"
          : "h-[100px] w-[62px] px-3 py-5 opacity-80 sm:h-[112px] sm:w-[74px]")
      }
    >
      <span
        className={
          "font-[family-name:var(--font-inter-tight)] font-semibold tracking-[3px] whitespace-nowrap text-white uppercase " +
          (active ? "text-[14px] tracking-[4.5px] sm:text-[18px]" : "text-[10px] sm:text-[12px]")
        }
      >
        {weekdayShort(date)}
      </span>
      <span
        className={
          "font-[family-name:var(--font-lexend)] leading-none text-white " +
          (active ? "text-[36px] font-semibold sm:text-[50px]" : "text-[24px] font-light sm:text-[32px]")
        }
      >
        {date.getDate()}
      </span>
      <span
        aria-hidden
        className={
          logged
            ? "size-4 shrink-0 rounded-full bg-white shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]"
            : "size-4 shrink-0 rounded-full bg-white/10 ring-1 ring-white/12"
        }
      />
    </div>
  );
}

export function DateStrip({
  selected,
  onSelectedChange,
  isLogged,
}: {
  selected: Date;
  onSelectedChange: (date: Date) => void;
  isLogged: (date: Date) => boolean;
}) {
  const prev = addDays(selected, -1);
  const next = addDays(selected, 1);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      <button
        type="button"
        aria-label="Previous day"
        onClick={() => onSelectedChange(addDays(selected, -1))}
        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/10 transition-colors hover:bg-white/15 sm:size-14"
      >
        <Image src="/design/arrow-left.svg" alt="" width={16} height={16} />
      </button>

      <DayCard date={prev} active={false} logged={isLogged(prev)} />
      <DayCard date={selected} active logged={isLogged(selected)} />
      <DayCard date={next} active={false} logged={isLogged(next)} />

      <button
        type="button"
        aria-label="Next day"
        onClick={() => onSelectedChange(addDays(selected, 1))}
        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/10 transition-colors hover:bg-white/15 sm:size-14"
      >
        <Image src="/design/arrow-right.svg" alt="" width={16} height={16} />
      </button>
    </div>
  );
}
