import { BackgroundGlow } from "@/components/BackgroundGlow";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { DateStrip } from "@/components/DateStrip";
import { Logo } from "@/components/Logo";
import { LogGoalButton } from "@/components/LogGoalButton";
import { StatSection } from "@/components/StatSection";
import { LOGGED, NOT_LOGGED } from "@/lib/data";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <BackgroundGlow />

      <main className="mx-auto flex w-full max-w-[560px] flex-col items-center gap-10 px-5 py-16 sm:gap-12 sm:py-20">
        <Logo />

        <DateStrip />

        <div className="flex w-full flex-col items-center gap-[25px]">
          <LogGoalButton />

          <ChallengeProgress title="Rish’s 21 days challenge" />

          <StatSection title="Logged" entries={LOGGED} />

          <StatSection title="Not Logged" entries={NOT_LOGGED} />
        </div>
      </main>
    </div>
  );
}
