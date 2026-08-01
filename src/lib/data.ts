import type { Person } from "./types";

export const SEED_LOGGED: Person[] = [
  { name: "Dishank", activity: "Writing Movie Summaries", value: 8 },
  { name: "Rutwa", activity: "Meditation and Journal", value: 6 },
  { name: "Rishabh", activity: "21 pushups", value: 4 },
];

export const SEED_NOT_LOGGED: Person[] = [
  { name: "Dishank", activity: "Writing Movie Summaries", value: 1 },
  { name: "Dishank", activity: "Writing Movie Summaries", value: 1 },
  { name: "Dishank", activity: "Writing Movie Summaries", value: 0 },
  { name: "Dishank", activity: "Writing Movie Summaries", value: 0 },
];
