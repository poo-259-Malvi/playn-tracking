import { supabase } from "./supabaseClient";

export type Participant = {
  userId: string;
  name: string;
  goal: string;
  avatarUrl: string | null;
};

export type GoalLog = {
  userId: string;
  dateKey: string;
};

export async function fetchParticipants(challengeId: string): Promise<Participant[]> {
  const { data, error } = await supabase
    .from("challenge_participants")
    .select("user_id, goal, profiles!inner(name, avatar_url)")
    .eq("challenge_id", challengeId);

  if (error) throw error;

  return (data ?? []).map((row) => ({
    userId: row.user_id,
    name: row.profiles.name,
    goal: row.goal,
    avatarUrl: row.profiles.avatar_url,
  }));
}

export async function fetchGoalLogs(challengeId: string): Promise<GoalLog[]> {
  const { data, error } = await supabase
    .from("goal_logs")
    .select("user_id, logged_date")
    .eq("challenge_id", challengeId);

  if (error) throw error;

  return (data ?? []).map((row) => ({ userId: row.user_id, dateKey: row.logged_date }));
}
