"use client";

import { useEffect, useState } from "react";
import { SEED_LOGGED, SEED_NOT_LOGGED } from "@/lib/data";
import { buildLeaderboard } from "@/lib/leaderboard";
import { isLoggedOn, loadProfile, todayKey, type Profile } from "@/lib/profile";
import type { Person } from "@/lib/types";
import { ChallengeProgress } from "./ChallengeProgress";
import { DateStrip } from "./DateStrip";
import { Logo } from "./Logo";
import { LogGoalButton } from "./LogGoalButton";
import { LogGoalModal } from "./LogGoalModal";
import { StatSection } from "./StatSection";

export function AppShell() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const loggedToday = !!profile && profile.loggedDates.includes(todayKey());

  const you: Person | null = profile
    ? {
        name: "You",
        activity: profile.goal,
        value: profile.loggedDates.length,
        avatarSrc: profile.avatarDataUrl ?? undefined,
      }
    : null;

  const loggedPeople = [...SEED_LOGGED, ...(you && loggedToday ? [you] : [])];
  const notLoggedPeople = [...SEED_NOT_LOGGED, ...(you && !loggedToday ? [you] : [])];
  const { logged, notLogged } = buildLeaderboard(loggedPeople, notLoggedPeople);
  const youEntry = [...logged, ...notLogged].find((entry) => entry.name === "You") ?? null;

  return (
    <>
      <Logo />

      <DateStrip
        selected={selectedDate}
        onSelectedChange={setSelectedDate}
        isLogged={(date) => !!profile && isLoggedOn(profile, date)}
      />

      <div className="flex w-full flex-col items-center gap-[25px]">
        <LogGoalButton onClick={() => setModalOpen(true)} />

        <ChallengeProgress title="Rish’s 21 days challenge" />

        <StatSection title="Logged" entries={logged} />

        <StatSection title="Not Logged" entries={notLogged} />
      </div>

      {modalOpen && (
        <LogGoalModal
          profile={profile}
          youEntry={youEntry}
          date={selectedDate}
          onClose={() => setModalOpen(false)}
          onSaved={(next) => {
            setProfile(next);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
