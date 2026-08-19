"use client";

import { useEffect, useState } from "react";
import { getActiveChallenge, type Challenge } from "@/lib/challenge";
import { fetchGoalLogs, fetchParticipants, type GoalLog, type Participant } from "@/lib/challengeData";
import { dateKey } from "@/lib/date";
import { buildLeaderboard } from "@/lib/leaderboard";
import { fetchCurrentParticipant, type Profile } from "@/lib/profile";
import type { Person } from "@/lib/types";
import { ChallengeProgress } from "./ChallengeProgress";
import { DateStrip } from "./DateStrip";
import { Logo } from "./Logo";
import { LogGoalButton } from "./LogGoalButton";
import { LogGoalModal } from "./LogGoalModal";
import { StatSection } from "./StatSection";

function clampToChallenge(date: Date, challenge: Challenge): Date {
  if (dateKey(date) < dateKey(challenge.startDate)) return challenge.startDate;
  if (dateKey(date) > dateKey(challenge.endDate)) return challenge.endDate;
  return date;
}

export function AppShell() {
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [me, setMe] = useState<Profile | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [goalLogs, setGoalLogs] = useState<GoalLog[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [modalOpen, setModalOpen] = useState(false);

  async function refreshChallengeData(challengeId: string) {
    const [myProfile, myParticipants, logs] = await Promise.all([
      fetchCurrentParticipant(challengeId),
      fetchParticipants(challengeId),
      fetchGoalLogs(challengeId),
    ]);
    setMe(myProfile);
    setParticipants(myParticipants);
    setGoalLogs(logs);
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const activeChallenge = await getActiveChallenge();
      if (cancelled) return;

      setChallenge(activeChallenge);
      if (!activeChallenge) {
        setLoading(false);
        return;
      }

      setSelectedDate((current) => clampToChallenge(current, activeChallenge));
      await refreshChallengeData(activeChallenge.id);
      if (!cancelled) setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <>
        <Logo />
        <p className="text-sm text-white/60">Loading…</p>
      </>
    );
  }

  if (!challenge) {
    return (
      <>
        <Logo />
        <p className="text-sm text-white/60">No active challenge yet.</p>
      </>
    );
  }

  const today = new Date();
  const maxSelectableDate = dateKey(challenge.endDate) < dateKey(today) ? challenge.endDate : today;

  const myLoggedDateKeys = new Set(
    goalLogs.filter((log) => log.userId === me?.id).map((log) => log.dateKey),
  );

  const selectedKey = dateKey(selectedDate);
  const loggedOnSelected = new Set(
    goalLogs.filter((log) => log.dateKey === selectedKey).map((log) => log.userId),
  );
  const countByUser = new Map<string, number>();
  for (const log of goalLogs) {
    countByUser.set(log.userId, (countByUser.get(log.userId) ?? 0) + 1);
  }

  const entries = participants.map((participant) => {
    const isMe = participant.userId === me?.id;
    const person: Person = {
      name: isMe ? "You" : participant.name,
      activity: participant.goal,
      value: countByUser.get(participant.userId) ?? 0,
      avatarSrc: participant.avatarUrl ?? undefined,
    };
    return { person, loggedOnSelected: loggedOnSelected.has(participant.userId) };
  });

  const loggedPeople = entries.filter((e) => e.loggedOnSelected).map((e) => e.person);
  const notLoggedPeople = entries.filter((e) => !e.loggedOnSelected).map((e) => e.person);
  const { logged, notLogged } = buildLeaderboard(loggedPeople, notLoggedPeople);
  const youEntry = [...logged, ...notLogged].find((entry) => entry.name === "You") ?? null;

  return (
    <>
      <Logo />

      <DateStrip
        selected={selectedDate}
        onSelectedChange={setSelectedDate}
        isLogged={(date) => myLoggedDateKeys.has(dateKey(date))}
        minDate={challenge.startDate}
        maxDate={maxSelectableDate}
      />

      <div className="flex w-full flex-col items-center gap-[25px]">
        <LogGoalButton onClick={() => setModalOpen(true)} />

        <ChallengeProgress
          title={challenge.name}
          loggedDates={[...myLoggedDateKeys]}
          startDate={challenge.startDate}
          endDate={challenge.endDate}
        />

        {logged.length > 0 && <StatSection title="Logged" entries={logged} />}

        {notLogged.length > 0 && <StatSection title="Not Logged" entries={notLogged} />}
      </div>

      {modalOpen && (
        <LogGoalModal
          challengeId={challenge.id}
          profile={me}
          youEntry={youEntry}
          date={selectedDate}
          alreadyLoggedOnDate={myLoggedDateKeys.has(selectedKey)}
          onClose={() => setModalOpen(false)}
          onSaved={async () => {
            await refreshChallengeData(challenge.id);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
