import { addDays } from "./date";

export const CHALLENGE_LENGTH = 21;
export const CHALLENGE_START = new Date(2026, 6, 25);

export function challengeDates(): Date[] {
  return Array.from({ length: CHALLENGE_LENGTH }, (_, i) => addDays(CHALLENGE_START, i));
}
