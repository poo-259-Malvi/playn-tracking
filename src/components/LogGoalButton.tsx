import Image from "next/image";

export function LogGoalButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-4 rounded-[24px] border border-white/12 bg-white/10 px-5 py-3 transition-colors hover:bg-white/15"
    >
      <Image src="/design/plus.svg" alt="" width={20} height={20} />
      <span className="font-[family-name:var(--font-inter-tight)] text-xs font-semibold tracking-[3px] text-white uppercase">
        Log your goal
      </span>
    </button>
  );
}
