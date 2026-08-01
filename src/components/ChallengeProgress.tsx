import { challengeDates } from "@/lib/challenge";
import { dateKey } from "@/lib/date";

export function ChallengeProgress({ title, loggedDates }: { title: string; loggedDates: string[] }) {
  return (
    <section className="flex w-full flex-col items-center gap-[14px]">
      <h2 className="w-full font-[family-name:var(--font-inter-tight)] text-[16px] font-semibold tracking-[4.5px] text-white uppercase sm:text-[18px]">
        {title}
      </h2>
      <div className="flex w-full flex-wrap items-center gap-2">
        {challengeDates().map((date) => {
          const key = dateKey(date);
          const done = loggedDates.includes(key);
          return (
            <span
              key={key}
              aria-hidden
              className={
                done
                  ? "size-4 shrink-0 rounded-full bg-white shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]"
                  : "size-4 shrink-0 rounded-full bg-white/10 ring-1 ring-white/12"
              }
            />
          );
        })}
      </div>
    </section>
  );
}
