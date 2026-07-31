import { AppShell } from "@/components/AppShell";
import { BackgroundGlow } from "@/components/BackgroundGlow";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <BackgroundGlow />

      <main className="mx-auto flex w-full max-w-[560px] flex-col items-center gap-10 px-5 py-16 sm:gap-12 sm:py-20">
        <AppShell />
      </main>
    </div>
  );
}
