import type { BadgeVariant } from "@/lib/types";

const MEDAL_GRADIENTS: Record<Exclude<BadgeVariant, "plain">, string> = {
  gold: "linear-gradient(135deg, #8c421d 0%, #fbe67b 35%, #fcfbe7 55%, #f7d14e 75%, #d4a041 100%)",
  silver:
    "linear-gradient(135deg, #7a96ac 0%, #eaeff3 30%, #c2d4e1 45%, #ffffff 60%, #d4dee5 72%, #abbdc8 85%, #bccad7 100%)",
  bronze:
    "linear-gradient(135deg, #9e8976 0%, #7a5e50 25%, #f6d0ab 45%, #9d774e 65%, #c99b70 85%, #795f52 100%)",
};

export function RankBadge({ variant, value }: { variant: BadgeVariant; value: number }) {
  const isMedal = variant !== "plain";

  return (
    <div className="flex size-[51px] shrink-0 items-center justify-center">
      <div
        className={
          isMedal
            ? "flex size-9 -rotate-45 items-center justify-center rounded-lg shadow-[inset_0_0_8px_rgba(255,255,255,0.6)]"
            : "flex size-9 -rotate-45 items-center justify-center rounded-lg border border-white/12 bg-white/10"
        }
        style={isMedal ? { backgroundImage: MEDAL_GRADIENTS[variant] } : undefined}
      >
        <span
          className={
            "rotate-45 font-[family-name:var(--font-baloo)] text-[13px] font-bold " +
            (isMedal ? "text-black/65" : "text-white")
          }
        >
          {value}
        </span>
      </div>
    </div>
  );
}
