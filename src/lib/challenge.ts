import { addDays } from "./date";
import { supabase } from "./supabaseClient";

export type Challenge = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
};

function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export async function getActiveChallenge(): Promise<Challenge | null> {
  const { data, error } = await supabase
    .from("challenges")
    .select("id, name, start_date, end_date")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    startDate: parseDateOnly(data.start_date),
    endDate: parseDateOnly(data.end_date),
  };
}

export function challengeDates(startDate: Date, endDate: Date): Date[] {
  const length = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return Array.from({ length }, (_, i) => addDays(startDate, i));
}
