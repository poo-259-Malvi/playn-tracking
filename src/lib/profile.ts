import { dateKey } from "./date";
import { supabase } from "./supabaseClient";

export type Profile = {
  id: string;
  name: string;
  goal: string;
  avatarUrl: string | null;
};

export function todayKey(): string {
  return dateKey(new Date());
}

export async function fetchCurrentParticipant(challengeId: string): Promise<Profile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("challenge_participants")
    .select("goal, profiles!inner(id, name, avatar_url)")
    .eq("challenge_id", challengeId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.profiles.id,
    name: data.profiles.name,
    goal: data.goal,
    avatarUrl: data.profiles.avatar_url,
  };
}

export async function joinChallenge({
  challengeId,
  name,
  goal,
  avatarDataUrl,
}: {
  challengeId: string;
  name: string;
  goal: string;
  avatarDataUrl: string | null;
}): Promise<Profile> {
  let {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    user = data.user;
  }
  if (!user) throw new Error("Could not create a session");

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({ id: user.id, name, avatar_url: avatarDataUrl });
  if (profileError) throw profileError;

  const { error: participantError } = await supabase
    .from("challenge_participants")
    .upsert(
      { challenge_id: challengeId, user_id: user.id, goal },
      { onConflict: "challenge_id,user_id" },
    );
  if (participantError) throw participantError;

  return { id: user.id, name, goal, avatarUrl: avatarDataUrl };
}

export async function logGoal({
  challengeId,
  userId,
  date,
}: {
  challengeId: string;
  userId: string;
  date: Date;
}): Promise<void> {
  const { error } = await supabase
    .from("goal_logs")
    .upsert(
      { challenge_id: challengeId, user_id: userId, logged_date: dateKey(date) },
      { onConflict: "challenge_id,user_id,logged_date", ignoreDuplicates: true },
    );
  if (error) throw error;
}
