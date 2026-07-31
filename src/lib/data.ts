import type { StatEntry } from "./types";

export const LOGGED: StatEntry[] = [
  { rank: 1, name: "Dishank", activity: "Writing Movie Summaries", badge: "gold", value: 8 },
  { rank: 2, name: "You", activity: "Create app with design+code tool", badge: "silver", value: 7 },
  { rank: 3, name: "Rutwa", activity: "Meditation and Journal", badge: "bronze", value: 6 },
  { rank: 4, name: "Rishabh", activity: "21 pushups", badge: "plain", value: 4 },
];

export const NOT_LOGGED: StatEntry[] = [
  { rank: 5, name: "Dishank", activity: "Writing Movie Summaries", badge: "plain", value: 1 },
  { rank: 6, name: "Dishank", activity: "Writing Movie Summaries", badge: "plain", value: 1 },
  { rank: 7, name: "Dishank", activity: "Writing Movie Summaries", badge: "plain", value: 0 },
  { rank: 8, name: "Dishank", activity: "Writing Movie Summaries", badge: "plain", value: 0 },
];

// true = day logged (streak dot filled)
export const CHALLENGE_LENGTH = 21;
export const CHALLENGE_PROGRESS: boolean[] = [
  false, true, true, true, true, true, false, true,
  ...Array(CHALLENGE_LENGTH - 8).fill(false),
];
